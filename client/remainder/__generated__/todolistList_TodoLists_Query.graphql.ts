/* tslint:disable */
/* eslint-disable */
/* @relayHash c7a3ba92ffd53bbe457dea3a40f2ea03 */

import { ConcreteRequest } from "relay-runtime";
export type todolistList_TodoLists_QueryVariables = {};
export type todolistList_TodoLists_QueryResponse = {
    readonly todolists: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly title: string;
            } | null;
        } | null>;
    } | null;
};
export type todolistList_TodoLists_Query = {
    readonly response: todolistList_TodoLists_QueryResponse;
    readonly variables: todolistList_TodoLists_QueryVariables;
};



/*
query todolistList_TodoLists_Query {
  todolists {
    edges {
      node {
        id
        title
      }
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todolists",
            "storageKey": null,
            "args": null,
            "concreteType": "TodoListNodeConnection",
            "plural": false,
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "TodoListNodeEdge",
                    "plural": true,
                    "selections": [
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "TodoListNode",
                            "plural": false,
                            "selections": [
                                {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "id",
                                    "args": null,
                                    "storageKey": null
                                },
                                {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "title",
                                    "args": null,
                                    "storageKey": null
                                }
                            ]
                        }
                    ]
                }
            ]
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolistList_TodoLists_Query",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistList_TodoLists_Query",
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "params": {
            "operationKind": "query",
            "name": "todolistList_TodoLists_Query",
            "id": null,
            "text": "query todolistList_TodoLists_Query {\n  todolists {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '5cc2cda8e0b3ccefa761213e999e695c';
export default node;
