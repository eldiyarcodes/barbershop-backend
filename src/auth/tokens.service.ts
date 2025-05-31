import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { CONFIG } from 'src/config/config'

@Injectable()
export class TokensService {
	constructor(private jwtService: JwtService) {}

	generateTokens(payload: any) {
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: '15m',
		})

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: '1d',
		})

		return { accessToken, refreshToken }
	}

	setRefreshTokenCookie(res: Response, token: string) {
		res.cookie(CONFIG.JWT_REFRESH, token, {
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
	}

	validateRefreshToken(token: string): any {
		try {
			return this.jwtService.verify(token)
		} catch (e) {
			throw new UnauthorizedException('Invalid refresh token')
		}
	}
}
