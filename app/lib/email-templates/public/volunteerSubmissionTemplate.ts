export const volunteerSubmissionUserTemplate = ({
  firstName,
  mailingList,
  yardSign,
  doorKnocking
}: {
  firstName: string
  mailingList: boolean
  yardSign: boolean
  doorKnocking: boolean
}) => {
  const year = new Date().getFullYear()

  const interests = [
    mailingList && 'Join the mailing list',
    yardSign && 'Put a sign in my yard',
    doorKnocking && 'Join the door knocking crew'
  ].filter(Boolean) as string[]

  const interestsBlock =
    interests.length > 0
      ? interests
          .map(
            (interest) => `
              <tr>
                <td style="padding: 6px 0; border-bottom: 1px solid #2d0060;">
                  <p style="margin: 0; color: #f0e6ff; font-size: 13px;">✓ &nbsp;${interest}</p>
                </td>
              </tr>`
          )
          .join('')
      : ''

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for Joining Team ZVM!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0010;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding: 32px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; margin: 0 auto; background: #130025; border-top: 3px solid #ff00a8;">
 
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 20px;">
              <p style="margin: 0 0 4px 0; color: #00e5ff; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; font-family: 'SF Mono', 'Fira Code', monospace;">
                Elect ZVM · 9th Essex District
              </p>
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">
                You're on the Team, ${firstName}!
              </h1>
            </td>
          </tr>
 
          <tr>
            <td style="padding: 0 32px;">
              <div style="height: 1px; background-color: #2d0060;"></div>
            </td>
          </tr>
 
          <!-- Intro -->
          <tr>
            <td style="padding: 24px 32px 20px;">
              <p style="margin: 0; color: #9d7fc4; font-size: 14px; line-height: 1.7;">
                Thank you for signing up to volunteer with the Zosia VanMeter for State Representative campaign. We're so glad to have you with us — every hand on deck makes a real difference in the 9th Essex District.
              </p>
            </td>
          </tr>
 
          <!-- What you signed up for -->
          ${
            interests.length > 0
              ? `
          <tr>
            <td style="padding: 0 32px 24px;">
              <p style="margin: 0 0 12px 0; color: #00e5ff; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; font-family: 'SF Mono', 'Fira Code', monospace;">
                How You're Helping
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${interestsBlock}
              </table>
            </td>
          </tr>`
              : ''
          }
 
          <!-- What's next -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #0a0010; border: 1px solid #2d0060;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 8px 0; color: #ff00a8; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; font-family: 'SF Mono', 'Fira Code', monospace;">
                      What's Next
                    </p>
                    <p style="margin: 0; color: #9d7fc4; font-size: 13px; line-height: 1.7;">
                      Someone from the campaign will be in touch soon with next steps. In the meantime, follow us on social media and spread the word — the primary is <strong style="color: #f0e6ff;">September 1, 2026</strong>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
 
          <!-- Primary date -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #1e0f3d; border-left: 3px solid #a855f7;">
                <tr>
                  <td style="padding: 14px 16px;">
                    <p style="margin: 0 0 4px 0; color: #a855f7; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; font-family: 'SF Mono', 'Fira Code', monospace;">
                      Primary Election
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 800;">
                      September 1, 2026
                    </p>
                    <p style="margin: 4px 0 0 0; color: #9d7fc4; font-size: 12px;">
                      Registration deadline · August 12, 2026
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
 
          <!-- Social + contact -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <p style="margin: 0; color: #9d7fc4; font-size: 13px; line-height: 1.7;">
                Follow the campaign at <a href="https://www.instagram.com/realzvm" style="color: #00e5ff; text-decoration: none;">@realzvm</a> on Facebook and Instagram, or reach out at <a href="mailto:hello@electzvm.com" style="color: #00e5ff; text-decoration: none;">hello@electzvm.com</a>.
              </p>
            </td>
          </tr>
 
          <!-- Signature -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <p style="margin: 0; color: #f0e6ff; font-size: 14px; line-height: 1.7;">
                Forward. Together.<br />
                <strong style="color: #ff00a8;">— Zosia VanMeter</strong>
              </p>
            </td>
          </tr>
 
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid #2d0060;">
              <p style="margin: 0; color: #3d1a6e; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; letter-spacing: 0.08em;">
                © ${year} Elect ZVM · 9th Essex District · Built by Sqysh
              </p>
            </td>
          </tr>
 
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
