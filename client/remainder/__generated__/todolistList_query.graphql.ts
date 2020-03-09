/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistList_query = {
    readonly todolists: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly title: string;
            } | null;
        } | null>;
    } | null;
    readonly " $refType": "todolistList_query";
};
export type todolistList_query$data = todolistList_query;
export type todolistList_query$key = {
    readonly " $data"?: todolistList_query$data;
    readonly " $fragmentRefs": FragmentRefs<"todolistList_query">;
};



const node: ReaderFragment = ({
    "kind": "Fragment",
    "name": "todolistList_query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
        {
            "kind": "LinkedField",
            "alias": null,
            "name": "todolists",
            "storageKey": null,
            "args": null,
            "concreteType": "TodoListNodeConnection",
            "plural": false,
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "TodoListNodeEdge",
                    "plural": true,
                    "selections": [
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
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
                }
            ]
        }
    ]
} as any);
(node as any).hash = '7e170785a4222187e180470e42912cf3';
export default node;
