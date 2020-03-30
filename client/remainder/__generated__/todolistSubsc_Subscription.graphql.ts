/* tslint:disable */
/* eslint-disable */
/* @relayHash 2fbd3c68832bdddb422bc89c29dfb17d */

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
  countSeconds(upTo: 3)
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
                    "value": 3
                }
            ],
            "storageKey": "countSeconds(upTo:3)"
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
            "text": "subscription todolistSubsc_Subscription {\n  countSeconds(upTo: 3)\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '51691bc3038a8b285d90673e0cee374d';
export default node;
