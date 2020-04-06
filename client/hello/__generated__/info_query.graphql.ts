/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type info_query = {
    readonly info: {
        readonly version: string | null;
        readonly moduleName: string | null;
    } | null;
    readonly " $refType": "info_query";
};
export type info_query$data = info_query;
export type info_query$key = {
    readonly " $data"?: info_query$data;
    readonly " $fragmentRefs": FragmentRefs<"info_query">;
};



const node: ReaderFragment = ({
    "kind": "Fragment",
    "name": "info_query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
        {
            "kind": "LinkedField",
            "alias": null,
            "name": "info",
            "storageKey": null,
            "args": null,
            "concreteType": "InfoType",
            "plural": false,
            "selections": [
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "version",
                    "args": null,
                    "storageKey": null
                },
                {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "moduleName",
                    "args": null,
                    "storageKey": null
                }
            ]
        }
    ]
} as any);
(node as any).hash = 'bf40042ee515aac07f0d70381f19e2e0';
export default node;
