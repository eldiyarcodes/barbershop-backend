import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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
