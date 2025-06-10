import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { Roles } from '@/common/decorators/roles.decorator'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { RolesGuard } from '@/common/guards/roles.guard'
import {
	CreateUserDto,
	CreateUserOkResponseDto,
	DeleteUserOkResponseDto,
	UserSortOptions,
	UsersResponseDto,
} from './dto/users.dto'
import { USER_ROLE } from './model/users.model'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiOkResponse({ type: UsersResponseDto })
	@ApiQuery({ name: 'search', required: false, description: 'Поиск по email' })
	@ApiQuery({
		name: 'sort',
		required: false,
		enum: ['id', 'email'],
		description: 'Поля для сортировки',
	})
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(USER_ROLE.ADMIN)
	@Get('/')
	async getAll(@Query() query: { sort: UserSortOptions; search: string }) {
		const data = await this.userService.getAllUsers(query)

		return {
			status: 'ok',
			data,
		}
	}

	@ApiOperation({ summary: 'Создать пользователя' })
	@ApiOkResponse({ type: CreateUserOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(USER_ROLE.ADMIN)
	@Post('/')
	async create(@Body() body: CreateUserDto) {
		const user = await this.userService.createUser(body)

		return {
			status: 'ok',
			data: user,
		}
	}

	@ApiOperation({ summary: 'Удалить пользователя' })
	@ApiOkResponse({ type: DeleteUserOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(USER_ROLE.ADMIN)
	@Delete('/:id')
	async getById(@Param('id') id: string) {
		await this.userService.deleteUser(Number(id))

		return {
			status: 'ok',
			message: 'Удалено успешно',
		}
	}
}
