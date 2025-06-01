import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateBarbershopDto, UpdateBarbershopDto } from './dto/barbershops.dto'
import { Barbershop } from './model/barbershops.model'

@Injectable()
export class BarbershopsService {
	constructor(
		@InjectModel(Barbershop) private barbershopRepository: typeof Barbershop
	) {}

	async createBarbershop(dto: CreateBarbershopDto) {
		return await this.barbershopRepository.create(dto)
	}

	async getAll() {
		return await this.barbershopRepository.findAll()
	}

	async getById(id: number) {
		const shop = await this.barbershopRepository.findByPk(id)

		if (!shop) {
			throw new NotFoundException('Барбершоп не найден')
		}
		
		return shop
	}

	async updateBarbershop(id: number, dto: UpdateBarbershopDto) {
		const shop = await this.getById(id)

		return await shop.update(dto)
	}

	async deleteBarbershop(id: number) {
		const shop = await this.getById(id)
		await shop.destroy()

		return { message: 'Удалено успешно' }
	}
}
