
const handler = async (req, res) => {
  try {
    const { method } = req;
    switch (method) {
      case "GET": {
        const response = [
            {
              key: '1',
              value: 300000,
              segmento: 'Apartamento',
              address: '10 Downing Street',
            },
            {
              key: '2',
              value: 45000,
              segmento: 'Casa',
              address: '10 Downing Street',
            },
            {
              key: '3',
              value: 45000,
              segmento: 'Casa',
              address: '10 Downing Street',
            },
            {
              key: '4',
              value: 45000,
              segmento: 'Casa',
              address: '10 Downing Street',
            },
            {
              key: '5',
              value: 4500,
              segmento: 'Casa',
              address: '10 Downing Street',
            },
            {
              key: '6',
              value: 4500,
              segmento: 'Casa',
              address: '10 Downing Street',
            },
          ];
        res.status(200).json(response);
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "getDividas",
      message: err.message,
    });
  }
};

export default handler;