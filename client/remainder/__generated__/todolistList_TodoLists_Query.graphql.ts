/* tslint:disable */
/* eslint-disable */
/* @relayHash 0ce8dee3e0d7bd8e82d9236853803f38 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistList_TodoLists_QueryVariables = {};
export type todolistList_TodoLists_QueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"todolistList_query">;
};
export type todolistList_TodoLists_Query = {
    readonly response: todolistList_TodoLists_QueryResponse;
    readonly variables: todolistList_TodoLists_QueryVariables;
};



/*
query todolistList_TodoLists_Query {
  ...todolistList_query
}

fragment todolistList_query on Query {
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

const node: ConcreteRequest = ({
    "kind": "Request",
    "fragment": {
        "kind": "Fragment",
        "name": "todolistList_TodoLists_Query",
        "type": "Query",
        "metadata": null,
        "argumentDefinitions": [],
        "selections": [
            {
                "kind": "FragmentSpread",
                "name": "todolistList_query",
                "args": null
            }
        ]
    },
    "operation": {
        "kind": "Operation",
        "name": "todolistList_TodoLists_Query",
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
            }
        ]
    },
    "params": {
        "operationKind": "query",
        "name": "todolistList_TodoLists_Query",
        "id": null,
        "text": "query todolistList_TodoLists_Query {\n  ...todolistList_query\n}\n\nfragment todolistList_query on Query {\n  todolists {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n",
        "metadata": {}
    }
} as any);
(node as any).hash = '3db0b1b53577fae068cc0d43858cb10e';
export default node;
