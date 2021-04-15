# js_challenge_jagaad_ivan-ruran

## Usage

### 1. Download this repository
```
git clone 'repository-url'
```

### 2. Instal dependencies

Go to the downloaded repository folder and run:
```
npm install
```

### 3. Run the app

```
npm run dev
```

App will be opened in browser at `http://localhost:8080/`

### 4. Build app for production

```
npm run build
```

The output will be at `dist/` folder

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## The main project structure

* `src/assets` - folder with static assets
* `src/components` - folder with custom `.vue` components
* `src/views` - app `.vue` views
* `src/main.js` - main app file where you include/import all required libs and init app
* `src/router` - app routes
* `src/store` - app vuex store
* `src/services` - app api services
* `src/App.vue` - main app structure/component


### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
