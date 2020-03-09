import * as React from 'react'

import {
    Environment,
    Network,
    RecordSource,
    Store,
    RequestParameters,
    Variables,
    UploadableMap,
    CacheConfig,
//    RelayContext
} from 'relay-runtime';

import {ReactRelayContext} from 'react-relay';

import fetchQuery from './fetchQuery'
import SubscriptionSetupper from './SubscriptionSetupper'

const createEnvironment = (post_url:string, ws_url?:string) => {
    const fetch_query = (request: RequestParameters,
                         variables: Variables,
                         cacheConfig: CacheConfig,
                         uploadables?: UploadableMap | null) => fetchQuery(post_url, request, variables, cacheConfig, uploadables)
    const subsc_set_upper = new SubscriptionSetupper(ws_url)
    return  new Environment({
        network: Network.create(fetch_query, subsc_set_upper.setup),
        store: new Store(new RecordSource()),  
    });
}

type WithEnvironmentProps = {
    environment: Environment,
};

// HOC
const withEnvironment = <P extends object>(
Component: React.ComponentType<P>,
): React.FC<Omit<P, keyof WithEnvironmentProps>> => props => (
    <ReactRelayContext.Consumer>
      {({ environment }) => <Component {...props as P} environment={ environment } />}
    </ReactRelayContext.Consumer>
);

export {createEnvironment, withEnvironment}
