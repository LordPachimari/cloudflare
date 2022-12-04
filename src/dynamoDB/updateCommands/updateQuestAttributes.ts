import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";

type UpdateQuestAttribute = {
  creatorId: string;
  questId: string;
  attribute: string;
  value: string | number;
};
export const updateQuestAttributes = async (
  props: UpdateQuestAttribute,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  // Set the parameters.
  const { questId, attribute, value, creatorId } = props;

  const params: UpdateCommandInput = {
    TableName,

    Key: { PK: `USER#${creatorId}`, SK: `#QUEST#${questId}` },
    UpdateExpression: `set ${attribute} = :value`,
    ExpressionAttributeValues: { ":value": value },
  };

  const result = await client.send(new UpdateCommand(params));
  if (result) {
    return true;
  }
  return false;
};
