# osm-regions

![Node](https://img.shields.io/node/v/osm-regions.svg?style=flat-square)
[![NPM](https://img.shields.io/npm/v/osm-regions.svg?style=flat-square)](https://www.npmjs.com/package/osm-regions)
[![Travis](https://img.shields.io/travis/nyurik/osm-regions/master.svg?style=flat-square)](https://travis-ci.org/nyurik/osm-regions)
[![David](https://img.shields.io/david/nyurik/osm-regions.svg?style=flat-square)](https://david-dm.org/nyurik/osm-regions)
[![Coverage Status](https://img.shields.io/coveralls/nyurik/osm-regions.svg?style=flat-square)](https://coveralls.io/github/nyurik/osm-regions)
[![NPM](https://img.shields.io/npm/dt/osm-regions.svg?style=flat-square)](https://www.npmjs.com/package/osm-regions)

> Library to extract regions data from OSM DB

### Usage

```js
import osmRegions from 'osm-regions';

```

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

	yarn add osm-regions (--dev)

or npm

	npm install osm-regions (--save-dev)


### configuration

You can pass in extra options as a configuration object (➕ required, ➖ optional, ✏️ default).

```js
import osmRegions from 'osm-regions';

```

➖ **property** ( type ) ` ✏️ default `
<br/> 📝 description
<br/> ❗️ warning
<br/> ℹ️ info
<br/> 💡 example

### methods

#### #name

```js
osmRegions

```

### Examples

See [`example`](example/script.js) folder or the [runkit](https://runkit.com/nyurik/osm-regions) example.

### Builds

If you don't use a package manager, you can [access `osm-regions` via unpkg (CDN)](https://unpkg.com/osm-regions/), download the source, or point your package manager to the url.

`osm-regions` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0
  -9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `osm-regions` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist/umd` folder](https://unpkg.com/osm-regions/dist/umd/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/osm-regions) on your page. The UMD builds make `osm-regions` available as a `window.osmRegions` global variable.

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
