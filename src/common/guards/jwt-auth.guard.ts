import { CONFIG } from '@/config/config'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private jwtService: JwtService,  private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
			context.getHandler(),
			context.getClass(),
		])

		if (isPublic) return true

		const req = context.switchToHttp().getRequest()

		try {
			const authHeader = req.headers.authorization
			if (!authHeader) {
				throw new UnauthorizedException('Токен не передан')
			}

			const [bearer, token] = authHeader.split(' ')

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({
					message: 'Пользователь не авторизован',
				})
			}

			const user = this.jwtService.verify(token, { secret: CONFIG.JWT_SECRET })
			req.user = user

			return true
		} catch (error) {
			throw new UnauthorizedException({ error })
		}
	}
}
