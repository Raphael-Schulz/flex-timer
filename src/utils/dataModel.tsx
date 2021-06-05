export interface Timer {
  id: string;
  name: string;
  duration: number;
  timerEvents: Array<TimerEvent>;
}

export interface TimerEvent {
  type: string;
  time: number;
  text: string;
}

export interface GetTimersResponse {
  timers: Timer[]
}

export interface Toast {
  text: string;
  showToast: boolean;
}

export function newToast(): Toast {
  const emptyToast = {
    text: "",
    showToast: false,
  };

  return emptyToast;
}

export function newTimer(): Timer {
  const emptyTimer = {
    id: "-1",
    name: "",
    duration: 0,
    timerEvents: [],
  };

  return emptyTimer;
}

export function newTimerEvent(): TimerEvent {
  const emtpyTimerEvent = {
    type: "",
    time: 0,
    text: "",
  };

  return emtpyTimerEvent;
}
