import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { Request } from 'express'
import { USER_ROLE } from 'src/users/model/users.model'
import { UsersService } from 'src/users/users.service'
import { TokensService } from './tokens.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private tokensService: TokensService
	) {}

	async registration(email: string, password: string) {
		const candidate = await this.userService.getUserByEmail(email)
		if (candidate) {
			throw new HttpException('Email уже занят', HttpStatus.BAD_REQUEST)
		}

		const hashPassword = await bcrypt.hash(password, 10)
		const { user } = await this.userService.createUser({
			email,
			password: hashPassword,
			role: USER_ROLE.USER,
		})

		const tokens = this.tokensService.generateTokens({
			id: user.id,
			email: user.email,
			role: user.role,
		})

		return tokens
	}

	async login(email: string, password: string) {
		const user = await this.validateUser(email, password)

		const tokens = this.tokensService.generateTokens({
			id: user.id,
			email: user.email,
			role: user.role,
		})

		return tokens
	}

	async refreshToken(req: Request) {
		const refreshToken = req.cookies?.refresh_token
		if (!refreshToken) {
			throw new HttpException('Нет токена', HttpStatus.UNAUTHORIZED)
		}

		const payload = this.tokensService.validateRefreshToken(refreshToken)
		const user = await this.userService.getUserByEmail(payload.email)

		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.UNAUTHORIZED)
		}

		const tokens = this.tokensService.generateTokens({
			email: user.email,
			id: user.id,
			role: user.role,
		})

		return tokens
	}

	private async validateUser(email: string, password: string) {
		const user = await this.userService.getUserByEmail(email)

		if (!user) {
			throw new HttpException(
				'Неверный email или пароль',
				HttpStatus.BAD_REQUEST
			)
		}

		const passwordEquals = await bcrypt.compare(password, user.password)

		if (user && passwordEquals) {
			return user
		}

		throw new HttpException('Неверный email или пароль', HttpStatus.BAD_REQUEST)
	}
}
