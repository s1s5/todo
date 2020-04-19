/* tslint:disable */
/* eslint-disable */
/* @relayHash 4fb2e77885997f7401a9320697fbd566 */

import { ConcreteRequest } from "relay-runtime";
export type SingleFileUploadFormMutationInput = {
    file?: unknown | null;
    formPrefix?: string | null;
    clientMutationId?: string | null;
};
export type singleFileUpload_MutationVariables = {
    singleFileUploadInput: SingleFileUploadFormMutationInput;
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
  $singleFileUploadInput: SingleFileUploadFormMutationInput!
) {
  singleFileUpload(input: $singleFileUploadInput) {
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
            "name": "singleFileUploadInput",
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
                    "variableName": "singleFileUploadInput"
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
            "text": "mutation singleFileUpload_Mutation(\n  $singleFileUploadInput: SingleFileUploadFormMutationInput!\n) {\n  singleFileUpload(input: $singleFileUploadInput) {\n    errors {\n      field\n      messages\n    }\n    success\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'eae41fc8d4a5d0a72dfb9ad5a5aeb566';
export default node;
