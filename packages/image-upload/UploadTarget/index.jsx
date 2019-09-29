import groupBy from 'lodash/groupBy'
import filter from 'lodash/fp/filter'
import update from 'immutability-helper'
import React, {PureComponent} from 'react'
import Target from './Target'

export const UploadState = {
  QUEUED: -1,
  UPLOADING: 0,
  FINISHED: 1
}

const isUploadPending = ({progress}) =>
  progress == UploadState.QUEUED || progress == UploadState.UPLOADING

export default class ImageUploader extends PureComponent {
  static defaultProps = {
    queueUploads: 3
  }

  state = {
    uploads: []
  }

  componentDidUpdate(prevProps, prevState) {
    const {queueUploads} = this.props
    const {uploads} = this.state
    if (uploads.length && uploads !== prevState.uploads) {
      const uploadsByState = {
        [UploadState.QUEUED]: [],
        [UploadState.UPLOADING]: [],
        [UploadState.FINISHED]: [],
        ...groupBy(uploads, 'progress')
      }
      const activeUploads =
        queueUploads - uploadsByState[UploadState.UPLOADING].length
      if (activeUploads) {
        // Start queued uploads
        uploadsByState[UploadState.QUEUED]
          .slice(0, activeUploads)
          .map(({file}) => this.handleUpload(file))
      }
      if (uploadsByState[UploadState.FINISHED].length == uploads.length) {
        // Clear uploads
        setTimeout(
          () =>
            this.setState((state) =>
              update(state, {
                uploads: {$apply: filter(isUploadPending)}
              })
            ),
          1000
        )
      }
    }
  }

  handleUpload = (file) => {
    const {onUpload} = this.props
    const index = this.state.uploads.findIndex((upload) => upload.file == file)
    this.setState(
      (state) =>
        update(state, {
          uploads: {
            [index]: {
              $merge: {
                progress: UploadState.UPLOADING,
                startTime: Date.now()
              }
            }
          }
        }),
      () => {
        const upload = onUpload(file)
        if (upload instanceof Promise)
          upload
            .then(this.handleUploadSuccess(file))
            .catch(this.handleUploadError(file))
      }
    )
  }

  handleUploadSuccess = (file) => async () => {
    const index = this.state.uploads.findIndex((upload) => upload.file == file)
    this.setState((state) =>
      update(state, {
        uploads: {
          [index]: {$merge: {progress: UploadState.FINISHED}}
        }
      })
    )
  }

  handleUploadError = (file) => (error) => {
    const index = this.state.uploads.findIndex((upload) => upload.file == file)
    this.setState((state) =>
      update(state, {
        uploads: {
          [index]: {$merge: {progress: UploadState.FINISHED, error}}
        }
      })
    )
  }

  onUpload = async (files) => {
    this.setState((state) =>
      update(state, {
        uploads: {
          $push: files.map((file) => ({
            file,
            progress: UploadState.QUEUED,
            error: undefined
          }))
        }
      })
    )
  }

  get progress() {
    const {uploads} = this.state
    const activeUploads = uploads.length
    const pendingUploads = uploads.filter(isUploadPending).length
    return activeUploads
      ? [activeUploads - pendingUploads, activeUploads]
      : undefined
  }

  render() {
    return (
      <Target {...this.props} progress={this.progress} onDrop={this.onUpload} />
    )
  }
}
