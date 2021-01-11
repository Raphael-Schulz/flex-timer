import React from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import TimerList from "../components/TimerList";
import { EDIT_ROUTE, StyledPage } from "../utils/constants";

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <StyledPage>
      <IonContent fullscreen>
        <div className="picture">
          <img src="./assets/undraw_season_change.svg" />
        </div>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Saved Timers</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="center">
          <IonButton
            color="medium"
            onClick={() => {
              history.push(EDIT_ROUTE + "new");
            }}
          >
            Add new Timer
          </IonButton>
        </div>

        <TimerList />
      </IonContent>
    </StyledPage>
  );
};

export default Home;
