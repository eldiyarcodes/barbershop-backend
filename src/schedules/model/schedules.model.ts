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
	dayOfWeek: number // 0 - Sunday, 6 - Saturday
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

	@ApiProperty({ example: 1, description: '0 - Sunday, 6 - Saturday' })
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare dayOfWeek: number

	@ApiProperty({ example: '09:00' })
	@Column({ type: DataType.TIME, allowNull: false })
	declare startTime: string

	@ApiProperty({ example: '18:00' })
	@Column({ type: DataType.TIME, allowNull: false })
	declare endTime: string
}
