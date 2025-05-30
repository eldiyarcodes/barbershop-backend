import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Master } from 'src/masters/model/masters.model'

@Table({ tableName: 'barbershops', timestamps: true })
export class Barbershop extends Model<Barbershop> {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	address: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	phone: string

	@Column({
		type: DataType.TEXT,
		allowNull: true,
	})
	description: string

	@Column({
		type: DataType.ARRAY(DataType.STRING),
		allowNull: false,
	})
	workDays: string[]

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	timeFrom: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	timeTo: string

	@HasMany(() => Master)
	masters: Master[]
}
