import * as React from 'react'

import {graphql, createFragmentContainer} from 'react-relay';

import {Link} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {createQueryRenderer} from '../environment'
import {todolistList_query} from './__generated__/todolistList_query.graphql'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

type Props = {
    query: todolistList_query
}

const TodoList = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    return <div>
      {
          props.query.todolists!.edges.map((edge:any) => (
              <>
                <ListItem button onClick={ () => { setOpen(!open) } }>
                  <ListItemText primary={ `${edge.node.title}` } />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to={ `/${edge.node.id}/all/` }>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="全て表示"/>
                      </ListItem>
                    </Link>
                    <Link to={ `/${edge.node.id}/paginated/` }>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="ページネーションサンプル"/>
                      </ListItem>
                    </Link>
                    <Link to={ `/${edge.node.id}/refetch/` }>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="リフェッチサンプル"/>
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </>
          ))
      }
    </div>
}

const TodoListFragment = createFragmentContainer(TodoList, {
    // Queryのfragment
    query: graphql`
        fragment todolistList_query on Query {
            todolists {
                edges {
                    node {
                        id
                        title
                    }
                }
            }  
        }`
})

export default createQueryRenderer(TodoListFragment, TodoList, {
    query: graphql`
        query todolistList_TodoLists_Query {
            ...todolistList_query
        }        
    `,
    variables: {},
})
