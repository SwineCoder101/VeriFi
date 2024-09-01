import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware  from 'next-http-proxy-middleware';

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    // Target API that we want to proxy the requests to
    target: 'https://api.linkedin.com',

    // Optionally rewrite the path. We can remove the '/api/proxy' part.
    pathRewrite: {
      '^/api/proxy/linkedin': '', // Removes /api/proxy/linkedin from the URL, leaving just /v2/me
    },

    // Enable change of origin for the proxy
    changeOrigin: true,
  });
