/* tslint:disable */
/* eslint-disable */
/* @relayHash b05c9f7fb5a8ee4acb77597c9c79a6a5 */

import { ConcreteRequest } from "relay-runtime";
export type TodoCreateMutationInput = {
    todolist: string;
    text?: string | null;
    clientMutationId?: string | null;
};
export type todolist_addTodo_MutationVariables = {
    input: TodoCreateMutationInput;
};
export type todolist_addTodo_MutationResponse = {
    readonly todoCreate: {
        readonly todo: {
            readonly id: string;
            readonly completed: boolean;
            readonly text: string;
        } | null;
    } | null;
};
export type todolist_addTodo_Mutation = {
    readonly response: todolist_addTodo_MutationResponse;
    readonly variables: todolist_addTodo_MutationVariables;
};



/*
mutation todolist_addTodo_Mutation(
  $input: TodoCreateMutationInput!
) {
  todoCreate(input: $input) {
    todo {
      id
      completed
      text
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "input",
            "type": "TodoCreateMutationInput!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todoCreate",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "input",
                    "variableName": "input"
                }
            ],
            "concreteType": "TodoCreateMutationPayload",
            "plural": false,
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todo",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "TodoNode",
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
            "name": "todolist_addTodo_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todolist_addTodo_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "todolist_addTodo_Mutation",
            "id": null,
            "text": "mutation todolist_addTodo_Mutation(\n  $input: TodoCreateMutationInput!\n) {\n  todoCreate(input: $input) {\n    todo {\n      id\n      completed\n      text\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '4d48143be5f550974d4acb21af7e0e69';
export default node;
