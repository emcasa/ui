import React from 'react'
import {View} from 'react-native'
import styled from 'styled-components'
import {Svg, Path} from 'react-native-svg'

import Icon, * as styles from '@emcasa/ui/lib/components/Icon'

const IconComponent = styled(
  Icon(({icon, size, color, style, innerRef, ...props}) => (
    <View style={style}>
      <Svg
        ref={innerRef}
        height={size}
        width={size + 5}
        version="1.1"
        viewBox={`0 0 ${icon.width} ${icon.height}`}
        x={0}
        y={0}
      >
        <Path d={icon.path} scale={1} fill={color} {...props} />
      </Svg>
    </View>
  ))
)`
  ${styles.container};
`

IconComponent.displayName = 'Icon'

IconComponent.propTypes = {
  ...styles.container.propTypes
}

IconComponent.defaultProps = {
  ...styles.container.defaultProps,
  pointerEvents: () => false
}

export default IconComponent
