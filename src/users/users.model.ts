import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, Model, Table } from 'sequelize-typescript'

export enum USER_ROLE {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

interface UserCreationAttrs {
	email: string
	password: string
	role?: USER_ROLE
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Unique identifier' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number

	@ApiProperty({ example: 'example@icloud.com', description: 'Email address' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string

	@ApiProperty({ example: 'password123', description: 'Password' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string

	@ApiProperty({ example: 'ADMIN', description: 'User role' })
	@Column({ type: DataType.ENUM('USER', 'ADMIN'), defaultValue: 'USER' })
	role: USER_ROLE
}
