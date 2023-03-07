import prisma from "../../lib/prisma";

const handler = async (req: any, res: any) => {
  return new Promise((resolve: any) => {
    const { id, active, category, description, type, duration, title, link } = req.body;

    const fetchData = async () => {
      if (id) {
        const ifExist = await prisma.courses.findMany({
          where: {
            id: parseInt(id),
          },
        });

        if (ifExist.length > 0) {
          const updated = await prisma.courses.update({
            where: {
              id: ifExist[0].id,
            },
            data: {
              active: active || ifExist[0].active,
              category: category || ifExist[0].category,
              description: description || ifExist[0].description,
              title: title || ifExist[0].title,
              duration: duration || ifExist[0].duration,
              link: link || ifExist[0].link,
              type: type,
            },
          });

          res.status(200).json({ data: updated });
          resolve();
          return;
        }
      }

      if (!category || !duration || !title || !link) {
        console.log({
          id,
          active,
          category,
          description,
          type,
          duration,
          title,
          link,
        });
        res.status(400).json({ message: "Incorrect metadata" });
        resolve();
        return;
      }

      const created = await prisma.courses.create({
        data: {
          active: active || true,
          category: category,
          description: description,
          title: title,
          duration: duration,
          link: link,
          type: type,
        },
      });

      res.status(200).json({
        data: created,
      });
      resolve();
    };

    if (req.method === "POST") {
      fetchData();
    } else {
      res.status(400).json({ message: "Invalid method" });
    }
  });
};

export default handler;
