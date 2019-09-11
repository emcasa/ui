import {groupBy} from 'lodash/fp'
import {compose, withProps} from 'recompose'
import React, {PureComponent} from 'react'
import {withTheme} from 'styled-components'
import {DropTarget} from 'react-dnd'
import {NativeTypes} from 'react-dnd-html5-backend'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import {UploadCard, Spinner} from './styles'
import {gridStyle} from '../styles/grid'

const isValidFile = (file) => /^image\//.test(file.type)

const groupFiles = groupBy((file) =>
  isValidFile(file) ? 'accepted' : 'rejected'
)

const fileTarget = {
  drop(props, monitor) {
    const item = monitor.getItem()
    if (!item.files || !item.files.length) return
    const {accepted, rejected} = groupFiles(item.files)
    // Time to actually perform the action
    if (props.onDrop) props.onDrop(accepted, rejected)
  }
}

const Target = DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))

class FileTarget extends PureComponent {
  inputRef = React.createRef()

  openFileExplorer = () => {
    if (this.inputRef.current) {
      this.inputRef.current.value = null
      this.inputRef.current.click()
    }
  }

  onSelectFiles = (e) => {
    const {onDrop} = this.props
    e.preventDefault()
    const files = e.target.files
    if (files.length && onDrop) onDrop(Array.from(files))
  }

  onInputClick = (e) => {
    e.stopPropagation()
  }

  onTargetClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setTimeout(this.openFileExplorer, 1)
  }

  render() {
    const {isOver, connectDropTarget, progress, fontSize} = this.props
    return (
      <UploadCard
        isActive={isOver}
        onClick={this.onTargetClick}
        ref={connectDropTarget}
      >
        <input
          ref={this.inputRef}
          multiple
          type="file"
          accept="image/*"
          style={{display: 'none'}}
          autoComplete="off"
          tabIndex="-1"
          onClick={this.onInputClick}
          onChange={this.onSelectFiles}
        />
        <Row height="40px" justifyContent="center" alignItems="center">
          {progress ? (
            <Spinner size={10} />
          ) : (
            <Icon color="pink" size={30} name="plus" />
          )}
        </Row>
        <Text inline textAlign="center" color="pink" fontSize={fontSize}>
          {progress ? (
            <>
              Subindo fotos {progress[0]}/{progress[1]}
            </>
          ) : (
            'Adicionar fotos'
          )}
        </Text>
      </UploadCard>
    )
  }
}

export default compose(
  withTheme,
  withProps(gridStyle('UploadTarget')),
  Target
)(FileTarget)
