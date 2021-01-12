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
} from "@ionic/react";
import { save } from "ionicons/icons";
import { StyledPage } from "../utils/constants";
import { Timer, newTimer, TimerEvent, newTimerEvent } from "../utils/dataModel";
import DurationPickerComponent from "../components/Duration-Picker";
import EventList from "../components/EventList";

const EditTimer: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const [timer, setTimer] = useState<Timer>(newTimer());

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
      events: updatedEvents,
    });
  }

  function addNewTimerEvent(): void {
    let currentEvents = timer.events;

    currentEvents.push(newTimerEvent());

    setTimer({
      ...timer,
      events: currentEvents,
    });
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
            <IonButton>
              Save <IonIcon icon={save} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <div className="small-picture">
            <img src="./assets/undraw_time_management.svg" />
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
          timerEvents={timer.events}
          handleChange={handleEventChange}
        ></EventList>
      </IonContent>
    </StyledPage>
  );
};

export default EditTimer;
