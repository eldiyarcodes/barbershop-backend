import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from 'src/common/guards/auth.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { UsersResponseDto } from './dto/users.dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('api/v1')
export class UsersController {
	constructor(private userService: UsersService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({ type: UsersResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('ADMIN')
	@Get('/users')
	async getAll() {
		const data = await this.userService.getAllUsers()

		return {
			status: 'ok',
			data,
		}
	}
}
