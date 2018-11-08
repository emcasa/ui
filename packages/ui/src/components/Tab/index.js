import {css} from 'styled-components'
import {space, bgColor, justifyContent, alignItems} from 'styled-system'
import PropTypes from 'prop-types'

import {container as col} from '../Col'
import {container as text} from '../Text'
import {buttonHeight} from '../../styles'

export const defaultProps = {
  color: 'grey',
  borderColor: 'pink',
  barHeight: 'medium'
}

export const container = css`
  display: ${({selected}) => (selected ? 'flex' : 'none')};
  flex: 1;
  ${col};
`

container.propTypes = {
  selected: PropTypes.bool,
  ...col.propTypes
}

export const tabBar = css`
  display: flex;
  flex: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${(props) => {
    const value = buttonHeight(props)
    if (value) return {height: value.height, flexBasis: value.height}
  }};
  ${space};
  ${bgColor};
  ${justifyContent};
  ${alignItems};
`

tabBar.propTypes = {
  ...buttonHeight.propTypes,
  ...space.propTypes,
  ...bgColor.propTypes,
  ...justifyContent.proptypes,
  ...alignItems.propTypes
}

export const tabBarButton = css`
  flex: 1;
  height: 100%;
  justify-content: center;
  margin-left: 2.5px;
  margin-right: 2.5px;
  background-color: white;
  border-width: 0;
  border-bottom-width: 1px;
  ${({borderColor, selected, theme}) => ({
    borderColor: selected
      ? theme.colors[borderColor] || borderColor
      : 'transparent'
  })};
  ${({borderWidth}) => ({borderBottomWeight: borderWidth})};
`

tabBarButton.propTypes = {
  borderColor: PropTypes.string,
  borderWidth: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool
}

export const tabBarText = css`
  font-size: 16px;
  text-align: center;
  ${text};
`

tabBarText.propTypes = {
  ...text.propTypes
}
