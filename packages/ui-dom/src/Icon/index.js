import React from 'react'
import styled from 'styled-components'

import Icon, * as styles from '@emcasa/ui/lib/components/Icon'

const IconComponent = styled(
  Icon(({icon, size, color, style, className, id, ref, ...props}) => (
    <div style={style} className={className} id={id}>
      <svg
        ref={ref}
        height={size}
        version="1.1"
        viewBox={`0 0 ${icon.width} ${icon.height}`}
        x={0}
        y={0}
      >
        {icon.render ? (
          icon.render({...props, color})
        ) : (
          <path d={icon.path} fill={color} {...icon.props} {...props} />
        )}
      </svg>
    </div>
  ))
)`
  ${styles.container};
`

IconComponent.displayName = 'Icon'

IconComponent.propTypes = {
  ...styles.container.propTypes
}

IconComponent.defaultProps = {
  ...styles.container.defaultProps
}

export default IconComponent
