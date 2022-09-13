import React from 'react'
import { TextField } from '../TextField'
import { useField } from 'formik';

const FormikTextField = ({name, label=undefined, textFieldProps=undefined}) => {
    const [field, meta, helper] = useField(name);

    const isError = () => {
        if(meta.touched && meta.error) return true;
        return false;
    }

    const renderHelperText = ()=>{
        if(meta.error && meta.touched) {
            return meta.error;
        }
        return '';
    }

    return (
        <TextField 
            label={label}
            {...textFieldProps}
            error={isError()}
            helperText={renderHelperText()}
            {...field}
        />
    )
}

export default FormikTextField