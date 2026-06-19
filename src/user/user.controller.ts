import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorators/isPublic.decorator';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { UserPayload } from '../auth/types/UserPayload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Public()
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  
  @Public()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: UserPayload) {
    if (id !== currentUser.sub) {
      throw new UnauthorizedException('Você só pode deletar sua própria conta.');
    }
    return this.userService.remove(id);
  }
}