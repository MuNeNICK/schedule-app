// lib/db.ts
export const events: {
    [eventId: string]: {
      eventName: string;
      dates: string[];
      responses: {
        [responseId: string]: {
          name: string;
          availableDates: string[];
        };
      };
    };
  } = {};
  