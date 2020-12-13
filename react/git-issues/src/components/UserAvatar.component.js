import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    display: inline-block;
`;

const Image = styled.img`
    display: flex-block;
    margin-bottom: -3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;

export default function UserAvatar(props) {
    return <Div>
        <Image
            alt="@benjamin-fukdawurld"
            src="https://avatars1.githubusercontent.com/u/9607026?s=60&amp;v=4"
        />
    </Div>;
}