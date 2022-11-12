import React from 'react';
import { FormikContext, useFormikContext } from 'formik';

import AppButton from '../AppButton';


function SubmitButton({ title, size, color, textColor, style }) {
    const {handleSubmit} = useFormikContext();

    return (
        <AppButton 
        style={style} 
        color={color}
        textColor={textColor}
        title={title}
        size={size}
        onPress={handleSubmit} />
    );
}

export default SubmitButton;