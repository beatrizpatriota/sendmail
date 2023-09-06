import { sendMail } from "../../service/mailService";
const handler = async (req, res) => {
  try {
    const { method } = req;
    const { title, emails, text } = JSON.parse(req.body)
    switch (method) {
      case "POST": {
        await sendMail(
          title,
          emails,
          text
        );
        res.status(200).send("Success");
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "sendmail",
      message: err.message,
    });
  }
};

export default handler;