/* tslint:disable */
/* eslint-disable */
/* @relayHash 52b246409db5072daeff402338d84ba3 */

import { ConcreteRequest } from "relay-runtime";
export type TodoListCreateMutationInput = {
    title: string;
    clientMutationId?: string | null;
};
export type todolistAdd_MutationVariables = {
    input: TodoListCreateMutationInput;
};
export type todolistAdd_MutationResponse = {
    readonly todolistCreate: {
        readonly edge: {
            readonly node: {
                readonly id: string;
                readonly title: string;
                readonly author: {
                    readonly id: string;
                    readonly username: string;
                };
            } | null;
        } | null;
    } | null;
};
export type todolistAdd_Mutation = {
    readonly response: todolistAdd_MutationResponse;
    readonly variables: todolistAdd_MutationVariables;
};



/*
mutation todolistAdd_Mutation(
  $input: TodoListCreateMutationInput!
) {
  todolistCreate(input: $input) {
    edge {
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
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "input",
            "type": "TodoListCreateMutationInput!",
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
            "name": "todolistCreate",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "input",
                    "variableName": "input"
                }
            ],
            "concreteType": "TodoListCreateMutationPayload",
            "plural": false,
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edge",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "TodoListNodeEdge",
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
                }
            ]
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolistAdd_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v2 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistAdd_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v2 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "todolistAdd_Mutation",
            "id": null,
            "text": "mutation todolistAdd_Mutation(\n  $input: TodoListCreateMutationInput!\n) {\n  todolistCreate(input: $input) {\n    edge {\n      node {\n        id\n        title\n        author {\n          id\n          username\n        }\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '32c364a30806563fb05d7e9a1fe1677f';
export default node;
