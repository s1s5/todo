/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolist_query = {
    readonly todolist: {
        readonly id: string;
        readonly title: string;
    } | null;
    readonly " $refType": "todolist_query";
};
export type todolist_query$data = todolist_query;
export type todolist_query$key = {
    readonly " $data"?: todolist_query$data;
    readonly " $fragmentRefs": FragmentRefs<"todolist_query">;
};



const node: ReaderFragment = ({
    "kind": "Fragment",
    "name": "todolist_query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [
        {
            "kind": "LocalArgument",
            "name": "id",
            "type": "ID!",
            "defaultValue": null
        }
    ],
    "selections": [
        {
            "kind": "LinkedField",
            "alias": null,
            "name": "todolist",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "id"
                }
            ],
            "concreteType": "TodoListNode",
            "plural": false,
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
        }
    ]
} as any);
(node as any).hash = '05ba462ce27d6b005d8fdd72f7318894';
export default node;
