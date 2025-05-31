import { ApiProperty } from '@nestjs/swagger'

export class AuthOkResponseDto {
	@ApiProperty({ example: 'ok' })
	status: string

	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	access_token: string
}
