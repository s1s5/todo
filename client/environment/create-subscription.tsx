import * as React from 'react'
import { RelayContext, IEnvironment, Observer, Variables, } from 'relay-runtime'
import {ReactRelayContext} from 'react-relay';


type PartialProps<T> = {
    observer?: Observer<T>,
    variables?: Variables,
    loading?: () => React.ReactNode,
    children?: (value: T | undefined) => React.ReactNode,
    value?: T | undefined,
}

type Props<T> = {
    environment: IEnvironment,
    subscribe: (environment: IEnvironment, observer: Observer<T>, variables: Variables | undefined) => (() => void)
} & PartialProps<T>

type State<T> = {
    value: T | undefined,
}

class SubscriptionWrapper<T> extends React.Component<Props<T>, State<T>> {
    readonly state: State<T> = { value: undefined }

    _unsubscribe: (() => unknown) | undefined = undefined
    _mounted: boolean = true

    _value = () => (this.state.value === undefined ? this.props.value : this.state.value)
    _loading = () => (this.props.loading ? this.props.loading() : <span style={ {visibility: "hidden", width: "0px", height: "0px"} }>subscribing ...</span>)
    _render = () => (this.props.children ? this.props.children!(this._value()) : <span style={ {visibility: "hidden", width: "0px", height: "0px"} }>rendering</span>)

    _subscribe = () => {
        this._clear()
        const _this = this;
        const observer = {
            next: (value: any) => {
                if (value.errors !== undefined && value.errors !== null && value.errors.length > 0) {
                    console.error('subscribe Some Error occurred!!', value.errors)
                }
                _this.setState({value})
                _this.props.observer && _this.props.observer.next && _this.props.observer.next(value)
            },
            error: (error: Error) => (_this.props.observer && _this.props.observer.error && _this.props.observer.error(error)),
            complete: () => (_this.props.observer && _this.props.observer.complete && _this.props.observer.complete()),
        }
        this._unsubscribe = this.props.subscribe(this.props.environment, observer, this.props.variables)
        console.log("subscribe !!!!")
    }

    _clear = () => {
        if (this._unsubscribe !== undefined) {
            this._unsubscribe()
            this._unsubscribe = undefined
        }
    }

    componentDidMount = () => {
        this._subscribe()
        window.addEventListener('beforeunload', this._clear);
    }
    
    componentDidUpdate = (props: Props<T>) => {
        if (this.props.variables !== props.variables) {
            this._subscribe()
        }
    }

    componentWillUnmount = () => {
        this._clear()
        window.removeEventListener('beforeunload', this._clear)
        this._mounted = true
    }

    render = () => (this._value() === undefined ?
                    this._loading() :
                    this._render())
}

const SubscriptionWrapper2 = <T extends object>(props: Props<T>) => {
    let [value, setValue] = React.useState(() => ( props.value) )
    React.useEffect(() => {
        const observer = {
            next: (value: any) => {
                if (value.errors !== undefined && value.errors !== null && value.errors.length > 0) {
                    console.error('subscribe Some Error occurred!!', value.errors)
                }
                setValue(value as T)
                props.observer&& props.observer.next && props.observer.next(value)
            },
            error: (error: Error) => (props.observer && props.observer.error && props.observer.error(error)),
            complete: () => (props.observer && props.observer.complete && props.observer.complete()),
        }
        return props.subscribe(props.environment, observer, props.variables);
    }, [props.environment, props.subscribe, props.observer, props.variables])
    if (value === undefined) {
        return (props.loading ? <>props.loading()</> : <span style={ {visibility: "hidden", width: "0px", height: "0px"} }>subscribing ...</span>)
    }
    return (props.children ? <>props.children(value)</> : <span style={ {visibility: "hidden", width: "0px", height: "0px"} }>{ value.toString() }</span>)
}

const createSubscription = <T extends object>(subscribe: (environment: IEnvironment, observer: Observer<T>, variables: Variables | undefined) => (() => unknown)) => (
    (props: PartialProps<T>) => (
        <ReactRelayContext.Consumer>
          {(context:RelayContext | null) => <SubscriptionWrapper2 {...props} environment={ context!.environment } subscribe={ subscribe } /> }
        </ReactRelayContext.Consumer>
    )
)

export {IEnvironment, Observer, Variables}
export default createSubscription
