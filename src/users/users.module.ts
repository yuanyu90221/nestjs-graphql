import { Module } from '@nestjs/common';
import { UsersResolver } from './user.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
