import {css} from 'styled-components'
import {space, width, height, order, flex, alignSelf} from 'styled-system'

export const container = css`
  ${space}
  ${width}
  ${height}
  ${order}
  ${flex}
  ${alignSelf}

  @media only screen and (max-device-width: 600px) {
    ${({body}) => (body && css`
      margin-bottom: ${({theme: {space}}) => space[5]}px;
    `)}

    ${({bottom}) => (bottom && css`
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: ${({theme: {colors}}) => colors.white};
    `)}
  }
`

container.defaultProps = {
  body: false,
  bottom: false
}