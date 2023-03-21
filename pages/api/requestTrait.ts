import crypto from "crypto";

import prisma from "../../lib/prisma";

const handler = async (req: any, res: any) => {
  return new Promise((resolve: any) => {
    const { address, request, description, total } = req.body;

    const fetchData = async () => {
      if (!address || !request || !total || !description) {
        res.status(400).json({ message: "Incorrect metadata" });
        resolve();
        return;
      }

      const uuid = crypto.randomUUID();

      try {
        const created = await prisma.traitShop.create({
          data: {
            order: uuid,
            address: address,
            request: request,
            description: description,
            total: parseFloat(total),
            isApproved: false,
          },
        });

        console.log(created);

        res.status(200).json({
          data: created,
        });
        resolve();
      } catch (e) {
        res.status(500).json({ message: "An error occurred" });
      }
    };

    if (req.method === "POST") {
      fetchData();
    } else {
      console.log("Traits: No get request allowed");
      res.status(400).json({ message: "Invalid method" });
    }
  });
};

export default handler;
