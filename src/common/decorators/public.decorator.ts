import { CONFIG } from '@/config/config'
import { SetMetadata } from '@nestjs/common'

export const Public = () => SetMetadata(CONFIG.IS_PUBLIC_KEY, true)
