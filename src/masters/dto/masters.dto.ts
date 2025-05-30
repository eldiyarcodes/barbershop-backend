import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateMasterDto {
	@IsString()
	@IsNotEmpty()
	fullName: string

	@IsString()
	@IsNotEmpty()
	specialization: string

	@IsInt()
	@IsNotEmpty()
	barbershopId: number

	@IsString()
	@IsOptional()
	photoUrl?: string
}
