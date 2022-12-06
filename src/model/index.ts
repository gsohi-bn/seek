//import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


const dynamoDBClient = () => {
    let dynamodb = new DynamoDBClient({});
    if (process.env.IS_OFFLINE) {
        dynamodb = new DynamoDBClient({
            region: "localhost",
            endpoint: "http://localhost:6100",
        });
    }
    return DynamoDBDocumentClient.from(dynamodb);
}

export default dynamoDBClient;
