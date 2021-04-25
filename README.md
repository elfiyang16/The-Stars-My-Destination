### わが征くは星の大海

_ふたりは長椅子にならんですわり、透過壁ごしに星の大海をながめやった。いままで彼らが渡ってきた海であり、これから彼らが征こうとする海であった。星々はきらめき、波だち、沸騰するエネルギーの無音の潮騒を、ラインハルトの意識野に投げかけてくる。_

---田中芳樹

Playground GraphQL App using SpaceXAPI (https://github.com/SpaceXLand/api).

The purpose of this project is not to create a magnificent backend but more to cover all the important concepts in listed in Apollo Docs-Apollo Server(https://www.apollographql.com/docs/apollo-server/) . As what I found difficult during learning GraphQL is not in any specific topics e.g. Data Sources, Directives, but a mono project that covers all these topics.

Feel free to the check the frontend part of this project at (https://github.com/elfiyang16/stars-my-destiny-front)

##### List of Features

- [x] Schema & resolvers: basics (pagination)
- [x] Data source: RestAPI
- [x] Directives: date, uuid, number, string, limit
- [x] Custom scalar:limit
- [x] Data loader
- [x] Custom plugin: builtinReport, complexity, errorHandler. logger
- [x] API documentation: voyager
- [x] Middleware with Express
- [x] Other configs: cache with Redis, formatErrorResponse, etc.
- [x] Test: jest

##### Set up and Run

The project is developed on node (>=12 < 14) with TypeScript (3.9)using `apollo-server-express` but it can be rewritten with pure `apollo-server` package.
