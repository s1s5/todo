/* tslint:disable */
/* eslint-disable */
/* @relayHash 74141973317f4eca48765e10ee5d3746 */

import { ConcreteRequest } from "relay-runtime";
export type todolistSubsc_SubscriptionVariables = {
    id: string;
};
export type todolistSubsc_SubscriptionResponse = {
    readonly todoCreated: {
        readonly id: string;
        readonly completed: boolean;
        readonly text: string;
    } | null;
};
export type todolistSubsc_Subscription = {
    readonly response: todolistSubsc_SubscriptionResponse;
    readonly variables: todolistSubsc_SubscriptionVariables;
};



/*
subscription todolistSubsc_Subscription(
  $id: ID!
) {
  todoCreated(parentId: $id) {
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
            "name": "todoCreated",
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
            "name": "todolistSubsc_Subscription",
            "type": "Subscription",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistSubsc_Subscription",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "subscription",
            "name": "todolistSubsc_Subscription",
            "id": null,
            "text": "subscription todolistSubsc_Subscription(\n  $id: ID!\n) {\n  todoCreated(parentId: $id) {\n    id\n    completed\n    text\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '2379351549145c3e6055167caf7e3b93';
export default node;
