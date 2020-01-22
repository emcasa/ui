import styled from 'styled-components'
import themeGet from "@styled-system/theme-get";

export const Container = styled.div`
  ${Container}.spinner {
    animation: rotator 2s linear infinite;
  }
  @keyframes rotator {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }
  ${Container}.path {
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash 2s ease-in-out infinite, colors 8s ease-in-out infinite;
  }
  @keyframes colors {
    0% {
      stroke: ${themeGet('colors.pink')};
    }
    25% {
      stroke: ${themeGet('colors.smoke')};
    }
    50% {
      stroke: ${themeGet('colors.darkSmoke')};
    }
    75% {
      stroke: ${themeGet('colors.extraDarkSmoke')};
    }
    100% {
      stroke: ${themeGet('colors.pink')};
    }
  }
  @keyframes dash {
    0% {
      stroke-dashoffset: 187;
    }
    50% {
      stroke-dashoffset: 46;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 187;
      transform: rotate(450deg);
    }
  }
`
