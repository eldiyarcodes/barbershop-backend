import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Barbershop } from '../model/barbershops.model'

export class CreateBarbershopDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	address: string

	@IsString()
	@IsNotEmpty()
	phone: string

	@IsString()
	@IsOptional()
	description?: string

	@IsArray()
	@IsNotEmpty()
	workDays: string[]

	@IsString()
	@IsNotEmpty()
	timeFrom: string

	@IsString()
	@IsNotEmpty()
	timeTo: string
}

export class CreateBarbershopOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ type: () => Barbershop })
	data: Barbershop
}

export class UpdateBarbershopDto extends PartialType(CreateBarbershopDto) {}
