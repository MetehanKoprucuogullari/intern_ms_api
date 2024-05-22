/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common/decorators/modules";
import { UserController } from "./user.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from  "./user.service";
import { UserEntity } from "./user.entity";
import { JwtModule} from "@nestjs/jwt"

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret : "secret",
            signOptions : {expiresIn : '1d'}
        })
    ],
    controllers : [UserController],
    providers : [UserService],
})

export class UserModule {}