import React from 'react'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'

export const MarkerLabel = ({children}) => (
  <Row
    bg="white"
    width={60}
    height={30}
    justifyContent="center"
    alignItems="center"
    style={{
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#f50057',
      marginBottom: 5,
      transform: [{translateX: -30}]
    }}
  >
    <Text fontSize="small" color="pink">
      {children}
    </Text>
  </Row>
)
