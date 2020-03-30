/* tslint:disable */
/* eslint-disable */
/* @relayHash a4e94ad3ed53eddb9f86a059de691943 */

import { ConcreteRequest } from "relay-runtime";
export type todolistSubsc_SubscriptionVariables = {};
export type todolistSubsc_SubscriptionResponse = {
    readonly countSeconds: number | null;
};
export type todolistSubsc_Subscription = {
    readonly response: todolistSubsc_SubscriptionResponse;
    readonly variables: todolistSubsc_SubscriptionVariables;
};



/*
subscription todolistSubsc_Subscription {
  countSeconds(upTo: 10)
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
                    "value": 10
                }
            ],
            "storageKey": "countSeconds(upTo:10)"
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolistSubsc_Subscription",
            "type": "Subscription",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistSubsc_Subscription",
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "params": {
            "operationKind": "subscription",
            "name": "todolistSubsc_Subscription",
            "id": null,
            "text": "subscription todolistSubsc_Subscription {\n  countSeconds(upTo: 10)\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '0f18edeee0957a0476a4dce0bfb80d41';
export default node;
