import { getQuest } from "../dynamoDB/getCommands/getQuest";
import { getQuestAndSolutionListVersion } from "../dynamoDB/getCommands/getQuestAndSolutionListVersion";
import { getUser } from "../dynamoDB/getCommands/getUser";
import { publishedQuests } from "../dynamoDB/query/publishedQuests";
import { workspaceQuestAndSolutionList } from "../dynamoDB/query/workspaceQuestAndSolutionList";
import { QueryResolvers, Quest, User } from "../generated/graphql";

// const user: User = {
//   id: "565fcb75-b88a-48f4-b119-fe246d9fb8fe",
//   username: "Ivan",
//   level: 0,
//   experience: 0,
//   balance: 0,
//   role: "User",
// };
const quest: Quest = {
  id: "46b01817-4754-423c-bcf1-da3e761542bd",
  title: "fuckoff",
  topic: "marketing",
  subtopic: "social media",
  reward: 0,
  slots: 0,
};
const quests = [quest];
const userId = "565fcb75-b88a-48f4-b119-fe246d9fb8fe";
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
      // const quest = await getQuest(
      //   { userId, questId },
      //   context.client,
      //   context.TABLE_NAME
      // );

      if (!quest) {
        return null;
      }

      console.log("quest", quest);

      return quest;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  workspaceQuestAndSolutionList: async (_, { userId }, context) => {
    try {
      // const quests = await workspaceQuestAndSolutionList(
      //   // context.request.headers.get("Authorization"),
      //   userId,
      //   context.client,
      //   context.TABLE_NAME
      // );

      if (!quests) {
        return null;
      }
      return quests;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  workspaceQuestAndSolutionListVersion: async (_, args, context) => {
    try {
      // const version = await getQuestAndSolutionListVersion(
      //   // context.request.headers.get("Authorization"),
      //   userId,
      //   context.client,
      //   context.TABLE_NAME
      // );
      const version = 1;

      if (!version) {
        return null;
      }
      return version;
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

      { userId, questId: id },
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
