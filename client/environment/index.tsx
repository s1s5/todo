import * as React from 'react'

import {
    Environment,
    Network,
    RecordSource,
    Store,
    RequestParameters,
    Variables,
    UploadableMap,
    CacheConfig,
    RelayContext,
    OperationType,
} from 'relay-runtime';

import {ReactRelayContext} from 'react-relay';

import fetchQuery from './fetch-query'
import SubscriptionSetupper from './subscription-setupper'
import EnvironmentProvider from './environment-provider'

const createEnvironment = (post_url:string, ws_url?:string) => {
    const fetch_query = (request: RequestParameters,
                         variables: Variables,
                         cacheConfig: CacheConfig,
                         uploadables?: UploadableMap | null) => fetchQuery(post_url, request, variables, cacheConfig, uploadables)
    let network;
    if (ws_url) {
        const subsc_set_upper = new SubscriptionSetupper(ws_url)
        network = Network.create(fetch_query, subsc_set_upper.setup)
    } else {
        network = Network.create(fetch_query)
    }
    return  new Environment({
        network: network,
        store: new Store(new RecordSource()),  
    });
}

type WithEnvironmentProps = {
    environment: Environment,
};

// HOC
const withEnvironment = <P extends object>(
Component: React.ComponentType<P>,
): React.FC<Omit<P, keyof WithEnvironmentProps>> => props => (
    <ReactRelayContext.Consumer>
      {(context:RelayContext | null) => <Component {...props as P} environment={ context!.environment } />}
    </ReactRelayContext.Consumer>
);

import {QueryRenderer, GraphQLTaggedNode, RelayProp, Container as FragmentContainer} from 'react-relay';

// const createQueryRenderer = <P extends object>(
// FragmentContainer: React.ComponentType<P>, config: Config
// ): React.FC<Omit<P, keyof WithEnvironmentProps>> => (props:any) => {
//     console.log(props)
//     return <ReactRelayContext.Consumer>
//       {({ environment }) => (
//           <QueryRenderer
//            environment={environment}
//            query={config.query}
//            variables={config.variables}
//            render={({error, query} : any) => {
//                if (error) {
//                    console.log(error)
//                    return <div>Error!</div>
//                }
//                if (!query) {
//                    return <div>Loading...</div>
//                }
//                    console.log(query)
//                return <FragmentContainer {...props as P} query={ query } />
//            }}
//           />
//       )}
//     </ReactRelayContext.Consumer>
// };

import hoistStatics from 'hoist-non-react-statics';

type WithQueryProps = {
    query: any,
};

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
    const {query, get_variables} = config;
    class QueryRendererWrapper extends React.Component<Omit<Props, keyof WithQueryProps>> {
        render() {
            const variables = get_variables ? get_variables(this.props) : config.variables;  // TODO: マージすべき？
            return (
                <ReactRelayContext.Consumer>
                  {(context:RelayContext | null) => (
                      <QueryRenderer
                          environment={ context!.environment }
                          query={ query }
                          variables={ variables }
                          render={ (r_props: {
                                  error: Error | null;
                                  props: TOperation['response'] | null;
                                  retry: (() => void) | null;
                          }) => {
                                  if (r_props.error) {
                                      return <span>{r_props.error.toString()}</span>;
                                  }
                                  console.log(r_props.props);
                                  if (r_props.props) {
                                      return <FragmentComponent {...this.props } query={ r_props.props } />;
                                  }
                                  
                                  return <span>loading</span>;
                          }}
                      />
                  )}
                  </ReactRelayContext.Consumer>
            )
        }
    }

    return hoistStatics(QueryRendererWrapper, Component)
}


export {createEnvironment, withEnvironment, createQueryRenderer, EnvironmentProvider}
