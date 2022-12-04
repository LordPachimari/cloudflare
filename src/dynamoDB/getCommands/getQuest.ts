import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Quest } from "../../generated/graphql";
interface GetQuestProps {
  questId: string;
  creatorId: string;
}
export const getQuest = async (
  props: GetQuestProps,
  client: DynamoDBDocumentClient,
  TableName: string
) => {
  const { creatorId, questId } = props;
  // Set the parameters.
  const params: GetCommandInput = {
    TableName,

    Key: { PK: `USER#${creatorId}`, SK: `#QUEST${questId}` },
  };

  const result = await client.send(new GetCommand(params));
  if (result.Item) {
    // Return the retrieved item
    const quest = result.Item as Quest;
    return quest;
  } else {
    return null;
  }
};
