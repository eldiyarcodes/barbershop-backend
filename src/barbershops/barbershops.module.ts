import { AuthModule } from '@/auth/auth.module'
import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { BarbershopsController } from './barbershops.controller'
import { BarbershopsService } from './barbershops.service'
import { Barbershop } from './model/barbershops.model'

@Module({
	controllers: [BarbershopsController],
	providers: [BarbershopsService],
	imports: [
		SequelizeModule.forFeature([Barbershop]),
		forwardRef(() => AuthModule),
	],
	exports: [BarbershopsService],
})
export class BarbershopsModule {}
