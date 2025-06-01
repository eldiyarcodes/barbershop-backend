import { AppModule } from '@/app.module'
import { ValidationPipe } from '@/common/pipes/validation.pipe'
import { CONFIG } from '@/config/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

async function run() {
	const PORT = CONFIG.PORT || 5000
	const app = await NestFactory.create(AppModule)

	app.enableCors({
		origin: 'http://localhost:5173',
		credentials: true,
	})

	app.use(cookieParser())
	app.useGlobalPipes(new ValidationPipe())

	const documentConfig = new DocumentBuilder()
		.setTitle('API Documentation Barbershop')
		.setDescription('REST API Documentation')
		.setVersion('1.0.0')
		.build()

	const document = SwaggerModule.createDocument(app, documentConfig)
	SwaggerModule.setup('/api/swagger-ui', app, document)

	await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

run()
