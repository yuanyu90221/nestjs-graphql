import { Module } from '@nestjs/common';
import { UsersResolver } from './user.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
