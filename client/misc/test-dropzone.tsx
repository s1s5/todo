import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: "300px",
        height: "300px",
        backgroundColor: "#eee",
    },
    input: {
        width: "300px",
        height: "30px",
        backgroundColor: "#fee",
    },
    thumbnail: {
        maxWidth: "80px",
        maxHeight: "80px",
    },
}))


function MyDropzone() {
    const classes = useStyles()
    const [urls, set_urls] = React.useState<any []>([])

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        set_urls(acceptedFiles.map((f:any) => (URL.createObjectURL(f))))
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    const {tabIndex, ...root_props} = getRootProps()
    // <div {...getRootProps({ onClick: e => e.stopPropagation() })}>
    //         <input {...getInputProps()} />
    return (<>
        <div {...root_props} className={ classes.root } onClick={undefined}>
        <input {...getInputProps()} />
        {
            // isDragActive ?
            //   <p>Drop the files here ...</p> :
            //   <p>Drag 'n' drop some files here, or click to select files</p>
        }
        <p>Drag 'n' drop some files here, or click to select files</p>
         {isDragActive &&
          <div 
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
//              position: 'absolute',
//              top: 0,
//              bottom: 0,
//              left: 0, 
//              right: 0,
              zIndex: 9999,
                width: "100%",
                height: "100%",
            }}
          >
            <div 
              style={{
//                position: 'absolute',
//                top: '50%',
//                right: 0,
//                left: 0,
//                textAlign: 'center',
//                color: 'grey',
//                fontSize: 36
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        }
        </div>
        <ul>
          { urls.map((url) => (
              <li>
                <img className={ classes.thumbnail } src={ url }/>
              </li>
          ))}
        </ul>
        </>
    )
}

export default MyDropzone
