import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { User } from "../../generated/graphql";
export const createUser = async (
  userItem: User,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  // Set the parameters.

  const params: PutCommandInput = {
    TableName,
    Item: userItem,
  };

  const result = await client.send(new PutCommand(params));
  if (result) {
    return true;
  } else {
    return false;
  }
};
