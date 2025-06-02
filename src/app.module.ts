import { AuthModule } from '@/auth/auth.module'
import { RolesGuard } from '@/common/guards/roles.guard'
import { CONFIG } from '@/config/config'
import { User } from '@/users/model/users.model'
import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppointmentssModule } from './appointments/appointments.module'
import { Appointments } from './appointments/model/appointments.model'
import { BarbershopsModule } from './barbershops/barbershops.module'
import { Barbershop } from './barbershops/model/barbershops.model'
import { JwtAuthGuard } from './common/guards/jwt-auth.guard'
import { MastersModule } from './masters/masters.module'
import { Master } from './masters/model/masters.model'
import { Schedule } from './schedules/model/schedules.model'
import { SchedulesModule } from './schedules/schedules.module'

@Module({
	controllers: [],
	providers: [
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: RolesGuard },
	],
	imports: [
		ConfigModule.forRoot({ envFilePath: '.env' }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: CONFIG.POSTGRES_HOST,
			port: Number(CONFIG.POSTGRES_PORT),
			username: CONFIG.POSTGRES_USER,
			password: CONFIG.POSTGRES_PASSWORD,
			database: CONFIG.POSTGRES_DB,
			models: [User, Barbershop, Master, Schedule, Appointments],
			autoLoadModels: true,
		}),
		UsersModule,
		AuthModule,
		BarbershopsModule,
		MastersModule,
		SchedulesModule,
		AppointmentssModule,
	],
})
export class AppModule {}
