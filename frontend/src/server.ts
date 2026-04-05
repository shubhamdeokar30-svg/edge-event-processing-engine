import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // FIXED: Changed '**/*.*' to '*.*' 
  // In Express 5, *.* catches any file with an extension in any subfolder
  // The (:path) tells Express "Store the path in a variable named path"
server.get('/:path((.*)?\\.(.*))', express.static(browserDistFolder, {
  maxAge: '1y'
}));

  // FIXED: Changed '**' to '*'
  // This is the universal catch-all for Angular routing
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    renderApplication(bootstrap, {
      document: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      platformProviders: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();