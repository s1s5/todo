/* tslint:disable */
/* eslint-disable */
/* @relayHash fdfd8bf9478e3c47fd6b6826e7fbea58 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todoSubsc_SubscriptionVariables = {
    id: string;
};
export type todoSubsc_SubscriptionResponse = {
    readonly todolistMutation: {
        readonly " $fragmentRefs": FragmentRefs<"todoSubsc_data">;
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
  todolistMutation(id: $id) {
    ...todoSubsc_data
  }
}

fragment todoSubsc_data on TodoListMutation {
  operation
  todolist {
    id
    title
  }
  todo {
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
            "name": "id",
            "variableName": "id"
        } as any)
    ], v2 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any);
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todoSubsc_Subscription",
            "type": "Subscription",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todolistMutation",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "TodoListMutation",
                    "plural": false,
                    "selections": [
                        {
                            "kind": "FragmentSpread",
                            "name": "todoSubsc_data",
                            "args": null
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todoSubsc_Subscription",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todolistMutation",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "TodoListMutation",
                    "plural": false,
                    "selections": [
                        {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "operation",
                            "args": null,
                            "storageKey": null
                        },
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "todolist",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "TodoListNode",
                            "plural": false,
                            "selections": [
                                (v2 /*: any*/),
                                {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "title",
                                    "args": null,
                                    "storageKey": null
                                }
                            ]
                        },
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "todo",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "TodoNode",
                            "plural": false,
                            "selections": [
                                (v2 /*: any*/),
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
                        }
                    ]
                }
            ]
        },
        "params": {
            "operationKind": "subscription",
            "name": "todoSubsc_Subscription",
            "id": null,
            "text": "subscription todoSubsc_Subscription(\n  $id: ID!\n) {\n  todolistMutation(id: $id) {\n    ...todoSubsc_data\n  }\n}\n\nfragment todoSubsc_data on TodoListMutation {\n  operation\n  todolist {\n    id\n    title\n  }\n  todo {\n    id\n    completed\n    text\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '09e675831a3e19ae396d038d87ad6458';
export default node;
