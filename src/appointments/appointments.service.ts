import { Barbershop } from '@/barbershops/model/barbershops.model'
import { Master } from '@/masters/model/masters.model'
import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { CreateAppointmentDto } from './dto/appointments.dto'
import { Appointments } from './model/appointments.model'

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectModel(Appointments)
		private appointmentsRepository: typeof Appointments,
		@InjectModel(Master) private masterRepository: typeof Master,
		@InjectModel(Barbershop) private barbershopRepository: typeof Barbershop
	) {}

	async create(dto: CreateAppointmentDto) {
		const master = await this.masterRepository.findByPk(dto.masterId)

		if (!master) {
			throw new NotFoundException('Мастер с таким ID не найден')
		}

		const barbershop = await this.barbershopRepository.findByPk(
			dto.barbershopId
		)

		if (!barbershop) {
			throw new NotFoundException('Барбершоп с таким ID не найден')
		}

		const data = {
			...dto,
			date: new Date(dto.date),
		}

		return await this.appointmentsRepository.create(data)
	}

	async findAll(barbershopId?: number, masterId?: number, date?: string) {
		const where: any = {}

		if (barbershopId) where.barbershopId = barbershopId
		if (masterId) where.masterId = masterId
		if (date) {
			const dayStart = new Date(date)
			dayStart.setHours(0, 0, 0, 0)

			const dayEnd = new Date(date)
			dayEnd.setHours(23, 59, 59, 999)

			where.date = {
				[Op.between]: [dayStart, dayEnd],
			}
		}

		return await this.appointmentsRepository.findAll({ where })
	}

	async findOne(id: number) {
		const appointment = await this.appointmentsRepository.findByPk(id)

		if (!appointment) {
			throw new NotFoundException(`Запись с таким ID не найден`)
		}

		return appointment
	}

	async findByContact(name: string, phone: string) {
		if (!name || !phone) {
			throw new HttpException(
				'Имя и телефон обязательны',
				HttpStatus.BAD_REQUEST
			)
		}

		return await this.appointmentsRepository.findAll({
			where: {
				name,
				phone,
			},
		})
	}

	async remove(id: number) {
		const appointment = await this.findOne(id)
		await appointment.destroy()

		return { message: 'Запись удалена' }
	}
}
