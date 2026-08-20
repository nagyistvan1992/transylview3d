const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configure Google SMTP Transporter with Gmail service optimization
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: (process.env.SMTP_USER || 'transylview3d@gmail.com').trim(),
    pass: (process.env.SMTP_PASS || 'uzfqetathiidwxai').replace(/\s+/g, ''),
  },
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TransylView 3D Mail Service' });
});

// API Endpoint to send quote emails
app.post('/api/send-quote', async (req, res) => {
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
      preferredTime,
    } = req.body;

    if (!fullName || !phone || !email) {
      return res.status(400).json({ error: 'Numele, telefonul și emailul sunt obligatorii.' });
    }

    const timestamp = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });
    const formattedDate = preferredDate ? `${preferredDate} (${preferredTime || 'Interval de stabilit'})` : 'De stabilit de comun acord';

    // 1. Email to Business Owner (transylview3d@gmail.com)
    const ownerMailOptions = {
      from: `"TransylView 3D Leads" <${process.env.SMTP_USER || 'transylview3d@gmail.com'}>`,
      to: 'transylview3d@gmail.com',
      replyTo: email,
      subject: `🔔 Solicitare Nouă Tur 3D: ${fullName} — ${selectedPkg} (${city})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #0c0a09; color: #f5f5f4; margin: 0; padding: 20px; }
            .card { background-color: #1c1917; border: 1px solid #44403c; border-radius: 16px; max-width: 600px; margin: 0 auto; overflow: hidden; }
            .header { background: linear-gradient(135deg, #1c1917 0%, #292524 100%); padding: 24px; border-bottom: 2px solid #556B2F; }
            .title { color: #f5f5f4; font-size: 20px; font-weight: bold; margin: 0; }
            .subtitle { color: #d4af37; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
            .content { padding: 24px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .table td { padding: 12px 8px; border-bottom: 1px solid #292524; font-size: 14px; }
            .label { color: #a8a29e; width: 40%; font-weight: 600; }
            .value { color: #fafaf9; font-weight: 500; }
            .badge { display: inline-block; background-color: #556B2F; color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold; }
            .btn { display: inline-block; background-color: #556B2F; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 13px; text-transform: uppercase; margin-top: 20px; }
            .footer { background-color: #0c0a09; padding: 16px 24px; text-align: center; color: #78716c; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div class="subtitle">TRANSYLVIEW 3D • LEAD NOU</div>
              <div class="title">Solicitare Nouă de la ${fullName}</div>
            </div>
            <div class="content">
              <table class="table">
                <tr>
                  <td class="label">Nume Client:</td>
                  <td class="value"><strong>${fullName}</strong></td>
                </tr>
                <tr>
                  <td class="label">Telefon / WhatsApp:</td>
                  <td class="value"><a href="tel:${phone}" style="color: #60a5fa; text-decoration: none; font-weight: bold;">${phone}</a></td>
                </tr>
                <tr>
                  <td class="label">Email:</td>
                  <td class="value"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td class="label">Pachet Solicitat:</td>
                  <td class="value"><span class="badge">${selectedPkg}</span></td>
                </tr>
                <tr>
                  <td class="label">Oraș / Zonă:</td>
                  <td class="value">${city}</td>
                </tr>
                <tr>
                  <td class="label">Tip Proprietate:</td>
                  <td class="value">${propertyType}</td>
                </tr>
                <tr>
                  <td class="label">Suprafață Estimată:</td>
                  <td class="value">${approxSurface}</td>
                </tr>
                <tr>
                  <td class="label">Data & Interval Orar:</td>
                  <td class="value">${formattedDate}</td>
                </tr>
                <tr>
                  <td class="label">Data Înregistrării:</td>
                  <td class="value" style="color: #a8a29e; font-size: 12px;">${timestamp}</td>
                </tr>
              </table>
              <div style="text-align: center; margin-top: 15px;">
                <a href="tel:${phone}" class="btn">Sună Clientul Acum</a>
              </div>
            </div>
            <div class="footer">
              Notificare automată generată de platforma TransylView 3D.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 2. Automated Confirmation Email to the Client
    const clientMailOptions = {
      from: `"TransylView 3D" <${process.env.SMTP_USER || 'transylview3d@gmail.com'}>`,
      to: email,
      subject: `Confirmare Solicitare Tur Virtual 3D — TransylView 3D`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f5f5f4; color: #1c1917; margin: 0; padding: 24px 12px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e7e5e4; }
            .header { background-color: #0c0a09; padding: 32px 24px; text-align: center; color: #ffffff; }
            .brand { font-size: 22px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; color: #ffffff; margin: 0; }
            .brand span { color: #d4af37; font-weight: 400; }
            .brand-sub { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #a8a29e; margin-top: 6px; }
            .body { padding: 32px 28px; }
            .greeting { font-size: 18px; font-weight: 700; color: #1c1917; margin-bottom: 16px; }
            .lead-text { font-size: 14px; line-height: 1.6; color: #44403c; margin-bottom: 24px; }
            .summary-box { background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px; }
            .summary-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #556B2F; margin-bottom: 12px; }
            .steps-box { margin-bottom: 24px; }
            .steps-title { font-size: 14px; font-weight: 700; color: #1c1917; margin-bottom: 12px; }
            .step-item { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 13px; line-height: 1.5; color: #44403c; }
            .step-num { background-color: #556B2F; color: #ffffff; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; margin-right: 12px; flex-shrink: 0; margin-top: 1px; }
            .contact-card { background-color: #f5f5f4; border-radius: 12px; padding: 16px; font-size: 13px; color: #44403c; line-height: 1.5; }
            .footer { background-color: #0c0a09; padding: 24px; text-align: center; color: #a8a29e; font-size: 11px; line-height: 1.5; }
            .footer a { color: #d4af37; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Brand Header -->
            <div class="header">
              <h1 class="brand">TRANSYLVIEW <span>3D</span></h1>
              <div class="brand-sub">Tururi Virtuale 8K & Digital Twins • Transilvania</div>
            </div>

            <!-- Email Body -->
            <div class="body">
              <div class="greeting">Bună ziua, ${fullName},</div>
              
              <p class="lead-text">
                Vă mulțumim pentru interesul acordat serviciilor noastre! Am recepționat cu succes solicitarea dumneavoastră pentru realizarea unui tur virtual 3D profesional.
              </p>

              <!-- Summary Box -->
              <div class="summary-box">
                <div class="summary-title">Detaliile Solicitării Dumneavoastră</div>
                
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 6px 0; color: #78716c;">Pachet selectat:</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 700; color: #1c1917;">${selectedPkg}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #78716c;">Oraș / Zonă:</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #1c1917;">${city}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #78716c;">Tip imobil & Suprafață:</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #1c1917;">${propertyType} (${approxSurface})</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #78716c;">Dată & Interval orar:</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #1c1917;">${formattedDate}</td>
                  </tr>
                </table>
              </div>

              <!-- Next steps -->
              <div class="steps-box">
                <div class="steps-title">Ce urmează acum?</div>
                
                <div class="step-item">
                  <div class="step-num">1</div>
                  <div><strong>Confirmare rapidă:</strong> Un specialist din echipa noastră va analiza detaliile și vă va contacta în maximum <strong>2 ore</strong> (în intervalul 08:30 – 19:30) pentru a confirma programarea și parametrii tehnici.</div>
                </div>

                <div class="step-item">
                  <div class="step-num">2</div>
                  <div><strong>Scanarea 8K:</strong> Ne deplasăm la locație cu laboratorul mobil complet (Insta X5 8K și trepiezi de carbon). Scanarea durează în medie între 45 și 90 de minute.</div>
                </div>

                <div class="step-item">
                  <div class="step-num">3</div>
                  <div><strong>Livrare în 24 - 48h:</strong> Primiți link-ul interactiv al turului 3D, planul 2D cotat și fotografiile HDR de înaltă rezoluție, gata de publicat pe portaluri și rețele sociale.</div>
                </div>
              </div>

              <!-- Contact box -->
              <div class="contact-card">
                <strong>Aveți o întrebare urgentă sau doriți o modificare?</strong><br>
                Ne puteți contacta direct la telefon <a href="tel:0751801025" style="color: #556B2F; font-weight: bold; text-decoration: none;">0751 801 025</a> sau răspunzând direct la acest e-mail.
              </div>

              <div style="margin-top: 28px; font-size: 14px; color: #44403c; line-height: 1.5;">
                Cu deosebită considerație,<br>
                <strong style="color: #1c1917;">Echipa TransylView 3D</strong><br>
                <span style="font-size: 12px; color: #78716c;">Satu Mare & Transilvania (Rază 100 km)</span>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              © ${new Date().getFullYear()} TransylView 3D. Toate drepturile rezervate.<br>
              Email: <a href="mailto:transylview3d@gmail.com">transylview3d@gmail.com</a> • Tel: <a href="tel:0751801025">0751 801 025</a><br>
              Satu Mare, România
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    res.status(200).json({ success: true, message: 'Solicitarea a fost trimisă cu succes!' });
  } catch (error) {
    console.error('Error sending emails via Google SMTP:', error);
    res.status(500).json({ error: 'A apărut o eroare la trimiterea emailului. Vă rugăm să ne contactați telefonic.' });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`[TransylView 3D] API Server running on port ${PORT}`);
});
