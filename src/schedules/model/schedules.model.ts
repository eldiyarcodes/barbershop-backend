import { Master } from '@/masters/model/masters.model'
import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'

export interface ScheduleCreationAttrs {
	masterId: number
	date: string // '2025-06-03'
	startTime: string // формат '09:00'
	endTime: string // формат '18:00'
}

@Table({ tableName: 'schedules', timestamps: true })
export class Schedule extends Model<Schedule, ScheduleCreationAttrs> {
	@ApiProperty({ example: 1 })
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	declare id: number

	@ApiProperty({ example: 1 })
	@ForeignKey(() => Master)
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare masterId: number

	@ApiProperty({ type: () => Master })
	@BelongsTo(() => Master)
	declare master: Master

	@ApiProperty({ example: '2025-06-03' })
	@Column({ type: DataType.DATEONLY, allowNull: false })
	declare date: string

	@ApiProperty({ example: '09:00' })
	@Column({ type: DataType.TIME, allowNull: false })
	declare startTime: string

	@ApiProperty({ example: '18:00' })
	@Column({ type: DataType.TIME, allowNull: false })
	declare endTime: string
}
