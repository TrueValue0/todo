import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form'

const AutoResizableTextarea = (props) => {
    const { valor = '', onContentChange } = props;
    const [value, setValue] = useState(valor);
    const [size, setSize] = useState('auto');
    const textareaRef = useRef(null);

    const handleChange = (event) => {
        const valor = event.target.value;
        setValue(valor);
        if (onContentChange) onContentChange(valor);
    };

    useEffect(() => {
        if (textareaRef.current) {
            setSize(`${textareaRef.current.scrollHeight}px`);
        }
    }, [value]);
    return (
        <Form.Control
            as='textarea'
            {...props}
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            style={{ overflow: 'hidden', resize: 'none', height: `${size}` }}
        />
    );
};

export default AutoResizableTextarea;
