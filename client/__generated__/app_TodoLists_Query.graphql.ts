/* tslint:disable */
/* eslint-disable */
/* @relayHash 999c76ffa42955d7773cf97e2611b387 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type app_TodoLists_QueryVariables = {};
export type app_TodoLists_QueryResponse = {
    readonly todolists: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"TodoList_todolist">;
            } | null;
        } | null>;
    } | null;
};
export type app_TodoLists_Query = {
    readonly response: app_TodoLists_QueryResponse;
    readonly variables: app_TodoLists_QueryVariables;
};



/*
query app_TodoLists_Query {
  todolists {
    edges {
      node {
        id
        ...TodoList_todolist
      }
    }
  }
}

fragment TodoList_todolist on TodoListNode {
  id
  title
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any);
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "app_TodoLists_Query",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": [
                {
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
                                        (v0 /*: any*/),
                                        {
                                            "kind": "FragmentSpread",
                                            "name": "TodoList_todolist",
                                            "args": null
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "app_TodoLists_Query",
            "argumentDefinitions": [],
            "selections": [
                {
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
                                        (v0 /*: any*/),
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
                }
            ]
        },
        "params": {
            "operationKind": "query",
            "name": "app_TodoLists_Query",
            "id": null,
            "text": "query app_TodoLists_Query {\n  todolists {\n    edges {\n      node {\n        id\n        ...TodoList_todolist\n      }\n    }\n  }\n}\n\nfragment TodoList_todolist on TodoListNode {\n  id\n  title\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'dc8e4c8140efb62d4b3f048083529f2e';
export default node;
