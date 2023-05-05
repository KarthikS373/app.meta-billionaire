import prisma from "../../lib/prisma";

const handler = async (req: any, res: any) => {
  const { order, note, isApproved } = req.body;
  const { address } = req.query;

  try {
    if (req.method === "GET") {
      let data: any[] = [];
      if (!address) {
        data = await prisma.traitShop.findMany({});
      } else {
        data = await prisma.traitShop.findMany({
          where: {
            address: address,
          },
        });
      }
      res.status(200).json({
        message: "Fetch successful",
        count: data.length,
        data: data,
      });
    } else {
      if (!order) {
        res.status(400).json({ message: "Incorrect metadata" });
        return;
      }

      const ifExist = await prisma.traitShop.findUnique({
        where: {
          order: order,
        },
      });

      if (ifExist) {
        const data = await prisma.traitShop.update({
          where: {
            order: ifExist.order,
          },
          data: {
            adminNote: note || ifExist.adminNote,
            isApproved: isApproved,
          },
        });
        res.status(200).json({
          message: "Data approved successful",
          data: data,
        });
      } else {
        res.status(400).json({ message: "No corresponding order found" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
};

export default handler;
