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
  const attributes = transactions.map((t) => {
    return `${t.attribute} = :${t.attribute}`;
  });
  const UpdateExpression = `set ${attributes.join(
    ", "
  )}, version = version + :inc`;
  const ExpressionAttributeValues = { ":inc": 1 };
  transactions.forEach((t) => {
    ExpressionAttributeValues[`:${t.attribute}`] = t.text ? t.text : t.number;
  });
  const questId = transactions[0].questId;
  const TransactItems: UpdateItemType[] = [
    {
      Update: {
        TableName,

        Key: { PK: `USER#${creatorId}`, SK: `#QUEST#${questId}` },
        UpdateExpression,
        ExpressionAttributeValues,
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
  console.log("update quest attributes result", result);
  if (result) {
    return true;
  }
  return false;
};
