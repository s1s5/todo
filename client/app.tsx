import { hot } from 'react-hot-loader/root'
import * as React from 'react'

import {ReactRelayContext} from 'react-relay'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'


import {createEnvironment} from './environment/index'
const environment = createEnvironment('http://127.0.0.1:42100/graphql/', 'ws://localhost:42100/graphql/')

import TodoList from './remainder/todolist'
import TodoListList from './remainder/todolist-list'

import {BrowserRouter as Router, Route} from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: {
//            light: '#757ce8',
//            main: '#3f50b5',
            main: '#9a0036',
//            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
//            light: '#ff7961',
//            main: '#f44336',
            main: '#388e3c',
//            dark: '#ba000d',
            contrastText: '#000',
        },
    },
})

const useStyles = makeStyles(theme => ({
    root: {
        flexGlow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));


// [^-A-Za-z0-9+/=]|=[^=]|={3,}$
//        <Route path='/:id([^-A-Za-z0-9+/=]|=[^=]|={3,}/' exact component={ ({match}:any) => {


const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Todoサンプル
                </Typography>
              </Toolbar>
            </AppBar>
            <Container>
              <ReactRelayContext.Provider value={ {environment} }>
                <Router>
                  <Route path='/:id([A-Za-z0-9_=]+)/' component={ ({match}:any) => {
                          return <TodoList id={ match.params.id }/>
                  }} />
                  <Route path='/' exact component={ () => <TodoListList/> }/>
                </Router>
              </ReactRelayContext.Provider>
            </Container>
          </ThemeProvider>
        </div>
    )
}
export default hot(App)
