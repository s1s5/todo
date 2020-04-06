/* tslint:disable */
/* eslint-disable */
/* @relayHash 86d90e728ac697836595945b8119b470 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type someStaticDatas_QueryVariables = {};
export type someStaticDatas_QueryResponse = {
    readonly someStaticDatas: ReadonlyArray<{
        readonly id: string | null;
        readonly " $fragmentRefs": FragmentRefs<"someStaticDatas_data">;
    } | null> | null;
};
export type someStaticDatas_Query = {
    readonly response: someStaticDatas_QueryResponse;
    readonly variables: someStaticDatas_QueryVariables;
};



/*
query someStaticDatas_Query {
  someStaticDatas {
    id
    ...someStaticDatas_data
  }
}

fragment someStaticDatas_data on StaticDataType {
  id
  name
  bytes
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
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
            "name": "someStaticDatas_Query",
            "type": "Query",
            "metadata": null,
            "argumentDefinitions": [],
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "someStaticDatas",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "StaticDataType",
                    "plural": true,
                    "selections": [
                        (v0 /*: any*/),
                        {
                            "kind": "FragmentSpread",
                            "name": "someStaticDatas_data",
                            "args": null
                        }
                    ]
                }
            ]
        },
        "operation": {
            "kind": "Operation",
            "name": "someStaticDatas_Query",
            "argumentDefinitions": [],
            "selections": [
                {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "someStaticDatas",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "StaticDataType",
                    "plural": true,
                    "selections": [
                        (v0 /*: any*/),
                        {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "name",
                            "args": null,
                            "storageKey": null
                        },
                        {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "bytes",
                            "args": null,
                            "storageKey": null
                        }
                    ]
                }
            ]
        },
        "params": {
            "operationKind": "query",
            "name": "someStaticDatas_Query",
            "id": null,
            "text": "query someStaticDatas_Query {\n  someStaticDatas {\n    id\n    ...someStaticDatas_data\n  }\n}\n\nfragment someStaticDatas_data on StaticDataType {\n  id\n  name\n  bytes\n}\n",
            "metadata": {}
        }
    } as any;
})();
(node as any).hash = '37ef5e154ac9e0a2131b246b9efbaca3';
export default node;
