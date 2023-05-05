import prisma from "../../lib/prisma";

const handler = async (req: any, res: any) => {
  try {
    const traitData = await prisma.trait.findMany({});
    const orderData = await prisma.traitShop.findMany({});

    const ordersWithTraits = orderData.map((order) => {
      const traits = traitData.filter((trait) =>
        order.request.includes(trait.id)
      );
      return { ...order, trait: traits };
    });

    res.status(200).json(ordersWithTraits);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
};

export default handler;
