import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

// 型定義とデータ構造
type Event = {
  id: string;
  eventName: string;
  dates: string[];
  responses: Response[];
};

type Response = {
  id: string;
  name: string;
  availableDates: string[];
};

const events: Event[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === "POST") {
    const { eventName, dates } = req.body;

    const event: Event = {
      id: nanoid(),
      eventName,
      dates,
      responses: [],
    };

    events.push(event);

    res.status(201).json({ eventId: event.id });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
