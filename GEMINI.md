# Development Guidelines

This document provides guidelines for developing and maintaining this project.

Note: This document is specifically formatted for Gemini, so some formatting conventions may differ from typical documentation.

## General Guidelines

- When running commands:
    - Use as little `|` pipe operators as possible.
    - Be aware of the OS you are running, which is most likely Windows. If you encounter any issues, check the OS first.
    - Use `yarn` for package management instead of `npm`.
- Coding Standards:
    - **No Lazy Imports**: Never use lazy imports (e.g., `await import()`).
    - **No forEach**: Never use `forEach()`. Use `for...of` or other iteration methods instead.
    - **Indentation**: Always use 2 spaces for indentation. Never use 4 spaces.
