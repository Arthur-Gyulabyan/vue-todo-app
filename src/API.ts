/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Todo = {
  __typename: "Todo",
  id: string,
  description: string,
  completed: boolean,
  createdAt: string,
};

export type CreateTodoMutationVariables = {
  description: string,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    description: string,
    completed: boolean,
    createdAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  id: string,
  completed: boolean,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    description: string,
    completed: boolean,
    createdAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  id: string,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    description: string,
    completed: boolean,
    createdAt: string,
  } | null,
};

export type GetTodosQueryVariables = {
};

export type GetTodosQuery = {
  getTodos?:  Array< {
    __typename: "Todo",
    id: string,
    description: string,
    completed: boolean,
    createdAt: string,
  } | null > | null,
};

export type OnTodoAddedSubscriptionVariables = {
};

export type OnTodoAddedSubscription = {
  onTodoAdded?:  {
    __typename: "Todo",
    id: string,
    description: string,
    completed: boolean,
    createdAt: string,
  } | null,
};

export type OnTodoUpdatedSubscriptionVariables = {
};

export type OnTodoUpdatedSubscription = {
  onTodoUpdated?:  {
    __typename: "Todo",
    id: string,
    description: string,
    completed: boolean,
    createdAt: string,
  } | null,
};

export type OnTodoDeletedSubscriptionVariables = {
};

export type OnTodoDeletedSubscription = {
  onTodoDeleted?:  {
    __typename: "Todo",
    id: string,
    description: string,
    completed: boolean,
    createdAt: string,
  } | null,
};
