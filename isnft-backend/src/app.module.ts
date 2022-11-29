import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ContentModule } from './content/content.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db/db.service';
import { VerificationModule } from './verification/verification.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [DbModule],
      useClass: DbService,
      inject: [DbService],
    }),
    UserModule,
    ContentModule,
    DbModule,
    VerificationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
