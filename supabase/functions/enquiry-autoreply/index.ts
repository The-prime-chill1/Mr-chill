import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const jsonHeaders = { 'Content-Type': 'application/json' };
const allowedOrigins = (Deno.env.get('ENQUIRY_ALLOWED_ORIGINS') || 'https://chilltechltd.com,https://www.chilltechltd.com,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

const escapeHtml = (value = '') => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character] || character));

const response = (body: Record<string, unknown>, status: number, origin: string) => new Response(JSON.stringify(body), {
  status,
  headers: {
    ...jsonHeaders,
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  },
});

Deno.serve(async (request) => {
  const origin = request.headers.get('origin') || allowedOrigins[0];
  if (request.method === 'OPTIONS') return response({ ok: true }, 200, origin);
  if (request.method !== 'POST') return response({ error: 'Method not allowed.' }, 405, origin);
  if (!allowedOrigins.includes(origin)) return response({ error: 'Origin not allowed.' }, 403, origin);

  try {
    const payload = await request.json();
    const name = String(payload.name || '').trim().slice(0, 120);
    const email = String(payload.email || '').trim().toLowerCase().slice(0, 254);
    const phone = String(payload.phone || '').trim().slice(0, 30);
    const company = String(payload.company || '').trim().slice(0, 160);
    const service = String(payload.service || '').trim().slice(0, 120);
    const message = String(payload.message || '').trim().slice(0, 3000);
    const website = String(payload.website || '').trim();

    if (website) return response({ ok: true }, 200, origin);
    if (name.length < 2 || !email.includes('@') || service.length < 2 || message.length < 10) {
      return response({ error: 'Invalid enquiry details.' }, 400, origin);
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('ENQUIRY_FROM_EMAIL');
    const adminEmail = Deno.env.get('ENQUIRY_ADMIN_EMAIL');
    if (!resendApiKey || !fromEmail || !adminEmail) {
      return response({ error: 'Email delivery is not configured.' }, 503, origin);
    }

    const firstName = escapeHtml(name.split(/\s+/)[0]);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Not supplied');
    const safeCompany = escapeHtml(company || 'Not supplied');
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
    const sendEmail = (body: Record<string, unknown>) => fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const [customerResult, adminResult] = await Promise.all([
      sendEmail({
        from: fromEmail,
        to: [email],
        subject: `We received your ${service} enquiry | CHILL TECH LTD`,
        html: `<div style="font-family:Arial,sans-serif;color:#06172f;line-height:1.7;max-width:640px;margin:auto"><h1 style="font-size:28px">Thank you, ${firstName}.</h1><p>Your <strong>${safeService}</strong> enquiry has been received securely by CHILL TECH LTD.</p><p>Our team will review the information you provided and contact you through <strong>${safeEmail}</strong> with the appropriate next step.</p><p style="padding:16px;background:#edf7ff;border-left:4px solid #159cff">We Build. You Grow.</p><p>CHILL TECH LTD<br><a href="https://www.chilltechltd.com">chilltechltd.com</a></p></div>`,
      }),
      sendEmail({
        from: fromEmail,
        to: [adminEmail],
        reply_to: email,
        subject: `New website enquiry: ${service} — ${name}`,
        html: `<div style="font-family:Arial,sans-serif;color:#06172f;line-height:1.6"><h1>New CHILL TECH LTD enquiry</h1><p><strong>Name:</strong> ${safeName}<br><strong>Email:</strong> ${safeEmail}<br><strong>Phone:</strong> ${safePhone}<br><strong>Company:</strong> ${safeCompany}<br><strong>Service:</strong> ${safeService}</p><p><strong>Project details</strong><br>${safeMessage}</p></div>`,
      }),
    ]);

    if (!customerResult.ok || !adminResult.ok) {
      const details = await Promise.all([customerResult.text(), adminResult.text()]);
      console.error('Resend delivery error', details);
      return response({ error: 'Email delivery failed.' }, 502, origin);
    }

    return response({ ok: true }, 200, origin);
  } catch (error) {
    console.error(error);
    return response({ error: 'Unable to process the acknowledgement.' }, 500, origin);
  }
});
