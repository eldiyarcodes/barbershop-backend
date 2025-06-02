import { Barbershop } from '@/barbershops/model/barbershops.model'
import { Master } from '@/masters/model/masters.model'
import { ApiProperty } from '@nestjs/swagger'
import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'

export interface AppointmentsCreationAttrs {
	masterId: number
	barbershopId: number
	startTime: string
	endTime: string
	date: Date
	status?: AppointmentsStatus
}

export type AppointmentsStatus = 'pending' | 'confirmed' | 'cancelled' | 'done'

@Table({ tableName: 'appointments', timestamps: true })
export class Appointments extends Model<
	Appointments,
	AppointmentsCreationAttrs
> {
	@ApiProperty({ example: 1 })
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number

	@ApiProperty({ example: 3 })
	@ForeignKey(() => Master)
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare masterId: number

	@ApiProperty({ example: 2 })
	@ForeignKey(() => Barbershop)
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare barbershopId: number

	@ApiProperty({ example: '2025-06-03' })
	@Column({ type: DataType.DATEONLY, allowNull: false })
	declare date: Date

	@ApiProperty({ example: '09:00' })
	@Column({ type: DataType.TIME, allowNull: false })
	declare startTime: string

	@ApiProperty({ example: '10:00' })
	@Column({ type: DataType.TIME, allowNull: false })
	declare endTime: string

	@ApiProperty({
		example: 'pending',
		description: 'Статус записи: pending | confirmed | cancelled | done',
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: 'pending',
	})
	declare status: AppointmentsStatus
}
