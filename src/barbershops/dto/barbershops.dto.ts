import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Barbershop, BarbershopWorkDays } from '../model/barbershops.model'

export class CreateBarbershopDto {
	@ApiProperty({ example: 'Gentlemen Club' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 'ул. Токтогула 10' })
	@IsString()
	@IsNotEmpty()
	address: string

	@ApiProperty({ example: '+996 500 00 00 00' })
	@IsString()
	@IsNotEmpty()
	phone: string

	@ApiProperty({ example: 'Лучший барбершоп в городе' })
	@IsString()
	@IsOptional()
	description?: string

	@ApiProperty({ example: ['Mon', 'Tue', 'Wed'] })
	@IsArray()
	@IsNotEmpty()
	workDays: BarbershopWorkDays[]

	@ApiProperty({ example: '10:00' })
	@IsString()
	@IsNotEmpty()
	timeFrom: string

	@ApiProperty({ example: '20:00' })
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

export class GetAllBarbershopOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ type: () => [Barbershop] })
	data: Barbershop[]
}

export class DeleteBarbershopOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ example: 'Удалено успешно' })
	message: string
}
