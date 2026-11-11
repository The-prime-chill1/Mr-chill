# Enquiry auto-reply setup

This function sends a branded confirmation to the customer and a new-enquiry notification to CHILL TECH LTD after the public form has saved the enquiry in Supabase.

1. Add and verify `chilltechltd.com` in Resend.
2. Add the DNS records supplied by Resend at the domain provider.
3. Set the server-side Supabase function secrets:

```sh
supabase secrets set RESEND_API_KEY=your_key
supabase secrets set "ENQUIRY_FROM_EMAIL=CHILL TECH LTD <enquiries@chilltechltd.com>"
supabase secrets set ENQUIRY_ADMIN_EMAIL=your_receiving_inbox
supabase secrets set ENQUIRY_ALLOWED_ORIGINS=https://chilltechltd.com,https://www.chilltechltd.com,http://localhost:5173
```

4. Deploy the function:

```sh
supabase functions deploy enquiry-autoreply
```

Never place the Resend API key in a Vite variable or any browser-side file.
