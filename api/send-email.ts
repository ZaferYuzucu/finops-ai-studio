/**
 * Vercel Serverless Function - E-posta Gönderimi
 * GoDaddy SMTP ile info@finops.ist'den e-posta gönderir
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ENV Validation - Critical for production
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ SMTP credentials not configured in environment variables');
    return res.status(500).json({ 
      error: 'SMTP yapılandırması eksik', 
      details: 'SMTP_USER ve SMTP_PASS environment variables gereklidir. Lütfen Vercel dashboard\'dan ayarlayın.'
    });
  }

  const { to, subject, text, html, replyTo } = req.body;

  // Validate required fields
  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, text/html' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).json({ error: 'Invalid email address format' });
  }

  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    console.log(`📧 Subject: ${subject}`);
    
    // GoDaddy SMTP Configuration
    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified');
    } catch (verifyError: any) {
      console.error('❌ SMTP connection verification failed:', verifyError);
      return res.status(500).json({
        error: 'SMTP sunucusuna bağlanılamadı',
        details: verifyError.message,
      });
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"FINOPS AI Studio" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html: html || text,
      replyTo: replyTo || process.env.SMTP_USER || 'info@finops.ist',
    });

    console.log('✅ Email sent successfully!');
    console.log(`✅ Message ID: ${info.messageId}`);
    console.log(`✅ To: ${to}`);

    return res.status(200).json({
      success: true,
      messageId: info.messageId,
      message: 'E-posta başarıyla gönderildi!',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('❌ Email sending error:', error);
    
    // Detailed error logging for debugging
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
    });

    return res.status(500).json({
      error: 'E-posta gönderilemedi',
      details: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
