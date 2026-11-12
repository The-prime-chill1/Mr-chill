import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiBell, FiBookOpen, FiBriefcase, FiCheckCircle, FiChevronRight, FiEdit3, FiEye, FiEyeOff, FiFileText, FiHome, FiInbox, FiKey, FiLock, FiLogOut, FiPlus, FiRefreshCw, FiShield, FiStar, FiTrash2, FiX } from 'react-icons/fi';
import companyLogo from '../assets/chill-tech-logo.jpeg';
import { getAdminAuthPersistence, isSupabaseConfigured, setAdminAuthPersistence, supabase } from '../lib/supabase';

const emptyProject = { title: '', slug: '', description: '', category: '', technologies: '', live_url: '', image_url: '', is_featured: false, is_published: false };
const emptyNews = { title: '', slug: '', excerpt: '', content: '', category: 'Company news', cover_image_url: '', author_name: 'CHILL TECH LTD', is_featured: false, is_published: false, published_at: null };
const rememberedAdminEmailKey = 'chill-tech-admin-email';
const getPasswordRecoveryRedirect = () => import.meta.env.PROD
  ? 'https://www.chilltechltd.com/admin'
  : `${window.location.origin}/admin`;

const getRememberedAdminEmail = () => {
  try {
    return window.localStorage.getItem(rememberedAdminEmailKey) || '';
  } catch {
    return '';
  }
};

const formatDate = (value) => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
const formatDashboardDate = () => new Intl.DateTimeFormat('en-NG', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function AdminAuthLayout({ children }) {
  return (
    <div className="admin-auth-page">
      <aside className="admin-auth-showcase">
        <Link className="admin-auth-brand" to="/"><img src={companyLogo} alt="CHILL TECH LTD" /><span><strong>CHILL TECH LTD</strong><small>Secure administration</small></span></Link>
        <div className="admin-auth-showcase-copy"><span><FiShield /> Private company workspace</span><h2>Manage the work behind the website.</h2><p>Review enquiries, approve client feedback, manage invoices, and publish company projects and news from one protected dashboard.</p></div>
        <div className="admin-auth-trust"><span><FiLock /> Supabase authentication</span><span><FiCheckCircle /> Role-protected access</span><span><FiKey /> Secure password recovery</span></div>
        <small>CHILL TECH LTD · Innovate. Build. Empower.</small>
      </aside>
      <section className="admin-auth-form-panel">{children}</section>
    </div>
  );
}

function AdminEmptyState({ icon: Icon, title, message }) {
  return (
    <section className="admin-empty-state">
      <Icon />
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState(() => {
    const requestedMode = new URLSearchParams(window.location.search).get('mode');
    return ['forgot', 'recovery'].includes(requestedMode) ? requestedMode : 'login';
  });
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
  const [records, setRecords] = useState({ enquiries: [], reviews: [], invoices: [], projects: [], news: [] });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [newsForm, setNewsForm] = useState(emptyNews);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isAdmin = session?.user?.app_metadata?.role === 'admin';

  useEffect(() => {
    document.title = 'Admin Dashboard | CHILL TECH LTD';
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const recoveryLink = hashParams.get('type') === 'recovery';
    const redirectError = hashParams.get('error_description');
    if (redirectError) setAuthError(redirectError);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (recoveryLink && data.session) {
        setAuthMode('recovery');
        setAuthNotice('Your recovery link is verified. Choose a new password.');
      }
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      if (event === 'PASSWORD_RECOVERY') {
        setAuthMode('recovery');
        setAuthError('');
        setAuthNotice('Your recovery link is verified. Choose a new password.');
        window.history.replaceState({}, document.title, '/admin?mode=recovery');
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const loadRecords = useCallback(async () => {
    if (!supabase || !isAdmin) return;
    setLoading(true);
    setNotice('');
    const sources = [
      { key: 'enquiries', table: 'enquiries' },
      { key: 'reviews', table: 'reviews' },
      { key: 'invoices', table: 'invoices' },
      { key: 'projects', table: 'projects' },
      { key: 'news', table: 'news_posts' },
    ];
    const results = await Promise.all(sources.map(({ table }) => supabase.from(table).select('*').order('created_at', { ascending: false })));
    const firstError = results.find((result) => result.error)?.error;
    if (firstError) setNotice(firstError.message);
    setRecords(Object.fromEntries(sources.map(({ key }, index) => [key, results[index].data || []])));
    setLoading(false);
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) loadRecords();
  }, [isAdmin, loadRecords]);

  const dashboardCounts = useMemo(() => ({
    enquiries: records.enquiries.filter((item) => item.status === 'new').length,
    reviews: records.reviews.filter((item) => item.status === 'pending').length,
    invoices: records.invoices.filter((item) => !['paid', 'cancelled'].includes(item.status)).length,
    projects: records.projects.filter((item) => item.is_published).length,
    newsDrafts: records.news.filter((item) => !item.is_published).length,
  }), [records]);

  const stats = useMemo(() => [
    { id: 'enquiries', label: 'New enquiries', value: dashboardCounts.enquiries, hint: 'Waiting for your response', Icon: FiInbox, tone: 'blue' },
    { id: 'reviews', label: 'Pending reviews', value: dashboardCounts.reviews, hint: 'Waiting for approval', Icon: FiStar, tone: 'violet' },
    { id: 'invoices', label: 'Open invoices', value: dashboardCounts.invoices, hint: 'Draft, sent or overdue', Icon: FiFileText, tone: 'amber' },
    { id: 'projects', label: 'Live projects', value: dashboardCounts.projects, hint: 'Published on the website', Icon: FiBriefcase, tone: 'green' },
  ], [dashboardCounts]);

  const adminTabs = useMemo(() => [
    { id: 'overview', label: 'Overview', mobileLabel: 'Home', count: 0, Icon: FiHome, description: 'A complete view of your workspace' },
    { id: 'enquiries', label: 'Enquiries', mobileLabel: 'Enquiries', count: dashboardCounts.enquiries, Icon: FiInbox, description: 'Read and manage client enquiries' },
    { id: 'reviews', label: 'Reviews', mobileLabel: 'Reviews', count: dashboardCounts.reviews, Icon: FiStar, description: 'Approve and manage client feedback' },
    { id: 'invoices', label: 'Invoices', mobileLabel: 'Invoices', count: dashboardCounts.invoices, Icon: FiFileText, description: 'Track saved invoices and payment status' },
    { id: 'projects', label: 'Projects', mobileLabel: 'Projects', count: 0, Icon: FiBriefcase, description: 'Create and publish portfolio projects' },
    { id: 'news', label: 'News', mobileLabel: 'News', count: dashboardCounts.newsDrafts, Icon: FiBookOpen, description: 'Write and publish company news' },
  ], [dashboardCounts]);

  const notificationItems = useMemo(() => [
    { id: 'enquiries', title: 'New client enquiries', message: `${dashboardCounts.enquiries} ${dashboardCounts.enquiries === 1 ? 'enquiry needs' : 'enquiries need'} a response`, count: dashboardCounts.enquiries, Icon: FiInbox },
    { id: 'reviews', title: 'Reviews to approve', message: `${dashboardCounts.reviews} ${dashboardCounts.reviews === 1 ? 'review is' : 'reviews are'} waiting for approval`, count: dashboardCounts.reviews, Icon: FiStar },
    { id: 'invoices', title: 'Open invoices', message: `${dashboardCounts.invoices} ${dashboardCounts.invoices === 1 ? 'invoice is' : 'invoices are'} still open`, count: dashboardCounts.invoices, Icon: FiFileText },
  ].filter((item) => item.count > 0), [dashboardCounts]);

  const notificationCount = notificationItems.reduce((total, item) => total + item.count, 0);
  const activeTabDetails = adminTabs.find((tab) => tab.id === activeTab) || adminTabs[0];
  const adminDisplayName = session?.user?.user_metadata?.full_name || 'Administrator';
  const adminInitial = adminDisplayName.charAt(0).toUpperCase();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  const selectAdminTab = (tabId) => {
    setActiveTab(tabId);
    setNotificationsOpen(false);
    if (window.matchMedia('(max-width: 760px)').matches) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      redirectTo: getPasswordRecoveryRedirect(),
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

  const editNewsPost = (item) => {
    setEditingNewsId(item.id);
    setNewsForm({
      title: item.title || '',
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      category: item.category || 'Company news',
      cover_image_url: item.cover_image_url || '',
      author_name: item.author_name || 'CHILL TECH LTD',
      is_featured: Boolean(item.is_featured),
      is_published: Boolean(item.is_published),
      published_at: item.published_at || null,
    });
    window.requestAnimationFrame(() => document.querySelector('.admin-news-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const cancelNewsEdit = () => {
    setEditingNewsId(null);
    setNewsForm(emptyNews);
  };

  const saveNewsPost = async (event) => {
    event.preventDefault();
    const now = new Date().toISOString();
    const payload = {
      title: newsForm.title.trim(),
      slug: newsForm.slug.trim() || slugify(newsForm.title),
      excerpt: newsForm.excerpt.trim(),
      content: newsForm.content.trim(),
      category: newsForm.category.trim() || 'Company news',
      cover_image_url: newsForm.cover_image_url.trim() || null,
      author_name: newsForm.author_name.trim() || 'CHILL TECH LTD',
      is_featured: newsForm.is_featured,
      is_published: newsForm.is_published,
      published_at: newsForm.is_published ? (newsForm.published_at || now) : newsForm.published_at,
      updated_at: now,
    };
    setNotice(editingNewsId ? 'Updating news post…' : 'Creating news post…');
    const query = editingNewsId
      ? supabase.from('news_posts').update(payload).eq('id', editingNewsId)
      : supabase.from('news_posts').insert(payload);
    const { error } = await query;
    if (error) {
      setNotice(error.message);
      return;
    }
    setNotice(editingNewsId ? 'News post updated successfully.' : 'News post created successfully.');
    setEditingNewsId(null);
    setNewsForm(emptyNews);
    loadRecords();
  };

  const toggleNewsPublication = (item, isPublished) => updateRecord('news_posts', item.id, {
    is_published: isPublished,
    published_at: isPublished ? (item.published_at || new Date().toISOString()) : item.published_at,
    updated_at: new Date().toISOString(),
  });

  if (authLoading) return <div className="admin-loading">Loading secure dashboard…</div>;

  if (!isSupabaseConfigured) return <AdminAuthLayout><div className="admin-auth-card"><img src={companyLogo} alt="CHILL TECH LTD" /><h1>Supabase is not configured.</h1><p>Add the Vite Supabase environment variables and restart the application.</p><Link to="/">Return to website</Link></div></AdminAuthLayout>;

  if (authMode === 'recovery' && session) return (
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
        <div className="admin-sidebar-header">
          <Link className="admin-brand" to="/">
            <img src={companyLogo} alt="CHILL TECH LTD" />
            <span><strong>CHILL TECH LTD</strong><small>Admin workspace</small></span>
          </Link>
          <span className="admin-workspace-chip"><FiShield /> Private workspace</span>
        </div>
        <nav aria-label="Admin sections">
          {adminTabs.map(({ id, label, count, Icon }) => (
            <button key={id} type="button" className={activeTab === id ? 'active' : ''} aria-current={activeTab === id ? 'page' : undefined} onClick={() => selectAdminTab(id)}>
              <span><Icon /> {label}</span>
              {count > 0 && <strong aria-label={`${count} requiring attention`}>{count}</strong>}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-account">
          <span className="admin-avatar" aria-hidden="true">{adminInitial}</span>
          <span><strong>{adminDisplayName}</strong><small>{session.user.email}</small></span>
          <button type="button" onClick={logout} aria-label="Sign out" title="Sign out"><FiLogOut /></button>
        </div>
      </aside>
      <section className="admin-workspace">
        <header className="admin-topbar">
          <Link className="admin-mobile-brand" to="/">
            <img src={companyLogo} alt="CHILL TECH LTD" />
            <span><strong>CHILL TECH</strong><small>Admin</small></span>
          </Link>
          <div className="admin-topbar-title">
            <span>CHILL TECH LTD / Admin</span>
            <h1>{activeTabDetails.label}</h1>
            <p>{activeTabDetails.description}</p>
          </div>
          <div className="admin-topbar-actions">
            <button className="admin-icon-button admin-refresh-button" type="button" onClick={loadRecords} disabled={loading} aria-label="Refresh dashboard data">
              <FiRefreshCw className={loading ? 'is-spinning' : ''} /><span>{loading ? 'Refreshing' : 'Refresh'}</span>
            </button>
            <div className="admin-notification-wrap">
              <button className={`admin-icon-button admin-notification-button ${notificationsOpen ? 'active' : ''}`} type="button" aria-label={`${notificationCount} notifications`} aria-expanded={notificationsOpen} aria-haspopup="dialog" onClick={() => setNotificationsOpen((open) => !open)}>
                <FiBell />
                {notificationCount > 0 && <strong>{notificationCount > 9 ? '9+' : notificationCount}</strong>}
              </button>
              {notificationsOpen && (
                <div className="admin-notification-popover" role="dialog" aria-label="Dashboard notifications">
                  <header>
                    <div><span>Notifications</span><strong>{notificationCount > 0 ? `${notificationCount} items need attention` : 'You are all caught up'}</strong></div>
                    <button type="button" onClick={() => setNotificationsOpen(false)} aria-label="Close notifications"><FiX /></button>
                  </header>
                  <div className="admin-notification-list">
                    {notificationItems.length > 0 ? notificationItems.map(({ id, title, message, count, Icon }) => (
                      <button key={id} type="button" onClick={() => selectAdminTab(id)}>
                        <span className={`admin-notification-icon ${id}`}><Icon /></span>
                        <span><strong>{title}</strong><small>{message}</small></span>
                        <em>{count}</em>
                      </button>
                    )) : <div className="admin-notification-empty"><FiCheckCircle /><strong>Everything is up to date</strong><span>There is nothing requiring your attention right now.</span></div>}
                  </div>
                  <button className="admin-notification-refresh" type="button" onClick={loadRecords}><FiRefreshCw /> Refresh notifications</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {notificationsOpen && <button className="admin-notification-scrim" type="button" aria-label="Close notifications" onClick={() => setNotificationsOpen(false)} />}

        <main className="admin-main">
          <div className="admin-mobile-section-heading"><span>{activeTabDetails.description}</span><h1>{activeTabDetails.label}</h1></div>
          {notice && <div className="admin-notice">{notice}</div>}

          {activeTab === 'overview' && (
            <div className="admin-overview">
              <section className="admin-overview-hero">
                <div>
                  <span>{formatDashboardDate()}</span>
                  <h2>{greeting}, {adminDisplayName}.</h2>
                  <p>Here is what is happening across your website today.</p>
                </div>
                <div className="admin-attention-summary">
                  <span><FiBell /></span>
                  <div><strong>{notificationCount}</strong><small>{notificationCount === 1 ? 'item needs attention' : 'items need attention'}</small></div>
                </div>
              </section>

              <section className="admin-stat-grid" aria-label="Dashboard statistics">
                {stats.map(({ id, label, value, hint, Icon, tone }) => (
                  <button className={`admin-stat-card ${tone}`} key={id} type="button" onClick={() => selectAdminTab(id)}>
                    <span className="admin-stat-icon"><Icon /></span>
                    <span className="admin-stat-arrow"><FiChevronRight /></span>
                    <strong>{value}</strong>
                    <span className="admin-stat-label">{label}</span>
                    <small>{hint}</small>
                  </button>
                ))}
              </section>

              <div className="admin-overview-panels">
                <section className="admin-overview-panel admin-attention-panel">
                  <header><div><span>Action centre</span><h2>Needs attention</h2></div><strong>{notificationCount}</strong></header>
                  {notificationItems.length > 0 ? (
                    <div className="admin-attention-list">
                      {notificationItems.map(({ id, title, message, count, Icon }) => (
                        <button key={id} type="button" onClick={() => selectAdminTab(id)}>
                          <span className={`admin-notification-icon ${id}`}><Icon /></span>
                          <span><strong>{title}</strong><small>{message}</small></span>
                          <em>{count}</em><FiChevronRight />
                        </button>
                      ))}
                    </div>
                  ) : <div className="admin-overview-empty"><FiCheckCircle /><div><strong>You are all caught up</strong><span>No enquiries, reviews, or invoices currently need attention.</span></div></div>}
                </section>

                <section className="admin-overview-panel admin-shortcuts-panel">
                  <header><div><span>Workspace</span><h2>Quick navigation</h2></div></header>
                  <div className="admin-shortcut-list">
                    {adminTabs.slice(1).map(({ id, label, description, Icon }) => (
                      <button key={id} type="button" onClick={() => selectAdminTab(id)}><Icon /><span><strong>{label}</strong><small>{description}</small></span><FiChevronRight /></button>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

        {activeTab === 'enquiries' && (records.enquiries.length > 0 ? <section className="admin-table-wrap"><table><thead><tr><th>Contact</th><th>Service</th><th>Message</th><th>Status</th><th>Date</th><th /></tr></thead><tbody>{records.enquiries.map((item) => <tr key={item.id}><td data-label="Contact"><strong>{item.full_name}</strong><small>{item.email}<br />{item.phone}</small></td><td data-label="Service">{item.service}</td><td className="admin-message-cell" data-label="Message">{item.message}</td><td data-label="Status"><select value={item.status} onChange={(event) => updateRecord('enquiries', item.id, { status: event.target.value })}><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option><option value="spam">Spam</option></select></td><td data-label="Date">{formatDate(item.created_at)}</td><td data-label="Actions"><button aria-label={`Delete enquiry from ${item.full_name}`} onClick={() => deleteRecord('enquiries', item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></section> : <AdminEmptyState icon={FiInbox} title="No enquiries yet" message="New project enquiries will appear here as soon as they are submitted." />)}

        {activeTab === 'reviews' && (records.reviews.length > 0 ? <section className="admin-table-wrap"><table><thead><tr><th>Client</th><th>Review</th><th>Rating</th><th>Status</th><th>Date</th><th /></tr></thead><tbody>{records.reviews.map((item) => <tr key={item.id}><td data-label="Client"><strong>{item.name}</strong><small>{item.company}<br />{item.email}</small></td><td className="admin-message-cell" data-label="Review">{item.review}<small>{item.project}</small></td><td data-label="Rating">{item.rating}/5</td><td data-label="Status"><select value={item.status} onChange={(event) => updateRecord('reviews', item.id, { status: event.target.value })}><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></td><td data-label="Date">{formatDate(item.created_at)}</td><td data-label="Actions"><button aria-label={`Delete review from ${item.name}`} onClick={() => deleteRecord('reviews', item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></section> : <AdminEmptyState icon={FiStar} title="No reviews submitted yet" message="New client reviews will appear here for approval as soon as they are submitted." />)}

        {activeTab === 'invoices' && (records.invoices.length > 0 ? <section className="admin-table-wrap"><table><thead><tr><th>Invoice</th><th>Client</th><th>Total</th><th>Due</th><th>Status</th><th /></tr></thead><tbody>{records.invoices.map((item) => <tr key={item.id}><td data-label="Invoice"><strong>{item.invoice_number}</strong><small>{item.items?.[0]?.description}<br />{formatDate(item.created_at)}</small></td><td data-label="Client">{item.client_company || item.client_name}<small>{item.client_email}</small></td><td data-label="Total">{item.currency} {Number(item.total).toLocaleString()}</td><td data-label="Due">{item.due_date || 'On receipt'}</td><td data-label="Status"><select value={item.status} onChange={(event) => updateRecord('invoices', item.id, { status: event.target.value })}><option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option><option value="cancelled">Cancelled</option></select></td><td data-label="Actions"><button aria-label={`Delete invoice ${item.invoice_number}`} onClick={() => deleteRecord('invoices', item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></section> : <AdminEmptyState icon={FiFileText} title="No invoices saved yet" message="Draft invoices saved from the invoice generator will appear here." />)}

        {activeTab === 'projects' && <section className="admin-projects"><form onSubmit={addProject}><h2><FiPlus /> Add project</h2><div className="form-pair"><label>Title<input required value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} /></label><label>Slug<input value={projectForm.slug} onChange={(event) => setProjectForm({ ...projectForm, slug: event.target.value })} placeholder="Generated from title" /></label></div><label>Description<textarea value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} /></label><div className="form-pair"><label>Category<input value={projectForm.category} onChange={(event) => setProjectForm({ ...projectForm, category: event.target.value })} /></label><label>Technologies<input value={projectForm.technologies} onChange={(event) => setProjectForm({ ...projectForm, technologies: event.target.value })} placeholder="React, CSS, Vercel" /></label></div><label>Live URL<input type="url" value={projectForm.live_url} onChange={(event) => setProjectForm({ ...projectForm, live_url: event.target.value })} /></label><label>Image URL<input value={projectForm.image_url} onChange={(event) => setProjectForm({ ...projectForm, image_url: event.target.value })} /></label><div className="admin-checks"><label><input type="checkbox" checked={projectForm.is_featured} onChange={(event) => setProjectForm({ ...projectForm, is_featured: event.target.checked })} /> Featured</label><label><input type="checkbox" checked={projectForm.is_published} onChange={(event) => setProjectForm({ ...projectForm, is_published: event.target.checked })} /> Published</label></div><button className="button button-primary" type="submit">Add project</button></form><div className="admin-project-list">{records.projects.map((item) => <article key={item.id}><div><strong>{item.title}</strong><span>{item.category}</span><small>{item.live_url}</small></div><label><input type="checkbox" checked={item.is_published} onChange={(event) => updateRecord('projects', item.id, { is_published: event.target.checked })} /> Published</label><button onClick={() => deleteRecord('projects', item.id)}><FiTrash2 /></button></article>)}</div></section>}
          {activeTab === 'news' && (
            <section className="admin-news">
              <form className="admin-news-form" onSubmit={saveNewsPost}>
                <header><div><span>{editingNewsId ? 'Editing post' : 'New publication'}</span><h2><FiBookOpen /> {editingNewsId ? 'Update news post' : 'Create news post'}</h2></div>{editingNewsId && <button type="button" onClick={cancelNewsEdit}><FiX /> Cancel edit</button>}</header>
                <div className="form-pair"><label>Headline<input required minLength="5" maxLength="180" value={newsForm.title} onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })} placeholder="News article headline" /></label><label>URL slug<input value={newsForm.slug} onChange={(event) => setNewsForm({ ...newsForm, slug: slugify(event.target.value) })} placeholder="Generated from headline" /></label></div>
                <label>Short summary<textarea required minLength="20" maxLength="500" value={newsForm.excerpt} onChange={(event) => setNewsForm({ ...newsForm, excerpt: event.target.value })} placeholder="A concise introduction shown on the News page." /></label>
                <label>Article content<textarea className="admin-news-content" required minLength="50" maxLength="20000" value={newsForm.content} onChange={(event) => setNewsForm({ ...newsForm, content: event.target.value })} placeholder="Write the full story. Separate paragraphs with a blank line." /></label>
                <div className="form-pair"><label>Category<input required value={newsForm.category} onChange={(event) => setNewsForm({ ...newsForm, category: event.target.value })} placeholder="Company news" /></label><label>Author<input required value={newsForm.author_name} onChange={(event) => setNewsForm({ ...newsForm, author_name: event.target.value })} /></label></div>
                <label>Cover image URL<input value={newsForm.cover_image_url} onChange={(event) => setNewsForm({ ...newsForm, cover_image_url: event.target.value })} placeholder="https://… or /image-name.jpg" /></label>
                <div className="admin-checks"><label><input type="checkbox" checked={newsForm.is_featured} onChange={(event) => setNewsForm({ ...newsForm, is_featured: event.target.checked })} /> Feature on News page</label><label><input type="checkbox" checked={newsForm.is_published} onChange={(event) => setNewsForm({ ...newsForm, is_published: event.target.checked })} /> Publish now</label></div>
                <button className="button button-primary" type="submit"><FiCheckCircle /> {editingNewsId ? 'Save changes' : 'Create news post'}</button>
              </form>

              <div className="admin-news-list">
                <header><div><span>Content library</span><h2>News posts</h2></div><strong>{records.news.length}</strong></header>
                {records.news.length > 0 ? records.news.map((item) => (
                  <article key={item.id}>
                    <div className="admin-news-thumbnail">{item.cover_image_url ? <img src={item.cover_image_url} alt="" /> : <FiBookOpen />}</div>
                    <div className="admin-news-copy"><span>{item.category} · {formatDate(item.published_at || item.created_at)}</span><h3>{item.title}</h3><p>{item.excerpt}</p><div><small className={item.is_published ? 'published' : 'draft'}>{item.is_published ? 'Published' : 'Draft'}</small>{item.is_featured && <small>Featured</small>}</div></div>
                    <div className="admin-news-actions">
                      <label><input type="checkbox" checked={item.is_published} onChange={(event) => toggleNewsPublication(item, event.target.checked)} /><span>Published</span></label>
                      <button type="button" onClick={() => editNewsPost(item)}><FiEdit3 /> Edit</button>
                      {item.is_published && <Link to={`/news/${item.slug}`} target="_blank" rel="noreferrer"><FiBookOpen /> View</Link>}
                      <button className="danger" type="button" onClick={() => deleteRecord('news_posts', item.id)}><FiTrash2 /> Delete</button>
                    </div>
                  </article>
                )) : <AdminEmptyState icon={FiBookOpen} title="No news posts yet" message="Create your first company update, announcement, or technology insight using the editor." />}
              </div>
            </section>
          )}
        </main>
      </section>

      <nav className="admin-mobile-nav" aria-label="Mobile admin navigation">
        {adminTabs.map(({ id, mobileLabel, count, Icon }) => (
          <button key={id} type="button" className={activeTab === id ? 'active' : ''} aria-current={activeTab === id ? 'page' : undefined} onClick={() => selectAdminTab(id)}>
            <span><Icon />{count > 0 && <strong>{count > 9 ? '9+' : count}</strong>}</span>
            <small>{mobileLabel}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}
