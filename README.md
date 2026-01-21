# Currency converted with Waku (currency-converter-waku)

Simple currency converted made with React/Waku, just for fun ;)

## Requirements

- Node.js with npm
- .env file

## Quick start for development

1. Copy content of `.env.template` file into `.env`.
2. Install deps by running `npm install` command.
3. Run dev environment with `npm run dev` command.

## Technical decisions log

1. Server can be useful for privacy, e.g. API key won't be exposed to client. I selected Waku, but was also considering Next & Hono.

2. I can opt for either client-side or server-side solution. I decided to use React Server Components approach so React can shine with its full possibilities (and also to try something new along the way! ;)).

3. Since I'm using RSC, app should allow the user to submit the form WITH or WITHOUT JavaScript using RSC (this can be done by pressing `Enter` key inside currency input). This of course comes with some trade-offs, but I took a risk ;)

4. I'm keeping the external libraries usage to bare minimum - also regarding the CSS. Therefore, I decided to rely on currently-available CSS4 functionalities.

5. I see no reason to introduce any kind of form libraries as well, mostly because I'm able to limit invalid input possibilities through masking. Every invalid attempt will result in error. Errors are handled globally.

6. All the API communication sits in `lib` directory. It's used server-side in Waku index page, but also in React Server Action (`actions` directory).

7. Not everything was possible to be done in relatively short time, but this could be a foundation for further investigation of the stack.

## Copyrights

- Used icons from https://iconmonstr.com
