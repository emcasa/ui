import Col from '@emcasa/ui-dom/components/Col'
import colors from '@emcasa/ui/src/theme/colors'
import styled from 'styled-components'
import {themeGet} from '@styled-system/theme-get'

const Grid = styled.div`
  display: grid;
  grid-gap: ${themeGet('space.4')}px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
`
const Item = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 40px;
  overflow: hidden;
  text-align: center;
  border: 1px solid ${themeGet('colors.grey300')};
  border-radius: ${themeGet('borderRadius.default')}px;
`
const ItemColor = styled(Col)`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid ${themeGet('colors.grey300')};
`

const Text = styled.p`
  margin: 0;
  padding: ${themeGet('space.4')}px;
  font-size: ${themeGet('fontSizes.1')}px;
`

const Hexa = styled.span`
  font-size: ${themeGet('fontSizes.2')}px;
`

const Colors = () => {
  return (
    <Grid>
      {Object.keys(colors).map((color) => (
        <Item>
          <ItemColor backgroundColor={colors[color]} />
          <Text>
            <strong>{color}</strong>
            <br />
            <Hexa>{colors[color]}</Hexa>
          </Text>
        </Item>
      ))}
    </Grid>
  )
}

export default Colors
