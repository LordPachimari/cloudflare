import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Quest } from "../../generated/graphql";

export const WorkspaceQuests = async (
  creatorId: string,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  // Set the parameters.

  const params: QueryCommandInput = {
    TableName,

    KeyConditionExpression: "#pk = :pk AND #sk < :sk",

    ExpressionAttributeNames: { "#pk": "PK", "#sk": "SK" },
    ExpressionAttributeValues: {
      ":pk": `USER#${creatorId}`,
      ":sk": `USER#${creatorId}`,
    },
    ScanIndexForward: true,

    ProjectionExpression: "id, title, topic, subtopic",
  };
  const data = await client.send(new QueryCommand(params));
  if (data.Items?.length === 0) {
    return null;
  } else {
    const workspaceQuests = data.Items as Quest[];
    workspaceQuests.pop();
    console.log("workspaceQuests", workspaceQuests);

    return workspaceQuests;
  }
};
