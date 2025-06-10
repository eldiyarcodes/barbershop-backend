import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { Roles } from '@/common/decorators/roles.decorator'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { RolesGuard } from '@/common/guards/roles.guard'
import { UserResponseDto, UsersResponseDto } from './dto/users.dto'
import { USER_ROLE } from './model/users.model'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiOkResponse({ type: UsersResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(USER_ROLE.ADMIN)
	@Get('/')
	async getAll() {
		const data = await this.userService.getAllUsers()

		return {
			status: 'ok',
			data,
		}
	}

	@ApiOperation({ summary: 'Получить пользователя по ID' })
	@ApiOkResponse({ type: UserResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(USER_ROLE.ADMIN)
	@Get('/:id')
	async getById(@Param('id') id: string) {
		const data = await this.userService.getUserById(Number(id))

		return {
			status: 'ok',
			data,
		}
	}
}
