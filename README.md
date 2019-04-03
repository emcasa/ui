# UI

EmCasa's UI library.

# Development

1. `yarn install`.
1. `yarn start`. Docz will run at `localhost:3000`.

# Deploy

This repository has two different deploy jobs:

- Docz
- npm

## Docz deploy

In order to deploy the documentation website, simply merge your branch to master. The result can be seen on https://ui.emcasa.com.

## Npm deploy

To deploy a new version of the library to npm run `lerna version`.
This bumps the version in each package and pushes it to the repository with a new tag.

After that a new version in npm will be published.
