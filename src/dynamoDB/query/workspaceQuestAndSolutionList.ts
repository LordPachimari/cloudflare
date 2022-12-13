import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Quest } from "../../generated/graphql";

export const workspaceQuestAndSolutionList = async (
  creatorId: string,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  // Set the parameters.

  const params: QueryCommandInput = {
    TableName,

    KeyConditionExpression: "#pk = :pk",

    ExpressionAttributeNames: { "#pk": "PK" },
    ExpressionAttributeValues: {
      ":pk": `USER#${creatorId}`,
    },
    ScanIndexForward: true,

    ProjectionExpression: "id, title, topic, subtopic",
  };
  const data = await client.send(new QueryCommand(params));
  if (data.Items?.length === 0) {
    return null;
  } else {
    const workspaceQuestAndSolutionList = data.Items as Quest[];
    workspaceQuestAndSolutionList.pop();
    return workspaceQuestAndSolutionList;
  }
};
