import React, { useState, useRef } from "react";
import { IonButton, IonContent, IonProgressBar } from "@ionic/react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useParams } from "react-router";
import { sleep } from "../utils/functions";
import { StyledPage } from "../utils/constants";
import Timer from "../components/Timer";
import { TextToSpeech } from "@ionic-native/text-to-speech";

const ExecuteTimer: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const [timer, setTimer] = useStateWithCallbackLazy(0);
  const [running, setRunning] = useState(false);
  const [incermenterRunning, setIncrementerRunning] = useState(false);

  const timerStateRef = useRef() as React.MutableRefObject<number>;
  timerStateRef.current = timer;

  const runningStateRef = useRef() as React.MutableRefObject<Boolean>;
  runningStateRef.current = running;

  const incermenterRunningStateRef = useRef() as React.MutableRefObject<Boolean>;
  incermenterRunningStateRef.current = incermenterRunning;

  function increment(newTimer: number) {
    setTimer(newTimer, async () => {
      await sleep(1000);
      if (runningStateRef.current === false) {
        setIncrementerRunning(false);
        return;
      }
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

  // get timer from query

  return (
    <StyledPage>
      <IonContent className="leafs-background" fullscreen>
        <div className="leafs-background">
          <div className="bottom">
            <IonProgressBar
              className="margin-bottom"
              value={0.5}
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
        </div>
      </IonContent>
    </StyledPage>
  );
};

export default ExecuteTimer;
