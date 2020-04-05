/* tslint:disable */
/* eslint-disable */
/* @relayHash dd740d30468767751e5a3d8ae2127f2a */

import { ConcreteRequest } from "relay-runtime";
export type todoSubsc2_SubscriptionVariables = {
    id: string;
};
export type todoSubsc2_SubscriptionResponse = {
    readonly todoCreated: {
        readonly id: string;
        readonly completed: boolean;
        readonly text: string;
    } | null;
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
  todoCreated(parentId: $id) {
    id
    completed
    text
  }
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
            "kind": "Variable",
            "name": "parentId",
            "variableName": "id"
        } as any)
    ], v2 = [
        ({
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
        } as any),
        ({
            "kind": "ScalarField",
            "alias": null,
            "name": "completed",
            "args": null,
            "storageKey": null
        } as any),
        ({
            "kind": "ScalarField",
            "alias": null,
            "name": "text",
            "args": null,
            "storageKey": null
        } as any)
    ], v3 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todoCreated",
            "storageKey": null,
            "args": (v1 /*: any*/),
            "concreteType": "TodoNode",
            "plural": false,
            "selections": (v2 /*: any*/)
        } as any),
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todoUpdated",
            "storageKey": null,
            "args": (v1 /*: any*/),
            "concreteType": "TodoNode",
            "plural": false,
            "selections": (v2 /*: any*/)
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
            "selections": (v3 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todoSubsc2_Subscription",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v3 /*: any*/)
        },
        "params": {
            "operationKind": "subscription",
            "name": "todoSubsc2_Subscription",
            "id": null,
            "text": "subscription todoSubsc2_Subscription(\n  $id: ID!\n) {\n  todoCreated(parentId: $id) {\n    id\n    completed\n    text\n  }\n  todoUpdated(parentId: $id) {\n    id\n    completed\n    text\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '5cfd7e211a54f95c3513a2e7248cb3ce';
export default node;
