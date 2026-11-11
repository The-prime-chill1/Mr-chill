import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiFileText, FiInbox, FiLogOut, FiPlus, FiRefreshCw, FiStar, FiTrash2 } from 'react-icons/fi';
import companyLogo from '../assets/chill-tech-logo.jpeg';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const emptyProject = { title: '', slug: '', description: '', category: '', technologies: '', live_url: '', image_url: '', is_featured: false, is_published: false };

const formatDate = (value) => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
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
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
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
    if (!supabase) return setAuthError('Supabase is not configured.');
    setAuthSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setAuthSubmitting(false);
  };

  const logout = async () => {
    await supabase?.auth.signOut();
    setPassword('');
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

  if (!isSupabaseConfigured) return <div className="admin-auth-page"><div className="admin-auth-card"><img src={companyLogo} alt="CHILL TECH LTD" /><h1>Supabase is not configured.</h1><p>Add the Vite Supabase environment variables and restart the application.</p><Link to="/">Return to website</Link></div></div>;

  if (!session) return (
    <div className="admin-auth-page">
      <form className="admin-auth-card" onSubmit={login}>
        <img src={companyLogo} alt="CHILL TECH LTD" /><span>Secure administration</span><h1>Admin login</h1><p>Sign in with the administrator account configured in Supabase Authentication.</p>
        <label>Email<input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label>Password<input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {authError && <p className="admin-error">{authError}</p>}
        <button className="button button-primary" type="submit" disabled={authSubmitting}>{authSubmitting ? 'Signing in…' : 'Sign in'}</button>
        <Link to="/"><FiArrowLeft /> Return to company website</Link>
      </form>
    </div>
  );

  if (!isAdmin) return <div className="admin-auth-page"><div className="admin-auth-card"><h1>Access denied.</h1><p>This Supabase account does not have the required administrator role.</p><button className="button button-primary" type="button" onClick={logout}>Sign out</button></div></div>;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" to="/"><img src={companyLogo} alt="" /><span><strong>CHILL TECH LTD</strong><small>Administration</small></span></Link>
        <nav>{['overview', 'enquiries', 'reviews', 'invoices', 'projects'].map((tab) => <button key={tab} type="button" className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav>
        <button className="admin-logout" type="button" onClick={logout}><FiLogOut /> Sign out</button>
      </aside>
      <main className="admin-main">
        <header><div><span>Private workspace</span><h1>{activeTab}</h1></div><button type="button" onClick={loadRecords} disabled={loading}><FiRefreshCw /> {loading ? 'Refreshing…' : 'Refresh data'}</button></header>
        {notice && <div className="admin-notice">{notice}</div>}

        {activeTab === 'overview' && <section className="admin-stat-grid">{stats.map(([label, value, Icon]) => <article key={label}><Icon /><strong>{value}</strong><span>{label}</span></article>)}</section>}

        {activeTab === 'enquiries' && <section className="admin-table-wrap"><table><thead><tr><th>Contact</th><th>Service</th><th>Message</th><th>Status</th><th>Date</th><th /></tr></thead><tbody>{records.enquiries.map((item) => <tr key={item.id}><td><strong>{item.full_name}</strong><small>{item.email}<br />{item.phone}</small></td><td>{item.service}</td><td className="admin-message-cell">{item.message}</td><td><select value={item.status} onChange={(event) => updateRecord('enquiries', item.id, { status: event.target.value })}><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option><option value="spam">Spam</option></select></td><td>{formatDate(item.created_at)}</td><td><button onClick={() => deleteRecord('enquiries', item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></section>}

        {activeTab === 'reviews' && <section className="admin-table-wrap"><table><thead><tr><th>Client</th><th>Review</th><th>Rating</th><th>Status</th><th>Date</th><th /></tr></thead><tbody>{records.reviews.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small>{item.company}<br />{item.email}</small></td><td className="admin-message-cell">{item.review}<small>{item.project}</small></td><td>{item.rating}/5</td><td><select value={item.status} onChange={(event) => updateRecord('reviews', item.id, { status: event.target.value })}><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></td><td>{formatDate(item.created_at)}</td><td><button onClick={() => deleteRecord('reviews', item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></section>}

        {activeTab === 'invoices' && <section className="admin-table-wrap"><table><thead><tr><th>Invoice</th><th>Client</th><th>Total</th><th>Due</th><th>Status</th><th /></tr></thead><tbody>{records.invoices.map((item) => <tr key={item.id}><td><strong>{item.invoice_number}</strong><small>{formatDate(item.created_at)}</small></td><td>{item.client_company || item.client_name}<small>{item.client_email}</small></td><td>{item.currency} {Number(item.total).toLocaleString()}</td><td>{item.due_date || 'On receipt'}</td><td><select value={item.status} onChange={(event) => updateRecord('invoices', item.id, { status: event.target.value })}><option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option><option value="cancelled">Cancelled</option></select></td><td><button onClick={() => deleteRecord('invoices', item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></section>}

        {activeTab === 'projects' && <section className="admin-projects"><form onSubmit={addProject}><h2><FiPlus /> Add project</h2><div className="form-pair"><label>Title<input required value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} /></label><label>Slug<input value={projectForm.slug} onChange={(event) => setProjectForm({ ...projectForm, slug: event.target.value })} placeholder="Generated from title" /></label></div><label>Description<textarea value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} /></label><div className="form-pair"><label>Category<input value={projectForm.category} onChange={(event) => setProjectForm({ ...projectForm, category: event.target.value })} /></label><label>Technologies<input value={projectForm.technologies} onChange={(event) => setProjectForm({ ...projectForm, technologies: event.target.value })} placeholder="React, CSS, Vercel" /></label></div><label>Live URL<input type="url" value={projectForm.live_url} onChange={(event) => setProjectForm({ ...projectForm, live_url: event.target.value })} /></label><label>Image URL<input value={projectForm.image_url} onChange={(event) => setProjectForm({ ...projectForm, image_url: event.target.value })} /></label><div className="admin-checks"><label><input type="checkbox" checked={projectForm.is_featured} onChange={(event) => setProjectForm({ ...projectForm, is_featured: event.target.checked })} /> Featured</label><label><input type="checkbox" checked={projectForm.is_published} onChange={(event) => setProjectForm({ ...projectForm, is_published: event.target.checked })} /> Published</label></div><button className="button button-primary" type="submit">Add project</button></form><div className="admin-project-list">{records.projects.map((item) => <article key={item.id}><div><strong>{item.title}</strong><span>{item.category}</span><small>{item.live_url}</small></div><label><input type="checkbox" checked={item.is_published} onChange={(event) => updateRecord('projects', item.id, { is_published: event.target.checked })} /> Published</label><button onClick={() => deleteRecord('projects', item.id)}><FiTrash2 /></button></article>)}</div></section>}
      </main>
    </div>
  );
}
