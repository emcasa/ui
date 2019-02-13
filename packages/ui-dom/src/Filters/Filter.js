import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {Field} from 'formik'
import Measure from 'react-measure'
import {FilterButton, Panel} from './styles'
import View from '../View'
import Row from '../Row'
import Button from '../Button'

const Link = ({isMobile, ...props}) => {
  const style = isMobile
    ? {}
    : {
        link: true,
        color: props.active ? 'pink' : 'grey',
        p: 0,
        height: 'auto',
        fontSize: 'small'
      }
  return <Button type="button" {...style} {...props} />
}

export default class Filter extends PureComponent {
  static defaultProps = {
    panelProps: {}
  }

  renderPanel(passProps) {
    const {
      children,
      onClear,
      onSubmit,
      panelProps,
      contentRect,
      contentRef,
      isMobile
    } = this.props
    const panelElement = (
      <Panel
        pose={isMobile ? 'mobile' : 'desktop'}
        contentRect={contentRect}
        {...panelProps}
        {...passProps}
      >
        <Row className="panelBody">{children}</Row>
        <Row className="panelFooter">
          <Link isMobile={isMobile} onClick={onClear}>
            Limpar
          </Link>
          <Link isMobile={isMobile} active onClick={onSubmit}>
            Aplicar
          </Link>
        </Row>
      </Panel>
    )
    if (!this.props.isMobile) {
      return panelElement
    } else if (contentRef.current) {
      return ReactDOM.createPortal(panelElement, contentRef.current)
    }
  }

  render() {
    const {label, selectedValue, selected, onSelect, ...props} = this.props
    return (
      <Measure bounds>
        {({measureRef, contentRect: buttonRect}) => (
          <View innerRef={measureRef}>
            <FilterButton
              {...props}
              color={selectedValue && !selected ? 'grey' : props.color}
              onClick={onSelect}
            >
              {label}
            </FilterButton>
            {selected && this.renderPanel({buttonRect})}
          </View>
        )}
      </Measure>
    )
  }
}

export class ControlledFilter extends PureComponent {
  state = {}

  static getDerivedStateFromProps(props) {
    if (!props.selected) return {value: null}
    return null
  }

  onChange = (value) => this.setState({value})

  render() {
    const {children, name, selected, onSelect, ...props} = this.props
    const {value} = this.state
    return (
      <Field
        name={name}
        render={({field, form}) => (
          <Filter
            {...props}
            selected={selected}
            onSelect={onSelect}
            onClear={() => {
              this.setState({value: null})
              form.setFieldValue(name, undefined)
              requestAnimationFrame(onSelect)
            }}
            onSubmit={() => {
              form.setFieldValue(name, value)
              requestAnimationFrame(onSelect)
            }}
          >
            {children({
              field: {
                ...field,
                currentValue: value,
                onChange: this.onChange
              },
              form
            })}
          </Filter>
        )}
      />
    )
  }
}
