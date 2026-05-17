export function adminWelcomeTemplate({ firstName }: { firstName: string }) {
  const year = new Date().getFullYear()
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the team</title>
</head>
<body style="margin: 0; padding: 0; background: #f5f3ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f5f3ff; padding: 32px 20px;">
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; margin: 0 auto; background: #ffffff; border-top: 3px solid #7c3aed;">

          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 0;">
              <p style="margin: 0 0 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #7c3aed; font-family: 'SF Mono', 'Fira Code', monospace;">
                Elect ZVM · Campaign HQ
              </p>
              <h1 style="margin: 8px 0 0; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; color: #1a1a2e;">
                You're on the team, ${firstName}!
              </h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 20px 32px 0;">
              <div style="height: 1px; background: #e8e3ff;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 24px 32px 8px;">
              <p style="margin: 0 0 16px; color: #1a1a2e; font-size: 15px; line-height: 1.8;">
                You've been added as an admin on the Elect ZVM campaign dashboard. You can sign in right now using your Google account.
              </p>
            </td>
          </tr>

          <!-- Login CTA -->
          <tr>
            <td style="padding: 0 32px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f5f3ff; border-left: 3px solid #7c3aed;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 4px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #7c3aed; font-family: 'SF Mono', 'Fira Code', monospace;">
                      How to sign in
                    </p>
                    <p style="margin: 4px 0 8px; font-size: 14px; color: #1a1a2e; line-height: 1.7;">
                      1. Go to <strong>electzvm.com/login</strong><br/>
                      2. Click <strong>Sign in with Google</strong><br/>
                      3. Use the Gmail account this email was sent to
                    </p>
                    <a href="https://electzvm.com/login" style="display: inline-block; margin-top: 8px; padding: 10px 20px; background: #7c3aed; color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none;">
                      Go to Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; border-top: 1px solid #e8e3ff;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af; font-family: 'SF Mono', 'Fira Code', monospace; letter-spacing: 0.05em;">
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
