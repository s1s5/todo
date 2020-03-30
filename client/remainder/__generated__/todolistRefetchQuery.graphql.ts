/* tslint:disable */
/* eslint-disable */
/* @relayHash be94301096b3c2070cec97205ebcadeb */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistRefetchQueryVariables = {
    first?: number | null;
    last?: number | null;
    before?: string | null;
    after?: string | null;
    todolist_id: string;
};
export type todolistRefetchQueryResponse = {
    readonly todolist: {
        readonly " $fragmentRefs": FragmentRefs<"todolistRefetch_data">;
    } | null;
};
export type todolistRefetchQuery = {
    readonly response: todolistRefetchQueryResponse;
    readonly variables: todolistRefetchQueryVariables;
};



/*
query todolistRefetchQuery(
  $first: Int
  $last: Int
  $before: String
  $after: String
  $todolist_id: ID!
) {
  todolist(id: $todolist_id) {
    ...todolistRefetch_data_pbnwq
    id
  }
}

fragment todo_data on TodoNode {
  id
  completed
  text
}

fragment todolistRefetch_data_pbnwq on TodoListNode {
  id
  title
  todoSet(first: $first, last: $last, before: $before, after: $after, orderBy: "-created_at") {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        ...todo_data
        __typename
      }
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "first",
            "type": "Int",
            "defaultValue": null
        } as any),
        ({
            "kind": "LocalArgument",
            "name": "last",
            "type": "Int",
            "defaultValue": null
        } as any),
        ({
            "kind": "LocalArgument",
            "name": "before",
            "type": "String",
            "defaultValue": null
        } as any),
        ({
            "kind": "LocalArgument",
            "name": "after",
            "type": "String",
            "defaultValue": null
        } as any),
        ({
            "kind": "LocalArgument",
            "name": "todolist_id",
            "type": "ID!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "id",
            "variableName": "todolist_id"
        } as any)
    ], v2 = ({
        "kind": "Variable",
        "name": "after",
        "variableName": "after"
    } as any), v3 = ({
        "kind": "Variable",
        "name": "before",
        "variableName": "before"
    } as any), v4 = ({
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
    } as any), v5 = ({
        "kind": "Variable",
        "name": "last",
        "variableName": "last"
    } as any), v6 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any), v7 = [
        (v2 /*: any*/),
        (v3 /*: any*/),
        (v4 /*: any*/),
        (v5 /*: any*/),
        ({
            "kind": "Literal",
            "name": "orderBy",
            "value": "-created_at"
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolistRefetchQuery",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todolist",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "TodoListNode",
                    "plural": false,
                    "selections": [
                        {
                            "kind": "FragmentSpread",
                            "name": "todolistRefetch_data",
                            "args": [
                                (v2 /*: any*/),
                                (v3 /*: any*/),
                                (v4 /*: any*/),
                                (v5 /*: any*/)
                            ]
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistRefetchQuery",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todolist",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "TodoListNode",
                    "plural": false,
                    "selections": [
                        (v6 /*: any*/),
                        {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "title",
                            "args": null,
                            "storageKey": null
                        },
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "todoSet",
                            "storageKey": null,
                            "args": (v7 /*: any*/),
                            "concreteType": "TodoNodeConnection",
                            "plural": false,
                            "selections": [
                                {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "pageInfo",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "PageInfo",
                                    "plural": false,
                                    "selections": [
                                        {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "name": "hasNextPage",
                                            "args": null,
                                            "storageKey": null
                                        },
                                        {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "name": "hasPreviousPage",
                                            "args": null,
                                            "storageKey": null
                                        },
                                        {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "name": "startCursor",
                                            "args": null,
                                            "storageKey": null
                                        },
                                        {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "name": "endCursor",
                                            "args": null,
                                            "storageKey": null
                                        }
                                    ]
                                },
                                {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "edges",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "TodoNodeEdge",
                                    "plural": true,
                                    "selections": [
                                        {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "name": "cursor",
                                            "args": null,
                                            "storageKey": null
                                        },
                                        {
                                            "kind": "LinkedField",
                                            "alias": null,
                                            "name": "node",
                                            "storageKey": null,
                                            "args": null,
                                            "concreteType": "TodoNode",
                                            "plural": false,
                                            "selections": [
                                                (v6 /*: any*/),
                                                {
                                                    "kind": "ScalarField",
                                                    "alias": null,
                                                    "name": "completed",
                                                    "args": null,
                                                    "storageKey": null
                                                },
                                                {
                                                    "kind": "ScalarField",
                                                    "alias": null,
                                                    "name": "text",
                                                    "args": null,
                                                    "storageKey": null
                                                },
                                                {
                                                    "kind": "ScalarField",
                                                    "alias": null,
                                                    "name": "__typename",
                                                    "args": null,
                                                    "storageKey": null
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "kind": "LinkedHandle",
                            "alias": null,
                            "name": "todoSet",
                            "args": (v7 /*: any*/),
                            "handle": "connection",
                            "key": "todolist_todoSet",
                            "filters": [
                                "orderBy"
                            ]
                        }
                    ]
                }
            ]
        },
        "params": {
            "operationKind": "query",
            "name": "todolistRefetchQuery",
            "id": null,
            "text": "query todolistRefetchQuery(\n  $first: Int\n  $last: Int\n  $before: String\n  $after: String\n  $todolist_id: ID!\n) {\n  todolist(id: $todolist_id) {\n    ...todolistRefetch_data_pbnwq\n    id\n  }\n}\n\nfragment todo_data on TodoNode {\n  id\n  completed\n  text\n}\n\nfragment todolistRefetch_data_pbnwq on TodoListNode {\n  id\n  title\n  todoSet(first: $first, last: $last, before: $before, after: $after, orderBy: \"-created_at\") {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        id\n        ...todo_data\n        __typename\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'f3f8399c8a89bdf0c708afbcb40bd034';
export default node;
