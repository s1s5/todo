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
import TestVirtualized5 from './misc/test-virtualized-5'
import TestInfiniteScroller from './misc/test-infinite-scroller'
import DynamicForm from './misc/dynform'
import DynamicForm2 from './misc/dynform-2'
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
      <Route path='/testdropzone' component={ () => <TestDropzone/> }/>
      <Route path='/testvirtualized' component={ () => <TestVirtualized/> }/>
      <Route path='/testvirtualized2' component={ () => <TestVirtualized2/> }/>
      <Route path='/testvirtualized3' component={ () => <TestVirtualized3/> }/>
      <Route path='/testvirtualized4' component={ () => <TestVirtualized4/> }/>
      <Route path='/testvirtualized5' component={ () => <TestVirtualized5/> }/>
      <Route path='/testinfinitescroller' component={ () => <TestInfiniteScroller/> }/>
      <Route exact path='/dynamicform' component={ () => <DynamicForm /> }/>
      <Route exact path='/dynamicform2' component={ () => <DynamicForm2 /> }/>
      <Route path='/timeline' component={ () => <Timeline/> }/>
      <Route exact path='/' component={ EntryPoint }/>
      <Route>
        <h1>404 not found</h1>
      </Route>
    </Switch>
)

export default Urls
