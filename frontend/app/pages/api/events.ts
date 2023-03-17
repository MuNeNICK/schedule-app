import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

const events = new Map<string, { eventName: string; dates: string[] }>();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { eventName, dates } = req.body;
    const eventId = nanoid();
    events.set(eventId, { eventName, dates });
    res.status(201).json({ eventId });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
