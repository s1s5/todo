import * as React from 'react'

import {Switch, Route, Link, Redirect} from "react-router-dom";

import HelloUrls from './hello/urls'
import ShelfUrls from './shelf/urls'
import RemainderUrls from './remainder/urls'

import TestDropzone from './misc/test-dropzone'


const EntryPoint = () => (
    <div>
      <ul>
        <li>
          <Link to={ `/remainder/` }>
            remainder
          </Link>
        </li>
        <li>
          <Link to={ `/hello/` }>
            hello
          </Link>
        </li>
        <li>
          <Link to={ `/shelf/` }>
            shelf
          </Link>
        </li>
      </ul>
    </div>
)

const Urls = () => (
    <Switch>
      <Route path='/remainder' component={ () => <RemainderUrls/> }/>
      <Route path='/shelf' component={ () => <ShelfUrls/> }/>
      <Route path='/hello' component={ () => <HelloUrls/> }/>
      <Route exact path='/testdropzone' component={ () => <TestDropzone/> }/>
      <Route exact path='/' component={ EntryPoint }/>
      <Route>
        <h1>404 not found</h1>
      </Route>
    </Switch>
)

export default Urls
