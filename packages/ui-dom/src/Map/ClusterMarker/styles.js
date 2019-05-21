import styled from 'styled-components'
import {getColor} from '../Marker/styles'

export default styled.div`
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  margin-left: -10px;
  text-align: center;
  font-size: 14px;
  color: ${getColor('color', 'white')};
  border: 2px solid ${getColor('color', 'white')};
  border-radius: 100%;
  background-color: ${getColor('bg', 'pink')};
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);

  > span {
    box-sizing: border-box;
    padding: 2px 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${({highlight, ...props}) =>
    highlight
      ? {
          backgroundColor: getColor('bg', 'white', props),
          borderColor: getColor('color', 'pink', props),
          color: getColor('color', 'pink', props)
        }
      : {}};
  &:hover {
    cursor: pointer;
    color: ${getColor('color', 'pink')};
    background-color: ${getColor('bg', 'white')};
  }
`
