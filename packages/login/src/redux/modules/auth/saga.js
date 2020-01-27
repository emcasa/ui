import {all, takeLatest, getContext, call} from 'redux-saga/effects'
import {TYPES} from './actions'
import {
  REQUEST_TOKEN_MUTATION,
  SUBMIT_TOKEN_MUTATION
} from '@/graphql/mutations/auth'

export function* requestTokenSaga({promiseDispatcher, phone, onError}) {
  const client = yield getContext('apolloClient')
  try {
    const {
      data: {signInCreateAuthenticationCode: response}
    } = yield call([client, client.mutate], {
      mutation: REQUEST_TOKEN_MUTATION,
      variables: {phone: `+55${phone}`}
    })

    if (response.enqueued === 'SUCCESS') {
      yield call(promiseDispatcher.resolve)
    } else {
      yield call(promiseDispatcher.reject, {
        response,
        message: 'unexpected response returned'
      })
    }
  } catch (error) {
    if (onError) yield call(onError, error)
    yield call(promiseDispatcher.reject, error)
  }
}

export function* submitTokenSaga({
  promiseDispatcher,
  phone,
  token,
  onError,
  onSuccess
}) {
  const client = yield getContext('apolloClient')
  try {
    const {
      data: {signInVerifyAuthenticationCode: response}
    } = yield call([client, client.mutate], {
      mutation: SUBMIT_TOKEN_MUTATION,
      variables: {phone: `+55${phone}`, code: token}
    })

    yield call(onSuccess, response.jwt)
    yield call(promiseDispatcher.resolve, response.jwt)
  } catch (error) {
    if (onError) yield call(onError, error)
    yield call(promiseDispatcher.reject, error)
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(TYPES.EM_CASA_REQUEST_TOKEN, requestTokenSaga),
    takeLatest(TYPES.EM_CASA_SUBMIT_TOKEN, submitTokenSaga)
  ])
}
