import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator'
import { User, USER_ROLE } from '../model/users.model'

export class UserDto {
	@ApiProperty({ example: 'example@icloud.com', description: 'Email address' })
	@IsString({ message: 'Должно быть строкой' })
	@IsEmail({}, { message: 'Некорректный email' })
	readonly email: string

	@ApiProperty({ example: 'password123', description: 'Password' })
	@IsString({ message: 'Должно быть строкой' })
	@Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
	readonly password: string

	@ApiProperty({ example: 'ADMIN', description: 'User role', required: false })
	@IsOptional()
	@IsEnum(USER_ROLE, { message: 'Роль должна быть USER или ADMIN' })
	readonly role?: USER_ROLE
}

export class CreateUserDto {
	@ApiProperty({ example: 'example@icloud.com', description: 'Email address' })
	@IsString({ message: 'Должно быть строкой' })
	@IsEmail({}, { message: 'Некорректный email' })
	readonly email: string

	@ApiProperty({ example: 'password123', description: 'Password' })
	@IsString({ message: 'Должно быть строкой' })
	@Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
	readonly password: string
}

export class UsersResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ type: () => [User] })
	data: User[]
}

export class CreateUserOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ type: () => User })
	data: User
}

export class DeleteUserOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ example: 'Удалено успешно' })
	message: string
}

export type UserSortOptions = 'id' | 'email'
