// import { installRelayDevTools } from 'relay-devtools';  // TODO: インストールできない？
import { Environment, Network, RecordSource, Store, RequestParameters, QueryResponseCache, Variables, UploadableMap, CacheConfig } from 'relay-runtime';
// import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';


export const isMutation = (request: RequestParameters) => request.operationKind === 'mutation';
export const isQuery = (request: RequestParameters) => request.operationKind === 'query';
export const forceFetch = (cacheConfig: CacheConfig) => !!(cacheConfig && cacheConfig.force);

export const handleData = (response: any) => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    }

    return response.text();
};

function getRequestBodyWithUploadables(request: RequestParameters, variables: Variables, uploadables: UploadableMap) {
    let formData = new FormData();
    formData.append('name', request.name);
    formData.append('query', request.text);
    formData.append('variables', JSON.stringify(variables));

    Object.keys(uploadables).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
            formData.append(key, uploadables[key]);
        }
    });

    return formData;
}

function getRequestBodyWithoutUplodables(request: RequestParameters, variables: Variables) {
    return JSON.stringify({
        name: request.name, // used by graphql mock on tests
        query: request.text, // GraphQL text from input
        variables,
    });
}

export function getRequestBody(request: RequestParameters, variables: Variables, uploadables?: UploadableMap) {
    if (uploadables) {
        return getRequestBodyWithUploadables(request, variables, uploadables);
    }

    return getRequestBodyWithoutUplodables(request, variables);
}

export const getHeaders = (uploadables?: UploadableMap) => {
    if (uploadables) {
        return {
            Accept: '*/*',
        };
    }

    return {
        Accept: 'application/json',
        'Content-type': 'application/json',
    };
};

const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
* Simple, lightweight module assisting with the detection and context of
* Worker. Helps avoid circular dependencies and allows code to reason about
* whether or not they are in a Worker, even if they never include the main
* `ReactWorker` dependency.
 */
const ExecutionEnvironment = {
    canUseDOM: canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    /* canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent), */
    canUseEventListeners: canUseDOM && !!(window.addEventListener),
    canUseViewport: canUseDOM && !!window.screen,
    isInWorker: !canUseDOM, // For now, this is true - might change in the future.
    };

export type InitWithRetries = {
    body?: BodyInit | null,
    cache?: RequestCache,
    credentials?: RequestCredentials,
    headers?: HeadersInit,
    fetchTimeout?: number | null,
    method?: string | null,
    mode?: RequestMode,
    retryDelays?: Array<number> | null,
};

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_RETRIES = [1000, 3000];

/**
* Makes a POST request to the server with the given data as the payload.
 * Automatic retries are done based on the values in `retryDelays`.
 */
function fetchWithRetries(uri: string, initWithRetries?: InitWithRetries | null): Promise<any> {
    const { fetchTimeout, retryDelays, ...init } = initWithRetries || {};
    const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;
    const _retryDelays = retryDelays != null ? retryDelays : DEFAULT_RETRIES;

    let requestsAttempted = 0;
    let requestStartTime = 0;
    return new Promise((resolve, reject) => {
        /**
        * Sends a request to the server that will timeout after `fetchTimeout`.
* If the request fails or times out a new request might be scheduled.
         */
        function sendTimedRequest(): void {
            requestsAttempted++;
            requestStartTime = Date.now();
            let isRequestAlive = true;
            const request = fetch(uri, init);
            const requestTimeout = setTimeout(() => {
                isRequestAlive = false;
                if (shouldRetry(requestsAttempted)) {
                    // eslint-disable-next-line
                    console.log(false, 'fetchWithRetries: HTTP timeout, retrying.');
                    retryRequest();
                } else {
                    reject(
                        new Error(`fetchWithRetries(): Failed to get response from server, tried ${requestsAttempted} times.`),
                    );
                }
            }, _fetchTimeout);

            request
                .then(response => {
                    clearTimeout(requestTimeout);
                    if (isRequestAlive) {
                        // We got a response, we can clear the timeout.
                        if (response.status >= 200 && response.status < 300) {
                            // Got a response code that indicates success, resolve the promise.
                            resolve(response);
                        } else if (response.status === 401) {
                            resolve(response);
                        } else if (shouldRetry(requestsAttempted)) {
                            // Fetch was not successful, retrying.
                            // TODO(#7595849): Only retry on transient HTTP errors.
                            // eslint-disable-next-line
                            console.log(false, 'fetchWithRetries: HTTP error, retrying.'), retryRequest();
                        } else {
                            // Request was not successful, giving up.
                            const error: any = new Error(
                                `fetchWithRetries(): Still no successful response after ${requestsAttempted} retries, giving up.`,
                            );
                            error.response = response;
                            reject(error);
                        }
                    }
                })
                .catch(error => {
                    clearTimeout(requestTimeout);
                    if (shouldRetry(requestsAttempted)) {
                        retryRequest();
                    } else {
                        reject(error);
                    }
                });
        }

        /**
        * Schedules another run of sendTimedRequest based on how much time has
        * passed between the time the last request was sent and now.
         */
        function retryRequest(): void {
            const retryDelay = _retryDelays[requestsAttempted - 1];
            const retryStartTime = requestStartTime + retryDelay;
            // Schedule retry for a configured duration after last request started.
            setTimeout(sendTimedRequest, retryStartTime - Date.now());
        }

        /**
        * Checks if another attempt should be done to send a request to the server.
         */
        function shouldRetry(attempt: number): boolean {
            return ExecutionEnvironment.canUseDOM && attempt <= _retryDelays.length;
        }

        sendTimedRequest();
    });
    }

/* export const GRAPHQL_URL = 'http://localhost:5000/graphql'; */

// Define a function that fetches the results of a request (query/mutation/etc)
// and returns its results as a Promise:
const fetchQuery = async (request: RequestParameters, variables: Variables, uploadables: UploadableMap) => {
    try {
        const body = getRequestBody(request, variables, uploadables);
        const headers = {
            ...getHeaders(uploadables),
        };

        const response = await fetchWithRetries('http://127.0.0.1:42100/graphql/', {
            method: 'POST',
            headers,
            body,
            fetchTimeout: 20000,
            retryDelays: [1000, 3000, 5000],
        });

        const data = await handleData(response);

        if (response.status === 401) {
            throw data.errors;
        }

        if (isMutation(request) && data.errors) {
            throw data;
        }

        if (!data.data) {
            throw data.errors;
        }

        return data;
    } catch (err) {
        // eslint-disable-next-line
        console.log('err: ', err);

        const timeoutRegexp = new RegExp(/Still no successful response after/);
        const serverUnavailableRegexp = new RegExp(/Failed to fetch/);
        if (timeoutRegexp.test(err.message) || serverUnavailableRegexp.test(err.message)) {

            throw new Error('Unavailable service. Try again later.');
        }

        throw err;
    }
};



const oneMinute = 60 * 1000;
const queryResponseCache = new QueryResponseCache({ size: 250, ttl: oneMinute });

const cacheHandler = async (
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables?: UploadableMap | null,
) => {
    const queryID = request.text;

  if (isMutation(request)) {
    queryResponseCache.clear();
    return fetchQuery(request, variables, uploadables);
  }

  const fromCache = queryResponseCache.get(queryID, variables);
  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    return fromCache;
  }

  const fromServer = await fetchQuery(request, variables, uploadables);
  if (fromServer) {
    queryResponseCache.set(queryID, variables, fromServer);
  }

  return fromServer;
};


// const __DEV__ = process.env.NODE_ENV === 'development';
// if (__DEV__) {
//   installRelayDevTools();
// }

// const network = Network.create(__DEV__ ? RelayNetworkLogger.wrapFetch(cacheHandler) : cacheHandler);
const network = Network.create(cacheHandler)

const source = new RecordSource();
const store = new Store(source);

// export const inspector = new RecordSourceInspector(source);

const env = new Environment({
  network,
  store,
});

export default env;

