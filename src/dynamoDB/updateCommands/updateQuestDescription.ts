import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";

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
  const params: UpdateCommandInput = {
    TableName,

    Key: { PK: `USER#${creatorId}`, SK: `#QUEST#${questId}` },
    UpdateExpression: "set description = :value",
    ExpressionAttributeValues: { ":value": description },
  };

  const result = await client.send(new UpdateCommand(params));
  if (result) {
    return true;
  }
  return false;
};
