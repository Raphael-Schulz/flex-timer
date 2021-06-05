import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { create, trash } from "ionicons/icons";
import { Timer } from "../utils/dataModel";
import { EDIT_ROUTE, EXECUTE_ROUTE } from "../utils/constants";
import { LoaclStorageAccess } from "../data/dataAccess";
import { Error } from "./Status-Messages";

const StyledList = styled(IonList)`
  .seperator {
    margin: 10px;
  }
`;

const TimerList: React.FC = () => {
  const dataAccess = new LoaclStorageAccess();
  const history = useHistory();

  const [showDeleteRequestAlert, setShowDeleteRequestAlert] = useState(false);
  const [deleteRequestTimerId, setDeleteRequestTimerId] = useState("-1");

  const [timers, setTimers] = useState<Array<Timer>>([]);

  useIonViewWillEnter(() => {
    initializeState();
  }, []);

  const initializeState = async () => {
    try {
      const data = await dataAccess.getTimers();
      setTimers(data.timers);
    } catch (err) {
      return <Error error={err} />;
    }
  };

  function deleteTimer(id: string) {
    dataAccess.deleteTimer(id);

    let newTimers = timers.filter(
      (timer: Timer) => timer.id !== deleteRequestTimerId
    );
    setTimers(newTimers);
  }

  return (
    <>
      <IonAlert
        isOpen={showDeleteRequestAlert}
        onDidDismiss={() => {
          setShowDeleteRequestAlert(false);
          setDeleteRequestTimerId("-1");
        }}
        header={"Delete Timer?"}
        message={
          "Do you really want to delete Timer: " +
          timers.find((timer: Timer) => timer.id === deleteRequestTimerId)?.name
        }
        buttons={[
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Yes",
            handler: () => {
              deleteTimer(deleteRequestTimerId);
            },
          },
        ]}
      />

      <StyledList>
        {timers.map((timer: Timer, index: number) => (
          <IonItem key={index}>
            <IonButton
              color="success"
              onClick={() => {
                history.push(EXECUTE_ROUTE + timer.id);
              }}
            >
              Start
            </IonButton>

            <div className="seperator">
              <IonLabel>{timer.name}</IonLabel>
            </div>

            <div slot="end">
              <IonButton
                onClick={() => {
                  history.push(EDIT_ROUTE + timer.id);
                }}
              >
                <IonIcon icon={create}></IonIcon>
              </IonButton>

              <IonButton
                onClick={() => {
                  setDeleteRequestTimerId(timer.id);
                  setShowDeleteRequestAlert(true);
                }}
              >
                <IonIcon icon={trash}></IonIcon>
              </IonButton>
            </div>
          </IonItem>
        ))}
      </StyledList>
    </>
  );
};

export default TimerList;
