/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolistAll_query = {
    readonly todolist: {
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
    } | null;
    readonly " $refType": "todolistAll_query";
};
export type todolistAll_query$data = todolistAll_query;
export type todolistAll_query$key = {
    readonly " $data"?: todolistAll_query$data;
    readonly " $fragmentRefs": FragmentRefs<"todolistAll_query">;
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
        "name": "todolistAll_query",
        "type": "Query",
        "metadata": {
            "connection": [
                {
                    "count": null,
                    "cursor": null,
                    "direction": "forward",
                    "path": [
                        "todolist",
                        "todoSet"
                    ]
                }
            ]
        },
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
                        "alias": "todoSet",
                        "name": "__todolist_todoSet_connection",
                        "storageKey": null,
                        "args": null,
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
            }
        ]
    } as any;
})();
(node as any).hash = '85ff722abc1e90a842ac41810e20a493';
export default node;
