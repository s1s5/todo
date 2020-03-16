/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistRefetch_data = {
    readonly id: string;
    readonly title: string;
    readonly todoSet: {
        readonly pageInfo: {
            readonly endCursor: string | null;
        };
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"todo_data">;
            } | null;
        } | null>;
    };
    readonly " $refType": "todolistRefetch_data";
};
export type todolistRefetch_data$data = todolistRefetch_data;
export type todolistRefetch_data$key = {
    readonly " $data"?: todolistRefetch_data$data;
    readonly " $fragmentRefs": FragmentRefs<"todolistRefetch_data">;
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
        "name": "todolistRefetch_data",
        "type": "TodoListNode",
        "metadata": {
            "connection": [
                {
                    "count": "count",
                    "cursor": "after",
                    "direction": "forward",
                    "path": [
                        "todoSet"
                    ]
                }
            ]
        },
        "argumentDefinitions": [
            {
                "kind": "LocalArgument",
                "name": "count",
                "type": "Int",
                "defaultValue": 10
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
                "name": "__todolistRefetch_todoSet_connection",
                "storageKey": "__todolistRefetch_todoSet_connection(orderBy:\"-created_at\")",
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
                                "name": "endCursor",
                                "args": null,
                                "storageKey": null
                            },
                            {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "hasNextPage",
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
                            },
                            {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "cursor",
                                "args": null,
                                "storageKey": null
                            }
                        ]
                    }
                ]
            }
        ]
    } as any;
})();
(node as any).hash = '8b55165e850ad8ac6ea0baa5333b49d8';
export default node;
