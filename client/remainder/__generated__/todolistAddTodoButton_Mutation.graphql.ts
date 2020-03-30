/* tslint:disable */
/* eslint-disable */
/* @relayHash 1e37345b0fc27e38d086d5831117af3f */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoCreateMutationInput = {
    todolist: string;
    text?: string | null;
    clientMutationId?: string | null;
};
export type todolistAddTodoButton_MutationVariables = {
    input: TodoCreateMutationInput;
};
export type todolistAddTodoButton_MutationResponse = {
    readonly todoCreate: {
        readonly todo: {
            readonly id: string;
            readonly completed: boolean;
            readonly text: string;
        } | null;
        readonly edge: {
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"todo_data">;
            } | null;
        } | null;
    } | null;
};
export type todolistAddTodoButton_Mutation = {
    readonly response: todolistAddTodoButton_MutationResponse;
    readonly variables: todolistAddTodoButton_MutationVariables;
};



/*
mutation todolistAddTodoButton_Mutation(
  $input: TodoCreateMutationInput!
) {
  todoCreate(input: $input) {
    todo {
      id
      completed
      text
    }
    edge {
      cursor
      node {
        id
        ...todo_data
      }
    }
  }
}

fragment todo_data on TodoNode {
  id
  completed
  text
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "kind": "LocalArgument",
            "name": "input",
            "type": "TodoCreateMutationInput!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "input",
            "variableName": "input"
        } as any)
    ], v2 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any), v3 = [
        (v2 /*: any*/),
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
    ], v4 = ({
        "kind": "LinkedField",
        "alias": null,
        "name": "todo",
        "storageKey": null,
        "args": null,
        "concreteType": "TodoNode",
        "plural": false,
        "selections": (v3 /*: any*/)
    } as any), v5 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "cursor",
        "args": null,
        "storageKey": null
    } as any);
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todolistAddTodoButton_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todoCreate",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "TodoCreateMutationPayload",
                    "plural": false,
                    "selections": [
                        (v4 /*: any*/),
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edge",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "TodoNodeEdge",
                            "plural": false,
                            "selections": [
                                (v5 /*: any*/),
                                {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "node",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "TodoNode",
                                    "plural": false,
                                    "selections": [
                                        (v2 /*: any*/),
                                        {
                                            "kind": "FragmentSpread",
                                            "name": "todo_data",
                                            "args": null
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todolistAddTodoButton_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todoCreate",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "TodoCreateMutationPayload",
                    "plural": false,
                    "selections": [
                        (v4 /*: any*/),
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edge",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "TodoNodeEdge",
                            "plural": false,
                            "selections": [
                                (v5 /*: any*/),
                                {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "node",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "TodoNode",
                                    "plural": false,
                                    "selections": (v3 /*: any*/)
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "params": {
            "operationKind": "mutation",
            "name": "todolistAddTodoButton_Mutation",
            "id": null,
            "text": "mutation todolistAddTodoButton_Mutation(\n  $input: TodoCreateMutationInput!\n) {\n  todoCreate(input: $input) {\n    todo {\n      id\n      completed\n      text\n    }\n    edge {\n      cursor\n      node {\n        id\n        ...todo_data\n      }\n    }\n  }\n}\n\nfragment todo_data on TodoNode {\n  id\n  completed\n  text\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'c8981e12081c39a6410784c88e24a568';
export default node;
