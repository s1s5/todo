/* tslint:disable */
/* eslint-disable */
/* @relayHash 65eabe6c2ee4a19924f7178ea71b4223 */

import { ConcreteRequest } from "relay-runtime";
export type countSeconds_SubscriptionVariables = {};
export type countSeconds_SubscriptionResponse = {
    readonly countSeconds: number | null;
};
export type countSeconds_Subscription = {
    readonly response: countSeconds_SubscriptionResponse;
    readonly variables: countSeconds_SubscriptionVariables;
};



/*
subscription countSeconds_Subscription {
  countSeconds(upTo: 5)
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "ScalarField",
            "alias": null,
            "name": "countSeconds",
            "args": [
                {
                    "kind": "Literal",
                    "name": "upTo",
                    "value": 5
                }
            ],
            "storageKey": "countSeconds(upTo:5)"
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "countSeconds_Subscription",
            "type": "Subscription",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "countSeconds_Subscription",
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "params": {
            "operationKind": "subscription",
            "name": "countSeconds_Subscription",
            "id": null,
            "text": "subscription countSeconds_Subscription {\n  countSeconds(upTo: 5)\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'c9edb1ac33269447e7db5dcabe694f25';
export default node;
