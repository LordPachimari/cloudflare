import {
  DynamoDBDocumentClient,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";

type UpdateUserAttribute = {
  userId: string;
  attribute: string;
  value: string | number;
};
export const updateUserAttributes = async (
  props: UpdateUserAttribute,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  // Set the parameters.
  const { userId, attribute, value } = props;

  const params: UpdateCommandInput = {
    TableName,
    Key: { id: userId },
    UpdateExpression: `set ${attribute} = :value`,
    ExpressionAttributeValues: { ":value": value },
    ReturnValues: "ALL_NEW",
  };

  await client.send(new UpdateCommand(params));
  return true;
};
