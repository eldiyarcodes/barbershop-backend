import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from 'src/common/guards/auth.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { User } from './model/users.model'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('api/v1')
export class UsersController {
	constructor(private userService: UsersService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('ADMIN')
	@Get('/users')
	getAll() {
		return this.userService.getAllUsers()
	}
}
