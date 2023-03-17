import { NextApiRequest, NextApiResponse } from "next";

const responses = new Map<string, any>();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;

  if (req.method === "POST") {
    const response = req.body;
    const eventResponses = responses.get(eventId as string) || [];
    eventResponses.push(response);
    responses.set(eventId as string, eventResponses);
    res.status(201).json({ message: "回答が送信されました" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
