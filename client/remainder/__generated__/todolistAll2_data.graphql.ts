/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistAll2_data = {
    readonly id: string;
    readonly title: string;
    readonly todoSet: {
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly hasPreviousPage: boolean;
            readonly startCursor: string | null;
            readonly endCursor: string | null;
        };
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"todo_data">;
            } | null;
        } | null>;
    } | null;
    readonly " $refType": "todolistAll2_data";
};
export type todolistAll2_data$data = todolistAll2_data;
export type todolistAll2_data$key = {
    readonly " $data"?: todolistAll2_data$data;
    readonly " $fragmentRefs": FragmentRefs<"todolistAll2_data">;
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
        "name": "todolistAll2_data",
        "type": "TodoListNode",
        "metadata": {
            "connection": [
                {
                    "count": null,
                    "cursor": null,
                    "direction": "bidirectional",
                    "path": [
                        "todoSet"
                    ]
                }
            ]
        },
        "argumentDefinitions": [
            {
                "kind": "LocalArgument",
                "name": "first",
                "type": "Int",
                "defaultValue": null
            },
            {
                "kind": "LocalArgument",
                "name": "last",
                "type": "Int",
                "defaultValue": null
            },
            {
                "kind": "LocalArgument",
                "name": "before",
                "type": "String",
                "defaultValue": null
            },
            {
                "kind": "LocalArgument",
                "name": "after",
                "type": "String",
                "defaultValue": null
            }
        ],
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
                "alias": "todoSet",
                "name": "__todolist_todoSet_connection",
                "storageKey": "__todolist_todoSet_connection(orderBy:\"-created_at\")",
                "args": [
                    {
                        "kind": "Literal",
                        "name": "orderBy",
                        "value": "-created_at"
                    }
                ],
                "concreteType": "TodoNodeConnection",
                "plural": false,
                "selections": [
                    {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "pageInfo",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "plural": false,
                        "selections": [
                            {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "hasNextPage",
                                "args": null,
                                "storageKey": null
                            },
                            {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "hasPreviousPage",
                                "args": null,
                                "storageKey": null
                            },
                            {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "startCursor",
                                "args": null,
                                "storageKey": null
                            },
                            {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "endCursor",
                                "args": null,
                                "storageKey": null
                            }
                        ]
                    },
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
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "cursor",
                                "args": null,
                                "storageKey": null
                            },
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
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "__typename",
                                        "args": null,
                                        "storageKey": null
                                    },
                                    {
                                        "kind": "FragmentSpread",
                                        "name": "todo_data",
                                        "args": null
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
(node as any).hash = 'dcbe03f80a0125ea62f584c67398f633';
export default node;
