/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from './user.service';
import { createUserDto } from './create-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  /*async validate(authInfos:createUserDto): Promise<any> {
    const user = await this.userService.validateUser(authInfos);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }*/
}