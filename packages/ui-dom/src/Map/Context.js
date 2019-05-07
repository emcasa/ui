import React from 'react'
import hoistStatics from 'hoist-non-react-statics'

const {Consumer, Provider} = React.createContext({})

export {Consumer, Provider}

export const withMapContext = (mapStateToProps) => (Target) =>
  hoistStatics(
    (props) => (
      <Consumer>
        {(ctx) => <Target {...props} {...mapStateToProps(ctx, props)} />}
      </Consumer>
    ),
    Target
  )
