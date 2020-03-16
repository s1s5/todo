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
} from 'relay-runtime'

import {ReactRelayContext} from 'react-relay'

import fetchQuery from './fetch-query'
import SubscriptionSetupper from './subscription-setupper'

type Props = {
    post_url: string,
    ws_url?: string,
    children: React.ReactNode,
}

const EnvironmentProvider = (props: Props) => {
    const environment = React.useMemo(() => {
        const fetch_query = (
            request: RequestParameters,
            variables: Variables,
            cacheConfig: CacheConfig,
            uploadables?: UploadableMap | null) => fetchQuery(
                props.post_url, request, variables, cacheConfig, uploadables)

        let network;
        if (props.ws_url) {
            const subsc_set_upper = new SubscriptionSetupper(props.ws_url)
            network = Network.create(fetch_query, subsc_set_upper.setup)
        } else {
            network = Network.create(fetch_query)
        }
        return new Environment({
            network: network,
            store: new Store(new RecordSource()),  
        })
    }, [props.post_url, props.ws_url])
    return (
        <ReactRelayContext.Provider value={ {environment} }>
          { props.children }
        </ReactRelayContext.Provider>
    )
}

export default EnvironmentProvider;

