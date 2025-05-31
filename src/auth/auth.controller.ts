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
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger'
import { Request, Response } from 'express'
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { UserDto } from 'src/users/dto/users.dto'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'Register' })
	@UsePipes(ValidationPipe)
	@ApiCreatedResponse()
	@Post('/sign-up')
	async registration(
		@Body() body: { email: string, password: string },
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.registration(body, res)
	}

	@ApiOperation({ summary: 'Login' })
	@ApiOkResponse()
	@HttpCode(HttpStatus.OK)
	@Post('/sign-in')
	async login(
		@Body() userDto: UserDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.login(userDto, res)
	}

	@ApiOperation({ summary: 'Logout' })
	@ApiOkResponse()
	@HttpCode(HttpStatus.OK)
	@Post('/sign-out')
	async logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}

	@ApiOperation({ summary: 'Refresh token' })
	@ApiOkResponse()
	@HttpCode(HttpStatus.OK)
	@Post('/refresh')
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.refreshToken(req, res)
	}
}
