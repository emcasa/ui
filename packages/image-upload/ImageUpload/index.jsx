import React from 'react'
import PropTypes from 'prop-types'
import UploadTarget from '../UploadTarget'
import Images from '../Images'
import ThemeProvider from '../theme/Provider'
import {Container} from './styles'

export default function ImageUpload({
  showInactive,
  theme,
  images,
  disabled,
  queueUploads,
  filterFiles,
  onUpload,
  onChangePosition,
  onActivate,
  onDeactivate
}) {
  const visibleImages = showInactive
    ? images
    : images.filter((img) => img.isActive)
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <UploadTarget
          onUpload={onUpload}
          disabled={disabled}
          filterFiles={filterFiles}
          queueUploads={queueUploads}
        />
        <Images
          images={visibleImages}
          onChangePosition={onChangePosition}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
        />
      </Container>
    </ThemeProvider>
  )
}

ImageUpload.defaultProps = {
  theme: {},
  queueUploads: 3,
  filterFiles: (files) => files
}

ImageUpload.propTypes = {
  showInactive: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  /**
   * Max number of files to process in parallel.
   */
  queueUploads: PropTypes.number,
  /**
   * Function called when a user selects files to upload. Receives an array
   * of File objects and should return an array of files to process.
   */
  filterFiles: PropTypes.func,
  /**
   * Upload function called for each selected file, should return a Promise.
   */
  onUpload: PropTypes.func.isRequired,
  onChangePosition: PropTypes.func,
  onActivate: PropTypes.func,
  onDeactivate: PropTypes.func
}
