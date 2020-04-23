import * as React from 'react';

import {
    Grid, Card, CardHeader, CardContent,
    TextField,
    Select, MenuItem, Checkbox,
    FormControlLabel, FormControl, FormLabel, FormGroup, FormHelperText,
} from '@material-ui/core';

type TextInput = {
    type: "text",
    name: string,
    label: string,
    placeholder: string,
}

type SelectInput = {
    type: 'select',
    name: string,
    label: string,
    selections: {
        label: string
        value: string
    } [],
}

type CheckboxInput = {
    type: 'checkbox'
    name: string,
    label: string,
    selections: {
        label: string,
        value: string,
    }[],
}

type Input = TextInput | SelectInput | CheckboxInput
type FormGroup = {
    name: string,
    label: string,
    inputs: Input []
}
type Form = FormGroup []

type Props = {
    form: Form
}

const InputRenderer = (props: Input) => {
    if (props.type == 'text') {
        return <TextField fullWidth label={ props.label } name={ props.name } placeholder={ props.placeholder }/>
    } else if (props.type == 'select') {
        return <FormControl component="fieldset">
          <FormLabel component="legend">{ props.label }</FormLabel>
        <Select>
        {
            props.selections.map((e, i) => (
                <MenuItem key={i} value={ e.value }>{ e.label }</MenuItem>
            ))
        }
          </Select>
        </FormControl>
    } else if (props.type == 'checkbox') {
        return (
            <FormControl component="fieldset">
              <FormLabel component="legend">{ props.label }</FormLabel>
              <FormGroup>
                { props.selections.map( (e, i) => (
                    <FormControlLabel
                        key={ i }
                        control={<Checkbox name={ e.value } />}
                        label={ e.label }
                    />
                ))}
              </FormGroup>
              <FormHelperText>Be careful</FormHelperText>
            </FormControl>
        )
    }
    return <p>error</p>
}

const FormGroupRenderer = (props: FormGroup) => (
    <Card>
      <CardHeader title={ props.label }/>
      <CardContent>
        <Grid container spacing={1}>
        {
            props.inputs.map((e: Input) => (
                <Grid item xs={12}>
                  <InputRenderer key={ e.name } { ...e } />
                </Grid>
            ))
        }
        </Grid>
      </CardContent>
    </Card>
)

const FormRenderer = (props: Props) => (
    <>{
        props.form.map((e: FormGroup) => (
            <FormGroupRenderer key={ e.name } { ...e } />
        ))
    }</>
)


const DynamicForm = () => {
    const form_dict: any = [  // TODO: どうやれば型チェックがとおるのか・・・
        {
            label: '基本的な入力',
            name: 'group-0',
            inputs: [
                {
                    type: 'text',
                    name: 'input-0',
                    label: 'テキスト入力',
                    placeholder: 'this is placeholder',
                },
                {
                    type: 'select',
                    name: 'input-1',
                    label: '選択',
                    selections: [
                        { label: '女性', value: 'value-0' },
                        { label: '男性', value: 'value-1' },
                    ],
                },
            ],
        },
        {
            label: 'チェックボックス入力テスト',
            name: 'group-1',
            inputs: [
                {
                    type: 'checkbox',
                    name: 'input-0',
                    label: 'チェックボックス',
                    selections: [
                        { label: '10', value: 'value-0' },
                        { label: '20', value: 'value-1' },
                        { label: '30', value: 'value-2' },
                        { label: '40', value: 'value-3' },
                        { label: '50', value: 'value-4' },
                        { label: '60', value: 'value-5' },
                    ],

                },
            ],
        },
    ]

    return (
        <FormRenderer form={ form_dict }/>
    )
}

export default DynamicForm
