/* tslint:disable */
/* eslint-disable */
/* @relayHash 9836127ef7fec0060e91cdd2d57c5f94 */

import { ConcreteRequest } from "relay-runtime";
export type todoSubsc_SubscriptionVariables = {
    id: string;
};
export type todoSubsc_SubscriptionResponse = {
    readonly todoUpdated: {
        readonly id: string;
        readonly completed: boolean;
        readonly text: string;
    } | null;
};
export type todoSubsc_Subscription = {
    readonly response: todoSubsc_SubscriptionResponse;
    readonly variables: todoSubsc_SubscriptionVariables;
};



/*
subscription todoSubsc_Subscription(
  $id: ID!
) {
  todoUpdated(parentId: $id) {
    id
    completed
    text
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "id",
            "type": "ID!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todoUpdated",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "parentId",
                    "variableName": "id"
                }
            ],
            "concreteType": "TodoNode",
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
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todoSubsc_Subscription",
            "type": "Subscription",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todoSubsc_Subscription",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "subscription",
            "name": "todoSubsc_Subscription",
            "id": null,
            "text": "subscription todoSubsc_Subscription(\n  $id: ID!\n) {\n  todoUpdated(parentId: $id) {\n    id\n    completed\n    text\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '895417246cf8b36c978a94a82b8e763b';
export default node;
