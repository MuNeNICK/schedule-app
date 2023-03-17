import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const eventId = req.query.eventId as string;
  
  if (req.method === "POST") {
    const { name, availableDates } = req.body;
    const responseId = nanoid();
    events[eventId].responses[responseId] = {
      name,
      availableDates,
    };

    res.status(201).json({ id: responseId });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
