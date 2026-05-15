export const volunteerSubmissionAdminTemplate = ({
  firstName,
  lastName,
  email,
  phone,
  mailingList,
  yardSign,
  doorKnocking
}: {
  firstName: string
  lastName: string
  email: string
  phone: string
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
      : `<tr><td style="padding: 6px 0;"><p style="margin: 0; color: #9d7fc4; font-size: 13px;">No specific interests selected.</p></td></tr>`

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Volunteer Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0010;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding: 32px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; margin: 0 auto; background: #130025; border-top: 3px solid #a855f7;">
 
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 20px;">
              <p style="margin: 0 0 4px 0; color: #00e5ff; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; font-family: 'SF Mono', 'Fira Code', monospace;">
                Elect ZVM · Campaign HQ
              </p>
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">
                New Volunteer Sign-Up
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
                Someone just signed up to volunteer for the campaign. Here are their details:
              </p>
            </td>
          </tr>
 
          <!-- Contact info -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #0a0010; border: 1px solid #2d0060;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 4px 0; color: #00e5ff; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; font-family: 'SF Mono', 'Fira Code', monospace;">
                      Contact Info
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;">
                      <tr>
                        <td style="padding: 5px 0; width: 80px; vertical-align: top;">
                          <p style="margin: 0; color: #9d7fc4; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; text-transform: uppercase; letter-spacing: 0.1em;">Name</p>
                        </td>
                        <td style="padding: 5px 0; vertical-align: top;">
                          <p style="margin: 0; color: #f0e6ff; font-size: 13px; font-weight: 700;">${firstName} ${lastName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; width: 80px; vertical-align: top;">
                          <p style="margin: 0; color: #9d7fc4; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; text-transform: uppercase; letter-spacing: 0.1em;">Email</p>
                        </td>
                        <td style="padding: 5px 0; vertical-align: top;">
                          <a href="mailto:${email}" style="margin: 0; color: #a855f7; font-size: 13px; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; width: 80px; vertical-align: top;">
                          <p style="margin: 0; color: #9d7fc4; font-size: 11px; font-family: 'SF Mono', 'Fira Code', monospace; text-transform: uppercase; letter-spacing: 0.1em;">Phone</p>
                        </td>
                        <td style="padding: 5px 0; vertical-align: top;">
                          <a href="tel:${phone}" style="margin: 0; color: #a855f7; font-size: 13px; text-decoration: none;">${phone}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
 
          <!-- Interests -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <p style="margin: 0 0 12px 0; color: #00e5ff; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; font-family: 'SF Mono', 'Fira Code', monospace;">
                How They Want to Help
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${interestsBlock}
              </table>
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
