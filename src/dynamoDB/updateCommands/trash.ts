import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandInput,
  TransactWriteCommand,
  TransactWriteCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Quest } from "../../generated/graphql";
interface TrashProps {
  questId: string;
  creatorId: string;
}
export const trash = async (
  props: TrashProps,
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
          ConditionExpression: "#inTrash = :inTrash",
          ExpressionAttributeNames: { "#inTrash": "inTrash" },
          ExpressionAttributeValues: { ":inTrash": false },
        },
      },
      {
        Update: {
          Key: { PK: `USER#${creatorId}`, SK: `#QUEST${questId}` },
          TableName,
          UpdateExpression: "set #inTrash = :value",
          ExpressionAttributeNames: { "#inTrash": "inTrash" },
          ExpressionAttributeValues: { ":value": true },
        },
      },
      {
        Update: {
          TableName,
          Key: { PK: `USER#${creatorId}`, SK: "VERSION#LIST" },
          UpdateExpression: "SET #number = #number + :inc",
          ExpressionAttributeNames: {
            "#number": "number",
          },
          ExpressionAttributeValues: {
            ":inc": 1,
          },
        },
      },
    ],
  };

  const result = await client.send(new TransactWriteCommand(params));
  console.log("trash result", result);
  if (result) {
    return true;
  }

  return false;
};
