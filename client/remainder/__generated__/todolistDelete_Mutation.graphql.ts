/* tslint:disable */
/* eslint-disable */
/* @relayHash fc666ce7dd305ee1f1e55c8e374381c7 */

import { ConcreteRequest } from "relay-runtime";
export type TodoListDeleteMutationInput = {
    id: string;
    clientMutationId?: string | null;
};
export type todolistDelete_MutationVariables = {
    input: TodoListDeleteMutationInput;
};
export type todolistDelete_MutationResponse = {
    readonly todolistDelete: {
        readonly deletedId: string | null;
    } | null;
};
export type todolistDelete_Mutation = {
    readonly response: todolistDelete_MutationResponse;
    readonly variables: todolistDelete_MutationVariables;
};



/*
mutation todolistDelete_Mutation(
  $input: TodoListDeleteMutationInput!
) {
  todolistDelete(input: $input) {
    deletedId
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "input",
            "type": "TodoListDeleteMutationInput!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todolistDelete",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "input",
                    "variableName": "input"
                }
            ],
            "concreteType": "TodoListDeleteMutationPayload",
            "plural": false,
            "selections": [
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "deletedId",
                    "args": null,
                    "storageKey": null
                }
            ]
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolistDelete_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistDelete_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "todolistDelete_Mutation",
            "id": null,
            "text": "mutation todolistDelete_Mutation(\n  $input: TodoListDeleteMutationInput!\n) {\n  todolistDelete(input: $input) {\n    deletedId\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'eb1e2256b42fc3341e024ed1c8789398';
export default node;
