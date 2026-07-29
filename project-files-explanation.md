# Angular Project File Explanation

This document explains each file in the project and key Angular concepts.

## Root files

### `package.json`
- Defines project metadata, scripts, dependencies, and devDependencies.
- `dependencies` are runtime packages required by the app.
- `devDependencies` are tools used during development and testing only.
- Scripts:
  - `start` runs the development server
  - `build` creates a production bundle
  - `test` executes unit tests
  - `lint` checks code style

### `angular.json`
- Angular CLI workspace configuration.
- Defines the application project (`enterprise-product-catalog`).
- `architect.build` controls production and dev build settings.
- `architect.serve` configures the dev server.
- `architect.test` points to Karma and test TypeScript config.
- `architect.lint` configures ESLint rules.

### `tsconfig.json`
- Global TypeScript compiler settings.
- Enables strict type checking, modern `es2020` target, and Angular strict template checks.
- `angularCompilerOptions` turn on Angular-specific compile-time rules.

### `tsconfig.app.json`
- Inherits from `tsconfig.json` for app-specific compile options.
- Includes main application files like `main.ts` and `polyfills.ts`.

### `tsconfig.spec.json`
- Inherits from `tsconfig.json` for test compilation.
- Includes Jasmine testing files and setup.

### `.eslintrc.json`
- ESLint configuration for TypeScript and Angular templates.
- Enforces Angular selector conventions and template best practices.
- Helps catch issues early and maintain code quality.

### `karma.conf.js`
- Karma is the test runner for Angular unit tests.
- It uses Jasmine for assertions and browser-based test execution.
- Outputs coverage reports into `coverage/`.

## Source files

### `src/main.ts`
- App bootstrap file.
- Angular starts by calling `platformBrowserDynamic().bootstrapModule(AppModule)`.
- `enableProdMode()` is used to disable Angular development checks in production.

### `src/polyfills.ts`
- Polyfills are browser compatibility shims.
- It imports `zone.js`, which Angular needs for change detection.
- Polyfills let Angular run across older browsers.

### `src/index.html`
- Main HTML file loaded by the browser.
- Contains the root element `<app-root>`, where Angular renders the application.

### `src/styles.scss`
- Global application styles and Angular Material theme setup.
- Uses a prebuilt Angular Material theme (`indigo-pink.css`) and global CSS variables.

### `src/test.ts`
- Test environment setup for Karma.
- Loads `zone.js/testing` and bootstraps Angular testing modules.
- Automatically loads all `*.spec.ts` files.

## App files

### `src/app/app.module.ts`
- The root Angular module.
- `@NgModule` decorator configures imports, providers, and bootstrap.
- Standalone components like `AppComponent` are imported directly rather than declared.
- `imports` add features like `BrowserModule`, `HttpClientModule`, and Angular router support.
- `bootstrap` tells Angular which component to load first.

### `src/app/app.component.ts`
- Root component class.
- Standalone component that imports `MatToolbarModule`, `MatButtonModule`, `RouterModule`, and `TitleCasePipe`.
- Uses Angular Signals: `signal('...')` to hold reactive state.
- Provides a theme toggle button and renders the route outlet for lazy-loaded child modules.

### `src/app/app.component.html`
- Root component template.
- Contains `<mat-toolbar>` with the app title and theme toggle button.
- Renders lazy-loaded child views using `<router-outlet>`.

### `src/app/app.component.scss`
- Styles for the root component.
- Adds layout spacing and sticky toolbar styling.

### `src/app/models/product.model.ts`
- Defines the `Product` TypeScript interface.
- Ensures API data structures are typed consistently.

### `src/app/services/theme.service.ts`
- Angular service for managing the active theme.
- Uses Signals to store the active theme and computed classes.
- Applies a `material-theme` or `custom-theme` root class based on environment and runtime toggle.

### `src/app/services/product.service.ts`
- Angular service for fetching product data.
- `@Injectable({ providedIn: 'root' })` makes it available app-wide.
- Uses Signals for state: `products`, `loading`, and `error`.
- Uses `HttpClient` to request external JSON data.
- `loadProducts()` performs the API call and updates state.

### `src/app/components/product-list/product-list.component.ts`
- Standalone component that displays product cards.
- Implements `OnInit` lifecycle hook.
- Uses `ProductService` injected in the constructor.
- Adds search state with `searchTerm` and a computed `filteredProducts()` list.
- `trackById()` helps Angular render lists efficiently.
- `refreshProducts()` reloads the API data.

### `src/app/components/product-list/product-list.module.ts`
- Lazy-loaded feature module for the product list route.
- Declares route configuration to render `ProductListComponent` at the product path.

### `src/app/tabs/tabs.component.ts`
- Standalone component that renders Angular Material tabs.
- Uses router navigation to switch between product and registration child routes.
- Keeps selection state in a signal and updates it from router events.

### `src/app/tabs/tabs.module.ts`
- Lazy-loaded tabs module that defines child routes.
- Hosts `ProductListModule` and `RegistrationModule` as nested lazy-loaded routes.

### `src/app/components/product-list/product-list.component.html`
- Component view markup.
- Includes a search input to filter products by name.
- Displays loading state with `mat-progress-spinner`.
- Shows error UI when the fetch fails.
- Renders filtered product cards with `*ngFor`.
- Shows a “No products match your search.” message when there are no hits.

### `src/app/components/product-list/product-list.component.scss`
- Component-specific layout and style rules.
- Uses responsive grid for product cards.
- Keeps styling scoped to the component.

### `src/app/registration/registration.component.ts`
- Standalone registration form component with reactive form validation.
- Uses Angular Material form fields and buttons.
- Validates full name, email, password length, and password match.

### `src/app/registration/registration.component.html`
- Registration form template with Material input fields and validation messages.
- Displays errors only after submit to guide the user.

### `src/app/registration/registration.component.scss`
- Styles the registration card and form layout.
- Ensures responsive spacing for input fields and submit button.

### `src/app/registration/registration.module.ts`
- Lazy-loaded module for the registration route.
- Declares the route configuration to render `RegistrationComponent` at the registration path.

## Test files

### `src/app/services/product.service.spec.ts`
- Unit tests for `ProductService`.
- Uses `HttpClientTestingModule` to mock HTTP requests.
- Verifies success and error branches.
- Ensures Signals update as expected.

### `src/app/components/product-list/product-list.component.spec.ts`
- Unit tests for `ProductListComponent`.
- Ensures component creation and initial product loading.
- Mocks HTTP responses to verify the template renders correctly.

## Key Angular concepts explained

### Decorators
A decorator is a special TypeScript feature that adds metadata to a class or function.

- `@Component` marks a class as an Angular component and defines its selector, template, and styles.
- `@NgModule` defines an Angular module and organizes imports, declarations, and providers.
- `@Injectable` marks a class as a service that can be injected into other classes.

Decorators let Angular understand how to instantiate and wire up your classes.

### Angular Signals
Signals are a reactive state primitive in Angular.

- `signal(value)` creates a reactive value.
- Calling `signal()` reads the current value.
- `signal.set(newValue)` updates the value.
- Computed signals derive values automatically from other signals.

Signals simplify state management with less boilerplate than RxJS.

### Jasmine vs Karma
- `Jasmine` is a testing framework that provides syntax for writing tests (`describe`, `it`, `expect`).
- `Karma` is a test runner that executes tests in a browser-like environment.

In Angular projects, Jasmine defines the test assertions and Karma runs the tests in Chrome.

### Configuration files
- `angular.json`: configures Angular CLI behavior for build, serve, test, and lint.
- `tsconfig.json`: TypeScript compiler rules and strictness settings.
- `.eslintrc.json`: lint rules that enforce code quality.
- `karma.conf.js`: Karma runtime options and browser settings.

Each config file supports the developer workflow at a different stage: compile, test, lint, or serve.

### Webpack
- Webpack is the bundler used under the hood by `@angular-devkit/build-angular`.
- It compiles TypeScript, processes styles, and bundles JavaScript into optimized output.
- Angular CLI shields you from raw Webpack config; `angular.json` configures the build indirectly.

### Polyfills
- Polyfills add runtime support for older browser APIs.
- Angular uses `zone.js` to track async activity so change detection runs correctly.
- `src/polyfills.ts` is where browser compatibility code is imported.

## Running the project

- `npm start` — start the dev server
- `npm test` — run unit tests
- `npm run build` — create production bundle

## Understanding the project flow

1. Browser loads `index.html`.
2. `main.ts` bootstraps `AppModule`.
3. `AppComponent` is rendered inside `<app-root>`.
4. `ProductListComponent` fetches products from the public API.
5. The template renders the product cards, loading state, or error state.

This is the end-to-end flow for the sample Angular enterprise app.
