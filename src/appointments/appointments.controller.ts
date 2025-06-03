// src/appointments/appointments.controller.ts
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
	ParseIntPipe,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppointmentsService } from './appointments.service'
import {
	CreateAppointmentDto,
	CreateAppointmentOkResponseDto,
	DeleteAppointmentOkResponseDto,
	GetAllAppointmentOkResponseDto,
	GetAppointmentByIdOkResponseDto,
} from './dto/appointments.dto'

@ApiTags('Appointments')
@Controller('api/v1/appointments')
export class AppointmentsController {
	constructor(private readonly appointmentsService: AppointmentsService) {}

	@ApiOperation({ summary: 'Создать запись' })
	@ApiOkResponse({ type: CreateAppointmentOkResponseDto })
	@UseGuards(JwtAuthGuard)
	@Roles(USER_ROLE.ADMIN)
	@Post('/create')
	async create(@Body() dto: CreateAppointmentDto) {
		const appointment = await this.appointmentsService.create(dto)

		return {
			status: 'ok',
			data: appointment,
		}
	}

	@ApiOperation({ summary: 'Получить записи' })
	@ApiOkResponse({ type: GetAllAppointmentOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	async findAll(
		@Query('barbershopId') barbershopId?: number,
		@Query('masterId') masterId?: number,
		@Query('date') date?: string
	) {
		const data = await this.appointmentsService.findAll(
			barbershopId,
			masterId,
			date
		)

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Получить запись по ID' })
	@ApiOkResponse({ type: GetAppointmentByIdOkResponseDto })
	@Public()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const appointment = await this.appointmentsService.findOne(id)

		return { status: 'ok', data: appointment }
	}

	@ApiOperation({ summary: 'Отменить запись' })
	@ApiOkResponse({ type: DeleteAppointmentOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(USER_ROLE.ADMIN)
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		await this.appointmentsService.remove(id)

		return {
			status: 'ok',
			message: 'Успешно отменено',
		}
	}
}
