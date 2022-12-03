import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    UsersModule,
    AuthModule,
    BcryptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
