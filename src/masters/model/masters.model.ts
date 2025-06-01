import { Barbershop } from '@/barbershops/model/barbershops.model'
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'

export interface MasterCreationAttrs {
	fullName: string
	specialization: string
	barbershopId: number
	barbershop?: Barbershop
	photoUrl?: string | null
}

@Table({ tableName: 'masters', timestamps: true })
export class Master extends Model<Master, MasterCreationAttrs> {
	@Column({ type: DataType.STRING, allowNull: false })
	declare fullName: string

	@Column({ type: DataType.STRING, allowNull: false })
	declare specialization: string

	@Column({ type: DataType.INTEGER, allowNull: false })
	@ForeignKey(() => Barbershop)
	declare barbershopId: number

	@BelongsTo(() => Barbershop, { foreignKey: 'barbershopId' })
	declare barbershop: Barbershop

	@Column({ type: DataType.STRING, allowNull: true })
	declare photoUrl: string | null
}
