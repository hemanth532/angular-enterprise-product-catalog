# Component and Update Guidelines for this Project

Use this document whenever you add a new component or update existing code in the Angular enterprise product catalog.

## General Project Principles

- Keep the app structure small and modular.
- Prefer standalone components when adding UI pieces.
- Use Angular Signals for reactive state when data needs to update automatically.
- Keep service logic separate from component rendering logic.
- Maintain strong typing with TypeScript interfaces and avoid `any`.
- Ensure tests cover both success and error behavior for business logic.

## New Component Guidelines

1. Create a dedicated folder under `src/app/components/`.
2. Name component files using kebab-case and include the component type in the file name.
   - Example: `product-list.component.ts`, `product-list.component.html`, `product-list.component.scss`, `product-list.component.spec.ts`
3. Use a standalone component when possible:
   - `standalone: true`
   - `imports: [CommonModule, MatCardModule, MatButtonModule]` as needed
4. Keep the component focused on rendering and UI state.
5. Inject services through the constructor and keep data fetching inside a service.
6. Add a `trackBy` function for `*ngFor` lists to help Angular render efficiently.
7. Use template-driven markup with Angular Material elements consistent with existing styles.
8. Add scoped CSS in the component SCSS file and avoid global style changes unless necessary.

## Updating an Existing Component

- Update the component class and template together when adding UI behavior.
- Keep data transformations in the component class or in a separate service, not in the template.
- If you add new state, prefer `signal()` and `computed()` forms.
- For list filtering, add a typed search term and compute filtered results with a getter or computed signal.
- Preserve existing UX patterns, such as loading spinners and error states.
- When changing layout, keep the responsive grid and Material theming consistent.

## Service and API Changes

- Add or update services in `src/app/services/`.
- Services should be decorated with `@Injectable({ providedIn: 'root' })`.
- Keep HTTP calls in services and manage loading/error state there.
- Use `HttpClient` for external API requests.
- Update the service spec file to cover the new API behavior.

## Testing Guidelines

- Add or update `.spec.ts` tests for all changed components and services.
- Use Angular testing modules and `HttpClientTestingModule` for service tests.
- Verify component creation and expected DOM output.
- Test success and error conditions for data loading.
- Use Jest-like `describe` / `it` / `expect` patterns already used by Angular Jasmine tests.

## Naming and Conventions

- Component selectors should follow Angular conventions, e.g. `app-product-list`.
- File and folder names should be lowercase with hyphens.
- Keep import paths relative and clear.
- Prefer explicit imports over barrel files for smaller modules.

## Build and Validation

- Run `npm install --legacy-peer-deps` if dependencies need refresh.
- Use `npm start` to validate the app while developing UI changes.
- Run `npm test` to verify unit tests after updates.
- Keep `tsconfig` strict checks and ESLint rules passing.

## Summary

This project is a sample enterprise Angular application. When you create or update components, keep the architecture clean, separate concerns between UI and service logic, and maintain strong typing with tests. `clasude.md` should be referenced whenever new work is added so updates remain consistent with this project.
