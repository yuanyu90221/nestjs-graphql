import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './models/user';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { BcryptService } from '../bcrypt/bcrypt.service';
@Injectable()
export class UsersService {
  constructor(private readonly bcryptService: BcryptService) {}
  private users: User[] = [];
  public createUser(createUserData: CreateUserInput): User {
    const hashedPassword = this.bcryptService.genHash(createUserData.password);
    createUserData.password = hashedPassword;
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };
    this.users.push(user);
    return user;
  }
  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );
    Object.assign(user, updateUserData);
    return user;
  }
  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userIds.map((userId) => this.getUser({ userId }));
  }
  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );
    const user = this.users[userIndex];
    this.users.splice(userIndex);
    return user;
  }
}
