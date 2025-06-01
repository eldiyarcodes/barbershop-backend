import { AuthModule } from '@/auth/auth.module'
import { Barbershop } from '@/barbershops/model/barbershops.model'
import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { MastersController } from './masters.controller'
import { MastersService } from './masters.service'
import { Master } from './model/masters.model'

@Module({
	controllers: [MastersController],
	providers: [MastersService],
	imports: [
		SequelizeModule.forFeature([Master, Barbershop]),
		forwardRef(() => AuthModule),
	],
	exports: [MastersService],
})
export class MastersModule {}
