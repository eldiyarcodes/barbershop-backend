import { USER_ROLE } from '@/users/model/users.model'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokensService {
	constructor(private jwtService: JwtService) {}

	generateTokens(payload: { id: number; email: string; role: USER_ROLE }) {
		const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' })
		const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' })

		return { accessToken, refreshToken }
	}

	validateRefreshToken(token: string): any {
		try {
			return this.jwtService.verify(token)
		} catch (e) {
			throw new UnauthorizedException('Токен недействителен')
		}
	}
}
