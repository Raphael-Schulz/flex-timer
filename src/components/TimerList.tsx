import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { EDIT_ROUTE, EXECUTE_ROUTE } from "../utils/constants";
import { create, trash } from "ionicons/icons";
import { Timer } from "../utils/dataModel";

const StyledList = styled(IonList)`
  .seperator {
    margin: 10px;
  }
`;

const TimerList: React.FC = () => {
  const history = useHistory();

  const [showDeleteRequestAlert, setShowDeleteRequestAlert] = useState(false);
  const [deleteRequestTimerId, setDeleteRequestTimerId] = useState(-1);

  let timers: Array<Timer> = [
    {
      id: 1,
      name: "20 minute Training",
      duration: 360,
      events: [
        {
          time: 20,
          type: "tts",
          text: "This is a test speech!",
        },
      ],
    },
  ];

  return (
    <>
      <IonAlert
        isOpen={showDeleteRequestAlert}
        onDidDismiss={() => {
          setShowDeleteRequestAlert(false);
          setDeleteRequestTimerId(-1);
        }}
        header={"Delete Timer?"}
        message={
          "Do you really want to delete Timer: " +
          timers.find((timer) => timer.id === deleteRequestTimerId)?.name
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
              //TODO: Delete Timer with id
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
