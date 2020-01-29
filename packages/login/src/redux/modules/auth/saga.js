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

export function* requestTokenSaga(
  {promiseDispatcher, phone, ...action},
  options = {}
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

export function* submitTokenSaga(
  {promiseDispatcher, phone, token, ...action},
  options = {}
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
    } = yield* call([client, client.mutate], {
      mutation: SUBMIT_TOKEN_MUTATION,
      variables: {phone: `+55${phone}`, code: token}
    })
    yield* callSequence(onSuccess, response.jwt, response.user)
  } catch (error) {
    yield* callSequence(onError, error)
  }
}

const withOptions = (options) => (saga) => (...args) => saga(...args, options)

export default (options = {}) => {
  const enhanceSaga = withOptions(options)
  return function* authSaga() {
    yield all([
      takeLatest(TYPES.EM_CASA_REQUEST_TOKEN, enhanceSaga(requestTokenSaga)),
      takeLatest(TYPES.EM_CASA_SUBMIT_TOKEN, enhanceSaga(submitTokenSaga))
    ])
  }
}
