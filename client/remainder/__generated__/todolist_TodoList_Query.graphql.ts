/* tslint:disable */
/* eslint-disable */
/* @relayHash e730f2529151eb6919c6edaed071c0c2 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type todolist_TodoList_QueryVariables = {
    id: string;
};
export type todolist_TodoList_QueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"todolist_query">;
};
export type todolist_TodoList_Query = {
    readonly response: todolist_TodoList_QueryResponse;
    readonly variables: todolist_TodoList_QueryVariables;
};



/*
query todolist_TodoList_Query(
  $id: ID!
) {
  ...todolist_query_1Bmzm5
}

fragment todo_todo on TodoNode {
  id
  completed
  text
}

fragment todolist_query_1Bmzm5 on Query {
  todolist(id: $id) {
    id
    title
    todoSet {
      edges {
        node {
          id
          ...todo_todo
        }
      }
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
            "name": "todolist_TodoList_Query",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "FragmentSpread",
                    "name": "todolist_query",
                    "args": (v1 /*: any*/)
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "todolist_TodoList_Query",
            "argumentDefinitions": (v0 /*: any*/),
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "todolist",
                    "storageKey": null,
                    "args": (v1 /*: any*/),
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
                        },
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
                        }
                    ]
                }
            ]
        },
        "params": {
            "operationKind": "query",
            "name": "todolist_TodoList_Query",
            "id": null,
            "text": "query todolist_TodoList_Query(\n  $id: ID!\n) {\n  ...todolist_query_1Bmzm5\n}\n\nfragment todo_todo on TodoNode {\n  id\n  completed\n  text\n}\n\nfragment todolist_query_1Bmzm5 on Query {\n  todolist(id: $id) {\n    id\n    title\n    todoSet {\n      edges {\n        node {\n          id\n          ...todo_todo\n        }\n      }\n    }\n  }\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '756d20b5e91e58ddc299f05850c468e5';
export default node;
