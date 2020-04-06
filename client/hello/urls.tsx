import * as React from 'react'
import {useRouteMatch, Switch, Route, Link} from "react-router-dom";

import Info from './info'
import Echo from './echo'
import CountSeconds from './count-seconds'
import SomeHeavyOperation from './some-heavy-operation'


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
            <li>
              <Link to={ `${match.path}someheavyoperation/` }>
                some-heavy-operation
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
          <Route exact path={ `${match.path}/someheavyoperation/` } component={ () => <SomeHeavyOperation/> }/>
          <Route exact path={ `${match.path}/` } component={ () => <Index/> }/>
        </>
    )
}

export default Urls
