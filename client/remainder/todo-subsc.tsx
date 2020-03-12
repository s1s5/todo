import * as React from 'react'
import { IEnvironment, Observer } from 'relay-runtime'
import { graphql, requestSubscription } from 'react-relay'
import { createSubscription } from "create-subscription";

// export type Data = {
//     operation: string,
//     todolist?: {
//         id: string,
//         title: string,
//     },
//     todo?: {
//         id: string,
//         completed: boolean,
//         text: string
//     }
// }
import {todoSubsc_data as Data} from './__generated__/todoSubsc_data.graphql'
const fragment = graphql`
fragment todoSubsc_data on TodoListMutation {
    operation
    todolist {
        id
        title
    }
    todo {
        id
        completed
        text
    }
}`


const request_subscription = (id:string, environment:IEnvironment, observer: Observer<Data>) => {
    const subscriptionConfig = {
        subscription: graphql`
            subscription todoSubsc_Subscription($id: ID!) {
                # 一個しか無理？
                # todoCreated(parentId: $id) {
                #     id
                #     completed
                #     text
                # }
                # todoUpdated(parentId: $id) {
                #     id
                #     completed
                #     text
                # }
                todolistMutation(id: $id) {
                    ... todoSubsc_data
                }
            }
        `,
        variables: {id: id},
        /* updater: (data:any) => {
         *     console.log(data)
         * },*/
        // updater?: SelectorStoreUpdater<TSubscriptionPayload>
        // updaterとonNextどっちも呼ばれる
        // updater: (data:any) => console.log("updater@request_hello_subscription", data),
        onNext: (data:Data) => (observer.next && observer.next(data)),
        onError: (error:Error) => (observer.error && observer.error(error)),
        onComplete: () => (observer.complete && observer.complete()),
    }
    console.log(subscriptionConfig)
    const {dispose} = requestSubscription(
        environment,
        subscriptionConfig
    )
    const subsc = {unsubscribe: dispose, closed: false}
    observer.start && observer.start(subsc) 
    return () => {
        observer.unsubscribe && observer.unsubscribe(subsc)
        dispose()
    }
}

export default createSubscription<{environment: IEnvironment, id:string, observer: Observer<Data>}, any>({
    getCurrentValue: (_: any) => undefined,
    subscribe: (source: any, _:any) => {
        return  request_subscription(source.id, source.environment, source.observer)
    }
})
