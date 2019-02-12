import React from 'react'

const {Consumer, Provider} = React.createContext({})

export {Consumer, Provider}

export const withSliderContext = (mapStateToProps) => (Target) => (props) => (
  <Consumer>
    {(ctx) => <Target {...props} {...mapStateToProps(ctx)} />}
  </Consumer>
)
