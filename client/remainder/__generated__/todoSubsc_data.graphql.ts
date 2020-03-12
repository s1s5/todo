/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todoSubsc_data = {
    readonly operation: string | null;
    readonly todolist: {
        readonly id: string;
        readonly title: string;
    } | null;
    readonly todo: {
        readonly id: string;
        readonly completed: boolean;
        readonly text: string;
    } | null;
    readonly " $refType": "todoSubsc_data";
};
export type todoSubsc_data$data = todoSubsc_data;
export type todoSubsc_data$key = {
    readonly " $data"?: todoSubsc_data$data;
    readonly " $fragmentRefs": FragmentRefs<"todoSubsc_data">;
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
        "name": "todoSubsc_data",
        "type": "TodoListMutation",
        "metadata": null,
        "argumentDefinitions": [],
        "selections": [
            {
                "kind": "ScalarField",
                "alias": null,
                "name": "operation",
                "args": null,
                "storageKey": null
            },
            {
                "kind": "LinkedField",
                "alias": null,
                "name": "todolist",
                "storageKey": null,
                "args": null,
                "concreteType": "TodoListNode",
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
            },
            {
                "kind": "LinkedField",
                "alias": null,
                "name": "todo",
                "storageKey": null,
                "args": null,
                "concreteType": "TodoNode",
                "plural": false,
                "selections": [
                    (v0 /*: any*/),
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
            }
        ]
    } as any;
})();
(node as any).hash = '42c8dd7d891c2ced71e1caf595e63fca';
export default node;
