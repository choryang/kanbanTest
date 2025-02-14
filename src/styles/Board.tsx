import styled from "styled-components";

export const Board = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 300px;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: rgba(91, 166, 209, 0.1);
`;

export const BoardTitle = styled.span`
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
`

export const NewCardBtn = styled.button`
    cursor: pointer;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    text-align: start;
    color: rgba(54, 129, 177, 0.82);
    border: 1px solid rgba(178, 178, 178, 0.82);
    width: 100%;
    height: 45px;
    padding: 12px 16px;
    background-color: transparent;
    box-shadow: rgba(15, 15, 15, 0.07) 0px 0px 0px 1px, rgba(15, 15, 15, 0.05) 0px 2px 4px;

    
    &:hover {
        background-color: rgba(237, 237, 237, 0.82);
    }
    
`