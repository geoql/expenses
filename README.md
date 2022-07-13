# [GeoQL] – Expenses 💰

<!-- Badges -->
[![Netlify](https://img.shields.io/netlify/369eaf30-6b2c-4f4a-9c6e-c78ce6d0693f?logo=netlify)](https://app.netlify.com/sites/map-my-expenses/deploys)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/geoql/expenses/ci?logo=github-actions)](https://github.com/geoql/expenses/actions/workflows/ci.yml)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/geoql/expenses/Ship%20js%20trigger?label=⛴%20Ship.js%20trigger)](https://github.com/geoql/expenses/actions/workflows/shipjs-trigger.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/geoql/expenses?sort=semver&logo=github)](https://github.com/geoql/expenses/releases)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/geoql/expenses)]((https://github.com/geoql/expenses/releases))
[![DeepScan grade](https://deepscan.io/api/teams/15032/projects/18650/branches/461082/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=15032&pid=18650&bid=461082)
[![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/geoql/expenses)](https://snyk.io/test/github/geoql/expenses)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/geoql/expenses.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/geoql/expenses/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/geoql/expenses.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/geoql/expenses/context:javascript)
[![GitHub contributors](https://img.shields.io/github/contributors/geoql/expenses)](https://github.com/geoql/expenses/graphs/contributors)

[![nuxt](https://img.shields.io/github/package-json/dependency-version/geoql/expenses/dev/nuxt?logo=nuxt.js)](https://v3.nuxtjs.org/)
[![maplibre](https://img.shields.io/github/package-json/dependency-version/geoql/expenses/mapbox-gl?logo=mapbox)](https://maplibre.org/maplibre-gl-js-docs/api/)
[![eslint](https://img.shields.io/github/package-json/dependency-version/geoql/expenses/dev/eslint?logo=eslint)](https://eslint.org/)
[![prettier](https://img.shields.io/github/package-json/dependency-version/geoql/expenses/dev/prettier?logo=prettier)](https://prettier.io/)
[![stylelint](https://img.shields.io/github/package-json/dependency-version/geoql/expenses/dev/stylelint?logo=stylelint)](https://stylelint.io/)
[![windicss](https://img.shields.io/github/package-json/dependency-version/geoql/expenses/dev/nuxt-windicss?logo=windicss)](https://windicss.org/integrations/nuxt.html)
[![typescript](https://img.shields.io/github/package-json/dependency-version/geoql/expenses/dev/typescript?logo=TypeScript)](https://www.typescriptlang.org/)

## About
Quickly add any expenses/incomes on map and keep track of it :)

## Stacktrace 
Development stack:
- [Nuxt](https://typescript.nuxtjs.org/)
- [Windi CSS](https://windicss.org/)

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
