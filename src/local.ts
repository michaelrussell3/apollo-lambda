import startApp from "./server";
const httpServer = await startApp();
httpServer.listen({ port: 4000 });
console.log(`🚀 Server ready at http://localhost:4000`);
