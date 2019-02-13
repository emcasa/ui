import React, {PureComponent} from 'react'
import toArray from 'lodash/toArray'
import omit from 'lodash/omit'
import PropTypes from 'prop-types'

export const Strategies = {
  /**
   * Simple select strategy - selects one value at a time
   */
  simple: {
    isSelected(selectedValue, value) {
      return selectedValue === value
    },
    update(_, value) {
      return value
    }
  },
  switchable: {
    isSelected(selectedValue, value) {
      return selectedValue === value
    },
    update(selectedValue, value) {
      return selectedValue === value ? undefined : value
    }
  },
  /**
   * Multi-select strategy
   */
  multi: {
    getInitialValue: toArray,
    isSelected(selectedValue, value) {
      return selectedValue.indexOf(value) !== -1
    },
    update([...selectedValue], value) {
      const index = selectedValue.indexOf(value)
      if (index === -1) selectedValue.push(value)
      else selectedValue.splice(index, 1)
      return selectedValue
    }
  }
}

const defaultGetValue = (node) => node.props.value

class GroupItem extends PureComponent {
  static childrenProp = '$$groupItem'

  render() {
    return <>{this.props[GroupItem.childrenProp]}</>
  }
}

const Group = (parseProps, getValue = defaultGetValue) => (Target) =>
  class SelectGroup extends PureComponent {
    static propTypes = {
      strategy: PropTypes.oneOfType([
        PropTypes.oneOf(Object.keys(Strategies)),
        PropTypes.shape({
          /**
           * Get default initial value
           * @param {any} initialValue
           * @returns {any}
           */
          getInitialValue: PropTypes.func,
          /**
           * Test if a value is selected
           * @param {any} selectedValue Selected value
           * @param {any} value Value to check against
           * @returns {Boolean}
           */
          isSelected: PropTypes.func.isRequired,
          /**
           * Update the selected value
           * @param {any} selectedValue Selected value
           * @param {any} value Value to select
           * @returns {any} New value
           */
          update: PropTypes.func.isRequired
        })
      ]).isRequired,
      children: PropTypes.node.isRequired,
      selectedValue: PropTypes.any,
      disabled: PropTypes.bool,
      onChange: PropTypes.func,
      renderItem: PropTypes.func,
      ...(Target.propTypes || {})
    }

    static defaultProps = Object.assign(
      {
        strategy: Strategies.simple
      },
      Target.defaultProps || {}
    )

    state = {}

    static getDerivedStateFromProps(props, state) {
      const isControlled = typeof props.selectedValue !== 'undefined'
      let strategy = state.strategy || props.strategy
      let initialValue = props.initialValue
      if (typeof strategy === 'string' && strategy in Strategies)
        strategy = Strategies[strategy]
      if (strategy.getInitialValue)
        initialValue = strategy.getInitialValue(initialValue)
      return {
        isControlled,
        strategy,
        selectedValue: isControlled
          ? props.selectedValue
          : 'selectedValue' in state
            ? state.selectedValue
            : initialValue
      }
    }

    isSelected = (value) =>
      this.state.strategy.isSelected(this.state.selectedValue, value)

    update = (value) =>
      this.state.strategy.update(this.state.selectedValue, value)

    onChange = (value) => {
      const {disabled} = this.props
      if (disabled) return
      const selectedValue = this.update(value)
      const onChange = () => {
        if (this.props.onChange) this.props.onChange(selectedValue)
      }
      if (this.state.isControlled) onChange()
      else this.setState({selectedValue}, onChange)
    }

    _childProps = (node, index) => {
      const value = getValue(node, index)
      const nextProps = parseProps(
        {
          ...this.props,
          selectedValue: this.state.selectedValue,
          onSelect: () => this.onChange(value),
          selected: this.isSelected(value)
        },
        node
      )
      return omit(nextProps, Object.keys(node.props))
    }

    renderItem = (child, index) => {
      const {renderItem} = this.props
      if (!child) return
      const component = React.cloneElement(
        child,
        this._childProps(child, index)
      )
      if (!renderItem) return component
      // Wrap item to ensure the Target component has access to child props
      // when `renderItem` is passed
      return (
        <GroupItem
          {...{
            ...component.props,
            [GroupItem.childrenProp]: renderItem(component, this.props)
          }}
        />
      )
    }

    render() {
      return (
        <Target {...this.props} {...this.state} onSelect={this.onChange}>
          {React.Children.map(this.props.children, this.renderItem)}
        </Target>
      )
    }
  }

Group.Strategies = Strategies

export default Group
