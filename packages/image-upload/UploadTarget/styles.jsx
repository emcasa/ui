import React from 'react'
import styled from 'styled-components'
import Text from '@emcasa/ui-dom/components/Text'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Card from '../Card'

// We should create a Spinner component. It's the same Spinner from packages/places-autocomplete/GoogleMapsAutoComplete/Spinner.jsx

const LoaderDotsSVG = () => (
  <svg preserveAspectRatio="xMidYMid" height={18} viewBox="6 40 88 20">
    <circle cx="84" cy="50" r="10" fill="#c0c2cc">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="0.625s"
        calcMode="spline"
        keyTimes="0;1"
        values="5;0"
        keySplines="0 0.5 0.5 1"
        begin="0s"
      ></animate>
      <animate
        attributeName="fill"
        repeatCount="indefinite"
        dur="2.5s"
        calcMode="discrete"
        keyTimes="0;0.25;0.5;0.75;1"
        values="#c0c2cc;#c0c2cc;#c0c2cc;#c0c2cc;#c0c2cc"
        begin="0s"
      ></animate>
    </circle>
    <circle cx="16" cy="50" r="10" fill="#c0c2cc">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="2.5s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;5;5;5"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      ></animate>
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="2.5s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      ></animate>
    </circle>
    <circle cx="50" cy="50" r="10" fill="#c0c2cc">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="2.5s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;5;5;5"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.625s"
      ></animate>
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="2.5s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.625s"
      ></animate>
    </circle>
    <circle cx="84" cy="50" r="10" fill="#c0c2cc">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="2.5s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;5;5;5"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.25s"
      ></animate>
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="2.5s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.25s"
      ></animate>
    </circle>
    <circle cx="16" cy="50" r="10" fill="#c0c2cc">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="2.5s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;5;5;5"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.875s"
      ></animate>
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="2.5s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.875s"
      ></animate>
    </circle>
  </svg>
)

export const UploadCard = styled(Card)`
  ${({isActive}) =>
    isActive && {
      transform: 'scale(1.05)'
    }};
  outline: none;
  background: white;
  * {
    cursor: pointer;
  }
  ${Text} {
    margin: 0 4px;
  }
  @media ${breakpoint.down('tablet')} {
    ${Text} {
      display: none;
    }
  }
`

export const Spinner = styled(({className, style}) => (
  <div className={className} style={style}>
    <LoaderDotsSVG />
  </div>
))`
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
  }
`
