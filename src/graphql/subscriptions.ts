/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onTodoAdded = /* GraphQL */ `subscription OnTodoAdded {
  onTodoAdded {
    id
    description
    completed
    createdAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnTodoAddedSubscriptionVariables,
  APITypes.OnTodoAddedSubscription
>;
export const onTodoUpdated = /* GraphQL */ `subscription OnTodoUpdated {
  onTodoUpdated {
    id
    description
    completed
    createdAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnTodoUpdatedSubscriptionVariables,
  APITypes.OnTodoUpdatedSubscription
>;
export const onTodoDeleted = /* GraphQL */ `subscription OnTodoDeleted {
  onTodoDeleted {
    id
    description
    completed
    createdAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnTodoDeletedSubscriptionVariables,
  APITypes.OnTodoDeletedSubscription
>;
