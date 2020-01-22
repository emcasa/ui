const EM_CASA_REQUEST_TOKEN = 'EM_CASA_REQUEST_TOKEN'
const EM_CASA_SUBMIT_TOKEN = 'EM_CASA_SUBMIT_TOKEN'

/**
 * Request to send an authentication token to the
 * given phone number
 * @param promiseDispatcher
 * @param phone
 * @returns {{phone: *, promiseDispatcher: *, type: string}}
 */
const requestToken = (promiseDispatcher, phone) => ({
  type: EM_CASA_REQUEST_TOKEN,
  promiseDispatcher,
  phone
})

/**
 * Submit and token to check if it's valid according with the backend
 * @param promiseDispatcher
 * @param phone
 * @param token
 * @param onSuccess
 * @param onError
 * @returns {{onError: *, phone: *, promiseDispatcher: *, type: string, token: *, onSuccess: *}}
 */
const submitToken = (promiseDispatcher, phone, token, onSuccess, onError) => ({
  type: EM_CASA_SUBMIT_TOKEN,
  promiseDispatcher,
  phone,
  token,
  onSuccess,
  onError
})

export const TYPES = {
  EM_CASA_SUBMIT_TOKEN,
  EM_CASA_REQUEST_TOKEN
}

export const CREATORS = {
  submitToken,
  requestToken
}
