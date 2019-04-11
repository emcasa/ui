import PropTypes from 'prop-types'
import groupBy from 'lodash/groupBy'
import React, {PureComponent} from 'react'
import MD5 from 'md5.js'
import tinycolor from 'tinycolor2'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Dropdown from '../Dropdown'
import Row from '../Row'
import Col from '../Col'
import Text from '../Text'
import Input from './Input'
import TagButton from './Button'

const MIN_LUMINANCE = 0.15
const MAX_LUMINANCE = 0.4

const Label = styled(Row)`
  align-items: center;
  flex-wrap: wrap;
  min-height: ${themeGet('buttonHeight.1')}px;
`

export function getDefaultGroupColor(group) {
  if (!group) return undefined
  const hex = `#${new MD5()
    .update(group)
    .digest('hex')
    .slice(0, 6)}`
  const color = tinycolor(hex)
  const luminance = color.getLuminance()
  if (luminance < MIN_LUMINANCE)
    color.brighten((MIN_LUMINANCE - luminance) * (1 - luminance) * 100)
  if (luminance > MAX_LUMINANCE)
    color.darken((luminance - MAX_LUMINANCE) * luminance * 100)
  return color.toHexString()
}

export default class TagInput extends PureComponent {
  static propTypes = {
    initialValue: PropTypes.arrayOf(PropTypes.object),
    selectedValue: PropTypes.arrayOf(PropTypes.object),
    options: PropTypes.arrayOf(PropTypes.object),
    renderTag: PropTypes.func,
    groupBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getKey: PropTypes.func
  }

  static defaultProps = {
    groupBy: 'category',
    getKey: (_, index) => index,
    getGroupColor: getDefaultGroupColor
  }

  static Option = Dropdown.Option

  state = {}

  static getDerivedStateFromProps(props, state) {
    return {
      values: props.selectedValue || state.values || props.initialValue || []
    }
  }

  getGroup(tag) {
    if (typeof this.props.groupBy === 'function') return this.props.groupBy(tag)
    return tag[this.props.groupBy]
  }

  getGroupColor(group) {
    return (
      (this.props.getGroupColor && this.props.getGroupColor(group)) || undefined
    )
  }

  getTagColor(tag) {
    return (
      (this.props.getTagColor && this.props.getTagColor(tag)) ||
      this.getGroupColor(this.getGroup(tag))
    )
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
      <TagButton
        key={key}
        active
        group={this.getGroup(value)}
        color={this.getTagColor(value)}
        onDelete={() => this.onDelete(value)}
      >
        {value.name}
      </TagButton>
    )
  }

  renderOption = (value, index) => {
    const {getKey, renderOption} = this.props
    const key = getKey(value, index)
    if (renderOption) renderOption(value, key)
    return (
      <TagButton key={key} value={value} color={this.getTagColor(value)}>
        {value.name}
      </TagButton>
    )
  }

  renderOptions(options, group) {
    const children = options.map(this.renderOption)
    if (group)
      children.unshift(
        <Row flex="1 0 100%" mt={2} pr={2} pl={2}>
          <Text inline>{group}</Text>
        </Row>
      )
    return children
  }

  renderLabel() {
    const {values, onChangeText} = this.state
    return (
      <Label>
        {values.map(this.renderTag)}
        {onChangeText && (
          <Col flex="1 0 30%">
            <Input
              height="medium"
              onChange={(e) => onChangeText(e.target.value)}
            />
          </Col>
        )}
      </Label>
    )
  }

  render() {
    const {children, options} = this.props
    const {values} = this.state
    const optionsGroups = groupBy(options, this.props.groupBy)
    return (
      <Dropdown
        strategy="multi"
        blurOnChange={false}
        selectedValue={values}
        onChange={this.onChange}
        icon="tag"
        height="auto"
        containerProps={{
          style: {
            flexDirection: 'row',
            flexWrap: 'wrap'
          }
        }}
        iconProps={{
          height: 'medium'
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
