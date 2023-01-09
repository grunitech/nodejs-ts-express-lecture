# NodeJS/TypeScript/Express

## Terms

* Web Server - any application listen and accept HTTP request and send back HTTP response.
* Route - part of the URL and the HTTP method that point to specific end-point function

## Tools

* `ts-node` a tool to run TypeScript in NodeJS.
* `ts-node-dev` a tool to watch and run typescript apps.
* `express` web framework

## Configuration

### tsconfig

* `baseUrl` compile all TypeScript files under this directory
* `esModuleInterop` make sure we can import CommonJS as ESM in TypeScript

## Content

### Entry Point

`index.ts` is our application entry point. Any async operation should be done at this point.

`app.ts` the express application (top level router).

`config` application configuration module.

`db` postgres connection module
