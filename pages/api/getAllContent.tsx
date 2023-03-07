import prisma from "../../lib/prisma";

const handler = async (req: any, res: any) => {
  const { category } = req.query;

  try {
    let data;
    if (category) {
      data = await prisma.contentUpload.findMany({
        where: {
          category: category,
          active: true,
        },
      });
    } else {
      data = await prisma.contentUpload.findMany({
        where: {
          active: true,
        },
      });
    }

    res
      .status(200)
      .json({ message: "Fetch successful", count: data.length, data: data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
};

export default handler;
