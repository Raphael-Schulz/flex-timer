import styled from "styled-components";
import { IonPage } from "@ionic/react";

export const graphQLserverUri = "http://10.0.2.2:4000/graphql";

//Routes
export const HOME_ROUTE = "/home";
export const EDIT_ROUTE = "/editTimer/";
export const EXECUTE_ROUTE = "/executeTimer/";

export const StyledPage = styled(IonPage)`
  .center {
    text-align: center;
    margin-top: 10px;
  }

  .bottom {
    position: absolute;
    left: 17%;
    right: 17%;
    top: 85%;
    transform: translateY(-50%);
  }

  .top {
    position: absolute;
    left: 15%;
    right: 15%;
    top: 20%;
    transform: translateY(-50%);
  }

  .heading {
    font-size: 50px;
    font-size: 7.5vw;
    line-height: 50px;
  }

  .picture {
    margin: auto;
    width: 100%;
    margin-top: 15px;
  }

  .small-picture {
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
    width: 30%;
    float: right;
  }

  .duration-picker {
    margin: 20px;
    margin-top: 10px;
    margin-left: 30px;
  }

  .duration-label {
    margin-top: 20px;
  }

  .margin-bottom {
    margin-bottom: 20px;
  }

  .leafs-background {
    --background: none;
    background-image: url("/assets/leafs-2.jpg");
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
