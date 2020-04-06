/* tslint:disable */
/* eslint-disable */
/* @relayHash 1c9d85a7bda98dec921e1fa27e4f7b19 */

import { ConcreteRequest } from "relay-runtime";
export type someHeavyOperation_SubscriptionVariables = {};
export type someHeavyOperation_SubscriptionResponse = {
    readonly someHeavyOperation: string | null;
};
export type someHeavyOperation_Subscription = {
    readonly response: someHeavyOperation_SubscriptionResponse;
    readonly variables: someHeavyOperation_SubscriptionVariables;
};



/*
subscription someHeavyOperation_Subscription {
  someHeavyOperation
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "ScalarField",
            "alias": null,
            "name": "someHeavyOperation",
            "args": null,
            "storageKey": null
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "someHeavyOperation_Subscription",
            "type": "Subscription",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "someHeavyOperation_Subscription",
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "params": {
            "operationKind": "subscription",
            "name": "someHeavyOperation_Subscription",
            "id": null,
            "text": "subscription someHeavyOperation_Subscription {\n  someHeavyOperation\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '418464d357485f67fa1a799e5f65d940';
export default node;
