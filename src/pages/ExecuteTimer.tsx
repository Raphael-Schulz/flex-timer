import React, { useState, useRef } from "react";
import {
  IonButton,
  IonContent,
  IonProgressBar,
  IonToast,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useParams } from "react-router";
import { TextToSpeech } from "@ionic-native/text-to-speech";
import { Error, Loading } from "../components/Status-Messages";
import { LoaclStorageAccess } from "../data/dataAccess";
import { newTimer, newToast } from "../utils/dataModel";
import { StyledPage } from "../utils/constants";
import { Boolean } from "@ungap/global-this";
import Timer from "../components/Timer";

const ExecuteTimer: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const dataAccess = new LoaclStorageAccess();
  const textToSpeech = TextToSpeech;

  const [timerObject, setTimerObject] = useState(newTimer());
  const [timer, setTimer] = useState(0);

  const [toast, setToast] = useState(newToast());

  const [running, setRunning] = useState(false);

  const timerStateRef = useRef() as React.MutableRefObject<number>;
  timerStateRef.current = timer;

  const runningStateRef = useRef() as React.MutableRefObject<Boolean>;
  runningStateRef.current = running;

  const intervalStateRef = useRef() as React.MutableRefObject<NodeJS.Timeout>;

  useIonViewWillEnter(() => {
    initializeState();
    cordova.plugins.backgroundMode.enable();
  }, []);

  useIonViewWillLeave(() => {
    cordova.plugins.backgroundMode.disable();
  }, []);

  if (timer === null) return <Loading />;

  const initializeState = async () => {
    try {
      const timer = await dataAccess.getTimer(id);
      if (timer) setTimerObject(timer);
    } catch (err) {
      return <Error error={err} />;
    }
  };

  function startTimer() {
    if (!runningStateRef.current) {
      setRunning(true);
      intervalStateRef.current = setInterval(() => {
        if (
          runningStateRef.current === false ||
          timerStateRef.current === timerObject.duration
        ) {
          clearInterval(intervalStateRef.current);
          return;
        }
        //Pass the next timer-second to not have delay from the interval
        checkEvents(timerStateRef.current + 1);
        setTimer(timerStateRef.current + 1);
      }, 1000);
    }
  }

  function checkEvents(timerSecond: number) {
    timerObject.timerEvents.forEach((timerEvent) => {
      if (timerEvent.time === timerSecond) {
        switch (timerEvent.type) {
          case "TextToSpeech":
            textToSpeech.speak(timerEvent.text);
            break;
          case "TextToToast":
            setToast({
              text: timerEvent.text,
              showToast: true,
            });
            break;
        }
      }
    });
  }

  function getProgressBarValue() {
    return timer / timerObject.duration;
  }

  return (
    <StyledPage>
      <IonContent className="leafs-background" fullscreen>
        <IonToast
          isOpen={toast.showToast}
          onDidDismiss={() =>
            setToast({
              ...toast,
              showToast: false,
            })
          }
          message={toast.text}
          duration={2000}
          position="top"
        />

        <div className="bottom">
          <IonProgressBar
            className="margin-bottom"
            value={getProgressBarValue()}
          ></IonProgressBar>
          <br />

          <div className="center">
            {running ? (
              <IonButton
                color="danger"
                size="large"
                onClick={() => setRunning(false)}
              >
                Pause
              </IonButton>
            ) : (
              <IonButton
                color="success"
                size="large"
                onClick={() => startTimer()}
              >
                Start
              </IonButton>
            )}

            <IonButton color="medium" size="large" onClick={() => setTimer(0)}>
              Reset
            </IonButton>
          </div>
        </div>

        <Timer seconds={timer}></Timer>
      </IonContent>
    </StyledPage>
  );
};

export default ExecuteTimer;
