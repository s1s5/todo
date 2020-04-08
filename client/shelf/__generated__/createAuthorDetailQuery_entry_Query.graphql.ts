/* tslint:disable */
/* eslint-disable */
/* @relayHash 5ab74f2e74f4da8e1c5838f26f100e56 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type createAuthorDetailQuery_entry_QueryVariables = {
    author_id: string;
};
export type createAuthorDetailQuery_entry_QueryResponse = {
    readonly author: {
        readonly " $fragmentRefs": FragmentRefs<"createAuthorDetailQuery_data">;
    } | null;
};
export type createAuthorDetailQuery_entry_Query = {
    readonly response: createAuthorDetailQuery_entry_QueryResponse;
    readonly variables: createAuthorDetailQuery_entry_QueryVariables;
};



/*
query createAuthorDetailQuery_entry_Query(
  $author_id: ID!
) {
  author(id: $author_id) {
    ...createAuthorDetailQuery_data
    id
  }
}

fragment createAuthorDetailQuery_data on AuthorNode {
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
            "name": "createAuthorDetailQuery_entry_Query",
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
                            "name": "createAuthorDetailQuery_data",
                            "args": null
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "createAuthorDetailQuery_entry_Query",
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
            "name": "createAuthorDetailQuery_entry_Query",
            "id": null,
            "text": "query createAuthorDetailQuery_entry_Query(\n  $author_id: ID!\n) {\n  author(id: $author_id) {\n    ...createAuthorDetailQuery_data\n    id\n  }\n}\n\nfragment createAuthorDetailQuery_data on AuthorNode {\n  id\n  name\n  bookSet {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'e191fc3acc603c7b16de1e4f91c64179';
export default node;
