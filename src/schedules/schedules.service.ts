import { Master } from '@/masters/model/masters.model'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateScheduleDto } from './dto/schedules.dto'
import { Schedule } from './model/schedules.model'

@Injectable()
export class SchedulesService {
	constructor(
		@InjectModel(Schedule) private scheduleRepository: typeof Schedule,
		@InjectModel(Master) private masterRepository: typeof Master
	) {}

	async settingSchedules(schedulesDto: CreateScheduleDto) {
		return await this.scheduleRepository.create(schedulesDto)
	}

	async updateSchedules(id: number, schedulesDto: Partial<CreateScheduleDto>) {
		const masterSchedule = await this.scheduleRepository.findByPk(id)

		if (!masterSchedule) {
			throw new NotFoundException('График не найден')
		}

		const master = await this.masterRepository.findByPk(schedulesDto.masterId)

		if (!master) {
			throw new NotFoundException('Мастер с таким ID не найден')
		}

		return await masterSchedule.update(schedulesDto)
	}

	async deleteSchedules(id: number) {
		const schedules = await this.scheduleRepository.findByPk(id)

		if (!schedules) {
			throw new NotFoundException('График не найден')
		}

		await schedules.destroy()
	}
}
