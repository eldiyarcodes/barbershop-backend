import { Roles } from '@/common/decorators/roles.decorator'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { RolesGuard } from '@/common/guards/roles.guard'
import { USER_ROLE } from '@/users/model/users.model'
import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import {
	CreateScheduleDto,
	CreateScheduleOkResponseDto,
} from './dto/schedules.dto'
import { SchedulesService } from './schedules.service'

@ApiTags('Schedules')
@Controller('api/v1/schedules')
export class SchedulesController {
	constructor(private schedulesService: SchedulesService) {}

	@ApiOperation({ summary: 'Установить график мастера' })
	@ApiOkResponse({ type: CreateScheduleOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(USER_ROLE.ADMIN)
	@Post('/setting')
	async create(@Body() body: CreateScheduleDto) {
		const data = await this.schedulesService.settingSchedules(body)

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Обновить график мастера' })
	@ApiOkResponse({ type: CreateScheduleOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch('/:id')
	async update(
		@Param('id') id: string,
		@Body() dto: Partial<CreateScheduleDto>
	) {
		const data = await this.schedulesService.updateSchedules(+id, dto)

		return { status: 'ok', data }
	}
}
