import { Update } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
  TransactWriteCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { UpdateItemType, UpdateQuestTransaction } from "../../utils/types";

export const updateQuestAttributes = async (
  transactions: UpdateQuestTransaction[],

  creatorId: string,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  const TransactItems: UpdateItemType[] = transactions.map((t) => {
    return {
      Update: {
        TableName,

        Key: { PK: `USER#${creatorId}`, SK: `#QUEST#${t.questId}` },
        UpdateExpression: `set ${t.attribute} = :value`,
        ExpressionAttributeValues: { ":value": t.text ? t.text : t.number },
      },
    };
  });
  const UpdateVersion: UpdateItemType = {
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
  };
  const params: TransactWriteCommandInput = {
    TransactItems: [...TransactItems, UpdateVersion],
  };

  const result = await client.send(new TransactWriteCommand(params));
  console.log();
  if (result) {
    return true;
  }
  return false;
};
