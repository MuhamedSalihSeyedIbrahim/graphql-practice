#Part-10-File Upload

```
Graphql web GUI lib : 
    cmd : npm i --save altair-express-middleware
    server js:
         // Mount your altair GraphQL client
        const { altairExpress } = require ('altair-express-middleware');
        app.use('/altair', altairExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
        initialQuery: `{ getData { id name surname } }`,
        }));

    Description:
         altair GraphQL client ,
        A advance version of graphql UI provide plugin functionality like header , file upload etc.,

File Upload :
    Upload : { 
        createReadStream : bytes,
        filename : String ,
        mimetype : String
    }

    Upload : 
        a scalar graphql data type to upload files
        CMD:  npm i --save graphql-upload
        server js : 
             const { graphqlUploadExpress,GraphQLUpload: Upload, } = require("graphql-upload");
             app.use(
                    "/graphql",
                    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
                    graphqlHTTP({
                        schema: schema,
                        rootValue: root,
                        graphiql: true,
                    })
                    );

```