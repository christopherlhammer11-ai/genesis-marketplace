import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  res.status(200).json({
    mode: 'demo',
    received: true,
    message:
      'Webhook endpoint is a build-safe public demo stub. Production settlement should verify signatures and record fulfilled purchases.',
  });
}
