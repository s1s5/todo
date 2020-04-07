/* tslint:disable */
/* eslint-disable */
/* @relayHash b4fe9d0cd45a40ece0dfa3f18d7576b7 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type authorDetailFragment_entry_QueryVariables = {
    author_id: string;
};
export type authorDetailFragment_entry_QueryResponse = {
    readonly author: {
        readonly " $fragmentRefs": FragmentRefs<"authorDetailFragment_data">;
    } | null;
};
export type authorDetailFragment_entry_Query = {
    readonly response: authorDetailFragment_entry_QueryResponse;
    readonly variables: authorDetailFragment_entry_QueryVariables;
};



/*
query authorDetailFragment_entry_Query(
  $author_id: ID!
) {
  author(id: $author_id) {
    ...authorDetailFragment_data
    id
  }
}

fragment authorDetailFragment_data on AuthorNode {
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
            "name": "author_id",
            "type": "ID!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "id",
            "variableName": "author_id"
        } as any)
    ], v2 = ({
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
            "name": "authorDetailFragment_entry_Query",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "author",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "AuthorNode",
                    "plural": false,
                    "selections": [
                        {
                            "kind": "FragmentSpread",
                            "name": "authorDetailFragment_data",
                            "args": null
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "authorDetailFragment_entry_Query",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "author",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "AuthorNode",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
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
                                                (v2 /*: any*/),
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
        },
        "params": {
            "operationKind": "query",
            "name": "authorDetailFragment_entry_Query",
            "id": null,
            "text": "query authorDetailFragment_entry_Query(\n  $author_id: ID!\n) {\n  author(id: $author_id) {\n    ...authorDetailFragment_data\n    id\n  }\n}\n\nfragment authorDetailFragment_data on AuthorNode {\n  id\n  name\n  bookSet {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '915090dd312e85e4c73ac7da59b1fb70';
export default node;
