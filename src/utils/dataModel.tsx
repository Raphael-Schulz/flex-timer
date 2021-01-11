export interface Timer {
  id: number;
  name: string;
  duration: number;
  events: Array<TimerEvent>;
}

export interface TimerEvent {
  type: string;
  time: number;
  text: string;
}

export function newTimer() : Timer {
    const emptyTimer = {
        id: -1,
        name: "",
        duration: 0,
        events: []
    }

    return emptyTimer;
}

export function newTimerEvent() : TimerEvent {
    const emtpyTimerEvent = {
        type: "",
        time: 0,
        text: ""
    }

    return emtpyTimerEvent;
}
