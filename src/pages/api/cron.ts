import { NextApiRequest, NextApiResponse } from 'next';

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  response.status(200).json({
    success: true,
  });
};

export default handler;
