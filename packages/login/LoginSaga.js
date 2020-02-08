import React from 'react'
import Login from '@/components/login/index'
import PropTypes from 'prop-types'
import {CREATORS} from '@/redux/modules/auth/actions'
import {mapAsyncDispatchToProps} from '@/redux/helpers/asyncDispatch'
const exposeLoginToGlobalContext = ({open, close}) => {
  if (process.browser) window.EmCasaLogin = {open, close}

  return <div />
}
const LoginSaga = (props) => (
  <Login {...props}>{exposeLoginToGlobalContext}</Login>
)

LoginSaga.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func
}

export default mapAsyncDispatchToProps({
  submitToken: CREATORS.submitToken,
  requestToken: CREATORS.requestToken
})(LoginSaga)
