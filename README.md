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

### 1. Install lerna globally

If you haven't already:

`npm install lerna`

### 2. Bump the version

`lerna version [patch/minor/major] --force-publish`

Picking a version:
- **patch** — new props, visual fixes
- **minor** — non breaking changes, like changing existing props, changes to global default configs, new components
- **major** — breaking changes

### 3. Publish on npm:

Configure your npm token if you haven't done so already:

`echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc`

Check out into the new version's tag using `git checkout v[your-new-version]` and run `npm run release`.
