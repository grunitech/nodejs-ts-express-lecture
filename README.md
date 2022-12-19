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



# Next

1. Endpoint (/about) -> return JSON with student who write this app details
2. Endpoint (/search/:term) -> Count the characters in the term and response it

`http://localhost:3000/search/sdlkghjsdkjfh+sjsdkjfsd+,ghsdjgfasd`

40
