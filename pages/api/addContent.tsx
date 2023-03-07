import prisma from "../../lib/prisma";

const handler = async (req: any, res: any) => {
  return new Promise((resolve: any) => {
    const {
      id,
      active,
      category,
      description,
      desktopThumbnail,
      mobileThumnail,
      duration,
      speaker,
      title,
      video,
    } = req.body;

    const fetchData = async () => {
      if (id) {
        const ifExist = await prisma.contentUpload.findMany({
          where: {
            id: parseInt(id),
          },
        });

        if (ifExist.length > 0) {
          const updated = await prisma.contentUpload.update({
            where: {
              id: ifExist[0].id,
            },
            data: {
              active: active || ifExist[0].active,
              category: category || ifExist[0].category,
              description: description || ifExist[0].description,
              desktopThumbnail: desktopThumbnail || ifExist[0].desktopThumbnail,
              mobileThumnail: mobileThumnail || ifExist[0].mobileThumnail,
              duration: duration || ifExist[0].duration,
              speaker: speaker || ifExist[0].speaker || "",
              title: title || ifExist[0].title,
              video: video || ifExist[0].video,
            },
          });

          res.status(200).json({ data: updated });
          resolve();
          return;
        }
      }

      if (!category || !description || !duration || !title || !video) {
        res.status(400).json({ message: "Incorrect metadata" });
        resolve();
        return;
      }

      const created = await prisma.contentUpload.create({
        data: {
          active: active || true,
          category: category,
          description: description,
          desktopThumbnail: desktopThumbnail,
          mobileThumnail: mobileThumnail,
          duration: duration,
          speaker: speaker,
          title: title,
          video: video,
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
