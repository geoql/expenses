# Expenses 💰 :: GeoQL 

[![Netlify Status](https://api.netlify.com/api/v1/badges/369eaf30-6b2c-4f4a-9c6e-c78ce6d0693f/deploy-status)](https://app.netlify.com/sites/map-my-expenses/deploys)

## About
Quickly add any expenses/incomes on map and keep track of it :)

## Stacktrace 
Development stack:
- [Nuxt](https://typescript.nuxtjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [v-mapbox](https://github.com/geospoc/v-mapbox)

CI/CD stack:
- [GitHub actions](./.github/workflows/ci.yml)

Release stack:
- [Ship.js](https://github.com/algolia/shipjs)

Deployment stack:
- [Netlify](./netlify.toml)

## Environment Setup
### Development 
```sh
$ git clone git@github.com:geoql/expenses.git
$ cd expenses
$ npm install
$ npm run dev
```

### Production 
Pre-release steps:
```sh
$ git clone git@github.com:geoql/expenses.git
$ cd expenses
$ npm install
$ npm run release # this will generate a new PR & bump up the pkg version
```

## Contributing 
_Note_: Commits & PRs should now be allowed only if they follow a particular commit format, read more about it [here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/geoql/expenses/compare)
