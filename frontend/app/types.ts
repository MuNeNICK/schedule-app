export interface Event {
    id: string;
    eventName: string;
    dates: string[];
    responses: Response[];
  }
  
  export interface Response {
    id: string;
    name: string;
    availability: { [date: string]: boolean };
  }
  