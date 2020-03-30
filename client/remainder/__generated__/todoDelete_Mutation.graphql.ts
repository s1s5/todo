/* tslint:disable */
/* eslint-disable */
/* @relayHash cfb72873242f1af5a0d4524a4d2473e0 */

import { ConcreteRequest } from "relay-runtime";
export type TodoDeleteMutationInput = {
    id: string;
    clientMutationId?: string | null;
};
export type todoDelete_MutationVariables = {
    input: TodoDeleteMutationInput;
};
export type todoDelete_MutationResponse = {
    readonly todoDelete: {
        readonly id: string | null;
    } | null;
};
export type todoDelete_Mutation = {
    readonly response: todoDelete_MutationResponse;
    readonly variables: todoDelete_MutationVariables;
};



/*
mutation todoDelete_Mutation(
  $input: TodoDeleteMutationInput!
) {
  todoDelete(input: $input) {
    id
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "input",
            "type": "TodoDeleteMutationInput!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todoDelete",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "input",
                    "variableName": "input"
                }
            ],
            "concreteType": "TodoDeleteMutationPayload",
            "plural": false,
            "selections": [
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "id",
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
            "name": "todoDelete_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todoDelete_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "todoDelete_Mutation",
            "id": null,
            "text": "mutation todoDelete_Mutation(\n  $input: TodoDeleteMutationInput!\n) {\n  todoDelete(input: $input) {\n    id\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'a981e0dbab0dccd6678da5cfdeb085b1';
export default node;
