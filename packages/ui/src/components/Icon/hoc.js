import React from 'react'
import {withTheme} from 'styled-components'
import {ICON_SIZE} from '../../theme/measures'

const getIcon = ({type, name}, {icons, defaultIcon}) => {
  const findIcon = (iconName, key = type) => {
    if (!(key in icons)) return undefined
    const values = Object.keys(icons[key]).map((item) => icons[key][item])
    for (const icon of values)
      if (icon.iconName == iconName) return icon
  }
  const icon = findIcon(name) || findIcon(defaultIcon, 'default')
  return {
    width: icon.icon[0],
    height: icon.icon[1],
    path: icon.icon[4]
  }
}

const getColors = ({color, stroke}, theme) => ({
  color: theme.colors[color] || color,
  stroke: theme.colors[stroke] || stroke
})

const getSize = ({size}) =>
  typeof size === 'string' ? ICON_SIZE.get(size) : size

export default (Target) =>
  withTheme(({theme, ...props}) => (
    <Target
      {...props}
      {...getColors(props, theme)}
      size={getSize(props, theme)}
      icon={getIcon(props, theme)}
    />
  ))
