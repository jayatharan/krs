import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as MUIDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DateTimePicker = ({label=undefined, textFieldProps=undefined, handleChange=undefined, initialDate=undefined}) => {
    const [value, setValue] = useState(dayjs());

    useEffect(()=>{
        try{
            if(handleChange) handleChange(value.toISOString());
        }catch(error){
            handleChange('');
        }
    },[value])

    useEffect(()=>{
        if(initialDate){
            setValue(dayjs(initialDate));
        }
    },[initialDate])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MUIDateTimePicker
                renderInput={(props) => <TextField {...props} {...textFieldProps} />}
                label={label ? label : "DateTimePicker"}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
            />
        </LocalizationProvider>
    )
}

export default DateTimePicker
