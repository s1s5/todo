/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type authorDetailFragment_data = {
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
    readonly " $refType": "authorDetailFragment_data";
};
export type authorDetailFragment_data$data = authorDetailFragment_data;
export type authorDetailFragment_data$key = {
    readonly " $data"?: authorDetailFragment_data$data;
    readonly " $fragmentRefs": FragmentRefs<"authorDetailFragment_data">;
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
        "name": "authorDetailFragment_data",
        "type": "AuthorNode",
        "metadata": null,
        "argumentDefinitions": [],
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
    } as any;
})();
(node as any).hash = 'de2788a6a54a9306a09b35d41a8445b8';
export default node;
