add '.nvmrc' file to control the node version available from 16;
add '.npmrc' file to control the npm usage in this project, in which it matchs with code, thus, I only use 'yarn' to install the package in this project;

```
  "engines": {
    "node": ">=16.0.0",
    "yarn": ">=1.22.0",
    "npm": "please-use-yarn"
  }
```

`yarn add -D typescript`
`yarn add -D @types/node`

```
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

`yarn add -D ts-node nodemon`
`touch nodemon.json`

```
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

`yarn add -D rimraf`

`yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`

Note: This repository includes the postman collection for the finished API

Note 2: Make sure you add .env to your .gitignore before pushing any changes to your repository. You will also want to generate new public & private keys

Generate new keys: https://travistidwell.com/jsencrypt/demo/

Base64 encode the keys: https://www.base64encode.org/

Common issues

I'm getting a JWT malformed error: https://youtu.be/FzKrfwplips
Managing environment variables: https://youtu.be/gfyQzeBlLTI
Who is this tutorial for?

Junior to mid-level developers
Anyone interested in building REST APIs with TypeScript
What you will need

A running instance of MongoDB
Postman
An IDE or text editor (VS Code)
A web browser
A package manager such as NPM or Yarn
Node.js installed
What next?

Testing the API with Jest
Build a React.js user interface
Add Prometheus metrics to the API
Deploy the API with Caddy & Docker
Add Google OAuth
Concepts

REST API principals
CRUD
HTTP methods
JWT & refresh tokens
Request validation
Technologies

Node.js
MongoDB with Mongoose
TypeScript
Express.js & Express.js middleware
Zod validation

`yarn add express zod config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid`
`yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid ts-node-dev typescript -D`

` touch .eslintrc`

```
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

`touch .eslintignore`
`"lint": "eslint . --ext .ts"`
`yarn add -D prettier`
`touch .prettierrc`

```
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 80
}
```

`yarn add -D eslint-config-prettier eslint-plugin-prettier`

note in .husky/pre-commit

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint-staged
```

add code on package.json
```
"husky": {
    "hooks": {
      "pre-commit": "yarn prettier-format && yarn lint"
    }
  }
```

separate the app from app.ts to get the standalone app for testing
`yarn add supertest jest ts-jest @types/jest @types/supertest -D`
`yarn ts-jest config:init`
`yarn test --detectOpenHandles` to get the test results detail
`yarn test --watchAll` get the test result live


Google OAuth NodeJS process:
1. user clicks login link;
2. Consent screen (hosted by Google);
3. Callback;
4. Get id and access token with code;
5. Get Google user with tokens;
6. Upsert user;
7. Create session and tokens;
8. Set cookies;
9. Redirect back to client.


process detail:
1. click 'Google API Console' in page of 'https://developers.google.com/identity/protocols/oauth2'.
2. create the project
3. click oauth consent screen, and click external
4. fill in the fields
5. in scopes, click the first two scopes and then click next
6. for the test, fill in the email address for register and login
7. in credentials, click 'create credentials', then click 'OAuth client ID'
8. fill in the name and fill in 'Authorized redirect URIs' by 'http://localhost:1336/api/sessions/oauth/google'
9. get client id and client secret
10. paste them in config.default.ts

