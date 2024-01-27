import type {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Context,
} from "aws-lambda";
import startApp from "./server";
import serverlessExpress from "@codegenie/serverless-express";

export const handler: (
	event: APIGatewayProxyEvent,
	context: Context,
) => Promise<APIGatewayProxyResult> = async (event, context) => {
	const app = await startApp();
	const serverlessExpressInstance = serverlessExpress({
		app,
	});

	return serverlessExpressInstance(event, context, () => {});
};
