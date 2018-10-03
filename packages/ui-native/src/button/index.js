import React from "react";
import PropTypes from "prop-types";
import Button, { ButtonText } from "./styles";

export default ({ children, ...props }) => (
  <Button {...props}>
    <ButtonText>{children}</ButtonText>
  </Button>
);
