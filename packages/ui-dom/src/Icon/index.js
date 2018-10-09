import React from 'react'
import styled from 'styled-components'
import { color, space } from 'styled-system'
import { iconSize } from '@emcasa/ui/lib/styles'
import { ICON_SIZE } from '@emcasa/ui/lib/theme/measures'

import {ChevronCircleRight} from 'styled-icons/fa-solid/ChevronCircleRight.cjs'
import {CheckCircle} from 'styled-icons/fa-solid/CheckCircle.cjs'

const IconType = (type) => {
  switch (type) {
    case 'circle-right': return ChevronCircleRight;
    case 'check-circle': return CheckCircle;
  }
}

const Icon = styled((props) => {
  const CustomIcon = IconType(props.type)
  return <CustomIcon {...props} width={ICON_SIZE[props.size]} height={ICON_SIZE[props.size]} />
})`
  ${space}
  ${color}
  ${iconSize}
`

Icon.defaultProps = {
  size: 'default'
}

export default Icon
