/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type someStaticDatas_data = {
    readonly id: string | null;
    readonly name: string | null;
    readonly bytes: number | null;
    readonly " $refType": "someStaticDatas_data";
};
export type someStaticDatas_data$data = someStaticDatas_data;
export type someStaticDatas_data$key = {
    readonly " $data"?: someStaticDatas_data$data;
    readonly " $fragmentRefs": FragmentRefs<"someStaticDatas_data">;
};



const node: ReaderFragment = ({
    "kind": "Fragment",
    "name": "someStaticDatas_data",
    "type": "StaticDataType",
    "metadata": null,
    "argumentDefinitions": [],
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
        },
        {
            "kind": "ScalarField",
            "alias": null,
            "name": "bytes",
            "args": null,
            "storageKey": null
        }
    ]
} as any);
(node as any).hash = 'e30742ce52c74cb37311ff25b440a515';
export default node;
