import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { User } from "../../generated/graphql";

export const getUser = async (
  id: string,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  const params: GetCommandInput = {
    TableName,

    Key: { PK: `USER#${id}`, SK: `#USER#${id}` },
  };
  console.log("userId", id);
  console.log(`USER#${id}`);

  const result = await client.send(new GetCommand(params));
  console.log("user result", result);
  if (result.Item) {
    // Return the retrieved item
    const user = result.Item as User;
    return user;
  } else {
    return null;
  }
};
