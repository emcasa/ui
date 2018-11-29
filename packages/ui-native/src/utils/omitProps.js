import React from 'react'
import omit from 'lodash.omit'

/**
 * Omits props from target component to avoid collision with styled-system props.
 * @param  {...String} propsToOmit
 */
export default function omitProps(...propsToOmit) {
  return (Target) =>
    React.forwardRef((props, ref) => (
      <Target ref={ref} {...omit(props, propsToOmit)} />
    ))
}

export const layoutProps = `alignContent alignItems alignSelf
flex flexBasis flexDirection flexGrow flexShrink flexWrap justifyContent
borderBottomWidth borderEndWidth borderLeftWidth borderRightWidth
borderStartWidth borderTopWidth borderWidth
width height maxHeight maxWidth minHeight minWidth
zIndex elevation overflow position top bottom left right`.split(/\s*/)

export const omitLayoutProps = omitProps(...layoutProps)

export const textStyleProps = `color fontSize fontStyle fontWeight
lineHeight textAlign fontFamily fontVariant letterSpacing`.split(/\s*/)

export const omitTextStyleProps = omitProps(...textStyleProps)
