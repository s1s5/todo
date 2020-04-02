import * as React from 'react'
import { IEnvironment, Observer, Variables, GraphQLSubscriptionConfig } from 'relay-runtime'
import { graphql, requestSubscription } from 'react-relay'
// import { createSubscription } from "create-subscription";

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

export {fragment}

const request_subscription = (environment:IEnvironment, observer: Observer<Data>, variables: Variables | undefined) => {
    // console.log("request_subscription", environment, observer, variables)
    const subscriptionConfig : GraphQLSubscriptionConfig<Data> = {
        subscription: graphql`
            subscription todoSubsc_Subscription($id: ID!) {
                # 一個しか無理？
                # todoCreated(parentId: $id) {
                #     id
                #     completed
                #     text
                # }
                todoUpdated(parentId: $id) {
                    id
                    completed
                    text
                }
                # todolistMutation(id: $id) {
                #     ... todoSubsc_data
                # }
            }
        `,
        variables: {},
        /* updater: (data:any) => {
         *     console.log(data)
         * }, */
        // updater?: SelectorStoreUpdater<TSubscriptionPayload>
        // updaterとonNextどっちも呼ばれる
        // updater: (data:any) => console.log("updater@request_hello_subscription", data),
        onNext: (data:Data | null | undefined) => (data && observer.next && observer.next(data)),
        onError: (error:Error) => (observer.error && observer.error(error)),
        onCompleted: () => (observer.complete && observer.complete()),
    }

    if (variables !== undefined) {
        subscriptionConfig["variables"] = variables
    }
    
    // console.log(subscriptionConfig)
    const {dispose} = requestSubscription(
        environment,
        subscriptionConfig
    )
    /* console.log("@todo-subsc requestSubscription result : ", result.dispose)*/
    // result.dispose()
    // console.log("@todo-subsc requestSubscription dispose called!!! : ")

    const subsc = {unsubscribe: dispose, closed: false}
    observer.start && observer.start(subsc) 
    return () => {
        /* console.log("@todo-subsc dispose!!!!!! observer=>", observer)*/
        observer.unsubscribe && observer.unsubscribe(subsc)
        dispose()
        /* console.log("@todo-subsc dispose!!!!!! called !!!observer=>", observer)*/
    }
}


// export default createSubscription<{environment: IEnvironment, id:string, observer: Observer<Data>}, any>({
//     getCurrentValue: (_: any) => undefined,
//     subscribe: (source: any, _:any) => {
//         return  request_subscription(source.id, source.environment, source.observer)
//     }
// })

import createSubscription from '../environment/create-subscription'
export default createSubscription(request_subscription)
