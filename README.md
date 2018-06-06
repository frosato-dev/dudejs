[![License][license-image]][license-url]
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![styled with prettier][prettier-image]][prettier-url]
[![js-standard-style][eslint-image]][eslint-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

[travis-image]: https://travis-ci.org/frosato-ekino/dudejs.svg?branch=develop
[travis-url]: https://travis-ci.org/frosato-ekino/dudejs
[coveralls-image]: https://coveralls.io/repos/github/frosato-ekino/dudejs/badge.svg
[coveralls-url]: https://coveralls.io/github/frosato-ekino/dudejs
[license-image]: https://img.shields.io/github/license/frosato-ekino/dudejs.svg?style=flat-square
[license-url]: https://github.com/frosato-ekino/dudejs/blob/develop/LICENSE.md
[prettier-image]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[eslint-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[eslint-url]: http://standardjs.com

[prettier-config-path]: /src/configs/prettierrc.js
[eslint-config-path]: /src/configs/eslintrc.js

<h1 align="center">
  <img src="https://user-images.githubusercontent.com/11709778/41068585-743ad790-69ea-11e8-8bdc-1907f4868cb4.png" alt="svgr" title="svgr" width="300">
</h1>

Tired of setup but you like to roll you project like a booling ball: formatting and linting your code while insuring consistent commit messages.
The dude to the rescue!

When your project is up and running and your git is init just install `dudejs` and you are ready to bowling.

Cheers,

"His dudeness, duder, or el dudorino"

## Install
Just run the setup command in your project folder:
```sh
$ npm i dudejs --save-dev
```
or
```sh
$ yarn add dudejs --dev
```

and... you are done !


## What it does ?

### Setup nice commands
DudeJS will add two nice commands to format and lint you code in your `package.json`.

```sh
$ npm run dude:format
$ npm run dude:lint
```
or
```sh
$ yarn dude:format
$ yarn dude:lint
```

### Add nice git hooks

Indeed, if your git is init by the time you install DudeJS it will setup git hooks for you:
* `pre-commit` that runs the lint and format commands on your stagged files
* `commit-msg` that checks your commit message are properlly formatted because "This is a league game"!


## Contributors

Thanks goes to these people :

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/31624379?v=4" width="100px;"/><br /><sub><b>François Rosato</b></sub>](https://github.com/frosato-ekino)<br />[💻](https://github.com/frosato-ekino/dudejs/commits?author=frosato-ekino "Code") [⚠️](https://github.com/frosato-ekino/dudejs/commits?author=frosato-ekino "Tests") [📖](https://github.com/frosato-ekino/dudejs/commits?author=frosato-ekino "Documentation") [🤔](#ideas-frosato-ekino "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/1179174?v=4" width="100px;"/><br /><sub><b>Guillaume AMAT</b></sub>](https://github.com/GuillaumeAmat)<br />[💻](https://github.com/frosato-ekino/dudejs/commits?author=GuillaumeAmat "Code") [📖](https://github.com/frosato-ekino/dudejs/commits?author=GuillaumeAmat "Documentation") [🤔](#ideas-GuillaumeAmat "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/6979207?v=4" width="100px;"/><br /><sub><b>Julien Viala</b></sub>](https://github.com/mr-wildcard)<br />[🤔](#ideas-mr-wildcard "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/11709778?v=4" width="100px;"/><br /><sub><b>François Barrailla</b></sub>](https://github.com/fbarrailla)<br />[💻](https://github.com/frosato-ekino/dudejs/commits?author=fbarrailla "Code") [⚠️](https://github.com/frosato-ekino/dudejs/commits?author=fbarrailla "Tests") [📖](https://github.com/frosato-ekino/dudejs/commits?author=fbarrailla "Documentation") [🤔](#ideas-fbarrailla "Ideas, Planning, & Feedback")|
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind are welcome!

## Credits

Dude.js logo by [zedouze](https://www.instagram.com/zedouze/)