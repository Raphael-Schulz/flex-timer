import { graphQLserverUri } from "../utils/constants";
import {
  getTimersQuery,
  getTimerQuery,
  addTimerQuery,
  updateTimerQuery,
  deleteTimerQuery,
} from "./queries";
import { Timer } from "../utils/dataModel";

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

export class LoaclStorageAccess {
  //TODO: Implement LocalStorage Access functions
}
