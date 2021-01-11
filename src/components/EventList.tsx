import {
  IonList,
  IonCard,
  IonLabel,
  IonCardHeader,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonButtons,
  IonButton,
} from "@ionic/react";
import React from "react";
import styled from "styled-components";
import { trash } from "ionicons/icons";
import { TimerEvent } from "../utils/dataModel";

import DurationPickerComponent from "../components/Duration-Picker";

const StyledList = styled(IonList)`
  .duration-picker {
    overflow: hidden;
    margin-top: 10px;
    margin-left: 30px;
  }

  .event-list {
    left: 5%;
    right: 20%;
    top: 5%;
  }

  .right-top {
    float: right;
    font-size: 7.5vw;
    margin-top: 1%;
    margin-right: 0%;
  }

  .left-top {
    font-size: 2vw;
    margin-top: 1%;
    margin-left: 1%;
  }

  .select {
    margin-top: 1%;
    margin-right: 1%;
  }

  .overflow-hidden {
    overflow: hidden;
  }
`;

interface ContainerProps {
  timerEvents: Array<TimerEvent>;
  handleChange: Function;
}

const EventList: React.FC<ContainerProps> = (props) => {
  function handleNumberChange(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    const value: number = +target.value;

    let key = target.name as keyof typeof props.timerEvents;

    updatePartentState(value, key, index);
  }

  function handleTextChange(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    const value: string = target.value;

    let key = target.name as keyof typeof props.timerEvents;

    updatePartentState(value, key, index);
  }

  function updatePartentState(
    value: any,
    key: keyof typeof props.timerEvents,
    index: number
  ): void {
    let timerEvents = props.timerEvents;
    let timerEvent = { ...timerEvents[index] };

    timerEvent = {
      ...timerEvent,
      [key]: value,
    };

    timerEvents[index] = timerEvent;
    props.handleChange(timerEvents);
  }

  function deleteTimerEvent(index: number): void {
    let timerEvents = props.timerEvents;
    timerEvents.splice(index, 1);

    props.handleChange(timerEvents);
  }

  return (
    <>
      <StyledList>
        {props.timerEvents.map((timerEvent: TimerEvent, index: number) => (
          <IonCard key={index}>
            <div className="right-top">
              <IonButtons>
                <IonButton onClick={() => deleteTimerEvent(index)}>
                  <IonIcon slot="icon-only" icon={trash} />
                </IonButton>
              </IonButtons>
            </div>

            <IonItem lines="none" className="select">
              <IonLabel>Event Type</IonLabel>
              <IonSelect
                value={timerEvent.type}
                placeholder="TextToSpeech"
                onIonChange={(e) => handleTextChange(e, index)}
              >
                <IonSelectOption value="TextToSpeech">
                  TextToSpeech
                </IonSelectOption>
                <IonSelectOption value="TextToToast">
                  TextToToast
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonCardHeader className="overflow-hidden">
              <IonLabel>Time</IonLabel>
              <div className="duration-picker">
                <DurationPickerComponent
                  initialValue={timerEvent.time}
                  css
                  name="time"
                  handleChange={handleNumberChange}
                  index={index}
                ></DurationPickerComponent>
              </div>

              <IonLabel>Text</IonLabel>
              <IonItem>
                <IonInput
                  name="text"
                  value={timerEvent.text}
                  onIonChange={(event) => handleTextChange(event, index)}
                ></IonInput>
              </IonItem>
            </IonCardHeader>
          </IonCard>
        ))}
      </StyledList>
    </>
  );
};

export default EventList;
