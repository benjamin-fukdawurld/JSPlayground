import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 99%;
    position: absolute;
    margin: 3px;
    top: 0;
    font-size: 1.3em;
    box-sizing: border-box;
    border-style: none;
    &:focus {
        outline-style: none;
    }
    background-color: #353535;
    color: white;
`;

const OperationContainer = styled.div`
    height: 62px;
    position: relative;
    margin-bottom: 3px;
    border-width: 1px;
    border-bottom-style: solid;
    background-color: #353535;
`;

const OperationField = React.forwardRef((props, ref) => {
    return <OperationContainer className="operationContainer">
        <Input
            className="operationInput"
            ref={ref}
            type="text"
            onKeyUp={props.onKeyUp}
        />
    </OperationContainer>
});

export default OperationField;