import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserDto } from './dto/users.dto'
import { User } from './model/users.model'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async createUser(dto: UserDto) {
		const user = await this.userRepository.create(dto)
		return user
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll()
		return users
	}

	async getUserById(id: number){
		const user = await this.userRepository.findByPk(id)

		if (!user) {
			throw new NotFoundException('Пользователь не найден')
		}

		return user
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			attributes: ['id', 'email', 'password', 'role', 'createdAt', 'updatedAt'],
		})

		const plainUser = user?.get({ plain: true })
		return plainUser
	}
}
