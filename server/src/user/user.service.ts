import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user';
import { Model, ObjectId } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const isUserExists = await this.userModel.exists({
      email: createUserDto.email,
    });
    if (isUserExists) {
      throw new BadRequestException();
    }
    const user = new this.userModel(createUserDto);
    await user.save();
    return user;
  }

  async findAll({ page = 1 }: { page: number }) {
    const perPage = 6;
    const totalUsers = await this.userModel.countDocuments();
    const totalPages = Math.ceil(totalUsers / perPage);
    const users = await this.userModel
      .find()
      .limit(perPage)
      .skip(perPage * (page - 1));

    const metaData = { perPage, totalUsers, totalPages, data: users, page };
    return { ...metaData, data: users };
  }

  async findOne({ id }: { id: ObjectId }) {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    const isUserExists = this.userModel.exists({ _id: id });
    if (!isUserExists) {
      throw new BadRequestException();
    }
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return user;
  }

  async delete({ id }: { id: ObjectId }) {
    const isUserExists = await this.userModel.exists({ _id: id });
    if (!isUserExists) {
      throw new BadRequestException();
    }
    const data = await this.userModel.deleteOne({ _id: id });
    return data;
  }
}
