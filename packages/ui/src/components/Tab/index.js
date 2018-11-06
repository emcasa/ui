import {css} from 'styled-components'
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
  selected: PropTypes.bool.isRequired,
  ...col.propTypes
}

export const tabBar = css`
  display: flex;
  flex: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  ${(props) => {
    const value = buttonHeight(props)
    if (value) return {height: value.height, flexBasis: value.height}
  }};
  width: 100%;
`

tabBar.propTypes = {
  ...buttonHeight.propTypes
}

export const tabBarButton = css`
  flex: 1;
  height: 100%;
  margin-left: 2.5px;
  margin-right: 2.5px;
  background-color: white;
  border-width: 0;
  border-bottom-width: 3px;
  ${({borderColor, selected, theme}) => ({
    borderColor: selected
      ? theme.colors[borderColor] || borderColor
      : 'transparent'
  })};
`

tabBarButton.propTypes = {
  borderColor: PropTypes.string,
  selected: PropTypes.bool.isRequired
}

export const tabBarText = css`
  font-size: 18px;
  text-align: center;
  ${text};
`

tabBarText.propTypes = {
  ...text.propTypes
}
