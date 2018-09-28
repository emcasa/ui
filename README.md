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

To deploy a new version of the library to npm:

1. Bump the version number in `package.json`.
1. Commit.
1. Tag your commit with the same version number.
1. `git push --tags`.
