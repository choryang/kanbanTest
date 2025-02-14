import styled from "styled-components";

export const Card = styled.div`
    border-radius: 10px;
    padding: 12px 16px;
    box-sizing: border-box;
    height: 60px;
    font-size: 16px;
    font-weight: 700;
    background-color: white;
    border: 1px solid rgba(178, 178, 178, 0.82);
    box-shadow: rgba(15, 15, 15, 0.07) 0px 0px 0px 1px, rgba(15, 15, 15, 0.05) 0px 2px 4px;
    position: relative;

    &:hover {
        background-color: transparent;
    }

    &:focus, &:active {
        outline: 1px solid rgba(178, 178, 178, 0.82);
    }
`;

export const CardHandleBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    padding: 10px;
    top: 0px;
    right: 0px;
`

export const CardHandle = styled.button`
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
    border: none;
`