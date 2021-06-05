import { graphQLserverUri } from "../utils/constants";
import {
  getTimersQuery,
  getTimerQuery,
  addTimerQuery,
  updateTimerQuery,
  deleteTimerQuery,
} from "./queries";
import { GetTimersResponse, Timer } from "../utils/dataModel";

export class DatabaseAccess {
  public async getTimers(): Promise<any> {
    const { data } = await fetch(graphQLserverUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: getTimersQuery,
      }),
    }).then((r) => r.json());

    return data;
  }

  async getTimer(id: string) {
    const { data } = await fetch(graphQLserverUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: getTimerQuery,
        variables: { id: id },
      }),
    }).then((r) => r.json());

    return data;
  }

  async addTimer(timer: Timer) {
    const { data } = await fetch(graphQLserverUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: addTimerQuery,
        variables: {
          name: timer.name,
          duration: timer.duration,
          timerEvents: timer.timerEvents,
        },
      }),
    }).then((r) => r.json());

    return data;
  }

  async updateTimer(timer: Timer) {
    const { data } = await fetch(graphQLserverUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: updateTimerQuery,
        variables: {
          id: timer.id,
          name: timer.name,
          duration: timer.duration,
          timerEvents: timer.timerEvents,
        },
      }),
    }).then((r) => r.json());

    return data;
  }

  async deleteTimer(id: string) {
    const { data } = await fetch(graphQLserverUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: deleteTimerQuery,
        variables: {
          id: id,
        },
      }),
    }).then((r) => r.json());
    return data;
  }
}

async function getNewTimerId(): Promise<number> {
  let newId = 0;

  try {
    const counter = window.localStorage.getItem("timer-id-counter");
    if (counter !== null) {
      newId = +counter;
    }
  } catch (e) {
    console.log(e);
    return newId;
  }

  await incrementTimerIdCounter(newId);
  return newId;
}

async function incrementTimerIdCounter(timerId: number): Promise<void> {
  const newTimerIdCounter = timerId + 1;
  try {
    await window.localStorage.setItem(
      "timer-id-counter",
      newTimerIdCounter.toString()
    );
  } catch (e) {
    console.log(e);
  }
}

async function saveTimers(timers: Timer[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(timers);
    await window.localStorage.setItem("timers", jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export class LoaclStorageAccess {
  public async getTimers(): Promise<GetTimersResponse> {
    const response: GetTimersResponse = { timers: [] };

    try {
      const jsonData = await window.localStorage.getItem("timers");
      if (jsonData !== null) {
        response.timers = JSON.parse(jsonData);
      }
    } catch (e) {
      console.log(e);
    }

    return response;
  }

  async getTimer(id: string): Promise<Timer | undefined> {
    const existingTimers = (await this.getTimers()).timers;
    const editTimer = existingTimers.find((timer) => timer.id === id);
    if (editTimer) return editTimer;

    return undefined;
  }

  async addTimer(timer: Timer): Promise<any> {
    const timersResponse = await this.getTimers();
    const existingTimers = timersResponse.timers;

    const newId = await getNewTimerId();

    existingTimers.push({ ...timer, id: newId.toString() });
    saveTimers(existingTimers);

    return "newTimer";
  }

  async updateTimer(timer: Timer): Promise<void> {
    const existingTimers = (await this.getTimers()).timers;

    const updatedTimers = existingTimers.map((existingTimer) =>
      existingTimer.id !== timer.id ? existingTimer : timer
    );

    saveTimers(updatedTimers);
  }

  async deleteTimer(id: string): Promise<Timer[]> {
    const existingTimers = (await this.getTimers()).timers;

    const filteredTimers = existingTimers.filter(
      (timer: Timer) => timer.id !== id
    );

    saveTimers(filteredTimers);
    return filteredTimers;
  }
}
