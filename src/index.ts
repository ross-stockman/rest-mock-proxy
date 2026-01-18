import express, {Request, Response, NextFunction, Express} from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import { registerCustomRoutes } from './register-custom-routes.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app: Express = express();
const PORT: string|3000 = process.env.PORT || 3000;
const TARGET_URL: string = process.env.TARGET_URL || 'http://localhost:8080';

function sanitizeUrl(url: string): string {
    return url.replace( /[\r\n]/g, '').replace( /[\x00-\x1F\x7F]/g, '');
}

// Enable CORS
app.use(cors());

// Rate limiting middleware
app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 100, // limit each IP to 100 requests per windowMs
}));

// Register custom routes
registerCustomRoutes(app);

// Proxy middleware
app.use(express.text());
app.use((req: Request, res: Response, next: NextFunction): void => {
    const safeUrl: string = sanitizeUrl(req.originalUrl);
    console.log(`[${req.method}] Forwarding to: ${TARGET_URL}${safeUrl}`);

    // Log the body if it exists
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
    }

    next();
}, createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    on: {
        proxyReq: fixRequestBody,
        proxyRes: (proxyRes, req, res) => {
            let body = '';

            // Collect the response data chunks
            proxyRes.on('data', (chunk) => {
                body += chunk;
            });

            // When the response is finished, log it
            proxyRes.on('end', () => {
                console.log(`[${req.method}] Response Status: ${proxyRes.statusCode}`);

                try {
                    // Try to parse and pretty-print if it's JSON
                    const jsonResponse = JSON.parse(body);
                    console.log('Response Body:', JSON.stringify(jsonResponse, null, 2));
                } catch (e) {
                    // If it's not JSON (like HTML or text), just log the raw string
                    if (body.length > 0) {
                        console.log('Response Body:', body.substring(0, 500) + (body.length > 500 ? '...' : ''));
                    }
                }
            });
        },
    }
}));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, (): void => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

