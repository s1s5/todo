/* tslint:disable */
/* eslint-disable */
/* @relayHash c9da36253cae65900aabce85451f193f */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistRefetch_first_QueryVariables = {
    todolist_id: string;
};
export type todolistRefetch_first_QueryResponse = {
    readonly todolist: {
        readonly " $fragmentRefs": FragmentRefs<"todolistRefetch_data">;
    } | null;
};
export type todolistRefetch_first_Query = {
    readonly response: todolistRefetch_first_QueryResponse;
    readonly variables: todolistRefetch_first_QueryVariables;
};



/*
query todolistRefetch_first_Query(
  $todolist_id: ID!
) {
  todolist(id: $todolist_id) {
    ...todolistRefetch_data
    id
  }
}

fragment todo_data on TodoNode {
  id
  completed
  text
}

fragment todolistRefetch_data on TodoListNode {
  id
  title
  todoSet(first: 10, orderBy: "-created_at") {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        ...todo_data
        __typename
      }
      cursor
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
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
            "kind": "Literal",
            "name": "first",
            "value": 10
        } as any),
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
            "name": "todolistRefetch_first_Query",
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
                            "args": null
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistRefetch_first_Query",
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
                            "storageKey": "todoSet(first:10,orderBy:\"-created_at\")",
                            "args": (v3 /*: any*/),
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
                                }
                            ]
                        },
                        {
                            "kind": "LinkedHandle",
                            "alias": null,
                            "name": "todoSet",
                            "args": (v3 /*: any*/),
                            "handle": "connection",
                            "key": "todolistRefetch_todoSet",
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
            "name": "todolistRefetch_first_Query",
            "id": null,
            "text": "query todolistRefetch_first_Query(\n  $todolist_id: ID!\n) {\n  todolist(id: $todolist_id) {\n    ...todolistRefetch_data\n    id\n  }\n}\n\nfragment todo_data on TodoNode {\n  id\n  completed\n  text\n}\n\nfragment todolistRefetch_data on TodoListNode {\n  id\n  title\n  todoSet(first: 10, orderBy: \"-created_at\") {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        ...todo_data\n        __typename\n      }\n      cursor\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '5e745f4a5829f3a5bc0c8a8a532fa7e4';
export default node;
