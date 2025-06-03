import { AuthModule } from '@/auth/auth.module'
import { Barbershop } from '@/barbershops/model/barbershops.model'
import { MastersModule } from '@/masters/masters.module'
import { Master } from '@/masters/model/masters.model'
import { User } from '@/users/model/users.model'
import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppointmentsController } from './appointments.controller'
import { AppointmentsService } from './appointments.service'
import { Appointments } from './model/appointments.model'

@Module({
	controllers: [AppointmentsController],
	providers: [AppointmentsService],
	imports: [
		SequelizeModule.forFeature([Appointments, Master, Barbershop, User]),
		forwardRef(() => AuthModule),
		forwardRef(() => MastersModule),
	],
	exports: [AppointmentsService],
})
export class AppointmentssModule {}
