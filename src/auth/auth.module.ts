import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { CONFIG } from '@/config/config'
import { UsersModule } from '@/users/users.module'
import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CookieService } from './cookie.service'
import { TokensService } from './tokens.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService, TokensService, CookieService, JwtAuthGuard],
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
