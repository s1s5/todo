import * as React from 'react'
import {useRouteMatch, Switch, Route, Link} from "react-router-dom";

import Info from './info'
import Echo from './echo'
import CountSeconds from './count-seconds'


const Index = () => {
    const match = useRouteMatch()
    return (
        <div>
          <ul>
            <li>
              <Link to={ `${match.path}info/` }>
                info
              </Link>
            </li>
            <li>
              <Link to={ `${match.path}echo/` }>
                echo
              </Link>
            </li>
            <li>
              <Link to={ `${match.path}countseconds/` }>
                count-seconds
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
          <Route exact path={ `${match.path}/info/` } component={ () => <Info/> }/>
          <Route exact path={ `${match.path}/echo/` } component={ () => <Echo/> }/>
          <Route exact path={ `${match.path}/countseconds/` } component={ () => <CountSeconds/> }/>
          <Route exact path={ `${match.path}/` } component={ () => <Index/> }/>
        </>
    )
}

export default Urls
