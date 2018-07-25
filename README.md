# Developers guide.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Starting application](#starting-application)
- [Available Tasks](#available-tasks)
- [Template system](#template-system)
- [Project structure](#project-structure)
    - [Markup](#markup)
    - [Css](#css)
        - [Responsive design](#responsive)
    - [Js](#js)
    - [Fonts](#fonts)
    - [Data](#data)
- [Linting](#linting)

Follow these rules to start application

# Prerequisites

You should have installed:

### `Node.js`
Node.js is a cross-platform JavaScript run-time environment for executing JavaScript code server-side.
You can download it here https://nodejs.org/en/download/

### `Gulp`
Gulp is a streaming build system.
Installation guide can be found here https://gulpjs.com/

# Installation

Go to https://*** and clone repository to your local machine.
Then install all dependencies via:

```
$ npm install
```

# Starting application

### ```$ gulp```

This command runs the application.
Automatically opens browser on application main page.

# Available tasks

>Note: These commands are included in the default gulp task so there is no need to run it manually.

### `$ gulp build`

Builds entire application in `src/` folder and put it into `build/` folder.

### `$ gulp webserver`

Runs webserver on the localhost

### `$ gulp watch`

Starts watching for changes in `src/` folder and reload the page after any occurs.

### `$ gulp --env production`

Build project in production mode: with minified css, js and without sourcemaps.

# Template system

We use **Handlebars** web template system.

Checkout the official Handlebars docs site at http://www.handlebarsjs.com and the live demo at http://tryhandlebarsjs.com/.

# Project structure

## Markup

All markup pages are placed at `src/` folder.
Base html file `index.html` contains general layout slots,
such as `head`, `header`, `content`, `footer` and `scripts` that are located in the `src/partials/` folder
Common components placed at `src/components/` folder.

```
html-prototype/
  src/
    partials/
      header.hbs
      footer.hbs
    components/
      some-component.hbs
    index.html
```

## Css

We use [Sass (an extension of CSS)](https://sass-lang.com/) to develop css.

Below you can find our sass files structure:

```
html-prototype/
  src/
    scss/
      common/
        _common.scss
      components/
        _some-component.scss
        ...
      helpers/
        _mixins.scss
        _variables.scss
        ...
      libs/
      partials/
        _header.scss
        _footer.scss
      main.scss
```

The idea of this structure is next:
- `main.scss` contains imports of all the scss;
- `common/` folder contains general site styles;
- `components/` folder contains styles for every concrete component;
- `helpers/` folder contains different utilities such as variables and mixins that wouldn't be compiled into css directly;
- `libs/` folder contains vendors styles;
- `partials/` folder contains partial spesific styles.

**Note:**
- all components should be imported in the main.scss;

### Responsive

There are the main media breackpoint rules that can be used:
```sass
... to be added
```

## Js

... to be added

## Fonts

... to be added

## Data

Common data can be put into `src/data/data.json` file.

## Linting

To lint **scss** we use [Sass Lint](https://github.com/sasstools/sass-lint) withing [gulp-sass-lint](https://www.npmjs.com/package/gulp-sass-lint) plugin.
There is a gulp task `css:lint` that checks scss source code and show errors and warnings.
Rules configuration file `.sasslintrc` is located in the root directory and contain some rewrites of default sass lint rules.
