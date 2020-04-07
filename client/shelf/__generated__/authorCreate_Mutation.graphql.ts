/* tslint:disable */
/* eslint-disable */
/* @relayHash 882f57df07d3dfb3b42b677ca2c96a9d */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
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
            readonly " $fragmentRefs": FragmentRefs<"authorDetail_data">;
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
            "name": "authorCreateInput",
            "type": "AuthorCreateInput!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "input",
            "variableName": "authorCreateInput"
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
            "name": "authorCreate_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "authorCreate",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "AuthorCreatePayload",
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
            "name": "authorCreate_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "authorCreate",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "AuthorCreatePayload",
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
            "name": "authorCreate_Mutation",
            "id": null,
            "text": "mutation authorCreate_Mutation(\n  $authorCreateInput: AuthorCreateInput!\n) {\n  authorCreate(input: $authorCreateInput) {\n    errors {\n      field\n      messages\n    }\n    author {\n      ...authorDetail_data\n      id\n    }\n  }\n}\n\nfragment authorDetail_data on AuthorNode {\n  id\n  name\n  bookSet {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '35ce0ff17f4bf43a255cd5f5ed50d4c5';
export default node;