import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from '@/auth/auth.module'
import { User } from './model/users.model'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)],
	exports: [UsersService],
})
export class UsersModule {}
