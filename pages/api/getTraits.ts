import prisma from "../../lib/prisma";

const handler = async (req: any, res: any) => {
  const { category, id } = req.query;

  try {
    let data;
    if (category) {
      data = await prisma.trait.findMany({
        where: {
          category: category,
          shopQuantity: {
            gt: 0,
          },
        },
        select: {
          id: true,
          category: true,
          cost: true,
          shopQuantity: true,
          asset: true,
          imagePath: true,
        },
      });
    } else if (id) {
      data = await prisma.trait.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          category: true,
          cost: true,
          shopQuantity: true,
          asset: true,
          imagePath: true,
        },
      });
    } else {
      data = await prisma.trait.findMany({
        where: {
          shopQuantity: {
            gt: 0,
          },
        },
        select: {
          id: true,
          category: true,
          cost: true,
          shopQuantity: true,
          asset: true,
          imagePath: true,
        },
      });
    }

    res.status(200).json({ message: "Fetch successful", data: data });
  } catch (e) {
    res.status(500).json({ message: "An error occurred" });
  }
};

export default handler;
