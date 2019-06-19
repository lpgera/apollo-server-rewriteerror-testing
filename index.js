const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")
const { AuthenticationError } = require("apollo-server-errors")

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => {
      throw new AuthenticationError('Authentication error!')
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: '<YOUR_API_KEY_HERE>',
    rewriteError: err => {
      console.log({
        err,
        isAuthenticationError: err instanceof AuthenticationError,
      })
      return err
    },
  },
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
