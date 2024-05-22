/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common/decorators/modules";
import { DocsController } from "./docs.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocsService } from  "./docs.service";
import { DocsEntity } from "./docs.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DocsEntity])],
    controllers : [DocsController],
    providers : [DocsService],
})

export class DocsModule {}