## Tooling Decisions

- Vite: Y'all didn't say you wanted nextjs, so I'm taking you literally when you say "SPA"
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) for state management and minimal wrapper for data fetching (2-3 API requests, RTK Query or Redux would be overkill)
- CSS Modules: Faster render than CSS-in-JS and I appreciate the simplicity
- Tailwind: For basic layout utilities and color scheme management
- react-tagcloud: To generate the word cloud
- clsx: very nice, very simple util for cleaning up classname concatenation, logic

## TODO

- [ ] Error boundaries for routes, with error page
- [ ] a11y testing

## The Assignment

### The goal

Our team is excited to see your programming style, skill, approach, and creativity applied to a single-page web app. The challenge:

- Using any publicly available API of your choosing (examples include Yelp, Flickr, New York Times, etc.) build a simple, single-page web app with at least two screens.
- One screen should show a list of items from that API while the second screen should show a detail view for those items.
- Use this as an opportunity to be creative and demonstrate your familiarity with frontend web technologies.
- Use of Typescript is required.
- Use React as the view layer.
- Feel free to use additional tools or frameworks as you see fit, but avoid relying on fully-styled UI kits like MaterialUI or Shadcn UI.
- Tests are required. They may take any form deemed appropriate for the app (such as Jest or Mocha tests) but should demonstrate a basic understanding of testing a single-page web app.
- Minimally, make sure the app functions smoothly on Chrome, Firefox and at least one mobile browser.
- Use of 3rd party libraries for common tasks (networking, etc.) is acceptable.
- Use of open source code included directly in the project should be limited and clearly attributed with a link to the original source.
- Code produced by generative AI is prohibited.
- The app must be placed in a public repo on a site like GitHub or Bitbucket.
- The app must be able to be pulled down from this repo and built without any additional configuration.
- For example, Livefront should not be responsible for getting its own API keys or access.
- If an API key and/or username/password is required you can send that to us separately (it does not need to be stored in the repository)

 ### Due date

 ASAP :)

 Kidding aside, we typically give candidates ~1 calendar week to complete the challenge, but if for any reason you need more time, tell us now and we're happy to accommodate. We are trying to move quickly on these roles so sooner is always preferred/better and the sooner we can schedule the interviews.

 ### Consideration

 One way we're able to assess engineering candidates on a level playing field is by giving every serious contender for a position on our team the exact same assignment with the exact same inputs to see how they approach their thinking and execution.  This helps us reduce bias in our selection and make the interview process fair for everyone.

 ### Hint

 We're a senior group of folks who see software as a craft. We'll be looking for well-structured code that follows best practices, is tested, doesn't have errors, is commented appropriately (e.g. comment your public interfaces), considers edge cases, and demonstrates your creativity and love of software.

