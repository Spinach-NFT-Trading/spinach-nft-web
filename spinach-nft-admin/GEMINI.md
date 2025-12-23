# Admin Development Guidelines

## Coding Conventions

- **Named Typings**: Each option-like typing should have a named type. Don't define them inline.
- **Shared Functions**: Wrap frequently-used calls (like session retrieval) as cached functions and move them to a shared location.
- **Controller Placement**: If it's admin-only data operations, controllers should be in `src/controllers`.
- **Type Definitions**: All shared typings should be in the common repo (`spinach-nft-common`).
- **User Input Preservation**: Unless specified otherwise, assume the user has made some inputs and those should be kept.
- **ESLint Suppression**: Do not use `eslint-disable-*` unless strictly necessary. If used, prefer `eslint-disable-next-line` with a specific rule and a comment explaining why.
- **Inline Statements**: Avoid inline keyword statements like `return`, `continue`, or `break`. Always wrap them in braces.
    - Bad: `if (!selectedToken) return;`
    - Good: `if (!selectedToken) { return; }`
- **File Naming**: Directories should be nested if they represent the same category (e.g., `forms/create.tsx`). Do not use dashes in file names.
- **Path Aliases**: Always use path aliases (`@/`) instead of relative paths (`./` or `../`), even for files in the same directory.

## Coding Style Guide

### UI Components

-   **Shared Components**: Use shared UI components (e.g., `Button`) from `src/components/ui/button` instead of raw HTML elements or ad-hoc styling.
-   **Tailwind CSS**: Use utility classes for styling. Use `clsx` for conditional classes.
-   **Aesthetics**: Ensure buttons and interactive elements have proper cursor pointers and hover states.

### Server Actions & API

-   **Server Actions**: Prefer Server Actions over API routes for data mutations and simple fetching.
-   **Authentication**: All Server Actions and API routes must verify user authentication and permissions (e.g., `requireAdmin`).
-   **Public APIs**: Minimize public API routes. Only create them if absolutely necessary for external integration.
