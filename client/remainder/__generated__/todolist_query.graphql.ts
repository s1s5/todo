/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolist_query = {
    readonly todolist: {
        readonly id: string;
        readonly title: string;
        readonly todoSet: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"todo_todo">;
                } | null;
            } | null>;
        };
    } | null;
    readonly " $refType": "todolist_query";
};
export type todolist_query$data = todolist_query;
export type todolist_query$key = {
    readonly " $data"?: todolist_query$data;
    readonly " $fragmentRefs": FragmentRefs<"todolist_query">;
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
                    (v0 /*: any*/),
                    {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "title",
                        "args": null,
                        "storageKey": null
                    },
                    {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "todoSet",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "TodoNodeConnection",
                        "plural": false,
                        "selections": [
                            {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "edges",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "TodoNodeEdge",
                                "plural": true,
                                "selections": [
                                    {
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "name": "node",
                                        "storageKey": null,
                                        "args": null,
                                        "concreteType": "TodoNode",
                                        "plural": false,
                                        "selections": [
                                            (v0 /*: any*/),
                                            {
                                                "kind": "FragmentSpread",
                                                "name": "todo_todo",
                                                "args": null
                                            }
                                        ]
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
(node as any).hash = 'e618125d834a6dfb88f80a9fc92f43e4';
export default node;
