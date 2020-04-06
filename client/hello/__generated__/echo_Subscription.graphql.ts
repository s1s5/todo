/* tslint:disable */
/* eslint-disable */
/* @relayHash 0db62ff308cb51909303f9834b2af4ab */

import { ConcreteRequest } from "relay-runtime";
export type echo_SubscriptionVariables = {};
export type echo_SubscriptionResponse = {
    readonly echo: string | null;
};
export type echo_Subscription = {
    readonly response: echo_SubscriptionResponse;
    readonly variables: echo_SubscriptionVariables;
};



/*
subscription echo_Subscription {
  echo
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "ScalarField",
            "alias": null,
            "name": "echo",
            "args": null,
            "storageKey": null
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "echo_Subscription",
            "type": "Subscription",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "echo_Subscription",
            "argumentDefinitions": [],
            "selections": (v0 /*: any*/)
        },
        "params": {
            "operationKind": "subscription",
            "name": "echo_Subscription",
            "id": null,
            "text": "subscription echo_Subscription {\n  echo\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '78fffa1aa52e61d117913ff236e8d184';
export default node;
