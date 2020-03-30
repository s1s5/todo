import { IEnvironment, Observer, Variables, GraphQLSubscriptionConfig } from 'relay-runtime'
import { graphql, requestSubscription } from 'react-relay'

const {ConnectionHandler} = require('relay-runtime')

import createSubscription from '../environment/create-subscription'

type Data = {
    
}

const request_subscription = (environment:IEnvironment, observer: Observer<Data>, variables: Variables | undefined) => {
    const subscriptionConfig : GraphQLSubscriptionConfig<Data> = {
        subscription: graphql`
            subscription todolistSubsc_Subscription { # ($id: ID!) {
                # todoCreated(parentId: $id) {
                #     id
                #     completed
                #     text
                # }
                countSeconds(upTo:3)
            }
        `,
        variables: {},
//         updater: (store:any) => {   // RecordSourceSelectorProxy
//             console.log(store)
//             const created_todo = store.getRootField('todoCreated');
//             // Add it to a connection
//             console.log("created_todo => ", created_todo)
//             if (created_todo != null && variables != null) {
//                 const todolist = store.get(variables.id)
//                 console.log('todolist -> ', todolist)
//                 // const todo_set = ConnectionHandler.getConnection(todolist, 'todoSet', {'orderBy': '-created_at'});
//                 // const todo_set = ConnectionHandler.getConnection(todolist, 'todoSet')
//                 // const todo_set = todolist.getLinkedRecords('todolist_todoSet')
// 
//                 // const todo_set = ConnectionHandler.getConnection(todolist, 'todolist_todoSet')
//                 const todo_set = ConnectionHandler.getConnection(todolist, 'todolist_todoSet', {'orderBy': '-created_at'});
//                 console.log('todolist.todoSet -> ', todo_set)
// 
//                 const edges = todo_set.getLinkedRecords('edges')
//                 console.log('todoSet.edges -> ', edges)
//                 const test_todo = todo_set.getLinkedRecord(created_todo.getDataID())
//                 console.log("test_todo -> ", test_todo)
//                 if (test_todo == null) {
//                     const edge = ConnectionHandler.createEdge(
//                         store,
//                         todo_set,
//                         created_todo,
//                         'TodoNodeEdge',
//                     );
//                     // ConnectionHandler.insertEdgeAfter(todo_set, edge)
//                     ConnectionHandler.insertEdgeBefore(todo_set, edge)  // addの方でも追加したら二重で追加することになる。。これを防ぐには？？？
//                 }
//             }
// //            const viewer = store.getRoot().getLinkedRecord('todolist');
// //            console.log("viewer => ", viewer)
// //
// //            const todo_set =
// //                ConnectionHandler.getConnection(viewer, 'todoSet');
// //            console.log("todo_set => ", todo_set)
// 
// //            const edge = ConnectionHandler.createEdge(
// //                store,
// //                notifications,
// //                notification,
// //                '<TypeOfNotificationsEdge>',
// //            );
// //            ConnectionHandler.insertEdgeAfter(notifications, edge);
//         },
        onNext: (data:Data | null | undefined) => (data && observer.next && observer.next(data)),
        onError: (error:Error) => (observer.error && observer.error(error)),
        onCompleted: () => (observer.complete && observer.complete()),
    }

    if (variables !== undefined) {
        // subscriptionConfig["variables"] = variables
    }
    
    console.log("request_subscription!!!")
    const {dispose} = requestSubscription(
        environment,
        subscriptionConfig
    )
    console.log(dispose)
    const subsc = {unsubscribe: dispose, closed: false}
    observer.start && observer.start(subsc) 
    return () => {
        observer.unsubscribe && observer.unsubscribe(subsc)
        dispose()
    }    
}

export default createSubscription(request_subscription)
