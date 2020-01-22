import gql from 'graphql-tag'

export const REQUEST_TOKEN_MUTATION = gql`
  mutation SignInCreateAuthenticationCode($phone: String!) {
    signInCreateAuthenticationCode(phone: $phone) {
      enqueued
      message
    }
  }
`

export const SUBMIT_TOKEN_MUTATION = gql`
  mutation signInVerifyAuthenticationCode($phone: String!, $code: String!) {
    signInVerifyAuthenticationCode(phone: $phone, code: $code) {
      jwt
    }
  }
`
