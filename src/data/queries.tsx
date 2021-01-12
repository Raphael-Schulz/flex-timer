export const getTimersQuery = `
{
    timers {
      id
      name
    }
  }
`;

export const getTimerQuery = `
query timer($id: ID){
    timer(id: $id) {
      id
      name
      duration
      timerEvents {
        time
        type
        text
      }
    }
}
`;

export const addTimerQuery = `
mutation addTimer($name: String!, $duration: Int!, $timerEvents: [TimerEventInput]){
    addTimer(name: $name, duration: $duration, timerEvents: $timerEvents){
      id
    }
  }`;

export const updateTimerQuery = `
mutation updateTimer($id: ID!, $name: String!, $duration: Int!, $timerEvents: [TimerEventInput]){
  updateTimer(id: $id, name: $name, duration: $duration, timerEvents: $timerEvents){
    id
  }
}`;

export const deleteTimerQuery = `
mutation deleteTimer($id: ID!){
  deleteTimer(id: $id){
    id
  }
}`;
