/* tslint:disable */
/* eslint-disable */
/* @relayHash 4b5bd5d7b3123ec77e7aa561a338646b */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolist_TodoList_QueryVariables = {
    id: string;
};
export type todolist_TodoList_QueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"todolist_query">;
};
export type todolist_TodoList_Query = {
    readonly response: todolist_TodoList_QueryResponse;
    readonly variables: todolist_TodoList_QueryVariables;
};



/*
query todolist_TodoList_Query(
  $id: ID!
) {
  ...todolist_query_1Bmzm5
}

fragment todolist_query_1Bmzm5 on Query {
  todolist(id: $id) {
    id
    title
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "id",
            "type": "ID!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolist_TodoList_Query",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "FragmentSpread",
                    "name": "todolist_query",
                    "args": (v1 /*: any*/)
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todolist_TodoList_Query",
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
        },
        "params": {
            "operationKind": "query",
            "name": "todolist_TodoList_Query",
            "id": null,
            "text": "query todolist_TodoList_Query(\n  $id: ID!\n) {\n  ...todolist_query_1Bmzm5\n}\n\nfragment todolist_query_1Bmzm5 on Query {\n  todolist(id: $id) {\n    id\n    title\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '756d20b5e91e58ddc299f05850c468e5';
export default node;
