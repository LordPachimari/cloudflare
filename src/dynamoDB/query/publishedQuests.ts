import {
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { LastEvaluatedKey, Quest } from "../../generated/graphql";

interface publishedQuestsType {
  quests: Quest[] | null;
  hasNextPage: boolean;
  endCursor: Quest | null;
}
export const publishedQuests = async (
  ExclusiveStartKey: LastEvaluatedKey,
  client: DynamoDBDocumentClient,
  TableName: string
): Promise<publishedQuestsType> => {
  // Set the parameters.
  const params: ScanCommandInput = {
    TableName,
    ExclusiveStartKey: ExclusiveStartKey,
    Limit: 10,

    FilterExpression: "published = :published",

    ExpressionAttributeValues: { ":published": true },

    ProjectionExpression:
      "id, title, topic, subtopic, reward,description ,slots, creatorId,createdAt",
  };

  const data = await client.send(new ScanCommand(params));
  if (data.Items?.length === 0) {
    return { quests: null, endCursor: null, hasNextPage: false };
  }
  const quests = data.Items as Quest[];

  if (data.LastEvaluatedKey) {
    const LastEvaluatedKey = data.LastEvaluatedKey as Quest;
    return { quests, endCursor: LastEvaluatedKey, hasNextPage: true };
  } else {
    return { quests, endCursor: null, hasNextPage: false };
  }
};
