import { Roles } from '@/common/decorators/roles.decorator'
import { JwtAuthGuard } from '@/common/guards/auth.guard'
import { RolesGuard } from '@/common/guards/roles.guard'
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { BarbershopsService } from './barbershops.service'
import {
	CreateBarbershopDto,
	CreateBarbershopOkResponseDto,
	UpdateBarbershopDto,
} from './dto/barbershops.dto'

@ApiTags('Users')
@Controller('api/v1/barbershop')
export class BarbershopsController {
	constructor(private barbershopService: BarbershopsService) {}

	@ApiOperation({ summary: 'Create barbershop' })
	@ApiOkResponse({ type: CreateBarbershopOkResponseDto })
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('ADMIN')
	@Post('/create')
	async create(@Body() body: CreateBarbershopDto) {
		const data = await this.barbershopService.createBarbershop(body)

		return {
			status: 'ok',
			data,
		}
	}

	@ApiOperation({ summary: 'Получить все барбершопы' })
  @Get()
  async getAll() {
    const data = await this.barbershopService.getAll()
    return { status: 'ok', data }
  }

  @ApiOperation({ summary: 'Получить барбершоп по ID' })
  @Get('/:id')
  async getById(@Param('id') id: string) {
    const data = await this.barbershopService.getById(+id)
    return { status: 'ok', data }
  }

  @ApiOperation({ summary: 'Обновить барбершоп' })
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateBarbershopDto) {
    const data = await this.barbershopService.updateBarbershop(+id, dto)
    return { status: 'ok', data }
  }

  @ApiOperation({ summary: 'Удалить барбершоп' })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const result = await this.barbershopService.deleteBarbershop(+id)
    return { status: 'ok', ...result }
  }
}
