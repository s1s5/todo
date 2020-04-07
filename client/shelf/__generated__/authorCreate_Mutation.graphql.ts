/* tslint:disable */
/* eslint-disable */
/* @relayHash 8450ece1a419e58835cd47b0ca9d8487 */

import { ConcreteRequest } from "relay-runtime";
export type AuthorCreateInput = {
    name: string;
    clientMutationId?: string | null;
};
export type authorCreate_MutationVariables = {
    authorCreateInput: AuthorCreateInput;
};
export type authorCreate_MutationResponse = {
    readonly authorCreate: {
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
export type authorCreate_Mutation = {
    readonly response: authorCreate_MutationResponse;
    readonly variables: authorCreate_MutationVariables;
};



/*
mutation authorCreate_Mutation(
  $authorCreateInput: AuthorCreateInput!
) {
  authorCreate(input: $authorCreateInput) {
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
            "name": "authorCreateInput",
            "type": "AuthorCreateInput!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "authorCreate",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "input",
                    "variableName": "authorCreateInput"
                }
            ],
            "concreteType": "AuthorCreatePayload",
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
            "name": "authorCreate_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "authorCreate_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "authorCreate_Mutation",
            "id": null,
            "text": "mutation authorCreate_Mutation(\n  $authorCreateInput: AuthorCreateInput!\n) {\n  authorCreate(input: $authorCreateInput) {\n    errors {\n      field\n      messages\n    }\n    author {\n      id\n      name\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'a1291b978359b9f3b5e702bdc4c94d13';
export default node;
