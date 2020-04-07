/* tslint:disable */
/* eslint-disable */
/* @relayHash c5f30a2ff34be77fd0b76198a54934ab */

import { ConcreteRequest } from "relay-runtime";
export type AuthorUpdateInput = {
    name: string;
    id: string;
    clientMutationId?: string | null;
};
export type authorUpdate_MutationVariables = {
    authorUpdateInput: AuthorUpdateInput;
};
export type authorUpdate_MutationResponse = {
    readonly authorUpdate: {
        readonly errors: ReadonlyArray<{
            readonly field: string;
            readonly messages: ReadonlyArray<string>;
        } | null> | null;
        readonly author: {
            readonly id: string;
            readonly name: string;
        } | null;
    } | null;
};
export type authorUpdate_Mutation = {
    readonly response: authorUpdate_MutationResponse;
    readonly variables: authorUpdate_MutationVariables;
};



/*
mutation authorUpdate_Mutation(
  $authorUpdateInput: AuthorUpdateInput!
) {
  authorUpdate(input: $authorUpdateInput) {
    errors {
      field
      messages
    }
    author {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "authorUpdateInput",
            "type": "AuthorUpdateInput!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "authorUpdate",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "input",
                    "variableName": "authorUpdateInput"
                }
            ],
            "concreteType": "AuthorUpdatePayload",
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
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "author",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AuthorNode",
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
                            "name": "name",
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
            "name": "authorUpdate_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "authorUpdate_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "authorUpdate_Mutation",
            "id": null,
            "text": "mutation authorUpdate_Mutation(\n  $authorUpdateInput: AuthorUpdateInput!\n) {\n  authorUpdate(input: $authorUpdateInput) {\n    errors {\n      field\n      messages\n    }\n    author {\n      id\n      name\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '6b707ebe683f67a73115d754a9d7cb0a';
export default node;
