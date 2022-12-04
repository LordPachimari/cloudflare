import { MutationResolvers, Quest, User } from "../generated/graphql";

import { v4 as uuidv4 } from "uuid";
import { createQuest } from "../dynamoDB/putCommands/createQuest";
import { createUser } from "../dynamoDB/putCommands/createUser";
import { publishQuest } from "../dynamoDB/updateCommands/publishQuest";
import { updateQuestDescription } from "../dynamoDB/updateCommands/updateQuestDescription";
import { updateQuestAttributes } from "../dynamoDB/updateCommands/updateQuestAttributes";
const creatorId = "565fcb75-b88a-48f4-b119-fe246d9fb8fe";
const Mutations: MutationResolvers = {
  //**** User mutations *****
  createUser: async (_, { userId }, context) => {
    const userItem: User = {
      PK: `USER#${userId}`,
      SK: `#USER#${userId}`,
      id: userId,
      balance: 0,
      createdAt: new Date().toISOString(),
      experience: 0,
      role: "User",
      level: 0,
    };
    try {
      const result = await createUser(
        userItem,
        context.client,
        context.TABLE_NAME
      );
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  /******Quest Mutations****** */
  createQuest: async (_, { id, creatorId }, context) => {
    const questItem: Quest = {
      PK: `USER#${creatorId}`,
      SK: `#QUEST#${id}`,
      id,

      published: false,
      creatorId,
      createdAt: new Date().toISOString,
    };

    try {
      const result = await createQuest(
        questItem,
        context.client,
        context.TABLE_NAME
      );

      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  updateQuestAttributes: async (_, args, context) => {
    const { attribute, questId, number, text } = args;
    try {
      if (number) {
        const result = await updateQuestAttributes(
          {
            questId,
            attribute,
            value: number,
            creatorId,
            // creatorId: context.request.headers.get("Authorization"),
          },
          context.client,
          context.TABLE_NAME
        );
        if (result) {
          return true;
        }
        return false;
      } else if (text) {
        const result = await updateQuestAttributes(
          {
            questId,
            attribute,
            value: text,
            creatorId,
            // creatorId: context.request.headers.get("Authorization"),
          },
          context.client,
          context.TABLE_NAME
        );
        return result;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateQuestDescription: async (_, args, context) => {
    const { description, questId } = args;
    try {
      const result = await updateQuestDescription(
        {
          questId,
          description,

          creatorId,
          // creatorId: context.request.headers.get("Authorization"),
        },
        context.client,
        context.TABLE_NAME
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  publishQuest: async (_, { id }, context) => {
    try {
      const result = await publishQuest(
        {
          questId: id,
          creatorId,
          // creatorId: context.request.headers.getO("Authentication"),
        },
        context.client,
        context.TABLE_NAME
      );

      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  test: async (_, args, context) => {
    console.log("env", context);
    console.log("client", context.client);
    return "testing";
  },
};

export default Mutations;
