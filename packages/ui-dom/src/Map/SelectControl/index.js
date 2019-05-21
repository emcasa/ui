import React, {PureComponent} from 'react'
import Group from '@emcasa/ui/lib/components/Group'
import Container, {Button, List, Option, GroupContainer} from './styles'
import Control from '../Control'
import Row from '../../Row'
import Col from '../../Col'
import Icon from '../../Icon'

const OptionGroup = Group(
  ({onSelect, selected, disabled, height, fontSize, icon}) => ({
    icon,
    height,
    fontSize,
    disabled,
    onClick: onSelect,
    selected
  })
)(GroupContainer)

const SelectOption = (props) => <Option {...props} />

function SelectCheckbox({children, ...props}) {
  return (
    <SelectOption {...props}>
      <Row>
        <Col>
          <Icon
            name={props.selected ? 'check-square' : 'square'}
            color={props.selected ? 'pink' : 'lightGrey'}
            size={15}
          />
        </Col>
        <Col flex={1}>{children}</Col>
      </Row>
    </SelectOption>
  )
}

export default class SelectControl extends PureComponent {
  static Option = SelectOption

  static Checkbox = SelectCheckbox

  static defaultProps = {
    height: 'medium'
  }

  state = {
    expanded: false
  }

  listRef = React.createRef()

  onMouseEnter = () =>
    this.setState({
      expanded: true,
      listHeight: this.listRef.current.clientHeight
    })

  onMouseLeave = () => this.setState({expanded: false})

  render() {
    const {
      style,
      className,
      position,
      m,
      mt,
      mb,
      mr,
      ml,
      zIndex,
      height,
      fontSize,
      label,
      children,
      onChange,
      selectedValue,
      strategy
    } = this.props
    const {expanded, listHeight} = this.state
    const controlProps = {position, style, className, m, mt, mb, mr, ml, zIndex}
    const buttonProps = {height, fontSize}
    const groupProps = {strategy, onChange, selectedValue}
    return (
      <Control {...controlProps}>
        <Container
          height={height}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <Button expanded={expanded} {...buttonProps}>
            {label}
          </Button>
          <List offset={height} expanded={expanded} height={listHeight}>
            <div ref={this.listRef}>
              <OptionGroup {...buttonProps} {...groupProps}>
                {children}
              </OptionGroup>
            </div>
          </List>
        </Container>
      </Control>
    )
  }
}
