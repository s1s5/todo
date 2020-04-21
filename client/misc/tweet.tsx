import * as React from 'react'

export default (props:any) => {
    const { full_text, entities, measure, index } = props
    return (
        <div>
        <div>tweet {index + 1}</div>
        {/*<div>{full_text}</div>
        <div className="tweetImage">
        {entities && entities.media[0] && entities.media[0] ? (
            <img
            src={entities.media[0].media_url_https}
            onLoad={measure}
            alt=""
            />
        ) : null}
        </div> */}
        </div>
    )
}
