import React from 'react'
import styled from 'styled-components'
import * as field from '@emcasa/ui/lib/components/Field'
import View from '../View'
import Text from '../Text'

const LabelText = styled(Text).attrs({inline: true})`
  display: block;
  ${field.textContainer};
  ${field.label};
`

const ErrorText = styled(Text).attrs({inline: true})`
  display: block;
  ${field.textContainer};
  ${field.error};
`

function Field({
  hideLabelView,
  hideErrorView,
  label,
  error,
  children,
  Component,
  fowardedRef,
  ...props
}) {
  const refProp = {}
  if (fowardedRef) {
    refProp.ref = fowardedRef
  }
  return (
    <View>
      {!hideLabelView && <LabelText>{label}</LabelText>}
      {Component ? <Component {...refProp} {...props} /> : children}
      {!hideErrorView && <ErrorText>{error}</ErrorText>}
    </View>
  )
}

Field.propTypes = field.container.propTypes

Field.defaultProps = field.container.defaultProps

export default Field
