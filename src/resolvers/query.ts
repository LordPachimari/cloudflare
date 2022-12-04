import { getQuest } from "../dynamoDB/getCommands/getQuest";
import { getUser } from "../dynamoDB/getCommands/getUser";
import { publishedQuests } from "../dynamoDB/query/publishedQuests";
import { WorkspaceQuests } from "../dynamoDB/query/workspaceQuests";
import { QueryResolvers, Quest, User } from "../generated/graphql";

// const user: User = {
//   id: "565fcb75-b88a-48f4-b119-fe246d9fb8fe",
//   username: "Ivan",
//   level: 0,
//   experience: 0,
//   balance: 0,
//   role: "User",
// };
const creatorId = "565fcb75-b88a-48f4-b119-fe246d9fb8fe";
const Queries: QueryResolvers = {
  //***** User query *****
  userById: async (_, args, context) => {
    try {
      const result = await getUser(args.id, context.client, context.TABLE_NAME);
      return result;
      // return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  //***** Quest query *****

  workspaceQuest: async (_, { questId }, context) => {
    try {
      // const creatorId = context.request.headers.get("Authorization");
      const quest = await getQuest(
        { creatorId, questId },
        context.client,
        context.TABLE_NAME
      );

      if (!quest) {
        return null;
      }
      if (quest?.creatorId !== creatorId) {
        return null;
      }
      console.log("quest", quest);

      return quest;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  workspaceQuests: async (_, { userId }, context) => {
    try {
      const quests = await WorkspaceQuests(
        // context.request.headers.get("Authorization"),
        creatorId,
        context.client,
        context.TABLE_NAME
      );

      if (!quests) {
        return null;
      }
      return quests;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  publishedQuests: async (_, args, context) => {
    try {
      const result = await publishedQuests(
        args.after!,
        context.client,
        context.TABLE_NAME
      );

      return {
        nodes: result.quests,
        pageInfo: {
          endCursor: result.endCursor,
          hasNextPage: result.hasNextPage,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        nodes: null,
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
      };
    }
  },

  publishedQuest: async (_, { id }, context) => {
    const publishedQuest = await getQuest(
      // { creatorId: context.request.headers.get("Authorization"), questId: id },

      { creatorId, questId: id },
      context.client,
      context.TABLE_NAME
    );
    if (!publishedQuest) {
      return null;
    }

    return publishedQuest;
  },
};

export default Queries;
