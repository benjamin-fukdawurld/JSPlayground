import React from 'react';
import styled from 'styled-components'

const SearchBarContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
    height: 30px;
    width: 272px;
`;

const Form = styled.form`
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 30px;
`;

const Label = styled.label`
    display: flex;
    vertical-align: middle;
    height: 28px;
    border: 1px solid #444d56;
    border-radius: 6px;
`;

const Input = styled.input`
    width: 81%;
    font-size: 14px;
    padding: 0 12px 0 12px;
    border-style: none;
    border-radius: 8px;
    background-color: inherit;
    color: white;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #C8C9C7;
        opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #C8C9B7;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        color: #C8C9B7;
    }
`;

export default function SearchBar(props) {
    return <SearchBarContainer>
        <Form>
            <Label>
                <Input type="text" placeholder="Search or jump to…" />
                <img
                    src="https://github.githubassets.com/images/search-key-slash.svg"
                    alt=""
                />
            </Label>
        </Form>
    </SearchBarContainer>;
}