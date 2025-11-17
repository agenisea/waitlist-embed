import nodemailer from 'nodemailer'
import { wrapEmailContent } from './email-templates'

let transporter: nodemailer.Transporter | null = null

function getEmailTransporter(): nodemailer.Transporter {
  if (transporter !== null) {
    return transporter
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[Email] SMTP credentials not configured - emails will not be sent')
  }

  // Create Zoho SMTP transporter
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_PORT === '465', // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  return transporter
}

interface WaitlistConfirmationParams {
  email: string
  firstName?: string
  lastName?: string
}

export async function sendWaitlistConfirmation({
  email,
  firstName,
  lastName,
}: WaitlistConfirmationParams): Promise<{ success: boolean; error?: string }> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[Email] Skipping email send - SMTP credentials not configured')
    return { success: false, error: 'Email service not configured' }
  }

  const greeting = firstName ? `Hi ${firstName}!` : 'Hi!'
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER

  try {
    await getEmailTransporter().sendMail({
      from: `App Waitlist <${fromEmail}>`,
      to: email,
      subject: 'App Early Access Waitlist - Confirmation',
      html: wrapEmailContent(`
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="logo.png" alt="App Logo" style="height: 48px; width: auto;" />
        </div>

        <p style="font-size: 16px; line-height: 1.5; color: #333;">${greeting}</p>

        <p style="font-size: 16px; line-height: 1.5; color: #333;">
          We're excited to have you on board as the app continues to evolve.<br/>
          You'll be among the first to explore new features and early releases.
        </p>

        <p style="font-size: 16px; line-height: 1.5; color: #333;">
          Thanks for joining us on the journey!
        </p>

        <p style="font-size: 16px; line-height: 1.5; color: #333; margin-top: 30px;">
          — The App Team<br/>
          <a href="https://app.com" style="color: #3b82f6; text-decoration: none;">app.com</a>
        </p>
      `),
      text: `${greeting}

Your response for the App Early Access Waitlist has been received.

Thanks for joining us on the journey!

Best,
App Waitlist Administrator`,
    })

    console.log('[Email] Waitlist confirmation sent to:', email)
    return { success: true }
  } catch (error) {
    console.error('[Email] Failed to send waitlist confirmation:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
