import {
  DynamoDBDocumentClient,
  ScanCommandInput,
  DeleteCommand,
  DeleteCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Quest } from "../../generated/graphql";
interface DeletePermanentlyProps {
  questId: string;
  userId: string;
}
export const deletePermanently = async (
  props: DeletePermanentlyProps,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  const { userId, questId } = props;
  // Set the parameters.
  const params: DeleteCommandInput = {
    TableName,

    Key: { PK: `USER#${userId}`, SK: `#QUEST#${questId}` },
  };

  const result = await client.send(new DeleteCommand(params));

  console.log("delete result", result);

  if (result) {
    // Return the retrieved item
    return true;
  } else {
    return false;
  }
};
