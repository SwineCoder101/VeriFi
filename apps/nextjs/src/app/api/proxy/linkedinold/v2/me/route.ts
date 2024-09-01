import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'https://api.linkedin.com';

const proxy = httpProxy.createProxyServer();

// Disable body parsing for this API route
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    console.log('Request URL:', req.url);
    console.log('Proxying to:', req.url?.replace('http://localhost:3000/api/proxy/linkedin', API_URL));

    const targetUrl = req.url?.replace(/^\/api\/proxy\/linkedin/, '');

    return new Promise<void>((resolve, reject) => {
        proxy.web(req, res, { target: targetUrl, changeOrigin: true }, (err) => {
          if (err) {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Proxy failed' });
            return reject(err);
          }
          resolve();
        });
      });
  }
