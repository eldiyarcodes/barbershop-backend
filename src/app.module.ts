import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { SequelizeModule } from '@nestjs/sequelize'
import { CONFIG } from 'src/config/config'
import { AuthModule } from './auth/auth.module'
import { RolesGuard } from './common/guards/roles.guard'
import { User } from './users/model/users.model'
import { UsersModule } from './users/users.module'

@Module({
	controllers: [],
	providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
	imports: [
		ConfigModule.forRoot({ envFilePath: '.env' }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: CONFIG.POSTGRES_HOST,
			port: Number(CONFIG.POSTGRES_PORT),
			username: CONFIG.POSTGRES_USER,
			password: CONFIG.POSTGRES_PASSWORD,
			database: CONFIG.POSTGRES_DB,
			models: [User],
			autoLoadModels: true,
		}),
		UsersModule,
		AuthModule,
	],
})
export class AppModule {}
