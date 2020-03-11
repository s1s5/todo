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
//    RelayContext
} from 'relay-runtime';

import {ReactRelayContext} from 'react-relay';

import fetchQuery from './fetchQuery'
import SubscriptionSetupper from './SubscriptionSetupper'

const createEnvironment = (post_url:string, ws_url?:string) => {
    const fetch_query = (request: RequestParameters,
                         variables: Variables,
                         cacheConfig: CacheConfig,
                         uploadables?: UploadableMap | null) => fetchQuery(post_url, request, variables, cacheConfig, uploadables)
    const subsc_set_upper = new SubscriptionSetupper(ws_url)
    return  new Environment({
        network: Network.create(fetch_query, subsc_set_upper.setup),
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
      {({ environment }) => <Component {...props as P} environment={ environment } />}
    </ReactRelayContext.Consumer>
);

import {QueryRenderer, GraphQLTaggedNode, RelayProp, Container as FragmentContainer} from 'react-relay';

type Config = {
    query: GraphQLTaggedNode,
    get_variables?: (props: Object) => object,
    variables?: Variables,
}

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


function createQueryRenderer<Props>(
    FragmentComponent: any,  // TODO: ここどう設定していいんだかわからん
    Component: React.ComponentType<Props & { relay?: RelayProp }>,
    config: Config,
) {
    const {query, get_variables} = config;
    class QueryRendererWrapper extends React.Component<Omit<Props, keyof WithQueryProps>> {
        render() {
            const variables = get_variables ? get_variables(this.props) : config.variables;  // TODO: マージすべき？
            return (
                <ReactRelayContext.Consumer>
                  {({ environment }) => (
                      <QueryRenderer
                          environment={ environment }
                          query={ query }
                          variables={ variables }
                          render={({ error, props }) => {
                                  if (error) {
                                      return <span>{error.toString()}</span>;
                                  }
                                  console.log(props);
                                  if (props) {
                                      return <FragmentComponent {...this.props } query={ props } />;
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


export {createEnvironment, withEnvironment, createQueryRenderer}
