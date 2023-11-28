// O nome do arquivo na AWS é index.mjs , aqui foi mudado para Lambda-GET.mjs para facilitar a visualização.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, ScanCommand, DynamoDBDocumentClient } from"@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


export const handler = async (event, context) => {
    const id = context.awsRequestId;
    const command = new ScanCommand({
    TableName: "Feedback"
    
    });
const response = await docClient.send(command);
return response;

};