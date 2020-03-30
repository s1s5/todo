/* tslint:disable */
/* eslint-disable */
/* @relayHash 8685bb770d633159efbb347b4efdb1c1 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistAll2_first_QueryVariables = {
    todolist_id: string;
};
export type todolistAll2_first_QueryResponse = {
    readonly todolist: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"todolistAll2_data">;
    } | null;
};
export type todolistAll2_first_Query = {
    readonly response: todolistAll2_first_QueryResponse;
    readonly variables: todolistAll2_first_QueryVariables;
};



/*
query todolistAll2_first_Query(
  $todolist_id: ID!
) {
  todolist(id: $todolist_id) {
    id
    ...todolistAll2_data_2aaGHd
  }
}

fragment todo_data on TodoNode {
  id
  completed
  text
}

fragment todolistAll2_data_2aaGHd on TodoListNode {
  id
  title
  todoSet(first: 100) {
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
            "value": 100
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolistAll2_first_Query",
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
                        (v2 /*: any*/),
                        {
                            "kind": "FragmentSpread",
                            "name": "todolistAll2_data",
                            "args": (v3 /*: any*/)
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistAll2_first_Query",
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
                            "storageKey": "todoSet(first:100)",
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
                            "key": "todolist_todoSet",
                            "filters": null
                        }
                    ]
                }
            ]
        },
        "params": {
            "operationKind": "query",
            "name": "todolistAll2_first_Query",
            "id": null,
            "text": "query todolistAll2_first_Query(\n  $todolist_id: ID!\n) {\n  todolist(id: $todolist_id) {\n    id\n    ...todolistAll2_data_2aaGHd\n  }\n}\n\nfragment todo_data on TodoNode {\n  id\n  completed\n  text\n}\n\nfragment todolistAll2_data_2aaGHd on TodoListNode {\n  id\n  title\n  todoSet(first: 100) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        id\n        ...todo_data\n        __typename\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '53545ad0f3977365b5d2884676e03629';
export default node;
