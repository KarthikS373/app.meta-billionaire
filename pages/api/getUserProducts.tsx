import prisma from "../../lib/prisma";

async function handler(req: any, res: any) {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const data = await prisma.product.findMany({
        where: {
          authorId: req.query.address || "",
        },
      });
      res.status(200).send(data);
      resolve();
    } catch (e) {
      res.status(500).send({
        message: e,
      });
      reject(e);
    }
  });
}

export default handler;
