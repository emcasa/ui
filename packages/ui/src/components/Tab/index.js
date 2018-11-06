import {css} from 'styled-components'
import PropTypes from 'prop-types'

import {container as col} from '../Col'
import {container as text} from '../Text'

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
  flex-basis: 45px;
  width: 100%;
`

tabBar.propTypes = {}

export const tabBarButton = css`
  flex: 1;
  margin-left: 2.5px;
  margin-right: 2.5px;
  border-bottom-width: 3px;
  ${({color, selected, theme}) => ({
    borderColor: selected ? theme.colors[color] || color : 'transparent'
  })};
`

tabBarButton.propTypes = {
  color: PropTypes.string,
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
