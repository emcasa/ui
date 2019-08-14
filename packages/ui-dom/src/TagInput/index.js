import PropTypes from 'prop-types'
import groupBy from 'lodash/groupBy'
import toArray from 'lodash/toArray'
import deepMerge from 'deepmerge'
import React, {PureComponent} from 'react'
import MD5 from 'md5.js'
import tinycolor from 'tinycolor2'
import styled from 'styled-components'
import {buttonHeight} from '@emcasa/ui/lib/styles'
import Dropdown from '../Dropdown'
import Row from '../Row'
import Col from '../Col'
import Text from '../Text'
import Input from './Input'
import TagButton, {tagVerticalMargin} from './Button'

const MIN_LUMINANCE = 0.15
const MAX_LUMINANCE = 0.4

const Label = styled(Row)`
  box-sizing: border-box;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: auto;
  min-height: ${(props) => buttonHeight(props).height};
  ${(props) =>
    props.maxRows && {
      maxHeight: `${parseInt(buttonHeight(props).height) * props.maxRows -
        tagVerticalMargin}px`
    }};
  padding-top: ${tagVerticalMargin}px;
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

const isTag = (tag) => (t) => t.name == tag.name

const selectStrategy = {
  getInitialValue: toArray,
  isSelected(selectedValue, tag) {
    return tag && selectedValue.find(isTag(tag))
  },
  update([...selectedValue], tag) {
    const index = selectedValue.findIndex(isTag(tag))
    if (index === -1) selectedValue.push(tag)
    else selectedValue.splice(index, 1)
    return selectedValue
  }
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
    height: 'medium',
    groupBy: 'category',
    getKey: (_, index) => index,
    getGroupColor: getDefaultGroupColor,
    labelProps: {}
  }

  static Option = Dropdown.Option

  state = {}

  inputRef = React.createRef()

  static getDerivedStateFromProps(props, state) {
    return {
      values: props.selectedValue || state.values || props.initialValue || [],
      search: props.search || state.search || '',
      focus: typeof props.focused !== 'undefined' ? props.focused : state.focus
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

  onChangeText = (search) => {
    if (this.props.onChangeText) this.props.onChangeText(search)
    this.setState({search, focus: true})
  }

  onFocus = () => this.setState({focus: true}, this.props.onFocus)

  onBlur = () => this.setState({focus: false, search: ''}, this.props.onBlur)

  onClickButton = () => {
    setTimeout(() => {
      if (this.inputRef.current) {
        this.inputRef.current.focus()
      }
    }, 0)
  }

  renderTag = (value, index) => {
    const {getKey, renderTag, height} = this.props
    const key = getKey(value, index)
    if (renderTag) renderTag(value, key)
    if (this.props.renderTag) this.props.renderTag(value, key)
    return (
      <TagButton
        key={key}
        active
        group={this.getGroup(value)}
        color={this.getTagColor(value)}
        height={height}
        onDelete={() => this.onDelete(value)}
      >
        {value.name}
      </TagButton>
    )
  }

  renderOption = (value, index) => {
    const {getKey, renderOption, height} = this.props
    const key = getKey(value, index)
    if (renderOption) renderOption(value, key)
    return (
      <TagButton
        key={key}
        value={value}
        height={height}
        color={this.getTagColor(value)}
      >
        {value.name}
      </TagButton>
    )
  }

  renderOptions(options, group) {
    const children = options.map(this.renderOption)
    if (group)
      children.unshift(
        <Row
          style={{boxSizing: 'border-box'}}
          flex="1 0 100%"
          mt={2}
          mb={2}
          pr={2}
          pl={2}
        >
          <Text inline>{group}</Text>
        </Row>
      )
    return children
  }

  onPaste = (e) => {
    const pastedText = e.clipboardData.getData('Text')
    const pastedItems = pastedText.split(';')
    if (pastedItems.length > 0) {
      const newValues = JSON.parse(JSON.stringify(this.state.values))
      pastedItems.forEach((item) => {
        const tagFound = this.getTag(item, this.props.options)
        const isDuplicate = this.isDuplicate(tagFound, newValues)
        if (tagFound && !isDuplicate) {
          newValues.push(tagFound)
        }
      })
      this.onChange(newValues)
      setTimeout(() => {
        this.onChangeText('')
        this.inputRef.current.value = ''
      }, 1000)
    }
  }

  isDuplicate = (tag, tags) => {
    return tags.find((t) => t.name.trim().toLowerCase() === tag.name.trim().toLowerCase())
  }

  getTag = (name, tags) => {
    return tags.find((t) => t.name.trim().toLowerCase() === name.trim().toLowerCase())
  }

  renderLabel() {
    const {
      onChangeText,
      placeholder,
      height,
      labelProps,
      renderLabel
    } = this.props
    const {values, search, focus} = this.state
    const input = (
      <Col flex="1 0 150px">
        <Input
          ref={this.inputRef}
          height={height}
          placeholder={placeholder}
          onChange={(e) => this.onChangeText(e.target.value)}
          onPaste={this.onPaste}
          onMouseDown={(e) => {
            e.stopPropagation()
            if (!focus) setTimeout(this.onFocus, 0)
          }}
          value={search}
        />
      </Col>
    )
    const tags = values ? values.map(this.renderTag) : []
    return (
      <Label height={height} {...labelProps}>
        {renderLabel ? (
          renderLabel(values, {input, tags})
        ) : (
          <>
            {tags}
            {Boolean(onChangeText) && input}
          </>
        )}
      </Label>
    )
  }

  render() {
    const {
      children,
      options,
      placeholder,
      height,
      containerProps,
      buttonProps,
      ...props
    } = this.props
    const {values, focus} = this.state
    const optionsGroups = groupBy(options, this.props.groupBy)
    return (
      <Dropdown
        focused={focus}
        strategy={selectStrategy}
        blurOnChange={false}
        icon="tag"
        height="auto"
        placeholder={placeholder}
        containerProps={deepMerge(
          {...containerProps},
          {
            style: {
              flexDirection: 'row',
              flexWrap: 'wrap'
            }
          }
        )}
        buttonProps={Object.assign(
          {...buttonProps},
          {onClick: this.onClickButton}
        )}
        iconProps={{height}}
        label={this.renderLabel()}
        {...props}
        selectedValue={values}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <Row flex="1 0 100%">{children}</Row>
        {options &&
          Object.entries(optionsGroups).map(([group, options]) =>
            this.renderOptions(options, group)
          )}
      </Dropdown>
    )
  }
}
