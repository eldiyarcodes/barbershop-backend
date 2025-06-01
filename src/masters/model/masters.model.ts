import { Barbershop } from '@/barbershops/model/barbershops.model'
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'

@Table({ tableName: 'masters', timestamps: true })
export class Master extends Model<Master> {
	@Column({ type: DataType.STRING, allowNull: false })
	declare fullName: string

	@Column({ type: DataType.STRING, allowNull: false })
	declare specialization: string

	@ForeignKey(() => Barbershop)
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare barbershopId: number

	@BelongsTo(() => Barbershop)
	declare barbershop: Barbershop

	@Column({ type: DataType.STRING, allowNull: true })
	declare photoUrl: string | null
}
