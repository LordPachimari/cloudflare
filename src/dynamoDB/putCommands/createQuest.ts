import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Quest } from "../../generated/graphql";
export const createQuest = async (
  questItem: Quest,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  // Set the parameters.

  const params: PutCommandInput = {
    TableName,

    Item: questItem,
  };

  const result = await client.send(new PutCommand(params));

  console.log("result", result);
  if (result) {
    return questItem;
  } else {
    return null;
  }
};
