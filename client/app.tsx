import { hot } from 'react-hot-loader/root'
import * as React from 'react'

import {ReactRelayContext} from 'react-relay';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import {createEnvironment} from './environment/index'
const environment = createEnvironment('http://127.0.0.1:42100/graphql/', 'ws://localhost:42100/graphql/')

import TodoList from './remainder/todolist'
import TodoListList from './remainder/todolist-list'

import {BrowserRouter as Router, Route} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    title: {
    },
}));


// [^-A-Za-z0-9+/=]|=[^=]|={3,}$
//        <Route path='/:id([^-A-Za-z0-9+/=]|=[^=]|={3,}/' exact component={ ({match}:any) => {

const App = () => {
    const classes = useStyles();

    return <Container maxWidth="sm">
    <ReactRelayContext.Provider value={ {environment} }>
    <Typography className={classes.title} variant="h2">Todoサンプル</Typography>
    <Router>
        <Route path='/:id([A-Za-z0-9_=]+)/' component={ ({match}:any) => {
            return <TodoList id={ match.params.id }/>
        }} />
        <Route path='/' exact component={ () => <TodoListList/> }/>
      </Router>
    </ReactRelayContext.Provider>
  </Container>
}
export default hot(App)
