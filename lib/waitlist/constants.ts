/**
 * Waitlist Module - Constants
 */

// ============================================================================
// WAITLIST STATUS
// ============================================================================

export const WAITLIST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const

export type WaitlistStatus = typeof WAITLIST_STATUS[keyof typeof WAITLIST_STATUS]
