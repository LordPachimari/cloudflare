import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
  TransactWriteCommandInput,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { UpdateItemType } from "../../utils/types";

type UpdateQuestDescription = {
  creatorId: string;
  questId: string;
  description: string;
};
export const updateQuestDescription = async (
  props: UpdateQuestDescription,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  // Set the parameters.
  const { questId, description, creatorId } = props;

  const TransactItems: UpdateItemType[] = [
    {
      Update: {
        TableName,

        Key: { PK: `USER#${creatorId}`, SK: `#QUEST#${questId}` },
        UpdateExpression: "set description = :value, version = version + :inc",
        ExpressionAttributeValues: { ":value": description, ":inc": 1 },
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
  ];

  const params: TransactWriteCommandInput = {
    TransactItems,
  };

  const result = await client.send(new TransactWriteCommand(params));
  console.log("update quest description result", result);
  if (result) {
    return true;
  }
  return false;
};
