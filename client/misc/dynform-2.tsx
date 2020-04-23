// Library
import React from 'react';
import _ from 'lodash'
import Form from "@rjsf/material-ui"
import { JSONSchema7 } from 'json-schema';
import { withTheme } from '@rjsf/core'
import { Theme } from "@rjsf/material-ui"

import {
    MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns';

//const theme = {
//    widgets: {
//        test: () => <div>test</div>,
//    },
//}
const theme = _.clone(Theme)
theme.widgets!.test = () => <div>test</div>

const ThemedForm = withTheme(theme)
// https://react-jsonschema-form.readthedocs.io/en/latest/theme-customization/


// Internals
const schema: JSONSchema7 = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false},
        completedAt: {type: "string", format: "date-time", title: "completed at", default: ''},
    },
}
const uiSchema = {
    title: {
        "ui:widget": "test",
    },
//     done: {
//         "ui:widget": "select",
//     },
}
//const formData = {
//    title: '',
//    done: false,
//}
// const uiSchema = require('./path-to your-ui-schema.json');
// const formData = require('./path-to your-ui-formData.json');

class Example extends React.Component {
    onSubmit = (value:any) => {
        console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
        // setTimeout(() => callback && callback(), 2000); // just an example in real world can be your XHR call
    }
    onCancel = () => {
        console.log('on reset being called');
    }
    onFormChanged = ({ formData }:any) => {
        console.log('onFormChanged: ',formData); // eslint-disable-line no-console
    }
    onUpload = (value:any) => {
        console.log('onUpload: ', value); // eslint-disable-line no-console
    }
    // uiSchema={uiSchema}
    // 
    render() {
        return (
            <ThemedForm
            schema={schema}
            uiSchema={uiSchema}
                onSubmit={this.onSubmit}
                onChange={this.onFormChanged}
            />
        );
    }
}

export default Example
