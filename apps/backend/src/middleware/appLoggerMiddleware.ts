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
      const params = JSON.stringify(response.req.params);

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} - Params: ${params}`,
      );
    });

    next();
  }
}
