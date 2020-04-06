import * as React from 'react'

import {BrowserRouter, Route, Link} from "react-router-dom";

import HelloUrls from './hello/urls'
import RemainderUrls from './remainder/urls'

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
      </ul>
    </div>
)

const Urls = () => (
    <>
      <Route path='/remainder' component={ () => <RemainderUrls/> }/>
      <Route path='/hello' component={ () => <HelloUrls/> }/>
      <Route path='/' exact component={ EntryPoint }/>
    </>
)

export default Urls
