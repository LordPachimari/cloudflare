import { filter, pipe } from "graphql-yoga";
import { Quest, SubscriptionResolvers } from "../generated/graphql";
const Subscriptions: SubscriptionResolvers = {
  questPublished: {
    subscribe: (_, args, context) =>
      pipe(
        context.pubSub.subscribe("questPublished"),
        filter((result: Quest) => result.creatorId === args.publisherId)
      ),

    resolve: (payload) => payload,
  },
};

export default Subscriptions;
