import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { UserDto, UserSortOptions } from './dto/users.dto'
import { User } from './model/users.model'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async createUser(dto: UserDto) {
		const user = await this.userRepository.create(dto)
		return user
	}

	async getAllUsers(query: { sort: UserSortOptions; search: string }) {
		const { search, sort = 'id' } = query

		const users = await this.userRepository.findAll({
			where: { email: { [Op.like]: `%${search}%` } },
			order: [[sort, 'DESC']],
		})

		return users
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			attributes: ['id', 'email', 'password', 'role', 'createdAt', 'updatedAt'],
		})

		const plainUser = user?.get({ plain: true })
		return plainUser
	}

	async deleteUser(userId: number) {
		const user = await this.userRepository.findByPk(userId)

		if (!user) {
			throw new NotFoundException('Пользователь не найден')
		}

		await user.destroy()
	}
}
