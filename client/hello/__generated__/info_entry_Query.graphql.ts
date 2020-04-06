/* tslint:disable */
/* eslint-disable */
/* @relayHash 7a3caf4f4497ca28fe8d916fef49bf4a */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type info_entry_QueryVariables = {};
export type info_entry_QueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"info_query">;
};
export type info_entry_Query = {
    readonly response: info_entry_QueryResponse;
    readonly variables: info_entry_QueryVariables;
};



/*
query info_entry_Query {
  ...info_query
}

fragment info_query on Query {
  info {
    version
    moduleName
  }
}
*/

const node: ConcreteRequest = ({
    "kind": "Request",
    "fragment": {
        "kind": "Fragment",
        "name": "info_entry_Query",
        "type": "Query",
        "metadata": null,
        "argumentDefinitions": [],
        "selections": [
            {
                "kind": "FragmentSpread",
                "name": "info_query",
                "args": null
            }
        ]
    },
    "operation": {
        "kind": "Operation",
        "name": "info_entry_Query",
        "argumentDefinitions": [],
        "selections": [
            {
                "kind": "LinkedField",
                "alias": null,
                "name": "info",
                "storageKey": null,
                "args": null,
                "concreteType": "InfoType",
                "plural": false,
                "selections": [
                    {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "version",
                        "args": null,
                        "storageKey": null
                    },
                    {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "moduleName",
                        "args": null,
                        "storageKey": null
                    }
                ]
            }
        ]
    },
    "params": {
        "operationKind": "query",
        "name": "info_entry_Query",
        "id": null,
        "text": "query info_entry_Query {\n  ...info_query\n}\n\nfragment info_query on Query {\n  info {\n    version\n    moduleName\n  }\n}\n",
        "metadata": {}
    }
} as any);
(node as any).hash = '8e43f888181ab6c7af3cfe507ea95467';
export default node;
