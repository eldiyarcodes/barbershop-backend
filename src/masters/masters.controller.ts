import { Public } from '@/common/decorators/public.decorator'
import { Roles } from '@/common/decorators/roles.decorator'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { RolesGuard } from '@/common/guards/roles.guard'
import { USER_ROLE } from '@/users/model/users.model'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import {
	CreateMasterDto,
	CreateMasterOkResponseDto,
	DeleteMasterOkResponseDto,
	GetAllMastersOkResponseDto,
	UpdateMasterDto,
} from './dto/masters.dto'
import { MastersService } from './masters.service'

@ApiTags('Master')
@Controller('api/v1/master')
export class MastersController {
	constructor(private mastersService: MastersService) {}

	@ApiOperation({ summary: 'Создать мастера' })
	@ApiOkResponse({ type: CreateMasterOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(USER_ROLE.ADMIN)
	@Post('/create')
	async create(@Body() body: CreateMasterDto) {
		const data = await this.mastersService.create(body)

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Получить всех мастеров' })
	@ApiOkResponse({ type: GetAllMastersOkResponseDto })
	@Public()
	@Get()
	async getAll(@Query('barbershopId') barbershopId?: string) {
		const data = await this.mastersService.getAll(Number(barbershopId))

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Получить мастера по ID' })
	@ApiOkResponse({ type: CreateMasterOkResponseDto })
	@Public()
	@Get('/:id')
	async getById(@Param('id') id: string) {
		const data = await this.mastersService.getById(+id)

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Обновить мастера' })
	@ApiOkResponse({ type: CreateMasterOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch('/:id')
	async update(@Param('id') id: string, @Body() dto: UpdateMasterDto) {
		const data = await this.mastersService.update(+id, dto)

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Удалить мастера' })
	@ApiOkResponse({ type: DeleteMasterOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('/:id')
	async delete(@Param('id') id: string) {
		await this.mastersService.delete(+id)

		return {
			status: 'ok',
			message: 'Удалено успешно',
		}
	}
}
