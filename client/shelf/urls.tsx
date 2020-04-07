import * as React from 'react'
import {Route, Link, useRouteMatch} from "react-router-dom";

import AuthorUrls from './authors'

const Index = () => {
    const match = useRouteMatch()
    return (
        <div>
          <ul>
            <li>
              <Link to={ `${match.path}author/` }>
                authors
              </Link>
            </li>
            <li>
              <Link to={ `${match.path}book/` }>
                books
              </Link>
            </li>
          </ul>
        </div>
    )
}

const Urls = () => {
    const match = useRouteMatch()
    return (
        <>
          <Route path={ `${match.path}/author` } component={ () => <AuthorUrls/> }/>
          {/* <Route exact path={ `${match.path}/book` } component={ () => <BookUrls/> }/> */}
          <Route exact path={ `${match.path}/` } component={ () => <Index/> }/>
        </>
    )
}

export default Urls
