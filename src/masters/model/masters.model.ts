import { Barbershop } from '@/barbershops/model/barbershops.model'
import { Schedule } from '@/schedules/model/schedules.model'
import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
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
	@ApiProperty({ example: 'Ivan Ivanov' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare fullName: string

	@ApiProperty({ example: 'specialization' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare specialization: string

	@ApiProperty({ example: 1 })
	@Column({ type: DataType.INTEGER, allowNull: false })
	@ForeignKey(() => Barbershop)
	declare barbershopId: number

	@ApiProperty({ type: () => Barbershop })
	@BelongsTo(() => Barbershop, { foreignKey: 'barbershopId' })
	declare barbershop: Barbershop

	@ApiProperty({ type: () => Schedule })
	@HasMany(() => Schedule)
	declare schedules: Schedule[]

	@ApiProperty({ example: 'https://ivan-master.jpeg' })
	@Column({ type: DataType.STRING, allowNull: true })
	declare photoUrl: string | null
}
