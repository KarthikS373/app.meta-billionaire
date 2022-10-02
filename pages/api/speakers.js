import prisma from "../../lib/prisma";
import protectAPI from "../../middleware/protectAPI";

async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      const getAllSpeakers = async () => {
        const speakerList = await prisma.speaker.findMany();
        res.status(200).send({ msg: speakerList });
        resolve();
      };
      getAllSpeakers();
    } else {
      res.status(405).end(`Method ${method} Not Allowed`);
      resolve();
    }
  });
}

export default protectAPI(handler);
