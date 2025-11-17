import type { WaitlistEntry, CreateWaitlistData } from '@/lib/types'
import type { WaitlistAdapter } from '@/lib/db/supabase-adapter'

export interface Logger {
  info(message: string, meta?: any): void
  warn(message: string, meta?: any): void
  error(message: string, meta?: any): void
}

export interface WaitlistConfig {
  database: WaitlistAdapter
  logger: Logger
  callbacks?: {
    onWaitlistJoin?: (entry: WaitlistEntry) => Promise<void>
  }
}

export class WaitlistManager {
  constructor(private config: WaitlistConfig) {}

  async submitEntry(data: CreateWaitlistData): Promise<WaitlistEntry> {
    const existing = await this.config.database.findByEmail(data.email)

    if (existing) {
      this.config.logger.warn('[WaitlistManager] Duplicate email', { email: data.email })
      throw new Error('Email already registered on waitlist')
    }

    const entry = await this.config.database.create(data)

    this.config.logger.info('[WaitlistManager] New entry created', {
      waitlistId: entry.waitlist_id,
      email: entry.email
    })

    if (this.config.callbacks?.onWaitlistJoin) {
      await this.config.callbacks.onWaitlistJoin(entry)
    }

    return entry
  }
}
