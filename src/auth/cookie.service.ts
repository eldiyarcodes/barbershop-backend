import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { CONFIG } from 'src/config/config'

@Injectable()
export class CookieService {
	setToken(res: Response, token: string) {
		res.cookie(CONFIG.JWT_TOKEN_KEY, token, {
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
	}

	removeToken(res: Response) {
		res.clearCookie(CONFIG.JWT_TOKEN_KEY)
	}
}
