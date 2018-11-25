import styled from 'styled-components';

export const FormWrapper = styled.div`
    max-width: 80vw;
    margin: 0 auto;
    padding-top: 50px;  
`;

export const ActivityButton = styled.div`
    padding: 20px;

    &:after {
        background-color: #0066FF;
        padding: 20px;
        border-radius: 100px;
    }

    ${props => props.createPage && `
        &:after {
            content: "🦄";
        }
    `}

    ${props => props.createEvent && `
        &:after {
            content: "📋";
        }
    `}

    ${props => props.hello && `
        &:after {
            content: "🚀";
        }
    `}
`