/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todo_todo = {
    readonly id: string;
    readonly completed: boolean;
    readonly text: string;
    readonly " $refType": "todo_todo";
};
export type todo_todo$data = todo_todo;
export type todo_todo$key = {
    readonly " $data"?: todo_todo$data;
    readonly " $fragmentRefs": FragmentRefs<"todo_todo">;
};



const node: ReaderFragment = ({
    "kind": "Fragment",
    "name": "todo_todo",
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
(node as any).hash = 'cb277407086a68fa5dd24b6e8bde74f4';
export default node;
