import type {
	APIGatewayEvent,
	APIGatewayEventRequestContext,
	Context,
} from "aws-lambda";
import startApp from "./server";
import serverlessExpress from "@codegenie/serverless-express";

export const handler: (
	event: APIGatewayEvent,
	context: Context,
) => void = async (event, context) => {
	const app = await startApp();
	const serverlessExpressInstance = serverlessExpress({
		app,
	});

	return serverlessExpressInstance(event, context, () => {});
};
