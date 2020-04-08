/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type createAuthorDetailQuery_data = {
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
    readonly " $refType": "createAuthorDetailQuery_data";
};
export type createAuthorDetailQuery_data$data = createAuthorDetailQuery_data;
export type createAuthorDetailQuery_data$key = {
    readonly " $data"?: createAuthorDetailQuery_data$data;
    readonly " $fragmentRefs": FragmentRefs<"createAuthorDetailQuery_data">;
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
        "name": "createAuthorDetailQuery_data",
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
(node as any).hash = '3eab4590cf8db3e26f391d79ee1e330e';
export default node;
