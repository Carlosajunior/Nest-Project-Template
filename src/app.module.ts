import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthenticationMiddleware } from './modules/middleware/authentication-middleware';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../.env'),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      logging: true,
      synchronize: false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [
        join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}'),
      ],
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: 'api', method: RequestMethod.GET },
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users/signup', method: RequestMethod.POST },
        { path: 'users/verify-email', method: RequestMethod.POST },
        { path: 'users/initiate-forgot-password', method: RequestMethod.POST },
        { path: 'users/confirm-forgot-password', method: RequestMethod.POST },
        { path: 'users/refresh-token', method: RequestMethod.POST },
        { path: 'users/resend-confirmation-code', method: RequestMethod.POST },
      )
      .forRoutes({ path: '/[a-zA-Z0-9-/_]+', method: RequestMethod.ALL });
  }
}
