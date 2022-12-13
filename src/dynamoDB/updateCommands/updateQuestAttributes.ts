import { Update } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
  TransactWriteCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
type UpdateQuestTransaction = {
  questId: string;
  attribute: string;
  text?: string;
  number?: number;
};
type UpdateItemType = {
  Update?: Omit<Update, "Key" | "ExpressionAttributeValues"> & {
    Key: Record<string, NativeAttributeValue> | undefined;
    ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
  };
};
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
  const params: TransactWriteCommandInput = {
    TransactItems,
  };

  const result = await client.send(new TransactWriteCommand(params));
  console.log();
  if (result) {
    return true;
  }
  return false;
};
