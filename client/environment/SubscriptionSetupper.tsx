import {
    RequestParameters,
    Variables,
    CacheConfig
} from 'relay-runtime'

import { SubscriptionClient } from 'subscriptions-transport-ws'

class SubscriptionSetupper {
    uri: string
    client: SubscriptionClient | null = null
    constructor(uri: string) {
        this.uri = uri
    }
    
    createClient() {
        this.client = new SubscriptionClient(this.uri, {reconnect: true})
        // https://github.com/apollographql/subscriptions-transport-ws
        // onConnected(callback, thisContext) => Function - shorthand for .on('connected', ...)
        // onReconnected(callback, thisContext) => Function - shorthand for .on('reconnected', ...)
        // onConnecting(callback, thisContext) => Function - shorthand for .on('connecting', ...)
        // onReconnecting(callback, thisContext) => Function - shorthand for .on('reconnecting', ...)
        // onDisconnected(callback, thisContext) => Function - shorthand for .on('disconnected', ...)
        // onError(callback, thisContext) => Function - shorthand for .on('error', ...)
        this.client.on('error', (error: any) => {
            console.error("client error", error)
        })
        console.log("createClient")
    }
    
    setup = (request: RequestParameters,
             variables: Variables,
             cacheConfig: CacheConfig) => {
                 if (this.client === null) {
                     this.createClient()
                 }
                 console.log("setup called")
                 const query = request.text!
                 const observable = this.client!.request({query, variables})
                 const d = {
                     subscribe: observable.subscribe,
                     dispose: () => {}
                 }
                 /* observable.subscribe({
                  *     next: (value: any) => {
                  *         if (value.errors !== undefined && value.errors !== null && value.errors.length > 0) {
                  *             console.error('subscribe Some Error occurred!!', value.errors)
                  *         }
                  *     }
                  * }) */
                 d.dispose = () => {
                     delete d.subscribe
                 }
                 return d
             }
}

export default SubscriptionSetupper
