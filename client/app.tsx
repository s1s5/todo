import { hot } from 'react-hot-loader/root'
import * as React from 'react'

import {ReactRelayContext} from 'react-relay'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'


import {EnvironmentProvider} from './environment/index'
// const environment = createEnvironment('http://127.0.0.1:42100/graphql/', 'ws://localhost:42100/graphql/')

import TodoList from './remainder/todolist'
import TodoListList from './remainder/todolist-list'

import {BrowserRouter as Router, Route} from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: {
//            light: '#757ce8',
//            main: '#3f50b5',
            main: '#ff0000',
//            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
//            light: '#ff7961',
//            main: '#f44336',
            main: '#00ff00',
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
        <EnvironmentProvider
            post_url='http://127.0.0.1:42100/graphql/'
            ws_url='ws://localhost:42100/graphql/'>
          <div className={classes.root}>
            <ThemeProvider theme={theme}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                    Todoサンプル
                  </Typography>
                </Toolbar>
              </AppBar>
              <Container>
                <Router>
                  <Route path='/:id([A-Za-z0-9_=]+)/' component={ ({match}:any) => {
                      return <TodoList id={ match.params.id }/>
                  }} />
                  <Route path='/' exact component={ () => <TodoListList/> }/>
                </Router>
              </Container>
            </ThemeProvider>
          </div>
        </EnvironmentProvider>
    )
}
export default hot(App)
