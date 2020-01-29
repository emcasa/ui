/* globals describe, it, cExpect */
import {all, takeLatest, call, getContext} from 'redux-saga/effects'
import {TYPES} from '@/redux/modules/auth/actions'
import createAuthSaga, {
  requestTokenSaga,
  submitTokenSaga
} from '@/redux/modules/auth/saga'
import {
  REQUEST_TOKEN_MUTATION,
  SUBMIT_TOKEN_MUTATION
} from '@/graphql/mutations/auth'

const options = {
  onError: function onOptionError() {},
  onSuccess: function onOptionSuccess() {}
}

describe('authSaga', () => {
  it('should run all sagas defined in the body with bounded options', () => {
    const generator = createAuthSaga(options)()
    const allEffect = all([
      takeLatest(TYPES.EM_CASA_REQUEST_TOKEN, requestTokenSaga, options),
      takeLatest(TYPES.EM_CASA_SUBMIT_TOKEN, submitTokenSaga, options)
    ])
    expect(generator.next().value).toEqual(allEffect)
    expect(generator.next()).toEqual({value: undefined, done: true})
  })
})

describe('requestTokenSaga', () => {
  const apolloClient = {mutate: () => null}
  const phone = '5521999999999'
  const promiseDispatcher = {resolve: () => {}, reject: () => {}}
  const action = {
    phone,
    promiseDispatcher,
    onError: function onActionError() {},
    onSuccess: function onActionSuccess() {}
  }
  const onError = [options.onError, action.onError, promiseDispatcher.reject]
  const onSuccess = [
    options.onSuccess,
    action.onSuccess,
    promiseDispatcher.resolve
  ]

  it('should invoke success callbacks when the mutation return a success status', () => {
    const generator = requestTokenSaga(options, action)

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: REQUEST_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`}
      })
    )

    onSuccess.map((fn) =>
      cExpect(
        generator.next({
          data: {signInCreateAuthenticationCode: {enqueued: 'SUCCESS'}}
        }).value
      ).to.deep.equal(call(fn))
    )

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })

  it('should invoke error callbacks when the mutation return a failed status', () => {
    const generator = requestTokenSaga(options, action)

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: REQUEST_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`}
      })
    )

    onError.map((fn) =>
      cExpect(
        generator.next({
          data: {signInCreateAuthenticationCode: {enqueued: 'FAILED'}}
        }).value
      ).to.deep.equal(
        call(fn, {
          response: {enqueued: 'FAILED'},
          message: 'unexpected response returned'
        })
      )
    )

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })

  it('should invoke error callbacks when some exception occurs', () => {
    const generator = requestTokenSaga(options, action)

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: REQUEST_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`}
      })
    )

    for (
      let fns = [...onError], value = generator.throw('some error').value;
      fns.length;
      (fns = fns.slice(1)).length && (value = generator.next().value)
    ) {
      cExpect(value).to.deep.equal(call(fns[0], 'some error'))
    }

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })
})

describe('submitTokenSaga', () => {
  const apolloClient = {mutate: () => null}
  const phone = '44999999999'
  const token = '1234'
  const promiseDispatcher = {resolve: () => {}, reject: () => {}}
  const action = {
    promiseDispatcher,
    phone,
    token,
    onError: function onActionError() {},
    onSuccess: function onActionSuccess() {}
  }
  const onError = [options.onError, action.onError, promiseDispatcher.reject]
  const onSuccess = [
    options.onSuccess,
    action.onSuccess,
    promiseDispatcher.resolve
  ]

  it('should invoke success callbacks when the api return a jwt token', () => {
    const generator = submitTokenSaga(options, action)

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: SUBMIT_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`, code: token}
      })
    )

    onSuccess.forEach((fn) =>
      cExpect(
        generator.next({
          data: {
            signInVerifyAuthenticationCode: {
              jwt: 'abcd',
              user: {id: 123, name: 'Suzana Vieira'}
            }
          }
        }).value
      ).to.deep.equal(call(fn, 'abcd', {id: 123, name: 'Suzana Vieira'}))
    )

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })

  it('should invoke error callbacks when an exception happens', () => {
    const generator = submitTokenSaga(options, action)

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: SUBMIT_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`, code: token}
      })
    )

    for (
      let fns = [...onError], value = generator.throw('some error').value;
      fns.length;
      (fns = fns.slice(1)).length && (value = generator.next().value)
    ) {
      cExpect(value).to.deep.equal(call(fns[0], 'some error'))
    }

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })
})
