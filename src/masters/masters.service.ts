import { Barbershop } from '@/barbershops/model/barbershops.model'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { CreateMasterDto, UpdateMasterDto } from './dto/masters.dto'
import { Master } from './model/masters.model'

@Injectable()
export class MastersService {
	constructor(
		@InjectModel(Master) private masterRepository: typeof Master,
		@InjectModel(Barbershop) private barbershopRepository: typeof Barbershop
	) {}

	async create(masterDto: CreateMasterDto) {
		const { barbershopId } = masterDto

		if (barbershopId) {
			const barbershop = await this.barbershopRepository.findByPk(barbershopId)

			if (!barbershop) {
				throw new NotFoundException('Барбершоп с таким ID не найден')
			}
		}

		return await this.masterRepository.create(masterDto)
	}

	async getAll(barbershopId: number, search: string) {
		if (barbershopId) {
			return await this.masterRepository.findAll({
				where: { barbershopId },
			})
		}

		return await this.masterRepository.findAll({
			where: { fullName: { [Op.like]: `%${search}%` } },
		})
	}

	async update(id: number, masterDto: UpdateMasterDto) {
		const master = await this.getById(id)

		const { barbershopId } = masterDto

		if (barbershopId) {
			const barbershop = await this.barbershopRepository.findByPk(barbershopId)

			if (!barbershop) {
				throw new NotFoundException('Барбершоп с таким ID не найден')
			}
		}

		return await master.update(masterDto)
	}

	async delete(masterId: number) {
		const master = await this.getById(masterId)

		return await master.destroy()
	}

	async getById(id: number) {
		const master = await this.masterRepository.findByPk(id)

		if (!master) {
			throw new NotFoundException('Мастер не найден')
		}

		return master
	}
}
