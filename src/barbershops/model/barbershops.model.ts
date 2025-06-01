import { Master } from '@/masters/model/masters.model'
import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'

export interface BarbershopCreationAttrs {
  name: string
  address: string
  phone: string
  description?: string
  workDays: string[]
  timeFrom: string
  timeTo: string
}

@Table({ tableName: 'barbershops', timestamps: true })
export class Barbershop extends Model<Barbershop, BarbershopCreationAttrs> {
	@ApiProperty({ example: 'Gentlemen Club' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare name: string

	@ApiProperty({ example: 'ул. Токтогула 10' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare address: string

	@ApiProperty({ example: '+996 500 00 00 00' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare phone: string

	@ApiProperty({ example: 'Лучший барбершоп в городе' })
	@Column({ type: DataType.TEXT, allowNull: true })
	declare description: string

	@ApiProperty({ example: ['Mon', 'Tue', 'Wed'] })
	@Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
	declare workDays: string[]

	@ApiProperty({ example: '10:00' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare timeFrom: string

	@ApiProperty({ example: '20:00' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare timeTo: string

	@HasMany(() => Master)
	declare masters: Master[]
}
