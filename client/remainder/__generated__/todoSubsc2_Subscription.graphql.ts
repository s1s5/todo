/* tslint:disable */
/* eslint-disable */
/* @relayHash 16ab0f58e8ddb53611ef8470d7729e3a */

import { ConcreteRequest } from "relay-runtime";
export type todoSubsc2_SubscriptionVariables = {
    id: string;
};
export type todoSubsc2_SubscriptionResponse = {
    readonly todoUpdated: {
        readonly id: string;
        readonly completed: boolean;
        readonly text: string;
    } | null;
};
export type todoSubsc2_Subscription = {
    readonly response: todoSubsc2_SubscriptionResponse;
    readonly variables: todoSubsc2_SubscriptionVariables;
};



/*
subscription todoSubsc2_Subscription(
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
            "name": "todoSubsc2_Subscription",
            "type": "Subscription",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todoSubsc2_Subscription",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "subscription",
            "name": "todoSubsc2_Subscription",
            "id": null,
            "text": "subscription todoSubsc2_Subscription(\n  $id: ID!\n) {\n  todoUpdated(parentId: $id) {\n    id\n    completed\n    text\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'f8bab5c7aae9fc2997c446f89d6dc098';
export default node;
