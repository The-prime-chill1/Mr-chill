import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiCheckCircle, FiEye, FiEyeOff, FiFileText, FiInbox, FiKey, FiLock, FiLogOut, FiPlus, FiRefreshCw, FiShield, FiStar, FiTrash2 } from 'react-icons/fi';
import companyLogo from '../assets/chill-tech-logo.jpeg';
import { getAdminAuthPersistence, isSupabaseConfigured, setAdminAuthPersistence, supabase } from '../lib/supabase';

const emptyProject = { title: '', slug: '', description: '', category: '', technologies: '', live_url: '', image_url: '', is_featured: false, is_published: false };
const rememberedAdminEmailKey = 'chill-tech-admin-email';

const getRememberedAdminEmail = () => {
  try {
    return window.localStorage.getItem(rememberedAdminEmailKey) || '';
  } catch {
    return '';
  }
};

const formatDate = (value) => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function AdminAuthLayout({ children }) {
  return (
    <div className="admin-auth-page">
      <aside className="admin-auth-showcase">
        <Link className="admin-auth-brand" to="/"><img src={companyLogo} alt="CHILL TECH LTD" /><span><strong>CHILL TECH LTD</strong><small>Secure administration</small></span></Link>
        <div className="admin-auth-showcase-copy"><span><FiShield /> Private company workspace</span><h2>Manage the work behind the website.</h2><p>Review enquiries, approve client feedback, manage invoices, and maintain published company projects from one protected dashboard.</p></div>
        <div className="admin-auth-trust"><span><FiLock /> Supabase authentication</span><span><FiCheckCircle /> Role-protected access</span><span><FiKey /> Secure password recovery</span></div>
        <small>CHILL TECH LTD · Innovate. Build. Empower.</small>
      </aside>
      <section className="admin-auth-form-panel">{children}</section>
    </div>
  );
}

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState(() => new URLSearchParams(window.location.search).get('mode') === 'forgot' ? 'forgot' : 'login');
  const [email, setEmail] = useState(getRememberedAdminEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(getAdminAuthPersistence);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [records, setRecords] = useState({ enquiries: [], reviews: [], invoices: [], projects: [] });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [projectForm, setProjectForm] = useState(emptyProject);

  const isAdmin = session?.user?.app_metadata?.role === 'admin';

  useEffect(() => {
    document.title = 'Admin Dashboard | CHILL TECH LTD';
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      if (event === 'PASSWORD_RECOVERY') {
        setAuthMode('recovery');
        setAuthError('');
        setAuthNotice('Your recovery link is verified. Choose a new password.');
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const loadRecords = useCallback(async () => {
    if (!supabase || !isAdmin) return;
    setLoading(true);
    setNotice('');
    const tables = ['enquiries', 'reviews', 'invoices', 'projects'];
    const results = await Promise.all(tables.map((table) => supabase.from(table).select('*').order('created_at', { ascending: false })));
    const firstError = results.find((result) => result.error)?.error;
    if (firstError) setNotice(firstError.message);
    setRecords(Object.fromEntries(tables.map((table, index) => [table, results[index].data || []])));
    setLoading(false);
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) loadRecords();
  }, [isAdmin, loadRecords]);

  const stats = useMemo(() => [
    ['New enquiries', records.enquiries.filter((item) => item.status === 'new').length, FiInbox],
    ['Pending reviews', records.reviews.filter((item) => item.status === 'pending').length, FiStar],
    ['Open invoices', records.invoices.filter((item) => !['paid', 'cancelled'].includes(item.status)).length, FiFileText],
    ['Published projects', records.projects.filter((item) => item.is_published).length, FiBriefcase],
  ], [records]);

  const login = async (event) => {
    event.preventDefault();
    setAuthError('');
    setAuthNotice('');
    if (!supabase) return setAuthError('Supabase is not configured.');
    setAuthSubmitting(true);
    const normalizedEmail = email.trim().toLowerCase();
    setAdminAuthPersistence(rememberMe);
    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });
    if (error) {
      setAuthError(error.message === 'Invalid login credentials'
        ? 'Supabase rejected these credentials. Confirm that this user exists in Authentication, is confirmed, and has the correct password.'
        : error.message);
    } else {
      try {
        if (rememberMe) window.localStorage.setItem(rememberedAdminEmailKey, normalizedEmail);
        else window.localStorage.removeItem(rememberedAdminEmailKey);
      } catch {
        // Login remains usable when the browser blocks local storage.
      }
      setShowPassword(false);
    }
    setAuthSubmitting(false);
  };

  const requestPasswordReset = async (event) => {
    event.preventDefault();
    if (authSubmitting) return;
    setAuthError('');
    setAuthNotice('');
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return setAuthError('Enter the administrator email address.');
    if (!supabase) return setAuthError('Supabase is not configured.');

    setAuthSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: `${window.location.origin}/admin`,
    });
    setAuthSubmitting(false);
    if (error) {
      const isRateLimited = error.message.toLowerCase().includes('rate limit');
      return setAuthError(isRateLimited
        ? 'Supabase has temporarily paused reset emails because its email limit was reached. Check for an earlier recovery email or wait for the hourly limit to reset before requesting one new link.'
        : error.message);
    }
    setAuthNotice('If this email belongs to an administrator, Supabase has sent a secure password-reset link. Check the inbox and spam folder.');
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    setAuthError('');
    if (newPassword.length < 8) return setAuthError('Your new password must contain at least 8 characters.');
    if (newPassword !== confirmPassword) return setAuthError('The new passwords do not match.');
    if (!supabase) return setAuthError('Supabase is not configured.');

    setAuthSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setAuthSubmitting(false);
    if (error) return setAuthError(error.message);

    await supabase.auth.signOut();
    window.history.replaceState({}, document.title, '/admin');
    setNewPassword('');
    setConfirmPassword('');
    setAuthMode('login');
    setAuthNotice('Password updated successfully. Sign in with your new password.');
  };

  const logout = async () => {
    await supabase?.auth.signOut();
    setPassword('');
    setShowPassword(false);
    setAuthMode('login');
  };

  const updateRecord = async (table, id, changes) => {
    setNotice('Saving…');
    const { error } = await supabase.from(table).update(changes).eq('id', id);
    setNotice(error ? error.message : 'Saved successfully.');
    if (!error) loadRecords();
  };

  const deleteRecord = async (table, id) => {
    if (!window.confirm('Delete this record permanently?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    setNotice(error ? error.message : 'Record deleted.');
    if (!error) loadRecords();
  };

  const addProject = async (event) => {
    event.preventDefault();
    const payload = {
      ...projectForm,
      slug: projectForm.slug || slugify(projectForm.title),
      technologies: projectForm.technologies.split(',').map((item) => item.trim()).filter(Boolean),
    };
    const { error } = await supabase.from('projects').insert(payload);
    setNotice(error ? error.message : 'Project added successfully.');
    if (!error) {
      setProjectForm(emptyProject);
      loadRecords();
    }
  };

  if (authLoading) return <div className="admin-loading">Loading secure dashboard…</div>;

  if (!isSupabaseConfigured) return <AdminAuthLayout><div className="admin-auth-card"><img src={companyLogo} alt="CHILL TECH LTD" /><h1>Supabase is not configured.</h1><p>Add the Vite Supabase environment variables and restart the application.</p><Link to="/">Return to website</Link></div></AdminAuthLayout>;

  if (authMode === 'recovery') return (
    <AdminAuthLayout>
      <form className="admin-auth-card" onSubmit={updatePassword}>
        <img src={companyLogo} alt="CHILL TECH LTD" /><span>Secure recovery</span><h1>Choose a new password</h1><p>Use a strong password that you do not use on another website.</p>
        <label>New password<input type="password" required minLength="8" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} /></label>
        <label>Confirm new password<input type="password" required minLength="8" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></label>
        {authNotice && <p className="admin-success">{authNotice}</p>}
        {authError && <p className="admin-error">{authError}</p>}
        <button className="button button-primary" type="submit" disabled={authSubmitting}>{authSubmitting ? 'Updating…' : 'Update password'}</button>
      </form>
    </AdminAuthLayout>
  );

  if (!session && authMode === 'forgot') return (
    <AdminAuthLayout>
      <form className="admin-auth-card" onSubmit={requestPasswordReset}>
        <img src={companyLogo} alt="CHILL TECH LTD" /><span>Account recovery</span><h1>Forgot password?</h1><p>Enter the administrator email and we will send a secure recovery link.</p>
        <label>Email<input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        {authNotice && <p className="admin-success">{authNotice}</p>}
        {authError && <p className="admin-error">{authError}</p>}
        <button className="button button-primary" type="submit" disabled={authSubmitting}>{authSubmitting ? 'Sending…' : 'Send reset link'}</button>
        <small className="admin-recovery-note">Request one link only. If you already requested one, check your inbox and spam folder before trying again.</small>
        <button className="admin-link-button" type="button" onClick={() => { setAuthMode('login'); setAuthError(''); setAuthNotice(''); window.history.replaceState({}, document.title, '/admin'); }}><FiArrowLeft /> Back to admin login</button>
      </form>
    </AdminAuthLayout>
  );

  if (!session) return (
    <AdminAuthLayout>
      <form className="admin-auth-card" onSubmit={login}>
        <img src={companyLogo} alt="CHILL TECH LTD" /><span>Secure administration</span><h1>Admin login</h1>
        <label>Email<input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <div className="admin-password-field"><div><label htmlFor="admin-password">Password</label><button type="button" onClick={() => { setAuthMode('forgot'); setAuthError(''); setAuthNotice(''); window.history.replaceState({}, document.title, '/admin?mode=forgot'); }}>Forgot password?</button></div><div className="admin-password-input"><input id="admin-password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /><button className="admin-password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <FiEyeOff /> : <FiEye />}<span>{showPassword ? 'Hide' : 'Show'}</span></button></div></div>
        <label className="admin-remember-option"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} /><span>Remember me on this device</span></label>
        {authNotice && <p className="admin-success">{authNotice}</p>}
        {authError && <p className="admin-error">{authError}</p>}
        <button className="button button-primary" type="submit" disabled={authSubmitting}>{authSubmitting ? 'Signing in…' : 'Sign in'}</button>
        <div className="admin-auth-actions"><Link to="/"><FiArrowLeft /> Return to company website</Link><span><FiLock /> Protected access</span></div>
      </form>
    </AdminAuthLayout>
  );

  if (!isAdmin) return <AdminAuthLayout><div className="admin-auth-card"><h1>Access denied.</h1><p>This Supabase account does not have the required administrator role.</p><button className="button button-primary" type="button" onClick={logout}>Sign out</button></div></AdminAuthLayout>;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" to="/"><img src={companyLogo} alt="" /><span><strong>CHILL TECH LTD</strong><small>Administration</small></span></Link>
        <nav aria-label="Admin sections">{['overview', 'enquiries', 'reviews', 'invoices', 'projects'].map((tab) => <button key={tab} type="button" className={activeTab === tab ? 'active' : ''} aria-current={activeTab === tab ? 'page' : undefined} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav>
        <button className="admin-logout" type="button" onClick={logout}><FiLogOut /> Sign out</button>
      </aside>
      <main className="admin-main">
        <header><div><span>Private workspace</span><h1>{activeTab}</h1></div><button type="button" onClick={loadRecords} disabled={loading}><FiRefreshCw /> {loading ? 'Refreshing…' : 'Refresh data'}</button></header>
        {notice && <div className="admin-notice">{notice}</div>}

        {activeTab === 'overview' && <section className="admin-stat-grid">{stats.map(([label, value, Icon]) => <article key={label}><Icon /><strong>{value}</strong><span>{label}</span></article>)}</section>}

        {activeTab === 'enquiries' && <section className="admin-table-wrap"><table><thead><tr><th>Contact</th><th>Service</th><th>Message</th><th>Status</th><th>Date</th><th /></tr></thead><tbody>{records.enquiries.map((item) => <tr key={item.id}><td data-label="Contact"><strong>{item.full_name}</strong><small>{item.email}<br />{item.phone}</small></td><td data-label="Service">{item.service}</td><td className="admin-message-cell" data-label="Message">{item.message}</td><td data-label="Status"><select value={item.status} onChange={(event) => updateRecord('enquiries', item.id, { status: event.target.value })}><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option><option value="spam">Spam</option></select></td><td data-label="Date">{formatDate(item.created_at)}</td><td data-label="Actions"><button aria-label={`Delete enquiry from ${item.full_name}`} onClick={() => deleteRecord('enquiries', item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></section>}

        {activeTab === 'reviews' && <section className="admin-table-wrap"><table><thead><tr><th>Client</th><th>Review</th><th>Rating</th><th>Status</th><th>Date</th><th /></tr></thead><tbody>{records.reviews.map((item) => <tr key={item.id}><td data-label="Client"><strong>{item.name}</strong><small>{item.company}<br />{item.email}</small></td><td className="admin-message-cell" data-label="Review">{item.review}<small>{item.project}</small></td><td data-label="Rating">{item.rating}/5</td><td data-label="Status"><select value={item.status} onChange={(event) => updateRecord('reviews', item.id, { status: event.target.value })}><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></td><td data-label="Date">{formatDate(item.created_at)}</td><td data-label="Actions"><button aria-label={`Delete review from ${item.name}`} onClick={() => deleteRecord('reviews', item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></section>}

        {activeTab === 'invoices' && <section className="admin-table-wrap"><table><thead><tr><th>Invoice</th><th>Client</th><th>Total</th><th>Due</th><th>Status</th><th /></tr></thead><tbody>{records.invoices.map((item) => <tr key={item.id}><td data-label="Invoice"><strong>{item.invoice_number}</strong><small>{formatDate(item.created_at)}</small></td><td data-label="Client">{item.client_company || item.client_name}<small>{item.client_email}</small></td><td data-label="Total">{item.currency} {Number(item.total).toLocaleString()}</td><td data-label="Due">{item.due_date || 'On receipt'}</td><td data-label="Status"><select value={item.status} onChange={(event) => updateRecord('invoices', item.id, { status: event.target.value })}><option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option><option value="cancelled">Cancelled</option></select></td><td data-label="Actions"><button aria-label={`Delete invoice ${item.invoice_number}`} onClick={() => deleteRecord('invoices', item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></section>}

        {activeTab === 'projects' && <section className="admin-projects"><form onSubmit={addProject}><h2><FiPlus /> Add project</h2><div className="form-pair"><label>Title<input required value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} /></label><label>Slug<input value={projectForm.slug} onChange={(event) => setProjectForm({ ...projectForm, slug: event.target.value })} placeholder="Generated from title" /></label></div><label>Description<textarea value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} /></label><div className="form-pair"><label>Category<input value={projectForm.category} onChange={(event) => setProjectForm({ ...projectForm, category: event.target.value })} /></label><label>Technologies<input value={projectForm.technologies} onChange={(event) => setProjectForm({ ...projectForm, technologies: event.target.value })} placeholder="React, CSS, Vercel" /></label></div><label>Live URL<input type="url" value={projectForm.live_url} onChange={(event) => setProjectForm({ ...projectForm, live_url: event.target.value })} /></label><label>Image URL<input value={projectForm.image_url} onChange={(event) => setProjectForm({ ...projectForm, image_url: event.target.value })} /></label><div className="admin-checks"><label><input type="checkbox" checked={projectForm.is_featured} onChange={(event) => setProjectForm({ ...projectForm, is_featured: event.target.checked })} /> Featured</label><label><input type="checkbox" checked={projectForm.is_published} onChange={(event) => setProjectForm({ ...projectForm, is_published: event.target.checked })} /> Published</label></div><button className="button button-primary" type="submit">Add project</button></form><div className="admin-project-list">{records.projects.map((item) => <article key={item.id}><div><strong>{item.title}</strong><span>{item.category}</span><small>{item.live_url}</small></div><label><input type="checkbox" checked={item.is_published} onChange={(event) => updateRecord('projects', item.id, { is_published: event.target.checked })} /> Published</label><button onClick={() => deleteRecord('projects', item.id)}><FiTrash2 /></button></article>)}</div></section>}
      </main>
    </div>
  );
}
