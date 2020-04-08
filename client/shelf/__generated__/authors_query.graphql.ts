/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type authors_query = {
    readonly authors: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
                readonly bookSet: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly id: string;
                            readonly title: string;
                        } | null;
                    } | null>;
                };
            } | null;
        } | null>;
    } | null;
    readonly " $refType": "authors_query";
};
export type authors_query$data = authors_query;
export type authors_query$key = {
    readonly " $data"?: authors_query$data;
    readonly " $fragmentRefs": FragmentRefs<"authors_query">;
};



const node: ReaderFragment = (function () {
    var v0 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any);
    return {
        "kind": "Fragment",
        "name": "authors_query",
        "type": "Query",
        "metadata": null,
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
    } as any;
})();
(node as any).hash = '43722b2eedd463a0b89cbe84e7b22b44';
export default node;
