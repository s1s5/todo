/* tslint:disable */
/* eslint-disable */
/* @relayHash 9dbb56f53a70af649a8af0695bb96383 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todoTest_test_QueryVariables = {};
export type todoTest_test_QueryResponse = {
    readonly todolist: {
        readonly id: string;
        readonly todoSet: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly " $fragmentRefs": FragmentRefs<"todo_data">;
                } | null;
            } | null>;
        };
    } | null;
};
export type todoTest_test_Query = {
    readonly response: todoTest_test_QueryResponse;
    readonly variables: todoTest_test_QueryVariables;
};



/*
query todoTest_test_Query {
  todolist(id: "test-id") {
    id
    todoSet {
      edges {
        node {
          ...todo_data
          id
        }
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
            "kind": "Literal",
            "name": "id",
            "value": "test-id"
        } as any)
    ], v1 = ({
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
    } as any), v2 = ({
        "type": "ID",
        "enumValues": null,
        "plural": false,
        "nullable": false
    } as any);
    return {
        "kind": "Request",
        "fragment": {
            "kind": "Fragment",
            "name": "todoTest_test_Query",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todolist",
                    "storageKey": "todolist(id:\"test-id\")",
                    "args": (v0 /*: any*/),
                    "concreteType": "TodoListNode",
                    "plural": false,
                    "selections": [
                        (v1 /*: any*/),
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "todoSet",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "TodoNodeConnection",
                            "plural": false,
                            "selections": [
                                {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "edges",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "TodoNodeEdge",
                                    "plural": true,
                                    "selections": [
                                        {
                                            "kind": "LinkedField",
                                            "alias": null,
                                            "name": "node",
                                            "storageKey": null,
                                            "args": null,
                                            "concreteType": "TodoNode",
                                            "plural": false,
                                            "selections": [
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
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todoTest_test_Query",
            "argumentDefinitions": [],
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todolist",
                    "storageKey": "todolist(id:\"test-id\")",
                    "args": (v0 /*: any*/),
                    "concreteType": "TodoListNode",
                    "plural": false,
                    "selections": [
                        (v1 /*: any*/),
                        {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "todoSet",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "TodoNodeConnection",
                            "plural": false,
                            "selections": [
                                {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "edges",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "TodoNodeEdge",
                                    "plural": true,
                                    "selections": [
                                        {
                                            "kind": "LinkedField",
                                            "alias": null,
                                            "name": "node",
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
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "params": {
            "operationKind": "query",
            "name": "todoTest_test_Query",
            "id": null,
            "text": "query todoTest_test_Query {\n  todolist(id: \"test-id\") {\n    id\n    todoSet {\n      edges {\n        node {\n          ...todo_data\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment todo_data on TodoNode {\n  id\n  completed\n  text\n}\n",
            "metadata": {
                "relayTestingSelectionTypeInfo": {
                    "todolist": {
                        "type": "TodoListNode",
                        "enumValues": null,
                        "plural": false,
                        "nullable": true
                    },
                    "todolist.id": (v2 /*: any*/),
                    "todolist.todoSet": {
                        "type": "TodoNodeConnection",
                        "enumValues": null,
                        "plural": false,
                        "nullable": false
                    },
                    "todolist.todoSet.edges": {
                        "type": "TodoNodeEdge",
                        "enumValues": null,
                        "plural": true,
                        "nullable": false
                    },
                    "todolist.todoSet.edges.node": {
                        "type": "TodoNode",
                        "enumValues": null,
                        "plural": false,
                        "nullable": true
                    },
                    "todolist.todoSet.edges.node.id": (v2 /*: any*/),
                    "todolist.todoSet.edges.node.completed": {
                        "type": "Boolean",
                        "enumValues": null,
                        "plural": false,
                        "nullable": false
                    },
                    "todolist.todoSet.edges.node.text": {
                        "type": "String",
                        "enumValues": null,
                        "plural": false,
                        "nullable": false
                    }
                }
            }
        }
    } as any;
})();
(node as any).hash = '4e8abe4c75d71d456c0e75b7b4e3935c';
export default node;
