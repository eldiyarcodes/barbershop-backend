import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Barbershop } from 'src/barbershops/model/barbershops.model'

@Table({ tableName: 'masters', timestamps: true })
export class Master extends Model<Master> {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	fullName: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	specialization: string

	@ForeignKey(() => Barbershop)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	barbershopId: number

	@BelongsTo(() => Barbershop)
	barbershop: Barbershop

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	photoUrl: string | null
}
