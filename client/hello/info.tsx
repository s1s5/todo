import * as React from 'react'

import {graphql, createFragmentContainer} from 'react-relay'
import {DefaultQueryRenderer} from '../gql-utils'
import {info_query} from './__generated__/info_query.graphql'

type Props = {
    query: info_query,
}
    

const Info = (props: Props) => (
    <>
    <h1>information</h1>
    <h2>version : { props.query.info!.version }</h2>
    <h2>module_name : { props.query.info!.moduleName }</h2>
    </>
)


const InfoFragment = createFragmentContainer(
    Info,
    {
        query: graphql`
            fragment info_query on Query {
                info {
                    version
                    moduleName
                }
            }
        `
    }
)

const InfoQuery = () => (
    <DefaultQueryRenderer
    query={graphql`
        query info_entry_Query {
            ...info_query
        }
    `}
    variables={ {} }
    render={ ({error, props, retry}: any) => {
        if (error) {
            console.log("error: ", error)
            return <span>{error.map((e:any) => e.message)}</span>;
        }
        if (props) {
            return <InfoFragment query={ props } />
        }
        return <span>loading information</span>
    } }      
    />
)

export default InfoQuery
