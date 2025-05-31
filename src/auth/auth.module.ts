import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { CONFIG } from 'src/config/config'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TokensService } from './tokens.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService, TokensService],
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.register({
			global: true,
			secret: CONFIG.JWT_SECRET || 'SECRET',
			signOptions: { expiresIn: '1d' },
		}),
	],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
