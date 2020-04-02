import * as React from 'react'
import { RelayContext, OperationType } from 'relay-runtime'
import { ReactRelayContext, QueryRenderer, GraphQLTaggedNode, RelayProp } from 'react-relay'

import hoistStatics from 'hoist-non-react-statics'

type WithQueryProps = {
    query: any,
}

type Config<Props, TOperation extends OperationType> = {
    query: GraphQLTaggedNode,
    get_variables?: (props: Omit<Props, keyof WithQueryProps>) => TOperation["variables"],
    variables: TOperation["variables"],
}


function createQueryRenderer<TOperation extends OperationType, Props>(
    FragmentComponent: any,  // TODO: ここどう設定していいんだかわからん
    Component: React.ComponentType<Props & { relay?: RelayProp }>,
    config: Config<Props, TOperation>,
) {
    const {query, get_variables} = config
    class QueryRendererWrapper extends React.Component<Omit<Props, keyof WithQueryProps>> {
        render() {
            const variables = get_variables ? get_variables(this.props) : config.variables  // TODO: マージすべき？
            return (
                <ReactRelayContext.Consumer>
                  {(context:RelayContext | null) => (
                      <QueryRenderer<TOperation>
                          environment={ context!.environment }
                          query={ query }
                          variables={ variables }
                          render={ (r_props: {
                                  error: Error | null
                                  props: TOperation['response'] | null
                                  retry: (() => void) | null
                          }) => {
                                  if (r_props.error) {
                                      return <span>{r_props.error.toString()}</span>
                                  }
                                  console.log(r_props.props)
                                  if (r_props.props) {
                                      return <FragmentComponent {...this.props } query={ r_props.props } />
                                  }

                                  return <span>loading</span>
                          }}
                      />
                  )}
                  </ReactRelayContext.Consumer>
            )
        }
    }

    return hoistStatics(QueryRendererWrapper, Component)
}

export default createQueryRenderer
