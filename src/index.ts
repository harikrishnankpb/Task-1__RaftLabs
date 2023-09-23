require('dotenv').config()

import express, { Request, Response } from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import cors from 'cors'
import schema from './graphql/schemaMap'
import { connect } from './utilities/redis'

connect()  // To connect Redis
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Function to start Apollo Server
async function startApolloServer() {
    const server = new ApolloServer({
        schema,
        context: ({ req, res }: { req: Request, res: Response }) => ({ req, res })
    });
    await server.start();

    server.applyMiddleware({
        cors: {
            origin: ['https://studio.apollographql.com',
                'http://localhost:8080'],
            credentials: true
        }, app
    });

    app.listen(8080)
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);
    return { server, app };
}
//In here ,Connect to MongoDB and start Apollo Server when the connection is established
mongoose.connect(process.env.DB || '').then(startApolloServer)