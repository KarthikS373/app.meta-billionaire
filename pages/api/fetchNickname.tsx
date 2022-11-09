import prisma from "../../lib/prisma";

async function handler(req: any, res: any) {
  return new Promise((resolve: any) => {
    const fetchData = async () => {
      const ifExist = await prisma.user.findMany({
        select: {
          name: true,
          wallet: true,
          id: true,
          mbucBalance: true,
        },
        where: {
          wallet: req.query.address,
        },
      });

      res.status(200).json({
        data: ifExist,
      });
      resolve();
    };

    fetchData();
  });
}
export default handler;
