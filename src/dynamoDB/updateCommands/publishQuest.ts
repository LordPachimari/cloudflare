import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandInput,
  TransactWriteCommand,
  TransactWriteCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Quest } from "../../generated/graphql";
interface PublishQuestProps {
  questId: string;
  creatorId: string;
}
export const publishQuest = async (
  props: PublishQuestProps,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  const { questId, creatorId } = props;
  // Set the parameters.
  const params: TransactWriteCommandInput = {
    TransactItems: [
      {
        ConditionCheck: {
          Key: { PK: `USER#${creatorId}`, SK: `#QUEST#${questId}` },
          TableName,
          ConditionExpression: "#published = :published",
          ExpressionAttributeNames: { "#published": "published" },
          ExpressionAttributeValues: { ":published": false },
        },
      },
      {
        Update: {
          Key: { PK: `USER#${creatorId}`, SK: `#QUEST${questId}` },
          TableName,
          UpdateExpression: "set #published = :value",
          ExpressionAttributeNames: { "#published": "published" },
          ExpressionAttributeValues: { ":value": true },
        },
      },
    ],
  };

  const result = await client.send(new TransactWriteCommand(params));
  console.log("result", result);
  if (result) {
    return true;
  }

  return false;
};
