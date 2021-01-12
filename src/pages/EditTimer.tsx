import React, { useState } from "react";
import { useParams } from "react-router";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { save } from "ionicons/icons";
import { Timer, newTimer, TimerEvent, newTimerEvent } from "../utils/dataModel";
import { StyledPage, HOME_ROUTE } from "../utils/constants";
import { DatabaseAccess } from "../data/dataAccess";
import { Error } from "../components/Status-Messages";
import DurationPickerComponent from "../components/Duration-Picker";
import EventList from "../components/EventList";

const EditTimer: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const history = useHistory();
  const dataAccess = new DatabaseAccess();

  const [timer, setTimer] = useState<Timer>(newTimer());

  useIonViewWillEnter(() => {
    initializeState();
  }, []);

  const initializeState = async () => {
    if (id !== "new") {
      try {
        const data = await dataAccess.getTimer(id);
        setTimer(data.timer);
      } catch (err) {
        return <Error error={err} />;
      }
    }
  };

  function handleNumberChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value: number = +target.value;

    let key = target.name as keyof typeof timer;

    setTimer({
      ...timer,
      [key]: value,
    });
  }

  function handleTextChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value: string = target.value;

    let key = target.name as keyof typeof timer;

    setTimer({
      ...timer,
      [key]: value,
    });
  }

  function handleEventChange(updatedEvents: Array<TimerEvent>) {
    setTimer({
      ...timer,
      timerEvents: updatedEvents,
    });
  }

  function addNewTimerEvent(): void {
    let currentEvents = timer.timerEvents;

    currentEvents.push(newTimerEvent());

    setTimer({
      ...timer,
      timerEvents: currentEvents,
    });
  }

  function saveTimer(): void {
    if (id === "new") dataAccess.addTimer(timer);
    else dataAccess.updateTimer(timer);

    history.replace(HOME_ROUTE);
  }

  return (
    <StyledPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{id === "new" ? "Create Timer" : "Edit Timer"} </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => saveTimer()}>
              Save <IonIcon icon={save} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <div className="small-picture">
            <img alt="Flex-Timer" src="./assets/undraw_time_management.svg" />
          </div>
          <IonCardHeader>
            <IonLabel>Name</IonLabel>
            <IonItem>
              <IonInput
                name="name"
                value={timer.name}
                onIonChange={(e) => handleTextChange(e)}
              ></IonInput>
            </IonItem>
            <div className="duration-label">
              <IonLabel>Duration</IonLabel>
              <div className="duration-picker">
                <DurationPickerComponent
                  initialValue={timer.duration}
                  name="duration"
                  handleChange={handleNumberChange}
                ></DurationPickerComponent>
              </div>
            </div>
          </IonCardHeader>
        </IonCard>

        <div className="center">
          <IonButton color="medium" onClick={addNewTimerEvent}>
            Add new Event
          </IonButton>
        </div>

        <EventList
          timerEvents={timer.timerEvents}
          handleChange={handleEventChange}
        ></EventList>
      </IonContent>
    </StyledPage>
  );
};

export default EditTimer;
