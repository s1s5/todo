/* tslint:disable */
/* eslint-disable */
/* @relayHash 2d7d7963a691a6c5c02f6f8d083d67b6 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type authors_entry_QueryVariables = {};
export type authors_entry_QueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"authors_query">;
};
export type authors_entry_Query = {
    readonly response: authors_entry_QueryResponse;
    readonly variables: authors_entry_QueryVariables;
};



/*
query authors_entry_Query {
  ...authors_query
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

fragment authors_query on Query {
  authors {
    edges {
      node {
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
        ...authorDetail_data
      }
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
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
            "name": "authors_entry_Query",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": [
                {
                    "kind": "FragmentSpread",
                    "name": "authors_query",
                    "args": null
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "authors_entry_Query",
            "argumentDefinitions": [],
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "authors",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AuthorNodeConnection",
                    "plural": false,
                    "selections": [
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edges",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "AuthorNodeEdge",
                            "plural": true,
                            "selections": [
                                {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "node",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "AuthorNode",
                                    "plural": false,
                                    "selections": [
                                        (v0 /*: any*/),
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
                                                                (v0 /*: any*/),
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
                }
            ]
        },
        "params": {
            "operationKind": "query",
            "name": "authors_entry_Query",
            "id": null,
            "text": "query authors_entry_Query {\n  ...authors_query\n}\n\nfragment authorDetail_data on AuthorNode {\n  id\n  name\n  bookSet {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n\nfragment authors_query on Query {\n  authors {\n    edges {\n      node {\n        id\n        name\n        bookSet {\n          edges {\n            node {\n              id\n              title\n            }\n          }\n        }\n        ...authorDetail_data\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '6d0944ba18cffe332de191b758797408';
export default node;
