import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'apikey',
) {
  constructor(private authService: AuthService) {
    super(
      { header: 'api-key', prefix: '' },
      true,
      async (apiKey: string, done: any) => {
        if (this.authService.validateApiKey(apiKey)) {
          return done(null, true);
        }
        done(new UnauthorizedException(), null);
      },
    );
  }
}
