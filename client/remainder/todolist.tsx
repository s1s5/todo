// import * as React from 'react'
// import {useRouteMatch, Switch, Route} from "react-router-dom";
// 
// // import TodoListPaginated from './todolist-paginated'
// // import TodoListRefetch from './todolist-refetch'
// // import TodoListAll from './todolist-all'
// // import TodoListFetchQuery from './todolist-fetch-query'
// 
// // https://ja.reactjs.org/docs/code-splitting.html
// const TodoListPaginated = React.lazy(() => import('./todolist-paginated'))
// const TodoListRefetch = React.lazy(() => import('./todolist-refetch'))
// const TodoListAll = React.lazy(() => import('./todolist-all'))
// const TodoListAll2 = React.lazy(() => import('./todolist-all-2'))
// const TodoListFetchQuery = React.lazy(() => import('./todolist-fetch-query'))
// const TodoListSubscOnly = React.lazy(() => import('./todolist-subsc-only'))
// 
// //          <Link to={`${match.url}/recommend`}>some text</Link>
// //          
// const TodoList = (props: { id: string }) => {
//     let match = useRouteMatch();
//     return (
//         <div>
//           <React.Suspense fallback={<div>Loading...</div>}>
//             <Switch>
//               <Route path={`${match.path}paginated/`}>
//                 <TodoListPaginated id={ props.id }/>
//               </Route>
//               <Route path={`${match.path}refetch/`}>
//                 <TodoListRefetch id={props.id}/>
//               </Route>
//               <Route path={`${match.path}fetchquery/`}>
//                 <TodoListFetchQuery id={props.id}/>
//               </Route>
//               <Route path={`${match.path}all/`}>
//                 <TodoListAll id={ props.id }/>
//               </Route>
//               <Route path={`${match.path}all2/`}>
//                 <TodoListAll2 id={ props.id }/>
//               </Route>
//               <Route path={`${match.path}subsc/`}>
//                 <TodoListSubscOnly id={ props.id }/>
//               </Route>
//               <Route path={`${match.path}hoge/`}>
//                 <h2>hello hoge</h2>
//               </Route>
//               <Route path={`${match.path}`}>
//                 <h2>default route</h2>
//               </Route>
//             </Switch>
//           </React.Suspense>
//         </div>)
// }
// 
// export default TodoList
