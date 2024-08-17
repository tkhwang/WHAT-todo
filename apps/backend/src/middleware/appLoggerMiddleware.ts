import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class appLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(appLoggerMiddleware.name);

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const routePath = request.route?.path || 'unknown route';

      let logMessage = `${statusCode} | ${method} ${routePath} | ${ip}`;
      const params = JSON.stringify(response.req.params);
      logMessage += ` | Param: ${params}`;
      const body = JSON.stringify(response.req.body);
      logMessage += ` | Body: ${body}`;

      this.logger.log(logMessage);
    });

    next();
  }
}
