import * as React from 'react'
import {Route, Link, useRouteMatch, Switch} from "react-router-dom";

import Authors from './authors'
import AuthorCreate from './author-create'
import AuthorDetail from './author-detail'

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
        <Switch>
          <Route exact path={ `${match.path}/author/` } component={ () => <Authors/> }/>
          <Route exact path={ `${match.path}/author/create/` } component={ () => <AuthorCreate /> }/>
          <Route exact path={ `${match.path}/author/:id/` } component={ () => <AuthorDetail />} />
          {/* <Route exact path={ `${match.path}/book` } component={ () => <BookUrls/> }/> */}
          <Route exact path={ `${match.path}/` } component={ () => <Index/> }/>
        </Switch>
    )
}

export default Urls
