import styled from "styled-components/native";
import COLORS from "@emcasa/theme/colors";
import MEASURES from "@emcasa/theme/measures";

export const ButtonText = styled.Text`
  font-size: ${MEASURES.font.default};
  color: ${props => {
    if (props.disabled) return COLORS.disabled;
    else if (props.active) return COLORS.white;
    else return COLORS.dark;
  }};
`;

export default styled.TouchableOpacity`
  padding: 0 20px 0 20px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${props =>
    props.active && !props.disabled ? COLORS.pink : COLORS.lightGrey};
  background-color: ${props =>
    props.active && !props.disabled ? COLORS.pink : COLORS.white};
  height: ${props =>
    props.height
      ? MEASURES.buttonHeight[props.height]
      : MEASURES.buttonHeight.medium};
`;
