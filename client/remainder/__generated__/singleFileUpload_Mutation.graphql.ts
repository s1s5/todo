/* tslint:disable */
/* eslint-disable */
/* @relayHash 6665083795eb1ecadc0c7545f90c72b8 */

import { ConcreteRequest } from "relay-runtime";
export type SingleFileUploadFormMutationInput = {
    file: unknown;
    clientMutationId?: string | null;
};
export type singleFileUpload_MutationVariables = {
    input: SingleFileUploadFormMutationInput;
};
export type singleFileUpload_MutationResponse = {
    readonly singleFileUpload: {
        readonly errors: ReadonlyArray<{
            readonly field: string;
            readonly messages: ReadonlyArray<string>;
        } | null> | null;
        readonly success: boolean | null;
    } | null;
};
export type singleFileUpload_Mutation = {
    readonly response: singleFileUpload_MutationResponse;
    readonly variables: singleFileUpload_MutationVariables;
};



/*
mutation singleFileUpload_Mutation(
  $input: SingleFileUploadFormMutationInput!
) {
  singleFileUpload(input: $input) {
    errors {
      field
      messages
    }
    success
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "input",
            "type": "SingleFileUploadFormMutationInput!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "singleFileUpload",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "input",
                    "variableName": "input"
                }
            ],
            "concreteType": "SingleFileUploadFormMutationPayload",
            "plural": false,
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "errors",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ErrorType",
                    "plural": true,
                    "selections": [
                        {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "field",
                            "args": null,
                            "storageKey": null
                        },
                        {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "messages",
                            "args": null,
                            "storageKey": null
                        }
                    ]
                },
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "success",
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
            "name": "singleFileUpload_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "singleFileUpload_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "singleFileUpload_Mutation",
            "id": null,
            "text": "mutation singleFileUpload_Mutation(\n  $input: SingleFileUploadFormMutationInput!\n) {\n  singleFileUpload(input: $input) {\n    errors {\n      field\n      messages\n    }\n    success\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '918e70001665943c07c9c210c98b7a70';
export default node;
