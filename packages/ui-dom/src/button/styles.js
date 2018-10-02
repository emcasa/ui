import styled from "styled-components";
import COLORS from "@emcasa/ui/colors";
import MEASURES from "@emcasa/ui/measures";

const Button = styled.button`
  font-size: ${MEASURES.font.default};
  letter-spacing: ${MEASURES.defaultLetterSpacing};

  padding: 0 20px 0 20px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${props =>
    props.active && !props.disabled ? COLORS.pink : COLORS.lightGrey};
  background-color: ${props =>
    props.active && !props.disabled ? COLORS.pink : COLORS.white};

  color: ${props => {
    if (props.disabled) return COLORS.disabled;
    else if (props.active) return COLORS.white;
    else return COLORS.dark;
  }};

  height: ${props =>
    props.height
      ? MEASURES.buttonHeight[props.height]
      : MEASURES.buttonHeight.medium};

  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

export default Button;
