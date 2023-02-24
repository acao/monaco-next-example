This is a working example of `monaco-editor` and `monaco-graphql` using `next.js` 13

It shows how to use the latest monaco-editor with next.js and a custom webworker, without using `@monaco/react` or `monaco-editor-react`'s approach of cdn (AMD) bundles. These approaches avoid using ESM `monaco-editor` or webworkers, which cause some issues.

This work was sponsored by [Grafbase](ttps://grafbase.com/)
