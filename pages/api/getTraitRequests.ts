import prisma from "../../lib/prisma";

const handler = async (req: any, res: any) => {
  const { order, note, isApproved } = req.body;
  try {
    if (req.method === "GET") {
      const data = await prisma.traitShop.findMany({
        select: {
          address: true,
          adminNote: true,
          description: true,
          isApproved: true,
          order: true,
          request: true,
          total: true,
        },
      });

      res
        .status(200)
        .json({ message: "Fetch successful", count: data.length, data: data });
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
            isApproved: isApproved || ifExist.isApproved,
          },
        });
        res.status(200).json({
          message: "Data approved successful",
          data: data,
        });
      }
    }
  } catch (e) {
    res.status(500).json({ message: "An error occurred" });
  }
};

export default handler;
