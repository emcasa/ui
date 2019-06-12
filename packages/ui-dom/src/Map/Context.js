import React from 'react'
import hoistStatics from 'hoist-non-react-statics'

const {Consumer, Provider} = React.createContext({
  loaded: false,
  hasAggregators: false,
  markers: {},
  clusters: [],
  framedMarkers: [],
  clusteredMarkers: [],
  clusterOptions: {},
  mapOptions: {},
  isHighlight: () => false,
  setMarkerContainer: () => null,
  setMarker: () => null,
  unsetMarker: () => null
})

export {Consumer, Provider}

export const withMapContext = (mapStateToProps) => (Target) =>
  hoistStatics(
    React.forwardRef((props, ref) => (
      <Consumer>
        {(ctx) => (
          <Target ref={ref} {...props} {...mapStateToProps(ctx, props)} />
        )}
      </Consumer>
    )),
    Target
  )
