// O nome do arquivo na AWS é index.mjs , aqui foi mudado para Lambda-POST.mjs para facilitar a visualização.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from"@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


export const handler = async (event, context) => {
    const id = context.awsRequestId;
    const command = new PutCommand({
        TableName: "Feedback",
        Item: {
        id: context.awsRequestId,
        comentario: event.comentario,
        classificacao: event.classificacao,
        info: event.info
        },
    });
    const response = await docClient.send(command);
    return response;
};
