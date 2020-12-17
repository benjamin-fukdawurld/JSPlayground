import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    margin-bottom: 24px;
`;

const InnerDiv = styled.div`
    text-align: center;
    padding: 24px;
    border-style: solid;
    border-color: #eaecef;
    border-width: 1px;
    border-radius: 6px;
`;

const H4 = styled.h4`
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 8px;
`;

const TextDiv = styled.div`
    width: 66.66%;
    margin-right: auto;
    margin-left: auto;
`;

export default function ContributePanel() {
    return <Div>
        <InnerDiv>
            <H4>👋 Want to contribute to ncsoft/Unreal.js?</H4>
            <TextDiv>
                If you have a bug or an idea, browse the open issues before opening a new one.
                You can also take a look at the <a href="https://opensource.guide/">
                    Open Source Guide
                </a>.
            </TextDiv>
        </InnerDiv>
    </Div>;
}