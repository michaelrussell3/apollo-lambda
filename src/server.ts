import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
	Query: {
		hello: () => "world",
	},
};

const app = express();

// allow cors on any endpoint
app.use(cors());

app.get("/", (req, res) => {
	res.send("Available endpoints: /hello-world, /graphql");
});

app.get("/hello-world", (req, res) => {
	res.send("hello world (from express route)");
});

const httpServer = http.createServer(app);

async function startApp() {
	// Set up Apollo Server
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	await server.start();

	// Specify the path where we'd like to mount our server
	app.use("/graphql", express.json(), expressMiddleware(server));
	return app;
}

export default startApp;
