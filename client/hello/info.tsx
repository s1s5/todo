import * as React from 'react'

import {graphql, createFragmentContainer} from 'react-relay'
import {createQueryRenderer} from '../environment'

type Props = {
    query: any,
}
    

const Info = (props: Props) => (
    <>
    <h1>information</h1>
    <h2>version : { props.query.info.version }</h2>
    <h2>module_name : { props.query.info.moduleName }</h2>
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

export default createQueryRenderer(InfoFragment, Info, {
    query: graphql`
        query info_entry_Query {
            ...info_query
        }
    `,
    variables: {},
})
