import React from 'react'

const {Consumer, Provider} = React.createContext({})

export {Consumer, Provider}

export const withMapContext = (mapStateToProps) => (Target) => (props) => (
  <Consumer>
    {(ctx) => <Target {...props} {...mapStateToProps(ctx, props)} />}
  </Consumer>
)
