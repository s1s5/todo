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

    Observer,
} from 'relay-runtime'

import {ReactRelayContext} from 'react-relay'

import fetchQuery from './fetch-query'
import { SubscriptionClient } from 'subscriptions-transport-ws'

type Props = {
    post_url: string,
    ws_url?: string,
    children: React.ReactNode,
}

let _global_counter = 0
let _globals:any = {}
const getId = () => {
    _global_counter += 1
    const v = _global_counter
    return v
}

const EnvironmentProvider = (props: Props) => {
    const [client, setClient] = React.useState<SubscriptionClient>()
    const [environment, setEnvironment] = React.useState<Environment>()

    React.useLayoutEffect(() => {
        const fetch_query = (
            request: RequestParameters,
            variables: Variables,
            cacheConfig: CacheConfig,
            uploadables?: UploadableMap | null) => fetchQuery(
                props.post_url, request, variables, cacheConfig, uploadables)

        let network
        if (props.ws_url) {
            console.log("creating subscription client")
            const c = new SubscriptionClient(props.ws_url!, {
                lazy: true,  // これがないとhot-reloadで二重で接続されたりする？
                reconnect: true,
            })
            c.on('error', (error: any) => {
                console.error("client error", error)
            })
            setClient(c)

            network = Network.create(
                fetch_query,
                (request: RequestParameters,
                 variables: Variables,
                 cacheConfig: CacheConfig) => {
                     const query = request.text!
                     const observable = c.request({query, variables})
                     const d = {
                         observable: observable,
                         subscribe: observable.subscribe,
                         dispose: () => {}
                     }
                     d.dispose = () => {
                         console.log("start dispose called @environment-provider")
                         /* delete d.subscribe*/
                         console.log("end dispose called @environment-provider")
                     }
                     console.log("network return => ", d)
                     return {
                         subscribe: (observer: any) => {
                             
                             console.log("@environment-provider set hook", observer)
                             const org_on_complete = observer.complete
                             observer.complete = () => {
                                 console.log("@environment-provider complete hook!!!!")
                                 org_on_complete()
                             }
                             const org_on_start = observer.start
                             observer.start = (subscription:any) => {
                                 console.log("@environment-provider subscription.start !!! hook ")
                                 org_on_start(subscription)
                             }
                             console.log("@environment-provider observable.subscribe()", observer, _global_counter)
                             /* const result = observable.subscribe(observer)*/
                             const result = observable.subscribe(observer)
                             _globals[_global_counter] = {
                                 result, observable,
                             }
                             console.log("@environment-provider observable.subscribe() -> result=", result, observer)
                             return {
                                 unsubscribe: () => {
                                     console.log("@environment-provider dispose called")
                                 },
                                 closed: false,
                                 foo: "@environment-provider",
                             }
                         },
                         dispose: () => {console.log("@environment-provider dispose called!!!")},
                         unsubscribe: () => {console.log("@environment-provider unsubscribe called!!!")},
                         unsubscribed: () => {console.log("@environment-provider unsubscribed called!!!")},
                         foo: "@environment-provider root returned value",
                         
                         }
                 })
        } else {
            network = Network.create(fetch_query)
        }
        // console.log("new environment created!!!", props.post_url, props.ws_url)
        setEnvironment(new Environment({
            network: network,
            store: new Store(new RecordSource()),  
        }))

        return () => {
            // console.log("client close", client === undefined)
            client && client.close()
        }
    }, [props.post_url, props.ws_url])
    
    if (environment === undefined) {
        return <></>
    }

    return (
        <ReactRelayContext.Provider value={ {environment} }>
          { props.children }
        </ReactRelayContext.Provider>
    )
}

export {getId, _globals}
export default EnvironmentProvider;

