# Van Life Word Cloud

A fun, largely meaningless app that pulls posts from subreddit VanLife. Word clouds are a very primitive kind of data visualization, which can give the user a sense of common topics (or, at the very least, verbs and proper nouns) in a body of text.

## Local Dev

Clone `main` branch and use npm to install depenencies and run the app.

```
npm install
npm run dev
```
The server output will tell you what port it's running on.

## Tooling Decisions

- [Vite](https://vite.dev/): Y'all didn't say you wanted nextjs, so I'm taking you literally when you say "SPA."
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) for state management and minimal wrapper for data fetching (2-3 API requests, RTK Query or Redux would be overkill)
- [CSS Modules](https://github.com/css-modules/css-modules): Faster render than CSS-in-JS and I appreciate the simplicity
- [Tailwind](https://tailwindcss.com/): For basic layout utilities and color scheme management
- [react-tagcloud](https://github.com/madox2/react-tagcloud): To generate the word cloud display element
- [clsx](https://github.com/lukeed/clsx): very nice, very simple util for cleaning up classname concatenation, logic

## TODO

- [ ] Error boundaries for routes, with error page
- [ ] a11y testing

