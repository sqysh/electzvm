export function emailBlastTemplate({ subject, body, signOff }: { subject: string; body: string; signOff: string }) {
  const year = new Date().getFullYear()
  const paragraphs = body
    .split('\n')
    .filter((p) => p.trim())
    .map(
      (p) => `
      <tr>
        <td style="padding: 0 32px 16px;">
          <p style="margin: 0; color: #1a1a2e; font-size: 15px; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            ${p.trim()}
          </p>
        </td>
      </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background: #f5f3ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f5f3ff; padding: 32px 20px;">
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; margin: 0 auto; background: #ffffff; border-top: 3px solid #7c3aed;">
 
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 0;">
              <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #7c3aed; font-family: 'SF Mono', 'Fira Code', monospace;">
                Elect ZVM · 9th Essex District
              </p>
              <h1 style="margin: 8px 0 0; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; color: #1a1a2e;">
                ${subject}
              </h1>
            </td>
          </tr>
 
          <!-- Divider -->
          <tr>
            <td style="padding: 20px 32px 0;">
              <div style="height: 1px; background: #e8e3ff;"></div>
            </td>
          </tr>
 
          <!-- Body paragraphs -->
          <tr>
            <td style="padding: 24px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${paragraphs}
              </table>
            </td>
          </tr>
 
          <!-- Sign off -->
          <tr>
            <td style="padding: 8px 32px 32px;">
              <p style="margin: 0 0 4px; color: #1a1a2e; font-size: 15px; line-height: 1.8;">
                Forward. Together,
              </p>
              <p style="margin: 0; color: #7c3aed; font-size: 15px; font-weight: 700;">
                — ${signOff}
              </p>
            </td>
          </tr>
 
          <!-- Primary date callout -->
          <tr>
            <td style="padding: 0 32px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f5f3ff; border-left: 3px solid #ec4899;">
                <tr>
                  <td style="padding: 12px 16px;">
                    <p style="margin: 0 0 2px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #ec4899; font-family: 'SF Mono', 'Fira Code', monospace;">
                      Primary Election
                    </p>
                    <p style="margin: 0; font-size: 16px; font-weight: 900; text-transform: uppercase; color: #1a1a2e;">
                      September 1, 2026
                    </p>
                    <p style="margin: 2px 0 0; font-size: 12px; color: #6b7280;">
                      Registration deadline · August 12, 2026
                    </p>
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
