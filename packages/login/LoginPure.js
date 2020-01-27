import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Login from '@/components/login'
import {
  REQUEST_TOKEN_MUTATION,
  SUBMIT_TOKEN_MUTATION
} from '@/graphql/mutations/auth'

class LoginPure extends Component {
  requestToken = (phone, onError) => {
    const {graphQLClient} = this.props
    return graphQLClient
      .mutate({
        mutation: REQUEST_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`}
      })
      .then(({data: {signInCreateAuthenticationCode: response}}) =>
        response.enqueued === 'SUCCESS'
          ? Promise.resolve()
          : Promise.reject({response, message: 'unexpected response returned'})
      )
      .catch((error) => {
        onError(error)
        return Promise.reject(error)
      })
  }

  submitToken = (phone, token, onSuccess, onError) => {
    const {graphQLClient} = this.props
    return graphQLClient
      .mutate({
        mutation: SUBMIT_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`, code: token}
      })
      .then(
        ({
          data: {
            signInVerifyAuthenticationCode: {jwt}
          }
        }) => {
          onSuccess(jwt)
          return Promise.resolve(jwt)
        }
      )
      .catch((error) => {
        onError(error)
        return Promise.reject(error)
      })
  }

  static exposeLoginToGlobalContext = ({open, close}) => {
    if (process.browser) window.EmCasaLogin = {open, close}

    return <div />
  }

  render() {
    const {onError, onSuccess} = this.props
    return (
      <Login
        onError={onError}
        onSuccess={onSuccess}
        requestToken={this.requestToken}
        submitToken={this.submitToken}
      >
        {LoginPure.exposeLoginToGlobalContext}
      </Login>
    )
  }
}

LoginPure.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  graphQLClient: PropTypes.object.isRequired
}

export default LoginPure
