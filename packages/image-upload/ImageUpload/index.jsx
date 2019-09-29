import React from 'react'
import PropTypes from 'prop-types'
import UploadTarget from '../UploadTarget'
import Images from '../Images'
import ThemeProvider from '../theme/Provider'
import {Container} from './styles'

export default function ImageUpload({
  showInactive,
  theme,
  disabled,
  images,
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
        <UploadTarget onUpload={onUpload} disabled={disabled} />
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
  theme: {}
}

ImageUpload.propTypes = {
  showInactive: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  /**
   * Upload function called for each selected file, should return a Promise.
   */
  onUpload: PropTypes.func.isRequired,
  onChangePosition: PropTypes.func,
  onActivate: PropTypes.func,
  onDeactivate: PropTypes.func
}
