import { Update } from "@aws-sdk/client-dynamodb";

import { NativeAttributeValue } from "@aws-sdk/util-dynamodb";
export type UpdateQuestTransaction = {
  questId: string;
  attribute: string;
  text?: string;
  number?: number;
};
export type UpdateItemType = {
  Update?: Omit<Update, "Key" | "ExpressionAttributeValues"> & {
    Key: Record<string, NativeAttributeValue> | undefined;
    ExpressionAttributeValues?: Record<string, NativeAttributeValue>;
  };
};
