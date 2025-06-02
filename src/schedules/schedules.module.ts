import { AuthModule } from '@/auth/auth.module'
import { MastersModule } from '@/masters/masters.module'
import { Master } from '@/masters/model/masters.model'
import { Schedule } from '@/schedules/model/schedules.model'
import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { SchedulesController } from './schedules.controller'
import { SchedulesService } from './schedules.service'

@Module({
	controllers: [SchedulesController],
	providers: [SchedulesService],
	imports: [
		SequelizeModule.forFeature([Schedule, Master]),
		forwardRef(() => AuthModule),
		forwardRef(() => MastersModule),
	],
	exports: [SchedulesService],
})
export class SchedulesModule {}
