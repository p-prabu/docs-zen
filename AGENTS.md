# Agent Instructions

## Development
- Use TypeScript and avoid the `any` type.
- Keep React components functional and use named exports when practical.

## Testing
- Always run `npm test` and `npm run lint` before committing.
- For a quicker check on specific files, run `npx eslint <files>`.
- Treat lint warnings as errors.

## Documentation
- Blog posts live in `src/data` and should export both `title` and `body` fields.
- Prefer Markdown formatting within template strings for article content.

