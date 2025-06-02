import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
	IsDateString,
	IsEnum,
	IsInt,
	IsOptional,
	IsString,
} from 'class-validator'
import { Appointments, AppointmentsStatus } from '../model/appointments.model'

export class CreateAppointmentDto {
	@ApiProperty({ example: 3 })
	@IsInt()
	masterId: number

	@ApiProperty({ example: 2 })
	@IsInt()
	barbershopId: number

	@ApiProperty({ example: '2025-06-03' })
	@IsDateString()
	date: string

	@ApiProperty({ example: '09:00' })
	@IsString()
	startTime: string

	@ApiProperty({ example: '10:00' })
	@IsString()
	endTime: string

	@ApiProperty({
		example: 'pending',
		enum: ['pending', 'confirmed', 'cancelled', 'done'],
		required: false,
	})
	@IsEnum(['pending', 'confirmed', 'cancelled', 'done'])
	@IsOptional()
	status?: AppointmentsStatus
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
	@ApiProperty({
		example: 'confirmed',
		enum: ['pending', 'confirmed', 'cancelled', 'done'],
		required: false,
	})
	@IsEnum(['pending', 'confirmed', 'cancelled', 'done'])
	@IsOptional()
	status?: AppointmentsStatus
}

export class CreateAppointmentOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ type: () => Appointments })
	data: Appointments
}

export class UpdateAppointmentOkResponseDto extends PartialType(
	CreateAppointmentOkResponseDto
) {}

export class GetAppointmentByIdOkResponseDto extends PartialType(
	CreateAppointmentOkResponseDto
) {}

export class GetAllAppointmentOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ type: () => [Appointments] })
	data: Appointments[]
}

export class DeleteAppointmentOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ example: 'Удалено успешно' })
	message: string
}
