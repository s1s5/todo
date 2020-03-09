/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoList_todolist = {
    readonly id: string;
    readonly title: string;
    readonly " $refType": "TodoList_todolist";
};
export type TodoList_todolist$data = TodoList_todolist;
export type TodoList_todolist$key = {
    readonly " $data"?: TodoList_todolist$data;
    readonly " $fragmentRefs": FragmentRefs<"TodoList_todolist">;
};



const node: ReaderFragment = ({
    "kind": "Fragment",
    "name": "TodoList_todolist",
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
(node as any).hash = 'bf1e2196360f861a3bddc03cd61be7ba';
export default node;
