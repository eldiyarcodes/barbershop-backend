import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UsePipes,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { CreateUserDto } from 'src/users/dto/users.dto'
import { AuthService } from './auth.service'
import { CookieService } from './cookie.service'
import { AuthOkResponseDto } from './dto/auth.dto'

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private cookieService: CookieService
	) {}

	@ApiOperation({ summary: 'Register' })
	@ApiOkResponse({ type: AuthOkResponseDto })
	@UsePipes(ValidationPipe)
	@Post('/sign-up')
	async registration(
		@Body() body: CreateUserDto,
		@Res({ passthrough: true }) res: Response
	) {
		const tokens = await this.authService.registration(
			body.email,
			body.password
		)

		this.cookieService.setToken(res, tokens.refreshToken)

		return {
			status: 'ok',
			access_token: tokens.accessToken,
		}
	}

	@ApiOperation({ summary: 'Login' })
	@ApiOkResponse({ type: AuthOkResponseDto })
	@Post('/sign-in')
	async login(
		@Body() body: CreateUserDto,
		@Res({ passthrough: true }) res: Response
	) {
		const tokens = await this.authService.login(body.email, body.password)

		this.cookieService.setToken(res, tokens.refreshToken)

		return {
			status: 'ok',
			access_token: tokens.accessToken,
		}
	}

	@ApiOperation({ summary: 'Logout' })
	@ApiOkResponse()
	@HttpCode(HttpStatus.OK)
	@Post('/sign-out')
	async logout(@Res({ passthrough: true }) res: Response) {
		this.cookieService.removeToken(res)
	}

	@ApiOperation({ summary: 'Refresh token' })
	@ApiOkResponse({ type: AuthOkResponseDto })
	@Post('/refresh')
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const tokens = await this.authService.refreshToken(req)

		this.cookieService.setToken(res, tokens.refreshToken)

		return {
			status: 'ok',
			access_token: tokens.accessToken,
		}
	}
}
