import prisma from "../../lib/prisma";
import request from "request";
import protectAPI from "../../middleware/protectAPI";

async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      const { userMail, userPassword, token } = req.body;
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

      if (!token) {
        res.status(403).send({
          msg: "There was a problem with your request. Please try again later.",
        });
        resolve();
      }

      const tryLogin = async () => {
        const accountExist = await prisma.user.findMany({
          where: {
            email: userMail,
            password: userPassword,
          },
        });

        if (!accountExist.length > 0) {
          res.status(403).send({ msg: "This account does not exist" });
          resolve();
        } else {
          res.status(200).send({ msg: "Connection successfully completed" });
          resolve();
        }
      };

      request(verificationUrl, (err, response, body) => {
        if (err) {
          res.status(403).send({ msg: "Unable to process request." });
          resolve();
        }

        const { success, score } = JSON.parse(body);

        if (!success || score < 0.4) {
          res.status(403).send({
            msg: "Sending failed. Robots aren't allowed here.",
            score: score,
          });
          resolve();
        } else {
          tryLogin();
        }
      });
    } else {
      res.status(405).end(`Method ${method} Not Allowed`);
      resolve();
    }
  });
}

export default protectAPI(handler);
