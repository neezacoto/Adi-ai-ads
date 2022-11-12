import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessages from './ErrorMessages';
import AppTextInput from '../AppTextInput';

function AppFormField({name, width, ...otherProps}) {
    const { setFieldTouched, handleChange, errors, touched} = useFormikContext();

    return (
        <>
            <AppTextInput
                width={width}
                {...otherProps}
                onBlur={() => setFieldTouched(name) }
                onChangeText={handleChange(name)}
            />
            <ErrorMessages visible={touched[name]} error={errors[name]} />
        
        </>
    );
}

export default AppFormField;