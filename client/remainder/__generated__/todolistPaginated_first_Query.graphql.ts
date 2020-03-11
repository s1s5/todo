/* tslint:disable */
/* eslint-disable */
/* @relayHash 223f3ba9ed349e50d02373ee4b482126 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistPaginated_first_QueryVariables = {
    todolist_id: string;
};
export type todolistPaginated_first_QueryResponse = {
    readonly todolist: {
        readonly " $fragmentRefs": FragmentRefs<"todolistPaginated_data">;
    } | null;
};
export type todolistPaginated_first_Query = {
    readonly response: todolistPaginated_first_QueryResponse;
    readonly variables: todolistPaginated_first_QueryVariables;
};



/*
query todolistPaginated_first_Query(
  $todolist_id: ID!
) {
  todolist(id: $todolist_id) {
    ...todolistPaginated_data
    id
  }
}

fragment todo_data on TodoNode {
  id
  completed
  text
}

fragment todolistPaginated_data on TodoListNode {
  id
  title
  todoSet(first: 1) {
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
            "value": 1
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolistPaginated_first_Query",
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
                            "args": null
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistPaginated_first_Query",
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
                            "storageKey": "todoSet(first:1)",
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
            "name": "todolistPaginated_first_Query",
            "id": null,
            "text": "query todolistPaginated_first_Query(\n  $todolist_id: ID!\n) {\n  todolist(id: $todolist_id) {\n    ...todolistPaginated_data\n    id\n  }\n}\n\nfragment todo_data on TodoNode {\n  id\n  completed\n  text\n}\n\nfragment todolistPaginated_data on TodoListNode {\n  id\n  title\n  todoSet(first: 1) {\n    edges {\n      node {\n        id\n        ...todo_data\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '78d0504deb83e06eb2fa0c43bbffc565';
export default node;
