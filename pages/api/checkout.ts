import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const { skillId, priceId } = req.body || {};

  res.status(200).json({
    mode: 'demo',
    message:
      'Checkout is intentionally stubbed for the public Genesis Marketplace demo. Live payment settlement belongs in Genesis Node / Solana FLUX flow.',
    requested: {
      skillId: skillId || null,
      priceId: priceId || null,
    },
    next: 'Use POST https://genesis-node-api.vercel.app/v1/discover to inspect live skill metadata.',
  });
}
