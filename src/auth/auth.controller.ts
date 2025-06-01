import { Public } from '@/common/decorators/public.decorator'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { ValidationPipe } from '@/common/pipes/validation.pipe'
import { CreateUserDto } from '@/users/dto/users.dto'
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UseGuards,
	UsePipes,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
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

	@ApiOperation({ summary: 'Регистрация' })
	@ApiOkResponse({ type: AuthOkResponseDto })
	@UsePipes(ValidationPipe)
	@Public()
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

	@ApiOperation({ summary: 'Авторизация' })
	@ApiOkResponse({ type: AuthOkResponseDto })
	@Public()
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

	@ApiOperation({ summary: 'Выход из системы' })
	@ApiOkResponse()
	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@Post('/sign-out')
	async logout(@Res({ passthrough: true }) res: Response) {
		this.cookieService.removeToken(res)
	}

	@ApiOperation({ summary: 'Обновить access токен' })
	@ApiOkResponse({ type: AuthOkResponseDto })
	@Public()
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
