import mapValues from 'lodash/mapValues'
import curry from 'lodash/curry'
import {connect} from 'react-redux'

export const asyncDispatch = curry((dispatch, actionFn) => (...args) =>
  new Promise((resolve, reject) =>
    dispatch(actionFn({resolve, reject}, ...args))
  )
)

/**
 * High order component to create redux action dispatchers that return promises.
 * This works by injecting `resolve` and `reject` callbacks into the first argument
 * of the action creator, which are left to be resolved by whichever async middleware
 * you happen to use.
 * Use just like `connect`'s `mapDispatchToProps`:
 * ```js
 * mapAsyncDispatchToProps({
 *   asyncAction: ({resolve, reject}) => ({type: 'ASYNC_ACTION', resolve, reject}})
 * })(MyComponent)
 * ```
 */
export function mapAsyncDispatchToProps(actions) {
  return connect(null, (dispatch, props) =>
    typeof actions === 'function'
      ? actions(asyncDispatch(dispatch), props)
      : mapValues(actions, asyncDispatch(dispatch))
  )
}
