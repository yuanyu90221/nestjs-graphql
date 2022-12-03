import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { UsersResolver } from './user.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [BcryptModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
