import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { Schedule } from '../model/schedules.model'

export class CreateScheduleDto {
	@ApiProperty({ example: 1 })
	@IsInt()
	masterId: number

	@ApiProperty({ example: '2025-06-03' })
	@IsString()
	date: string

	@ApiProperty({ example: '09:00' })
	@IsNotEmpty()
	@IsString()
	startTime: string

	@ApiProperty({ example: '18:00' })
	@IsNotEmpty()
	@IsString()
	endTime: string
}

export class CreateScheduleOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ type: () => Schedule })
	data: Schedule
}

export class DeleteSchedulesOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ example: 'Удалено успешно' })
	message: string
}
