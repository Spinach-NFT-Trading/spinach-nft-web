# Pokemon Sleep UI Core Development Guidelines

This document provides guidelines for developing and maintaining this `spinach-nft-web` project.

Note: This document is specifically formatted for JetBrains Junie AI assistant, so some formatting conventions may differ from typical documentation.

## Build/Configuration Instructions

None.

## Testing Information

- Create test suites if the task involves generating utility functions, data processing, or calculations without UI components
- Use `jest` for testing
- Create comprehensive tests to ensure functionality works correctly
- Test edge cases and various input scenarios
- Place tests in appropriate directories matching the structure of the code being tested

## Additional Development Information

### Version Control

- Prioritize working using `git worktree` for tasks.

### Code Style and Linting

- All code should conform to the ESLint rules defined in the project
- Run the ESLint fix command after making changes to ensure no linting errors:
  ```
  yarn lint:fix
  ```

### Component Usage

- Use existing styling and components whenever possible, including:
    - `<Flex/>` for CSS-flex layouts
        - The `<Flex/>` component defaults to `flex-col`. Therefore, if the design is not meant to be `flex-row`, then `flex-col` in `className` is NOT needed.
        - If the design is meant to be `flex-row`, add the property of `direction` being `row`.
    - `<FlexLink/>` for links using CSS-flex layouts
    - `<Grid/>` for grid-based layouts
    - Components in `src/components/input` for form-like inputs.

Most of the shared components can be found in `spinach-nft-ui/src/components`.

Common icons can be found in:
- `spinach-nft-ui/src/components/icons`: General usage.
- `spinach-nft-ui/src/components/shared/icon`: More specific usage.

### File Organization

For a component, if it can't be completed in 1 file, it usually would have a folder for just that component.
In this case, it would be similar to this structure:
- `main.tsx` represents the actual "main" component entry point
- `type.ts` (optional) storing any component-related typings
- `utils.ts` for processing the data if needed, which could contain multiple functions,
  but stick to the 200 lines soft-limit. For more complex processing or computationally intensive operations, consider creating either:
    - A `utils` folder with multiple files, each containing related utility functions, or
    - A `calc` folder for files containing calculation-specific logic
- `const.ts` for storing any constants. Usually styling or internationalization (i18n) text.
- `single` folder for storing any component implementations, if the component is intended to render elements of a data list.

Also, each file usually would contain at most 1 function / component, unless it's `utils.ts`.

### React Context Organization

When making a React context:

- Put all the context-related files in a folder called `context` at the level of where it's being used
- Follow this file structure within the context folder:
    - `type.ts`: Contains the type definition for the context content, typically named with a pattern like `*ContextContent`
    - `const.ts`: Contains the created context object
    - `main.tsx`: Contains the context provider wrapper component
    - `hook.ts`: Contains the custom hook that would call `useContext()`
- Do NOT create an `index.ts` file that exports everything from the context folder. Instead, import the specific components and hooks directly from their respective files.
- For provider components, use `React.PropsWithChildren<Props>` for typing, where `Props` should NOT include the `children` property. The `children` property is already handled by `React.PropsWithChildren`.
- For the hook, use `== null` for null check instead of `=== undefined`.
- For the initial value of the context, use `null` instead of `undefined`.

In this context usage hook, if the context is undefined, throw an error:
- Example:
  ```typescript
  export const useMyFeatureContext = () => {
    const context = useContext(MyFeatureContext);

    if (context == null) {
      throw new Error('`useMyFeatureContext()` must be used within a <MyFeatureProvider/>');
    }

    return context;
  };
  ```

This structure helps keep your context-related code organized and prevents bugs that happen when using contexts outside their providers.

### Component Structure and Exports

- Component props should be defined in the same file as the component
  (typically in `main.tsx`, unless the component is broken into smaller pieces)
- Props type definitions should be named as `Props` and should not be exported
- A single component file should contain only one function representing the component
- Never use `default export` anywhere in the codebase - always use named exports

### Best Practices

- Follow TypeScript best practices and ensure proper typing
- Keep components modular and reusable
- While not a hard-limit, file size usually won't go over 200 lines.
　If so, usually it can be broken into smaller components.
- Document complex logic with comments
- Maintain consistent naming conventions
- Ensure accessibility standards are met
- For all imports coming from React, use `import React from 'react';` then use `React.*` notation (e.g., `React.useState`, `React.useEffect`) instead of importing individual functions directly from the react package (e.g., avoid `import { useState, useEffect } from 'react';`)
- When working with objects, use object destructuring if the parent object is not directly used as a whole.
  For example, if an object `{a: 1, b: 2}` stored in variable `c` is accessed separately as `c.a` and `c.b`
  in multiple places, first destructure it with `const {a, b} = c;` and then use the individual variables
  `a` and `b` in subsequent code. This improves readability and reduces repetition.
- Always test for typing issues after completing tasks by running `yarn run tsc`. This is critical to ensure type safety throughout the codebase.
- If there's something you can't complete after multiple attempts (especially typing-related issues), leave a TODO comment around it explaining what should be done.
- Always run `yarn run lint:fix` after task completion to ensure the code satisfies the ESLint rules as much as possible. This command is available in the package.json scripts.
