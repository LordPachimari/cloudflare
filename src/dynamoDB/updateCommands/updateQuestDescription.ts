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
        UpdateExpression: "set description = :value",
        ExpressionAttributeValues: { ":value": description },
      },
    },
    {
      Update: {
        TableName,

        Key: { PK: `USER#${creatorId}`, SK: "VERSION" },
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
  if (result) {
    return true;
  }
  return false;
};
