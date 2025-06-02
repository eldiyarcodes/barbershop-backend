import { Public } from '@/common/decorators/public.decorator'
import { Roles } from '@/common/decorators/roles.decorator'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { RolesGuard } from '@/common/guards/roles.guard'
import { USER_ROLE } from '@/users/model/users.model'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { BarbershopsService } from './barbershops.service'
import {
	CreateBarbershopDto,
	CreateBarbershopOkResponseDto,
	DeleteBarbershopOkResponseDto,
	GetAllBarbershopOkResponseDto,
	UpdateBarbershopDto,
} from './dto/barbershops.dto'

@ApiTags('Barbershop')
@Controller('api/v1/barbershop')
export class BarbershopsController {
	constructor(private barbershopService: BarbershopsService) {}

	@ApiOperation({ summary: 'Создать барбершоп' })
	@ApiOkResponse({ type: CreateBarbershopOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(USER_ROLE.ADMIN)
	@Post('/create')
	async create(@Body() body: CreateBarbershopDto) {
		const data = await this.barbershopService.createBarbershop(body)

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Получить все барбершопы' })
	@ApiOkResponse({ type: GetAllBarbershopOkResponseDto })
	@Public()
	@Get()
	async getAll(@Query('search') search: string) {
		const data = await this.barbershopService.getAll(search)

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Получить барбершоп по ID' })
	@ApiOkResponse({ type: CreateBarbershopOkResponseDto })
	@Public()
	@Get('/:id')
	async getById(@Param('id') id: string) {
		const data = await this.barbershopService.getById(+id)

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Обновить барбершоп' })
	@ApiOkResponse({ type: CreateBarbershopOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch('/:id')
	async update(@Param('id') id: string, @Body() dto: UpdateBarbershopDto) {
		const data = await this.barbershopService.updateBarbershop(+id, dto)

		return { status: 'ok', data }
	}

	@ApiOperation({ summary: 'Удалить барбершоп' })
	@ApiOkResponse({ type: DeleteBarbershopOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('/:id')
	async delete(@Param('id') id: string) {
		await this.barbershopService.deleteBarbershop(+id)

		return {
			status: 'ok',
			message: 'Удалено успешно',
		}
	}
}
