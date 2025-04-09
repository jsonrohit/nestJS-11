import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService, private prisma: PrismaService) { }
  async use(req: any, res: any, next: () => void) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Extract JWT token

      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const secret = this.configService.get('JWT_SECRET')

      const decoded: any = jwt.verify(token, secret);

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
        select: { id: true, email: true, name: true },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      req['user'] = user; // Attach user data to request
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
