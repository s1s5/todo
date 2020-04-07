/* tslint:disable */
/* eslint-disable */
/* @relayHash 42bcca894aadcdc4aa744110bc3dafb9 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
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
            readonly " $fragmentRefs": FragmentRefs<"authorDetail_data">;
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
      ...authorDetail_data
      id
    }
  }
}

fragment authorDetail_data on AuthorNode {
  id
  name
  bookSet {
    edges {
      node {
        id
        title
      }
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
            "kind": "Variable",
            "name": "input",
            "variableName": "authorUpdateInput"
        } as any)
    ], v2 = ({
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
    } as any), v3 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any);
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "authorUpdate_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "authorUpdate",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "AuthorUpdatePayload",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
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
                                    "kind": "FragmentSpread",
                                    "name": "authorDetail_data",
                                    "args": null
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "authorUpdate_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "authorUpdate",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "AuthorUpdatePayload",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "author",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "AuthorNode",
                            "plural": false,
                            "selections": [
                                (v3 /*: any*/),
                                {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "name",
                                    "args": null,
                                    "storageKey": null
                                },
                                {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "bookSet",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "BookNodeConnection",
                                    "plural": false,
                                    "selections": [
                                        {
                                            "kind": "LinkedField",
                                            "alias": null,
                                            "name": "edges",
                                            "storageKey": null,
                                            "args": null,
                                            "concreteType": "BookNodeEdge",
                                            "plural": true,
                                            "selections": [
                                                {
                                                    "kind": "LinkedField",
                                                    "alias": null,
                                                    "name": "node",
                                                    "storageKey": null,
                                                    "args": null,
                                                    "concreteType": "BookNode",
                                                    "plural": false,
                                                    "selections": [
                                                        (v3 /*: any*/),
                                                        {
                                                            "kind": "ScalarField",
                                                            "alias": null,
                                                            "name": "title",
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
                        }
                    ]
                }
            ]
        },
        "params": {
            "operationKind": "mutation",
            "name": "authorUpdate_Mutation",
            "id": null,
            "text": "mutation authorUpdate_Mutation(\n  $authorUpdateInput: AuthorUpdateInput!\n) {\n  authorUpdate(input: $authorUpdateInput) {\n    errors {\n      field\n      messages\n    }\n    author {\n      ...authorDetail_data\n      id\n    }\n  }\n}\n\nfragment authorDetail_data on AuthorNode {\n  id\n  name\n  bookSet {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'aa860007a31c5eb2f3d26af611bcb151';
export default node;
