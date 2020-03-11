/* tslint:disable */
/* eslint-disable */
/* @relayHash 05eb4963e6da32c43a96a7d7f5f707d0 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistPaginated_QueryVariables = {
    count: number;
    cursor?: string | null;
    todolist_id: string;
};
export type todolistPaginated_QueryResponse = {
    readonly todolist: {
        readonly " $fragmentRefs": FragmentRefs<"todolistPaginated_data">;
    } | null;
};
export type todolistPaginated_Query = {
    readonly response: todolistPaginated_QueryResponse;
    readonly variables: todolistPaginated_QueryVariables;
};



/*
query todolistPaginated_Query(
  $count: Int!
  $cursor: String
  $todolist_id: ID!
) {
  todolist(id: $todolist_id) {
    ...todolistPaginated_data_1G22uz
    id
  }
}

fragment todo_data on TodoNode {
  id
  completed
  text
}

fragment todolistPaginated_data_1G22uz on TodoListNode {
  id
  title
  todoSet(first: $count, after: $cursor) {
    edges {
      node {
        id
        ...todo_data
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "count",
            "type": "Int!",
            "defaultValue": null
        } as any),
        ({
            "kind": "LocalArgument",
            "name": "cursor",
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
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any), v3 = [
        ({
            "kind": "Variable",
            "name": "after",
            "variableName": "cursor"
        } as any),
        ({
            "kind": "Variable",
            "name": "first",
            "variableName": "count"
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolistPaginated_Query",
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
                            "name": "todolistPaginated_data",
                            "args": [
                                {
                                    "kind": "Variable",
                                    "name": "count",
                                    "variableName": "count"
                                },
                                {
                                    "kind": "Variable",
                                    "name": "cursor",
                                    "variableName": "cursor"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistPaginated_Query",
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
                        (v2 /*: any*/),
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
                            "args": (v3 /*: any*/),
                            "concreteType": "TodoNodeConnection",
                            "plural": false,
                            "selections": [
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
                                            "kind": "LinkedField",
                                            "alias": null,
                                            "name": "node",
                                            "storageKey": null,
                                            "args": null,
                                            "concreteType": "TodoNode",
                                            "plural": false,
                                            "selections": [
                                                (v2 /*: any*/),
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
                                        },
                                        {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "name": "cursor",
                                            "args": null,
                                            "storageKey": null
                                        }
                                    ]
                                },
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
                                            "name": "endCursor",
                                            "args": null,
                                            "storageKey": null
                                        },
                                        {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "name": "hasNextPage",
                                            "args": null,
                                            "storageKey": null
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "kind": "LinkedHandle",
                            "alias": null,
                            "name": "todoSet",
                            "args": (v3 /*: any*/),
                            "handle": "connection",
                            "key": "todolistPaginated_todoSet",
                            "filters": null
                        }
                    ]
                }
            ]
        },
        "params": {
            "operationKind": "query",
            "name": "todolistPaginated_Query",
            "id": null,
            "text": "query todolistPaginated_Query(\n  $count: Int!\n  $cursor: String\n  $todolist_id: ID!\n) {\n  todolist(id: $todolist_id) {\n    ...todolistPaginated_data_1G22uz\n    id\n  }\n}\n\nfragment todo_data on TodoNode {\n  id\n  completed\n  text\n}\n\nfragment todolistPaginated_data_1G22uz on TodoListNode {\n  id\n  title\n  todoSet(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        ...todo_data\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '54b70468d3696fbf5ab8d2d2ab8b3f5e';
export default node;
