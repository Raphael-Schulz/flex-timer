import React, { useState, useRef } from "react";
import {
  IonButton,
  IonContent,
  IonProgressBar,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useParams } from "react-router";
import { TextToSpeech } from "@ionic-native/text-to-speech";
import { Error, Loading } from "../components/Status-Messages";
import { DatabaseAccess } from "../data/dataAccess";
import { newTimer, newToast } from "../utils/dataModel";
import { StyledPage } from "../utils/constants";
import { sleep } from "../utils/functions";
import { Boolean } from "@ungap/global-this";
import Timer from "../components/Timer";

const ExecuteTimer: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const dataAccess = new DatabaseAccess();
  const textToSpeech = TextToSpeech;

  const [timerObject, setTimerObject] = useState(newTimer());
  const [timer, setTimer] = useStateWithCallbackLazy(0);

  const [toast, setToast] = useState(newToast());

  const [running, setRunning] = useState(false);
  const [incermenterRunning, setIncrementerRunning] = useState(false);

  const timerStateRef = useRef() as React.MutableRefObject<number>;
  timerStateRef.current = timer;

  const runningStateRef = useRef() as React.MutableRefObject<Boolean>;
  runningStateRef.current = running;

  const incermenterRunningStateRef = useRef() as React.MutableRefObject<Boolean>;
  incermenterRunningStateRef.current = incermenterRunning;

  useIonViewWillEnter(() => {
    initializeState();
  }, []);

  if (timer === null) return <Loading />;

  const initializeState = async () => {
    try {
      const data = await dataAccess.getTimer(id);
      setTimerObject(data.timer);
    } catch (err) {
      return <Error error={err} />;
    }
  };

  function increment(newTimer: number) {
    setTimer(newTimer, async () => {
      await sleep(1000);
      if (
        runningStateRef.current === false ||
        timerStateRef.current === timerObject.duration
      ) {
        setIncrementerRunning(false);
        return;
      }
      checkEvents();
      increment(timerStateRef.current + 1);
    });
  }

  function incrementTimer() {
    setRunning(true);

    if (!incermenterRunningStateRef.current) {
      setIncrementerRunning(true);
      increment(timer + 1);
    }
  }

  function checkEvents() {
    timerObject.timerEvents.forEach((timerEvent) => {
      if (timerEvent.time === timerStateRef.current) {
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
                onClick={() => incrementTimer()}
              >
                Start
              </IonButton>
            )}

            <IonButton
              color="medium"
              size="large"
              onClick={() => setTimer(0, () => {})}
            >
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
