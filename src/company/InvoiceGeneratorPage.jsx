import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiCheck, FiDownload, FiFileText, FiGlobe, FiPrinter, FiTrendingUp, FiUsers } from 'react-icons/fi';
import companyLogo from '../assets/chill-tech-logo.jpeg';
import { profile } from '../data';
import { insertSupabaseRow } from '../lib/supabase';
import { usePageMeta } from './SiteLayout';

const DOMAIN_USD = 50;
const DEPLOYMENT_USD = 20;
const DEFAULT_USD_NGN_RATE = 1600;
const MIN_PROJECT_TOTAL = 450000;
const MAX_PROJECT_TOTAL = 2000000;
const EXTRA_PAGE_FEE = 35000;
const REFERRAL_RATE = 0.15;

const websiteTypes = [
  { value: 'landing', label: 'Landing page website', base: 338000, includedPages: 1 },
  { value: 'business', label: 'Business website', base: 520000, includedPages: 5 },
  { value: 'corporate', label: 'Corporate website', base: 700000, includedPages: 8 },
  { value: 'ecommerce', label: 'E-commerce website', base: 950000, includedPages: 10 },
  { value: 'webapp', label: 'Custom web application', base: 1250000, includedPages: 8 },
  { value: 'custom', label: 'Other / custom website', base: 1550000, includedPages: 10 },
];

const todayString = () => new Date().toISOString().slice(0, 10);
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
const roundToThousand = (value) => Math.round(value / 1000) * 1000;
const formatNaira = (value) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value || 0);

function formatTimeline(weeks, days) {
  const parts = [];
  if (weeks > 0) parts.push(`${weeks} ${weeks === 1 ? 'week' : 'weeks'}`);
  if (days > 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  return parts.join(' ') || '1 day';
}

export default function InvoiceGeneratorPage() {
  const [invoice, setInvoice] = useState({
    number: `CTL-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`,
    date: todayString(),
    dueDate: '',
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    clientAddress: '',
    websiteType: 'business',
    customWebsiteType: '',
    pageCount: 5,
    timelineWeeks: 4,
    timelineDays: 0,
    usdNgnRate: DEFAULT_USD_NGN_RATE,
    referred: false,
    referrerName: '',
    notes: 'Payment must follow the amount, due date, and schedule stated on this invoice. Work begins after the agreed initial payment is confirmed.',
  });
  const [saveState, setSaveState] = useState({ state: 'idle', message: '' });
  usePageMeta('Project Estimate & Invoice', 'Calculate and prepare a CHILL TECH LTD website estimate using project type, page count, delivery time, domain, deployment, and referral details.', '/invoice');

  const update = (field, value) => setInvoice((current) => ({ ...current, [field]: value }));
  const selectedType = websiteTypes.find((item) => item.value === invoice.websiteType) || websiteTypes[1];
  const pageCount = clamp(Number(invoice.pageCount) || 1, 1, 50);
  const timelineWeeks = clamp(Number(invoice.timelineWeeks) || 0, 0, 24);
  const timelineDays = clamp(Number(invoice.timelineDays) || 0, 0, 6);
  const totalTimelineDays = Math.max(1, timelineWeeks * 7 + timelineDays);
  const timelineLabel = formatTimeline(timelineWeeks, timelineDays);
  const exchangeRate = clamp(Number(invoice.usdNgnRate) || DEFAULT_USD_NGN_RATE, 500, 5000);
  const projectTypeLabel = invoice.websiteType === 'custom' && invoice.customWebsiteType.trim()
    ? invoice.customWebsiteType.trim()
    : selectedType.label;
  const extraPages = Math.max(0, pageCount - selectedType.includedPages);
  const urgencyMultiplier = totalTimelineDays <= 7 ? 1.35 : totalTimelineDays <= 14 ? 1.22 : totalTimelineDays <= 21 ? 1.1 : 1;
  const urgencyLabel = urgencyMultiplier > 1 ? `${Math.round((urgencyMultiplier - 1) * 100)}% priority-delivery adjustment` : 'Standard delivery pricing';
  const calculatedDevelopmentFee = roundToThousand((selectedType.base + extraPages * EXTRA_PAGE_FEE) * urgencyMultiplier);
  const domainNaira = roundToThousand(DOMAIN_USD * exchangeRate);
  const deploymentNaira = roundToThousand(DEPLOYMENT_USD * exchangeRate);
  const fixedFees = domainNaira + deploymentNaira;
  const rawProjectTotal = calculatedDevelopmentFee + fixedFees;
  const total = clamp(rawProjectTotal, MIN_PROJECT_TOTAL, MAX_PROJECT_TOTAL);
  const developmentFee = Math.max(0, total - fixedFees);
  const referralCommission = roundToThousand(developmentFee * REFERRAL_RATE);
  const wasPriceAdjusted = rawProjectTotal !== total;

  const lineItems = [
    { description: `${projectTypeLabel} design & development — ${pageCount} ${pageCount === 1 ? 'page' : 'pages'}, ${timelineLabel}`, quantity: 1, rate: developmentFee },
    { description: `Domain registration — fixed at $${DOMAIN_USD}`, quantity: 1, rate: domainNaira, usd_amount: DOMAIN_USD, exchange_rate: exchangeRate },
    { description: `Deployment — fixed at $${DEPLOYMENT_USD}`, quantity: 1, rate: deploymentNaira, usd_amount: DEPLOYMENT_USD, exchange_rate: exchangeRate },
  ];

  const saveInvoice = async () => {
    setSaveState({ state: 'loading', message: 'Saving invoice…' });
    const referralText = invoice.referred
      ? `Referral: ${invoice.referrerName.trim() || 'Referrer name pending'}. Estimated 15% development-fee commission: ${formatNaira(referralCommission)}.`
      : 'Referral programme: eligible referrers receive 15% of the development fee after the qualifying client payment is received.';
    try {
      await insertSupabaseRow('invoices', {
        invoice_number: invoice.number,
        issue_date: invoice.date,
        due_date: invoice.dueDate || null,
        currency: 'NGN',
        client_name: invoice.clientName || null,
        client_company: invoice.clientCompany || null,
        client_email: invoice.clientEmail || null,
        client_address: invoice.clientAddress || null,
        items: lineItems,
        subtotal: total,
        tax_percent: 0,
        tax_amount: 0,
        discount: 0,
        total,
        notes: `${invoice.notes}\n\nProject scope: ${projectTypeLabel}, ${pageCount} ${pageCount === 1 ? 'page' : 'pages'}, delivery in ${timelineLabel}. USD/NGN rate used: ₦${exchangeRate.toLocaleString()} per $1.\n\n${referralText}`,
        status: 'draft',
      });
      setSaveState({ state: 'success', message: 'Invoice saved to the admin dashboard.' });
    } catch (error) {
      setSaveState({ state: 'error', message: error.message });
    }
  };

  const printInvoice = () => window.print();
  const downloadInvoice = () => {
    const preview = document.querySelector('.invoice-preview');
    if (!preview) return;
    const documentHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${invoice.number}</title><style>body{font-family:Arial,sans-serif;color:#06172f;padding:32px}img{width:80px}.invoice-preview{max-width:900px;margin:auto}.invoice-preview-header,.invoice-parties,.invoice-total-row{display:flex;justify-content:space-between;gap:30px}.invoice-scope-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:24px 0}.invoice-scope-summary div{padding:14px;background:#edf7ff}.invoice-preview table{width:100%;border-collapse:collapse;margin:30px 0}.invoice-preview th,.invoice-preview td{padding:12px;border-bottom:1px solid #dce8f2;text-align:left}.invoice-totals{margin-left:auto;max-width:360px}.invoice-total-row{padding:7px 0}.invoice-total-row.grand{font-size:20px;font-weight:bold;border-top:2px solid #159cff;margin-top:8px;padding-top:14px}.invoice-referral-note{margin-top:25px;padding:18px;background:#f4f0ff}</style></head><body>${preview.outerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([documentHtml], { type: 'text/html' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${invoice.number || 'CHILL-TECH-Invoice'}.html`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28 }}>
      <section className="invoice-page section-pad">
        <div className="invoice-page-heading">
          <div>
            <span className="eyebrow">Project estimate & invoice</span>
            <h1>Price the website clearly and professionally.</h1>
            <p>Choose the website type, number of pages, and delivery period. The calculator sets the development fee, adds the fixed domain and deployment costs, and keeps the complete project between ₦450,000 and ₦2,000,000.</p>
            {saveState.message && <p className={`form-status ${saveState.state}`}>{saveState.message}</p>}
          </div>
          <div className="button-row no-print">
            <button className="button button-secondary" type="button" onClick={saveInvoice} disabled={saveState.state === 'loading'}><FiFileText /> {saveState.state === 'loading' ? 'Saving…' : 'Save Invoice'}</button>
            <button className="button button-secondary" type="button" onClick={downloadInvoice}><FiDownload /> Download</button>
            <button className="button button-primary" type="button" onClick={printInvoice}><FiPrinter /> Print / Save PDF</button>
          </div>
        </div>

        <div className="invoice-pricing-rules no-print">
          <div><FiTrendingUp /><span><strong>NGN 450k–2m</strong><small>Protected total range</small></span></div>
          <div><FiGlobe /><span><strong>$50 + $20</strong><small>Fixed domain and deployment</small></span></div>
          <div><FiUsers /><span><strong>15%</strong><small>Eligible referral commission</small></span></div>
        </div>

        <div className="invoice-workspace">
          <form className="invoice-form no-print" onSubmit={(event) => event.preventDefault()}>
            <div className="invoice-form-intro"><span>Step 1</span><strong>Start with the website you need.</strong><small>Your total updates instantly as you change the scope.</small></div>
            <fieldset id="estimate-scope">
              <legend>Website scope</legend>
              <label>Type of website<select value={invoice.websiteType} onChange={(event) => update('websiteType', event.target.value)}>{websiteTypes.map((type) => <option value={type.value} key={type.value}>{type.label}</option>)}</select></label>
              {invoice.websiteType === 'custom' && <label>Describe the website type<input required value={invoice.customWebsiteType} onChange={(event) => update('customWebsiteType', event.target.value)} placeholder="e.g. School portal or property platform" /></label>}
              <label>Number of pages<input type="number" min="1" max="50" value={invoice.pageCount} onChange={(event) => update('pageCount', event.target.value)} /></label>
              <div className="form-pair"><label>Delivery weeks<input type="number" min="0" max="24" value={invoice.timelineWeeks} onChange={(event) => update('timelineWeeks', event.target.value)} /></label><label>Extra days<input type="number" min="0" max="6" value={invoice.timelineDays} onChange={(event) => update('timelineDays', event.target.value)} /></label></div>
              <div className="invoice-calculation-note"><FiCheck /><span>The website type sets the base fee. Pages above the included amount add {formatNaira(EXTRA_PAGE_FEE)} each, while faster delivery increases the development fee.</span></div>
            </fieldset>

            <aside className="invoice-live-summary" aria-live="polite">
              <span>Live estimated total</span>
              <strong>NGN {total.toLocaleString()}</strong>
              <div><span>Development</span><b>{formatNaira(developmentFee)}</b></div>
              <div><span>Domain + deployment</span><b>{formatNaira(fixedFees)}</b></div>
              <div><span>Delivery</span><b>{urgencyLabel}</b></div>
              <div><span>Potential referral commission</span><b>{formatNaira(referralCommission)}</b></div>
              <a href="#invoice-preview">Review the full invoice <FiArrowDown /></a>
            </aside>

            <fieldset id="estimate-client">
              <legend>Client details</legend>
              <label>Client name<input value={invoice.clientName} onChange={(event) => update('clientName', event.target.value)} placeholder="Client full name" /></label>
              <label>Company<input value={invoice.clientCompany} onChange={(event) => update('clientCompany', event.target.value)} placeholder="Business or organization" /></label>
              <label>Email<input type="email" value={invoice.clientEmail} onChange={(event) => update('clientEmail', event.target.value)} placeholder="client@example.com" /></label>
              <label>Address<textarea value={invoice.clientAddress} onChange={(event) => update('clientAddress', event.target.value)} placeholder="Client billing address" /></label>
            </fieldset>

            <fieldset>
              <legend>Invoice details</legend>
              <label>Invoice number<input value={invoice.number} onChange={(event) => update('number', event.target.value)} /></label>
              <div className="form-pair"><label>Issue date<input type="date" value={invoice.date} onChange={(event) => update('date', event.target.value)} /></label><label>Due date<input type="date" value={invoice.dueDate} onChange={(event) => update('dueDate', event.target.value)} /></label></div>
            </fieldset>

            <fieldset>
              <legend>Fixed USD fees</legend>
              <label>USD to NGN exchange rate<input type="number" min="500" max="5000" step="1" value={invoice.usdNgnRate} onChange={(event) => update('usdNgnRate', event.target.value)} /><small>Update this rate before issuing the final invoice.</small></label>
              <div className="invoice-fixed-fees"><div><span>Domain</span><strong>${DOMAIN_USD}</strong><small>{formatNaira(domainNaira)}</small></div><div><span>Deployment</span><strong>${DEPLOYMENT_USD}</strong><small>{formatNaira(deploymentNaira)}</small></div></div>
            </fieldset>

            <fieldset>
              <legend>Referral & terms</legend>
              <label className="consent-label"><input type="checkbox" checked={invoice.referred} onChange={(event) => update('referred', event.target.checked)} /><span>This client was referred by someone</span></label>
              {invoice.referred && <label>Referrer name<input value={invoice.referrerName} onChange={(event) => update('referrerName', event.target.value)} placeholder="Person who referred the client" /></label>}
              <div className="invoice-referral-calculation"><FiUsers /><span><strong>{formatNaira(referralCommission)}</strong><small>Estimated 15% commission on the development fee. It is not deducted from the client total.</small></span></div>
              <label>Payment terms<textarea value={invoice.notes} onChange={(event) => update('notes', event.target.value)} /></label>
            </fieldset>
          </form>

          <article className="invoice-preview" id="invoice-preview" tabIndex="-1">
            <div className="invoice-preview-header"><div><img src={companyLogo} alt="CHILL TECH LTD" /><strong>CHILL TECH LTD</strong><span>Innovate. Build. Empower.</span></div><div><h2>INVOICE</h2><span>#{invoice.number}</span></div></div>
            <div className="invoice-parties"><div><span>From</span><strong>CHILL TECH LTD</strong><p>{profile.officialEmail}<br />{profile.phone}<br />Nigeria</p></div><div><span>Bill to</span><strong>{invoice.clientCompany || invoice.clientName || 'Client / Company'}</strong><p>{invoice.clientCompany && invoice.clientName ? `${invoice.clientName}\n` : ''}{invoice.clientEmail || 'Client email'}<br />{invoice.clientAddress || 'Client billing address'}</p></div><div><span>Invoice dates</span><p>Issued: <strong>{invoice.date || '—'}</strong><br />Due: <strong>{invoice.dueDate || 'On receipt'}</strong></p></div></div>
            <div className="invoice-scope-summary"><div><span>Website type</span><strong>{projectTypeLabel}</strong></div><div><span>Project size</span><strong>{pageCount} {pageCount === 1 ? 'page' : 'pages'}</strong></div><div><span>Delivery period</span><strong>{timelineLabel}</strong></div></div>
            <table><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>{lineItems.map((item) => <tr key={item.description}><td>{item.description}</td><td>{item.quantity}</td><td>{formatNaira(item.rate)}</td><td>{formatNaira(item.quantity * item.rate)}</td></tr>)}</tbody></table>
            <div className="invoice-totals"><div className="invoice-total-row"><span>Development fee</span><strong>{formatNaira(developmentFee)}</strong></div><div className="invoice-total-row"><span>Fixed USD fees</span><strong>{formatNaira(fixedFees)}</strong></div><div className="invoice-total-row grand"><span>Total due</span><strong>{formatNaira(total)}</strong></div></div>
            {wasPriceAdjusted && <div className="invoice-price-cap-note"><FiCheck /><span>The project total was automatically adjusted to remain within the approved ₦450,000–₦2,000,000 range.</span></div>}
            <div className="invoice-terms"><strong>Payment terms</strong><p>{invoice.notes}</p><small>Domain is fixed at ${DOMAIN_USD} and deployment at ${DEPLOYMENT_USD}; their naira values use the exchange rate shown when this invoice was prepared.</small></div>
            <div className="invoice-referral-note"><FiUsers /><div><strong>Referral programme — 15% commission</strong><p>{invoice.referred ? `${invoice.referrerName || 'The named referrer'} may receive an estimated ${formatNaira(referralCommission)} after the qualifying client payment is received.` : 'An eligible person who refers a paying client may receive 15% of the development fee after the qualifying client payment is received.'} Referral commission is paid separately by CHILL TECH LTD and does not reduce the client total.</p></div></div>
          </article>
        </div>
      </section>
    </motion.div>
  );
}
