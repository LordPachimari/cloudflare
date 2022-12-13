import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Quest } from "../../generated/graphql";

type Version = {
  number: number;
};
export const getQuestAndSolutionListVersion = async (
  userId: string,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  // Set the parameters.
  const params: GetCommandInput = {
    TableName,

    Key: { PK: `USER#${userId}`, SK: `VERSION` },
  };

  const result = await client.send(new GetCommand(params));
  console.log("result", result.Item);

  if (result.Item) {
    // Return the retrieved item
    const versionObject = result.Item as Version;
    return versionObject.number;
  } else {
    return null;
  }
};
