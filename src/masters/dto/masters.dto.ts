import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Master } from '../model/masters.model'
import { Type } from 'class-transformer'

export class CreateMasterDto {
	@ApiProperty({ example: 'Ivan Ivanov' })
	@IsNotEmpty()
	@IsString()
	fullName: string

	@ApiProperty({ example: 'specialization' })
	@IsNotEmpty()
	@IsString()
	specialization: string

	@ApiProperty({ example: 1 })
	@IsNotEmpty()
	@IsInt()
	@Type(() => Number)
	barbershopId: number

	@ApiProperty({ example: 'https://ivan-master.jpeg' })
	@IsOptional()
	@IsString()
	photoUrl?: string
}

export class UpdateMasterDto extends PartialType(CreateMasterDto) {}

export class CreateMasterOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ type: () => Master })
	data: Master
}

export class GetAllMastersOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ type: () => [Master] })
	data: Master[]
}

export class DeleteMasterOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ example: 'Удалено успешно' })
	message: string
}
