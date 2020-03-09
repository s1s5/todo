import {
    Environment,
    Network,
    RecordSource,
    Store,
    RequestParameters,
    Variables,
    UploadableMap,
    CacheConfig
} from 'relay-runtime';

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

export default createEnvironment
