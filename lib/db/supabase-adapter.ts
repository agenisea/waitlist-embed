import { SupabaseClient } from '@supabase/supabase-js'
import { retryWithJitter } from '@/lib/utils/fetch'
import type { WaitlistEntry, CreateWaitlistData } from '@/lib/types'

export interface WaitlistAdapter {
  create(data: CreateWaitlistData): Promise<WaitlistEntry>
  findByEmail(email: string): Promise<WaitlistEntry | null>
}

export function createSupabaseAdapter(supabase: SupabaseClient<any, any, any>): WaitlistAdapter {
  return {
    async create(data: CreateWaitlistData): Promise<WaitlistEntry> {
      const result = await retryWithJitter(
        async () => supabase
          .from('waitlist')
          .insert({
            first_name: data.first_name || null,
            last_name: data.last_name || null,
            email: data.email.toLowerCase(),
            organization_name: data.organization_name || null,
            job_title: data.job_title || null,
            interest_reason: data.interest_reason || null,
            use_case: data.use_case || null,
            feedback_importance: data.feedback_importance || null,
            subscribe_newsletter: data.subscribe_newsletter
          })
          .select()
          .single(),
        { isRetryable: () => true }
      )

      if (result.error) throw result.error
      return result.data as WaitlistEntry
    },

    async findByEmail(email: string): Promise<WaitlistEntry | null> {
      const result = await retryWithJitter(
        async () => supabase
          .from('waitlist')
          .select('*')
          .ilike('email', email)
          .single(),
        { isRetryable: () => true }
      )

      return result.data as WaitlistEntry | null
    }
  }
}
