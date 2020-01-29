# Usage

Fist you have to add this to your dependencies

```ssh
yarn add @emcasa/login
```

or 

```ssh
npm install --save @emcasa/login
```

We basically have to main components one is called LoginPure and the other is LoginSaga. Independently of witch one of these you choose, there are two things that you should know:

1) The components expects that you pass two functions:

    1. `onSuccess = (jwt, user) => {}` -  This function it's like a callback that is invoked when the authentication is successful. The first param of this function is the JWT token returned by the API and the second is the user associated with that JWT token. Your application should decide what to do with this token
    2. `onError = (errors) => {}` - This function it's like a callback for when some error happens during some API call. You should use this to log your erros (Logger, Sentry and etc)

2) A global object called `EmCasaLogin` is injected at your `window`. This object holds two functions:
    1. `window.EmCasaLogin.open(phone)` - This function basically open the Login modal for you to input your phone number. You can optionally pass a phone number, so the modal opens with this passed phone number filled in the phone number of the modal.
    2. `window.EmCasaLogin.close()` - This function basically closes the modal and erase all the internal state.

Still about the item (2) if you want to invoke this functions (`open` or `close`) anywhere else in your code, you should place it in the rootest node of your application.

### Login Pure

The usage of this component is barely simple. In addition to the `onSuccess` and `onError` functions mentioned in the section before, you must also pass an graphql client in an attribute called `graphQLClient`.

- First you should import it:

```
import LoginPure from '@emcasa/login/lib/LoginPure'
```

- And then place it inside of a desired component as a self contained tag, like this:

```
function App() {
  return (
    <Fragment>
        <LoginPure 
            onSuccess={console.log} 
            onError={console.error} 
            graphQLClient={client}
        />
    <Fragment/>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### Login Saga

If your application uses redux-saga, you can use this version of login. Witch in addition to place the component somewhere else in your code, you also have to use the `fork` effect to run a saga that you should import. It will be explained next.

- First the import:

```
import LoginSaga from '@emcasa/login/lib/LoginSaga'
```

- And then place it inside of a desired component as a self contained tag, like this:

```
function App() {
  return (
    <Fragment>
        <LoginSaga
            onSuccess={console.log} 
            onError={console.error}
        />
    <Fragment/>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

- Last thing is import the saga and fork it:

```
import {all, fork} from 'redux-saga/effects'
import libAuthSaga from '@emcasa/login/lib/sagas/authSaga'

  function* root() {
    return yield all([
      //your other sagas here,
      fork(libAuthSaga)
    ])
  }

```

One important this is, is expected that you provide a client from graphql using the redux-saga context with the name: `apolloClient`
