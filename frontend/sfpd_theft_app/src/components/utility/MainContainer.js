import styled from "styled-components";

const  MainContainer = styled.div`
    background-color: ${props => props.theme.card};
    padding: 10px 25px 30px 25px;
    margin: 0px 20px 20px 0px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.10) 0px 5px 15px 0px;

    @media (max-width: 900px) {
        margin: 0px 0px 10px 0px;
        padding: 10px 0px 10px 0px;
        background-color:transparent;
        box-shadow: none;


    }
`

export default MainContainer;
