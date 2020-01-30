import {all, takeLatest, getContext, call} from 'redux-saga/effects'
import {TYPES} from './actions'
import {
  REQUEST_TOKEN_MUTATION,
  SUBMIT_TOKEN_MUTATION
} from '@/graphql/mutations/auth'

function* callSequence(fns, ...args) {
  for (const fn of fns) {
    if (fn) yield call(fn, ...args)
  }
}

export const requestTokenSaga = function* _requestTokenSaga(
  options = {},
  {promiseDispatcher, phone, ...action}
) {
  const client = yield getContext('apolloClient')
  const onError = [options.onError, action.onError, promiseDispatcher.reject]
  const onSuccess = [
    options.onSuccess,
    action.onSuccess,
    promiseDispatcher.resolve
  ]
  try {
    const {
      data: {signInCreateAuthenticationCode: response}
    } = yield call([client, client.mutate], {
      mutation: REQUEST_TOKEN_MUTATION,
      variables: {phone: `+55${phone}`}
    })

    if (response.enqueued === 'SUCCESS') {
      yield* callSequence(onSuccess)
    } else {
      yield* callSequence(onError, {
        response,
        message: 'unexpected response returned'
      })
    }
  } catch (error) {
    yield* callSequence(onError, error)
  }
}

export const submitTokenSaga = function* _submitTokenSaga(
  options = {},
  {promiseDispatcher, phone, token, ...action}
) {
  const client = yield getContext('apolloClient')
  const onError = [options.onError, action.onError, promiseDispatcher.reject]
  const onSuccess = [
    options.onSuccess,
    action.onSuccess,
    promiseDispatcher.resolve
  ]
  try {
    const {
      data: {signInVerifyAuthenticationCode: response}
    } = yield call([client, client.mutate], {
      mutation: SUBMIT_TOKEN_MUTATION,
      variables: {phone: `+55${phone}`, code: token}
    })
    yield* callSequence(onSuccess, response.jwt, response.user)
  } catch (error) {
    yield* callSequence(onError, error)
  }
}

export default (options = {}) =>
  function* authSaga() {
    yield all([
      takeLatest(TYPES.EM_CASA_REQUEST_TOKEN, requestTokenSaga, options),
      takeLatest(TYPES.EM_CASA_SUBMIT_TOKEN, submitTokenSaga, options)
    ])
  }
