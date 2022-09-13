import React from 'react'
import DateTimePicker from '../DateTimePicker'
import { FormControl, FormHelperText } from '@mui/material';
import { useField } from 'formik';

const FormikDateTimeField = ({name, label=undefined, formControlProps=undefined, textFieldProps=undefined}) => {
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

    const handleChange = (value)=>{
        helper.setValue(value);
    }

    return (
        <FormControl {...formControlProps} error={isError()}>
            <DateTimePicker
                label={label}
                textFieldProps={textFieldProps}
                handleChange={handleChange}
            />
            {renderHelperText()&&(
                <FormHelperText>{renderHelperText()}</FormHelperText>
            )}
        </FormControl>
    )
}

export default FormikDateTimeField