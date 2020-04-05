import * as React from 'react'
import {
    IEnvironment,
    GraphQLTaggedNode,
    Subscription,
    Observer,
    Variables,
    SelectorStoreUpdater,
    GraphQLSubscriptionConfig,
    requestSubscription
} from 'relay-runtime'

import {getId,_globals} from './environment-provider'
import withEnvironment from './with-environment'

type Props<T> = {
    subscription: GraphQLTaggedNode,
    observer?: Observer<T>,
    updater?: SelectorStoreUpdater<T>,
    variables: Variables,
    loading?: () => React.ReactNode | null,
    children?: (value: T | undefined) => React.ReactNode | null,
    value?: T,
    environment: IEnvironment,
}

const SubscriptionRenderer = <T extends object>(props: Props<T>) => {
    let [value, setValue] = React.useState(() => ( props.value) )
    React.useEffect(() => {
        const observer = {
            next: (value: any) => {
                if (value.errors !== undefined && value.errors !== null && value.errors.length > 0) {
                    if (props.observer && props.observer.error) {
                        props.observer.error(value.errors)
                    } else {
                        console.error('subscribe Some Error occurred!!', value.errors)
                    }
                }
                setValue(value as T)
                props.observer && props.observer.next && props.observer.next(value)
            },
            error: (error: Error) => (props.observer && props.observer.error && props.observer.error(error)),
            complete: () => (props.observer && props.observer.complete && props.observer.complete()),
            unsubscribe: (subscription: Subscription) => { props.observer && props.observer.unsubscribe && props.observer.unsubscribe(subscription) },
        }

        const current_counter = getId()

        const subscription_config : GraphQLSubscriptionConfig<T> = {
            subscription: props.subscription,
            variables: props.variables,
            updater: props.updater,
            onNext: observer.next,
            onError: observer.error,
            onCompleted: observer.complete,
        }

        const {dispose} = requestSubscription(props.environment, subscription_config)

        const subsc = {unsubscribe: dispose, closed: false}
        props.observer && props.observer.start && props.observer.start(subsc)

        const unsubscribe = _globals[current_counter]
        delete _globals[current_counter]

        return () => {
            props.observer && props.observer.unsubscribe && props.observer.unsubscribe(subsc)
            dispose()
            unsubscribe()
        }
    }, [props.environment, props.subscription, props.observer, props.variables])
    if (value === undefined) {
        return (props.loading ? <>props.loading()</> : null)
    }
    return (props.children ? <>props.children(value)</> : null)
}

export default withEnvironment(SubscriptionRenderer)
