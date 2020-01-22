/* globals describe, it, cExpect */
import {all, takeLatest, call, getContext} from 'redux-saga/effects'
import sinon from 'sinon'
import {TYPES} from '@/redux/modules/auth/actions'
import authSaga, {
  requestTokenSaga,
  submitTokenSaga
} from '@/redux/modules/auth/saga'
import {
  REQUEST_TOKEN_MUTATION,
  SUBMIT_TOKEN_MUTATION
} from '@/graphql/mutations/auth'

describe('authSaga', () => {
  it('should run all sagas defined in the body', () => {
    const generator = authSaga()
    const allEffect = all([
      takeLatest(TYPES.EM_CASA_REQUEST_TOKEN, requestTokenSaga),
      takeLatest(TYPES.EM_CASA_SUBMIT_TOKEN, submitTokenSaga)
    ])
    expect(generator.next().value).toEqual(allEffect)
    expect(generator.next()).toEqual({value: undefined, done: true})
  })
})

describe('requestTokenSaga', () => {
  const apolloClient = {mutate: () => null}
  const promiseDispatcher = {resolve: () => {}, reject: () => {}}

  it('should resolve promiseDispatcher when the mutation return a success status', () => {
    const phone = '5521999999999'
    const generator = requestTokenSaga({promiseDispatcher, phone})

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: REQUEST_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`}
      })
    )

    cExpect(
      generator.next({
        data: {signInCreateAuthenticationCode: {enqueued: 'SUCCESS'}}
      }).value
    ).to.deep.equal(call(promiseDispatcher.resolve))

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })

  it('should reject promiseDispatcher when the mutation return a failed status', () => {
    const phone = '5521999999999'
    const generator = requestTokenSaga({promiseDispatcher, phone})

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: REQUEST_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`}
      })
    )

    cExpect(
      generator.next({
        data: {signInCreateAuthenticationCode: {enqueued: 'FAILED'}}
      }).value
    ).to.deep.equal(call(promiseDispatcher.reject))

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })

  it('should reject promiseDispatcher when some exception occurs', () => {
    const phone = '5521999999999'
    const onError = jest.fn()
    const generator = requestTokenSaga({
      promiseDispatcher,
      phone,
      onError
    })

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: REQUEST_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`}
      })
    )

    cExpect(generator.throw('some error').value).to.deep.equal(
      call(onError, 'some error')
    )

    cExpect(generator.next().value).to.deep.equal(
      call(promiseDispatcher.reject, 'some error')
    )

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })
})

describe('submitTokenSaga', () => {
  const apolloClient = {mutate: () => null}
  const promiseDispatcher = {resolve: () => {}, reject: () => {}}
  const phone = '44999999999'
  const token = '1234'

  it('should invoke on success and resolve the promiseDispatcher when the api return a jwt token', () => {
    const onSuccess = jest.fn()
    const generator = submitTokenSaga({
      promiseDispatcher,
      phone,
      token,
      onSuccess
    })

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: SUBMIT_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`, code: token}
      })
    )

    cExpect(
      generator.next({
        data: {signInVerifyAuthenticationCode: {jwt: 'abcd'}}
      }).value
    ).to.deep.equal(call(onSuccess, 'abcd'))

    cExpect(generator.next().value).to.deep.equal(
      call(promiseDispatcher.resolve, 'abcd')
    )

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })

  it('should call onError function and reject promiseDispatcher when an exception happens', () => {
    const onError = jest.fn()
    const generator = submitTokenSaga({
      promiseDispatcher,
      phone,
      token,
      onError
    })

    cExpect(generator.next().value).to.deep.equal(getContext('apolloClient'))

    cExpect(generator.next(apolloClient).value).to.deep.equal(
      call([apolloClient, apolloClient.mutate], {
        mutation: SUBMIT_TOKEN_MUTATION,
        variables: {phone: `+55${phone}`, code: token}
      })
    )

    const error = 'some error happen'
    cExpect(generator.throw(error).value).to.deep.equal(call(onError, error))

    cExpect(generator.next().value).to.deep.equal(
      call(promiseDispatcher.reject, error)
    )

    cExpect(generator.next()).to.deep.equal({value: undefined, done: true})
  })
})
