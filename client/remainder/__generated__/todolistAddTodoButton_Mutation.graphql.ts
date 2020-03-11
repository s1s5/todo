/* tslint:disable */
/* eslint-disable */
/* @relayHash 9d9f4d71f1d7c8bca22d9954a9be03ea */

import { ConcreteRequest } from "relay-runtime";
export type TodoCreateMutationInput = {
    todolist: string;
    text?: string | null;
    clientMutationId?: string | null;
};
export type todolistAddTodoButton_MutationVariables = {
    input: TodoCreateMutationInput;
};
export type todolistAddTodoButton_MutationResponse = {
    readonly todoCreate: {
        readonly todo: {
            readonly id: string;
            readonly completed: boolean;
            readonly text: string;
        } | null;
    } | null;
};
export type todolistAddTodoButton_Mutation = {
    readonly response: todolistAddTodoButton_MutationResponse;
    readonly variables: todolistAddTodoButton_MutationVariables;
};



/*
mutation todolistAddTodoButton_Mutation(
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
            "name": "todolistAddTodoButton_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistAddTodoButton_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "todolistAddTodoButton_Mutation",
            "id": null,
            "text": "mutation todolistAddTodoButton_Mutation(\n  $input: TodoCreateMutationInput!\n) {\n  todoCreate(input: $input) {\n    todo {\n      id\n      completed\n      text\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '46d63b5a58460b99eb8eb958e177a5c6';
export default node;
