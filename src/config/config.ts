import * as dotenv from 'dotenv'
dotenv.config()

export const CONFIG = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT,

	POSTGRES_HOST: process.env.POSTGRES_HOST,
	POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
	POSTGRES_USER: process.env.POSTGRES_USER,
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
	POSTGRES_DB: process.env.POSTGRES_DB,

	JWT_SECRET: process.env.JWT_SECRET,
	JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY as string,
}
