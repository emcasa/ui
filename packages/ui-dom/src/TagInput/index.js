import PropTypes from 'prop-types'
import groupBy from 'lodash/groupBy'
import React, {PureComponent} from 'react'
import Dropdown from '../Dropdown'
import Row from '../Row'
import Col from '../Col'
import Text from '../Text'
import Input from './Input'
import TagButton from './Button'

export default class TagInput extends PureComponent {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.object),
    options: PropTypes.arrayOf(PropTypes.object),
    renderTag: PropTypes.func,
    groupBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getKey: PropTypes.func
  }

  static defaultProps = {
    groupBy: 'category',
    getKey: (_, index) => index
  }

  static Option = Dropdown.Option

  state = {
    values: []
  }

  static getDerivedStateFromProps(props, state) {
    return {
      values: props.values || state.values
    }
  }

  onChange = (values) => {
    if (this.props.onChange) this.props.onChange(values)
    this.setState({values})
  }

  onDelete = (value) => {
    this.onChange(this.state.values.filter((val) => val !== value))
  }

  renderTag = (value, index) => {
    const {getKey, renderTag} = this.props
    const key = getKey(value, index)
    if (renderTag) renderTag(value, key)
    if (this.props.renderTag) this.props.renderTag(value, key)
    return (
      <TagButton key={key} active onDelete={() => this.onDelete(value)}>
        {value.name}
      </TagButton>
    )
  }

  renderOption = (value, index) => {
    const {getKey, renderOption} = this.props
    const key = getKey(value, index)
    if (renderOption) renderOption(value, key)
    return (
      <TagButton key={key} value={value}>
        {value.name}
      </TagButton>
    )
  }

  renderOptions(options, group) {
    const children = options.map(this.renderOption)
    if (group)
      children.unshift(
        <Row flex="1 0 100%" pr={2} pl={2}>
          <Text>{group}</Text>
        </Row>
      )
    return children
  }

  renderLabel() {
    const {values} = this.state
    return (
      <Row alignItems="center" flexWrap="wrap">
        {values.map(this.renderTag)}
        <Col flex="1 0 30%">
          <Input height="medium" />
        </Col>
      </Row>
    )
  }

  render() {
    const {children, options} = this.props
    const optionsGroups = groupBy(options, this.props.groupBy)
    return (
      <Dropdown
        strategy="multi"
        blurOnChange={false}
        onChange={this.onChange}
        icon="tag"
        height="auto"
        containerProps={{
          style: {
            flexDirection: 'row',
            flexWrap: 'wrap'
          }
        }}
        label={this.renderLabel()}
      >
        {options
          ? Object.entries(optionsGroups).map(([group, options]) =>
              this.renderOptions(options, group)
            )
          : children}
      </Dropdown>
    )
  }
}
