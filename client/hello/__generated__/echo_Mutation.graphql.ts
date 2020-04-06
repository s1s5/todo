/* tslint:disable */
/* eslint-disable */
/* @relayHash 57971b6b4be7c5b45c1cba189885db21 */

import { ConcreteRequest } from "relay-runtime";
export type echo_MutationVariables = {
    message: string;
};
export type echo_MutationResponse = {
    readonly doEcho: boolean | null;
};
export type echo_Mutation = {
    readonly response: echo_MutationResponse;
    readonly variables: echo_MutationVariables;
};



/*
mutation echo_Mutation(
  $message: String!
) {
  doEcho(message: $message)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "message",
            "type": "String!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "ScalarField",
            "alias": null,
            "name": "doEcho",
            "args": [
                {
                    "kind": "Variable",
                    "name": "message",
                    "variableName": "message"
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "echo_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "echo_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "echo_Mutation",
            "id": null,
            "text": "mutation echo_Mutation(\n  $message: String!\n) {\n  doEcho(message: $message)\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'b7178bf246d24951a70ac4526d5af059';
export default node;
