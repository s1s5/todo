/* tslint:disable */
/* eslint-disable */
/* @relayHash 8510671585dac5d101f1276f93733760 */

import { ConcreteRequest } from "relay-runtime";
export type TodoUpdateFormMutationInput = {
    completed?: boolean | null;
    text: string;
    id?: string | null;
    clientMutationId?: string | null;
};
export type todoUpdate_MutationVariables = {
    input: TodoUpdateFormMutationInput;
};
export type todoUpdate_MutationResponse = {
    readonly todoUpdateForm: {
        readonly errors: ReadonlyArray<{
            readonly field: string;
            readonly messages: ReadonlyArray<string>;
        } | null> | null;
        readonly todo: {
            readonly id: string;
            readonly completed: boolean;
            readonly text: string;
        } | null;
    } | null;
};
export type todoUpdate_Mutation = {
    readonly response: todoUpdate_MutationResponse;
    readonly variables: todoUpdate_MutationVariables;
};



/*
mutation todoUpdate_Mutation(
  $input: TodoUpdateFormMutationInput!
) {
  todoUpdateForm(input: $input) {
    errors {
      field
      messages
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
            "name": "input",
            "type": "TodoUpdateFormMutationInput!",
            "defaultValue": null
        } as any)
    ], v1 = [
        ({
            "kind": "LinkedField",
            "alias": null,
            "name": "todoUpdateForm",
            "storageKey": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "input",
                    "variableName": "input"
                }
            ],
            "concreteType": "TodoUpdateFormMutationPayload",
            "plural": false,
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "errors",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ErrorType",
                    "plural": true,
                    "selections": [
                        {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "field",
                            "args": null,
                            "storageKey": null
                        },
                        {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "messages",
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
                }
            ]
        } as any)
    ];
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todoUpdate_Mutation",
            "type": "Mutation",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "operation": {
            "kind": "Operation",
            "name": "todoUpdate_Mutation",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": (v1 /*: any*/)
        },
        "params": {
            "operationKind": "mutation",
            "name": "todoUpdate_Mutation",
            "id": null,
            "text": "mutation todoUpdate_Mutation(\n  $input: TodoUpdateFormMutationInput!\n) {\n  todoUpdateForm(input: $input) {\n    errors {\n      field\n      messages\n    }\n    todo {\n      id\n      completed\n      text\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = 'a02d24a5ee12f1452cf18062ddb93050';
export default node;