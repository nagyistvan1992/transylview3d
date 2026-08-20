const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      phone,
      email,
      city,
      propertyType,
      approxSurface,
      selectedPkg,
      preferredDate,
    } = req.body;

    if (!fullName || !phone || !email) {
      return res.status(400).json({ error: 'Numele, telefonul și emailul sunt obligatorii.' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'transylview3d@gmail.com',
        pass: (process.env.SMTP_PASS || 'uzfqetathiidwxai').replace(/\s+/g, ''),
      },
    });

    const timestamp = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });
    const formattedDate = preferredDate ? preferredDate : 'De stabilit de comun acord';

    // 1. Email to Business Owner
    const ownerMailOptions = {
      from: `"TransylView 3D Leads" <${process.env.SMTP_USER || 'transylview3d@gmail.com'}>`,
      to: 'transylview3d@gmail.com',
      replyTo: email,
      subject: `🔔 Solicitare Nouă Tur 3D: ${fullName} — ${selectedPkg} (${city})`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0c0a09; color: #f5f5f4; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: #1c1917; border: 1px solid #44403c; border-radius: 16px; padding: 24px;">
            <h2 style="color: #ffffff; margin-top: 0;">Solicitare Nouă de la ${fullName}</h2>
            <p style="color: #d4af37; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">TRANSYLVIEW 3D • LEAD NOU</p>
            <hr style="border: 0; border-top: 1px solid #292524; margin: 16px 0;" />
            <table style="width: 100%; font-size: 14px; color: #e7e5e4;">
              <tr><td style="padding: 8px 0; color: #a8a29e;">Nume Client:</td><td><strong>${fullName}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #a8a29e;">Telefon / WhatsApp:</td><td><a href="tel:${phone}" style="color: #60a5fa; font-weight: bold;">${phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #a8a29e;">Email:</td><td><a href="mailto:${email}" style="color: #60a5fa;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #a8a29e;">Pachet Solicitat:</td><td><strong>${selectedPkg}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #a8a29e;">Oraș / Zonă:</td><td>${city}</td></tr>
              <tr><td style="padding: 8px 0; color: #a8a29e;">Tip Imobil:</td><td>${propertyType} (${approxSurface})</td></tr>
              <tr><td style="padding: 8px 0; color: #a8a29e;">Data Preferată:</td><td>${formattedDate}</td></tr>
              <tr><td style="padding: 8px 0; color: #a8a29e;">Data Înregistrării:</td><td>${timestamp}</td></tr>
            </table>
          </div>
        </div>
      `,
    };

    // 2. Automated Confirmation Email to Client
    const clientMailOptions = {
      from: `"TransylView 3D" <${process.env.SMTP_USER || 'transylview3d@gmail.com'}>`,
      to: email,
      subject: `Confirmare Solicitare Tur Virtual 3D — TransylView 3D`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f4; color: #1c1917; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; padding: 32px 24px; border: 1px solid #e7e5e4;">
            <h1 style="font-size: 20px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #0c0a09; margin: 0;">TRANSYLVIEW <span style="color: #d4af37;">3D</span></h1>
            <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #78716c; margin-top: 4px;">Tururi Virtuale 8K & Digital Twins</p>
            <hr style="border: 0; border-top: 1px solid #e7e5e4; margin: 20px 0;" />
            <h3 style="color: #1c1917; font-size: 16px;">Bună ziua, ${fullName},</h3>
            <p style="font-size: 14px; line-height: 1.6; color: #44403c;">
              Vă mulțumim pentru interesul acordat serviciilor noastre! Am recepționat cu succes solicitarea dumneavoastră privind realizarea unui tur virtual 3D profesional pentru imobilul din <strong>${city}</strong>.
            </p>
            <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px;">
              <div style="font-weight: bold; color: #556B2F; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Rezumatul Solicitării</div>
              <table style="width: 100%;">
                <tr><td style="padding: 4px 0; color: #78716c;">Pachet:</td><td style="padding: 4px 0; text-align: right; font-weight: bold;">${selectedPkg}</td></tr>
                <tr><td style="padding: 4px 0; color: #78716c;">Locație:</td><td style="padding: 4px 0; text-align: right; font-weight: 600;">${city}</td></tr>
                <tr><td style="padding: 4px 0; color: #78716c;">Tip & Suprafață:</td><td style="padding: 4px 0; text-align: right; font-weight: 600;">${propertyType} (${approxSurface})</td></tr>
                <tr><td style="padding: 4px 0; color: #78716c;">Dată dorită:</td><td style="padding: 4px 0; text-align: right; font-weight: 600;">${formattedDate}</td></tr>
              </table>
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #44403c;">
              Un specialist din echipa noastră vă va contacta în maximum <strong>2 ore</strong> pentru a stabili toate detaliile tehnice.
            </p>
            <p style="font-size: 13px; color: #78716c; margin-top: 24px;">
              Dacă aveți întrebări urgente, ne puteți apela oricând la <a href="tel:0751801025" style="color: #556B2F; font-weight: bold; text-decoration: none;">0751 801 025</a>.<br><br>
              Cu deosebită considerație,<br>
              <strong>Echipa TransylView 3D</strong>
            </p>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Serverless mail error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
