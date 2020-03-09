/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolist_todolist = {
    readonly id: string;
    readonly title: string;
    readonly " $refType": "todolist_todolist";
};
export type todolist_todolist$data = todolist_todolist;
export type todolist_todolist$key = {
    readonly " $data"?: todolist_todolist$data;
    readonly " $fragmentRefs": FragmentRefs<"todolist_todolist">;
};



const node: ReaderFragment = ({
    "kind": "Fragment",
    "name": "todolist_todolist",
    "type": "TodoListNode",
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
            "name": "title",
            "args": null,
            "storageKey": null
        }
    ]
} as any);
(node as any).hash = 'a030b09ebba4f27eee7d8c9529dd864f';
export default node;
