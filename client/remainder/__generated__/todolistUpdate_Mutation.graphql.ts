/* tslint:disable */
/* eslint-disable */
/* @relayHash 76d09519df63ea61b0b2cb05725dd889 */

import { ConcreteRequest } from "relay-runtime";
export type TodoListUpdateMutationInput = {
    title: string;
    id: string;
    clientMutationId?: string | null;
};
export type todolistUpdate_MutationVariables = {
    input: TodoListUpdateMutationInput;
};
export type todolistUpdate_MutationResponse = {
    readonly todolistUpdate: {
        readonly node: {
            readonly id: string;
            readonly title: string;
            readonly author: {
                readonly id: string;
                readonly username: string;
            };
        } | null;
    } | null;
};
export type todolistUpdate_Mutation = {
    readonly response: todolistUpdate_MutationResponse;
    readonly variables: todolistUpdate_MutationVariables;
};



/*
mutation todolistUpdate_Mutation(
  $input: TodoListUpdateMutationInput!
) {
  todolistUpdate(input: $input) {
    node {
      id
      title
      author {
        id
        username
      }
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "input",
            "type": "TodoListUpdateMutationInput!",
            "defaultValue": null
        } as any)
    ], v1 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any), v2 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todolistUpdate",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "input",
                    "variableName": "input"
                }
            ],
            "concreteType": "TodoListUpdateMutationPayload",
            "plural": false,
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
                        (v1 /*: any*/),
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
                            "name": "author",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "UserNode",
                            "plural": false,
                            "selections": [
                                (v1 /*: any*/),
                                {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "username",
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
            "name": "todolistUpdate_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v2 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistUpdate_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v2 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "todolistUpdate_Mutation",
            "id": null,
            "text": "mutation todolistUpdate_Mutation(\n  $input: TodoListUpdateMutationInput!\n) {\n  todolistUpdate(input: $input) {\n    node {\n      id\n      title\n      author {\n        id\n        username\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '433e2af905985a4fa71b685500f1a6aa';
export default node;
