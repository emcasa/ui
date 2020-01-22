import styled from 'styled-components'
import View from '@emcasa/ui-dom/components/View'
import themeGet from '@styled-system/theme-get'

export const Background = styled(View)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: default;
  background-color: white;
  width: 280px;
  border-radius: 8px;
`
