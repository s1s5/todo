/* tslint:disable */
/* eslint-disable */
/* @relayHash 9c39d47a893bdd5957781636731cd0c2 */

import { ConcreteRequest } from "relay-runtime";
export type todoSubsc_SubscriptionVariables = {
    id: string;
};
export type todoSubsc_SubscriptionResponse = {
    readonly todolistMutation: {
        readonly operation: string | null;
        readonly todolist: {
            readonly id: string;
            readonly title: string;
        } | null;
        readonly todo: {
            readonly id: string;
            readonly completed: boolean;
            readonly text: string;
        } | null;
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
    ], v1 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any), v2 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todolistMutation",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "id"
                }
            ],
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
                        (v1 /*: any*/),
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
                        (v1 /*: any*/),
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
            "selections": (v2 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todoSubsc_Subscription",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v2 /*: any*/)
        },
        "params": {
            "operationKind": "subscription",
            "name": "todoSubsc_Subscription",
            "id": null,
            "text": "subscription todoSubsc_Subscription(\n  $id: ID!\n) {\n  todolistMutation(id: $id) {\n    operation\n    todolist {\n      id\n      title\n    }\n    todo {\n      id\n      completed\n      text\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'ba633f666a644d3683f6b5982898f8e3';
export default node;
