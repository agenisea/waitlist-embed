import type { WaitlistStatus as WaitlistStatusConst } from '@/lib/waitlist/constants'

export type WaitlistStatus = WaitlistStatusConst

export interface WaitlistEntry {
  waitlist_id: string
  first_name: string | null
  last_name: string | null
  email: string
  organization_name: string | null
  job_title: string | null
  interest_reason: string | null
  use_case: string | null
  feedback_importance: number | null
  subscribe_newsletter: boolean
  status: WaitlistStatus
  invite_id: string | null
  created_at: Date
  updated_at: Date
}

export interface CreateWaitlistData {
  first_name?: string
  last_name?: string
  email: string
  organization_name?: string
  job_title?: string
  interest_reason?: string
  use_case?: string
  feedback_importance?: number
  subscribe_newsletter: boolean
}
