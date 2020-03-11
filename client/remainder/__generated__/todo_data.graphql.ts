/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todo_data = {
    readonly id: string;
    readonly completed: boolean;
    readonly text: string;
    readonly " $refType": "todo_data";
};
export type todo_data$data = todo_data;
export type todo_data$key = {
    readonly " $data"?: todo_data$data;
    readonly " $fragmentRefs": FragmentRefs<"todo_data">;
};



const node: ReaderFragment = ({
    "kind": "Fragment",
    "name": "todo_data",
    "type": "TodoNode",
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
            "name": "completed",
            "args": null,
            "storageKey": null
        },
        {
            "kind": "ScalarField",
            "alias": null,
            "name": "text",
            "args": null,
            "storageKey": null
        }
    ]
} as any);
(node as any).hash = '6e3836d742de5b965cf7b9ef2d5de3d8';
export default node;
