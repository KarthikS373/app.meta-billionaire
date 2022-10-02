import prisma from "../../lib/prisma";
import protectAPI from "../../middleware/protectAPI";

async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      const { action, userPassword } = req.body;

      if (userPassword !== "vFBNruYLjZjWakcgQN2#;MX#") {
        res.status(403).send({ msg: "Not an admin" });
        resolve();
      } else {
        const deleteItem = async () => {
          const { itemId } = req.body;
          const itemExist = await prisma.video.deleteMany({
            where: {
              id: itemId,
            },
          });

          if (itemExist.count !== 1) {
            res.status(403).send({ msg: "An error occured, please try again" });
            resolve();
          } else {
            res.status(200).send({ msg: "Item was removed successfully" });
            resolve();
          }
        };

        const updateItem = async () => {
          const {
            itemId,
            url,
            image,
            name,
            type,
            moneyMakerHere,
            robotomHere,
          } = req.body;

          const updatedItem = await prisma.video.update({
            where: {
              id: itemId,
            },
            data: {
              url,
              image,
              name,
              type,
              isRobotom: robotomHere,
              isMoneyMaker: moneyMakerHere,
            },
          });

          if (!updatedItem) {
            res.status(403).send({ msg: "An error occured, please try again" });
            resolve();
          } else {
            res.status(200).send({ msg: "Item was updated successfully" });
            resolve();
          }
        };

        const addItem = async () => {
          const {
            itemImage: image,
            itemName: name,
            itemVideo: url,
            itemType: type,
            moneyMakerHere,
            robotomHere,
          } = req.body;

          try {
            await prisma.video.create({
              data: {
                url,
                image,
                name,
                type,
                isRobotom: robotomHere,
                isMoneyMaker: moneyMakerHere,
              },
            });
            res.status(200).send({ msg: "Item was created successfully" });
            resolve();
          } catch (e) {
            res.status(403).send({ msg: "An error occured, please try again" });
            resolve();
          }
        };

        switch (action) {
          case "delete":
            deleteItem();
            break;
          case "update":
            updateItem();
            break;
          case "add":
            addItem();
            break;
          default:
            console.log(`Sorry, we are out of ${expr}.`);
        }
      }
    } else if (req.method === "GET") {
      const getAllItem = async () => {
        const itemListData = await prisma.video.findMany({
          orderBy: {
            id: "desc",
          },
        });
        res.status(200).send({ msg: itemListData });
        resolve();
      };
      getAllItem();
    } else {
      res.status(405).end(`Method ${method} Not Allowed`);
      resolve();
    }
  });
}

export default protectAPI(handler);
