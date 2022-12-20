import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  TransactWriteCommand,
  TransactWriteCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Quest } from "../../generated/graphql";
import { PutItemType, UpdateItemType } from "../../utils/types";
export const createQuest = async (
  questItem: Quest,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  const { id, creatorId } = questItem;
  // Set the parameters.
  const TransactItems: (UpdateItemType | PutItemType)[] = [
    {
      Put: {
        TableName,

        Item: questItem,
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

  console.log("result", result);
  if (result) {
    return true;
  } else {
    return false;
  }
};
