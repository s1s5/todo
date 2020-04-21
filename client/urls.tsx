import * as React from 'react'

import {Switch, Route, Link, Redirect} from "react-router-dom";

import HelloUrls from './hello/urls'
import ShelfUrls from './shelf/urls'
import RemainderUrls from './remainder/urls'

import TestDropzone from './misc/test-dropzone'
import TestVirtualized from './misc/test-virtualized'
import TestVirtualized2 from './misc/test-virtualized-2'
import TestVirtualized3 from './misc/test-virtualized-3'
import TestVirtualized4 from './misc/test-virtualized-4'
import Timeline from './misc/timeline'


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
      <Route exact path='/testvirtualized' component={ () => <TestVirtualized/> }/>
      <Route exact path='/testvirtualized2' component={ () => <TestVirtualized2/> }/>
      <Route exact path='/testvirtualized3' component={ () => <TestVirtualized3/> }/>
      <Route exact path='/testvirtualized4' component={ () => <TestVirtualized4/> }/>
      <Route exact path='/timeline' component={ () => <Timeline/> }/>
      <Route exact path='/' component={ EntryPoint }/>
      <Route>
        <h1>404 not found</h1>
      </Route>
    </Switch>
)

export default Urls
