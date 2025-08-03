# Email Functionality Temporarily Disabled

## Status
Email sending functionality has been temporarily disabled due to missing `RESEND_API_KEY` environment variable.

## Affected Features
- Job application confirmation emails
- Job application status update emails
- Admin notification emails

## What Still Works
- Job application submission (saves to database)
- Job application status updates (saves to database)
- Contact forms (sends WhatsApp notifications)
- Start dream forms (sends WhatsApp notifications)
- Newsletter subscriptions (saves to database)

## To Re-enable Email Functionality

1. **Get a Resend API Key:**
   - Sign up at [resend.com](https://resend.com)
   - Create an API key in your dashboard

2. **Set Environment Variable:**
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```

3. **Restore Email Functionality:**
   - Open `lib/email.ts`
   - Uncomment the resend initialization line
   - Replace the `sendEmail` function with the original implementation (commented at the bottom)

## Current Behavior
- Email functions return `true` to prevent breaking application flow
- Console logs show what emails would have been sent
- All other functionality continues to work normally

## Files Modified
- `lib/email.ts` - Main email configuration and sending logic 