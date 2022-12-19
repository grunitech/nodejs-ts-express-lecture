# HTTP Targets

Move data from point A to point B.

The machine is from the schema:
* http/https
* domain
* port 

The data can be attached to:

1. Query String (query) `http://localhost:8080/path?a=1&b=2`
2. Form (body) `http://localhost:8080/path`
3. URL (params) `http://localhost:8080/path/v/3/12/tadam!`


## Ynet as example

// old fashion url
`https://www.ynet.co.il/news/article?id=12`;

// new url
`https://www.ynet.co.il/news/article,1,2`;
