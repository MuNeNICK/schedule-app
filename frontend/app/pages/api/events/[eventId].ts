import { NextApiRequest, NextApiResponse } from "next";
import { events } from "../events";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;

  if (req.method === "GET") {
    const event = events.get(eventId as string);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).end();
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
