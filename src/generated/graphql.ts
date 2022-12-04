import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Comment = {
  __typename?: 'Comment';
  PK: Scalars['String'];
  SK: Scalars['String'];
  createdAt: Scalars['Date'];
  creatorId: Scalars['String'];
  id?: Maybe<Scalars['String']>;
};

export type LastEvaluatedKey = {
  creatorId: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuest?: Maybe<Quest>;
  createUser?: Maybe<Scalars['Boolean']>;
  publishQuest?: Maybe<Scalars['Boolean']>;
  test?: Maybe<Scalars['String']>;
  updateQuestAttributes?: Maybe<Scalars['Boolean']>;
  updateQuestDescription?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateQuestArgs = {
  creatorId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  userId: Scalars['String'];
};


export type MutationPublishQuestArgs = {
  id: Scalars['String'];
};


export type MutationUpdateQuestAttributesArgs = {
  attribute: Scalars['String'];
  number?: InputMaybe<Scalars['Int']>;
  questId: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateQuestDescriptionArgs = {
  description: Scalars['String'];
  questId: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Quest>;
  hasNextPage: Scalars['Boolean'];
};

export type PublishedQuests = {
  __typename?: 'PublishedQuests';
  nodes?: Maybe<Array<Maybe<Quest>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  publishedQuest?: Maybe<Quest>;
  publishedQuests?: Maybe<PublishedQuests>;
  userById?: Maybe<User>;
  userByUsername?: Maybe<User>;
  workspaceQuest?: Maybe<Quest>;
  workspaceQuests?: Maybe<Array<Maybe<Quest>>>;
};


export type QueryMeArgs = {
  id: Scalars['String'];
};


export type QueryPublishedQuestArgs = {
  id: Scalars['String'];
};


export type QueryPublishedQuestsArgs = {
  after?: InputMaybe<LastEvaluatedKey>;
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryWorkspaceQuestArgs = {
  questId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryWorkspaceQuestsArgs = {
  userId: Scalars['String'];
};

export type Quest = {
  __typename?: 'Quest';
  PK: Scalars['String'];
  SK: Scalars['String'];
  createdAt: Scalars['Date'];
  creatorId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  published?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['Date']>;
  reward?: Maybe<Scalars['Int']>;
  slots?: Maybe<Scalars['Int']>;
  subtopic?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  topic?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  questPublished?: Maybe<Quest>;
};


export type SubscriptionQuestPublishedArgs = {
  publisherId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  PK: Scalars['String'];
  SK: Scalars['String'];
  about?: Maybe<Scalars['String']>;
  balance: Scalars['Int'];
  createdAt: Scalars['Date'];
  email?: Maybe<Scalars['String']>;
  experience: Scalars['Int'];
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  level: Scalars['Int'];
  role: Scalars['String'];
  subtopics?: Maybe<Array<Maybe<Scalars['String']>>>;
  topics?: Maybe<Array<Maybe<Scalars['String']>>>;
  username?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LastEvaluatedKey: LastEvaluatedKey;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PublishedQuests: ResolverTypeWrapper<PublishedQuests>;
  Query: ResolverTypeWrapper<{}>;
  Quest: ResolverTypeWrapper<Quest>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LastEvaluatedKey: LastEvaluatedKey;
  Mutation: {};
  PageInfo: PageInfo;
  PublishedQuests: PublishedQuests;
  Query: {};
  Quest: Quest;
  String: Scalars['String'];
  Subscription: {};
  User: User;
};

export type CommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  PK?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  SK?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createQuest?: Resolver<Maybe<ResolversTypes['Quest']>, ParentType, ContextType, RequireFields<MutationCreateQuestArgs, 'creatorId' | 'id'>>;
  createUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userId'>>;
  publishQuest?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPublishQuestArgs, 'id'>>;
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updateQuestAttributes?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateQuestAttributesArgs, 'attribute' | 'questId'>>;
  updateQuestDescription?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateQuestDescriptionArgs, 'description' | 'questId'>>;
};

export type PageInfoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['Quest']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublishedQuestsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PublishedQuests'] = ResolversParentTypes['PublishedQuests']> = {
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Quest']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryMeArgs, 'id'>>;
  publishedQuest?: Resolver<Maybe<ResolversTypes['Quest']>, ParentType, ContextType, RequireFields<QueryPublishedQuestArgs, 'id'>>;
  publishedQuests?: Resolver<Maybe<ResolversTypes['PublishedQuests']>, ParentType, ContextType, Partial<QueryPublishedQuestsArgs>>;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>;
  userByUsername?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByUsernameArgs, 'username'>>;
  workspaceQuest?: Resolver<Maybe<ResolversTypes['Quest']>, ParentType, ContextType, RequireFields<QueryWorkspaceQuestArgs, 'questId' | 'userId'>>;
  workspaceQuests?: Resolver<Maybe<Array<Maybe<ResolversTypes['Quest']>>>, ParentType, ContextType, RequireFields<QueryWorkspaceQuestsArgs, 'userId'>>;
};

export type QuestResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Quest'] = ResolversParentTypes['Quest']> = {
  PK?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  SK?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  reward?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  slots?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subtopic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  questPublished?: SubscriptionResolver<Maybe<ResolversTypes['Quest']>, "questPublished", ParentType, ContextType, RequireFields<SubscriptionQuestPublishedArgs, 'publisherId'>>;
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  PK?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  SK?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experience?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtopics?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  topics?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PublishedQuests?: PublishedQuestsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Quest?: QuestResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

