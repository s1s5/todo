/* tslint:disable */
/* eslint-disable */
/* @relayHash 9b3bc3b1422e5ee4ff9e41a468479505 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type App_TodoLists_QueryVariables = {};
export type App_TodoLists_QueryResponse = {
    readonly todolists: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"TodoList_todolist">;
            } | null;
        } | null>;
    } | null;
};
export type App_TodoLists_Query = {
    readonly response: App_TodoLists_QueryResponse;
    readonly variables: App_TodoLists_QueryVariables;
};



/*
query App_TodoLists_Query {
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
            "name": "App_TodoLists_Query",
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
            "name": "App_TodoLists_Query",
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
            "name": "App_TodoLists_Query",
            "id": null,
            "text": "query App_TodoLists_Query {\n  todolists {\n    edges {\n      node {\n        id\n        ...TodoList_todolist\n      }\n    }\n  }\n}\n\nfragment TodoList_todolist on TodoListNode {\n  id\n  title\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '1cf4a659720ffc079a8e76336b3fbb72';
export default node;
