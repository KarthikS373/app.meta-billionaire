import prisma from "../../lib/prisma";

const handler = async (req: any, res: any) => {
  const { order, paymentStatus } = req.body;

  if (req.method === "POST") {
    try {
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
            paymentStatus: paymentStatus || "pending",
          },
        });
        res.status(200).json({
          data: data,
        });
      } else {
        res.status(400).json({ message: "No corresponding order found" });
      }
    } catch (e) {
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
};

export default handler;
