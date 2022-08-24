import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Background>
            <h1>Page Not Found</h1>
            <StyledButton onClick={() => { navigate(-1); }}>Go Back</StyledButton>
        </Background>
    );
}

export default NotFound;

const Background = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
`;

const StyledButton = styled.button`
    box-sizing: border-box;
    width: 50%;
    height: 30px;
    margin: 10px 0 0 0;
    background-color: skyblue;
    color: white;
    border-radius: 10px;   
    border: none; 
`;