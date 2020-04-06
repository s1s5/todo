import * as React from 'react'

import {graphql, createFragmentContainer, Environment} from 'react-relay'
import { QueryRenderer } from 'react-relay'

import {withEnvironment} from '../environment'

import {someStaticDatas_data as DataType} from './__generated__/someStaticDatas_data.graphql'
import {someStaticDatas_Query as QueryType} from './__generated__/someStaticDatas_Query.graphql'


type Props = {
    data: DataType,
}
    

const StaticData = (props: Props) => (
    <>
    <h1>data</h1>
    <h2>id : { props.data.id }</h2>
    <h2>name : { props.data.name }</h2>
    <h2>bytes : { props.data.bytes }</h2>
    <hr/>
    </>
)


const Fragment = createFragmentContainer(
    StaticData,
    {
        data: graphql`
            fragment someStaticDatas_data on StaticDataType {
                id
                name
                bytes
            }
        `
    }
)

const Query = (props: {environment: Environment}) => (
    <QueryRenderer<QueryType>
    environment={ props.environment }
    query={ graphql`
        query someStaticDatas_Query {
            someStaticDatas {
                id
                ...someStaticDatas_data
            }
        }
    ` }
    variables={ {} }
    render={ (r_props: {
        error: Error | null
        props: QueryType["response"] | null
        retry: (() => void) | null
    }) => {
        if (r_props.error) {
            return <span>{r_props.error.toString()}</span>
        }
        console.log(r_props.props)
        if (r_props.props != null) {
            return r_props.props.someStaticDatas!.map((e) => <Fragment key={ e!.id! } data={ e! } />)
        }
        
        return <span>loading</span>
    }}
    />    
)

export default withEnvironment(Query)
