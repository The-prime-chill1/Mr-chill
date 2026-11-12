import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiCalendar, FiClock, FiFileText, FiTag } from 'react-icons/fi';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { usePageMeta } from './SiteLayout';

const newsDate = (value) => value
  ? new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
  : 'Draft';

const readingTime = (content = '') => Math.max(1, Math.ceil(content.trim().split(/\s+/).filter(Boolean).length / 220));

function NewsArtwork({ post, featured = false }) {
  return (
    <div className={`news-artwork ${featured ? 'featured' : ''}`}>
      {post.cover_image_url ? <img src={post.cover_image_url} alt="" loading="lazy" decoding="async" /> : <div className="news-artwork-placeholder"><FiFileText /><span>CHILL TECH NEWS</span></div>}
      <span className="news-category"><FiTag /> {post.category}</span>
    </div>
  );
}

export function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  usePageMeta('News & Insights', 'Company news, technology insights, project updates, and announcements from CHILL TECH LTD.', '/news');

  useEffect(() => {
    let active = true;
    const loadNews = async () => {
      if (!isSupabaseConfigured || !supabase) {
        if (active) setState({ loading: false, error: 'News is temporarily unavailable.' });
        return;
      }
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (!active) return;
      setPosts(data || []);
      setState({ loading: false, error: error?.message || '' });
    };
    loadNews();
    return () => { active = false; };
  }, []);

  const featuredPost = posts.find((post) => post.is_featured) || posts[0];
  const remainingPosts = useMemo(() => posts.filter((post) => post.id !== featuredPost?.id), [posts, featuredPost]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28 }}>
      <section className="page-hero news-page-hero section-pad">
        <span className="eyebrow eyebrow-light">News & insights</span>
        <h1>Ideas, updates, and progress from CHILL TECH LTD.</h1>
        <p>Read company announcements, technology perspectives, project stories, and practical insights for businesses building in the digital world.</p>
      </section>

      <section className="news-index section-pad">
        {state.loading && <div className="news-status"><span className="news-loader" /><strong>Loading the latest news…</strong></div>}
        {!state.loading && state.error && <div className="news-status error"><FiFileText /><strong>We could not load the news.</strong><span>{state.error}</span></div>}
        {!state.loading && !state.error && !featuredPost && (
          <div className="news-status empty"><FiFileText /><strong>News is coming soon.</strong><span>Company updates and technology insights will appear here after publication.</span><Link className="button button-primary" to="/services">Explore our services</Link></div>
        )}

        {featuredPost && (
          <>
            <Link className="news-featured-card" to={`/news/${featuredPost.slug}`}>
              <NewsArtwork post={featuredPost} featured />
              <div className="news-featured-copy">
                <span>Featured story</span>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div><small><FiCalendar /> {newsDate(featuredPost.published_at)}</small><small><FiClock /> {readingTime(featuredPost.content)} min read</small></div>
                <strong>Read article <FiArrowRight /></strong>
              </div>
            </Link>

            {remainingPosts.length > 0 && (
              <div className="news-grid">
                {remainingPosts.map((post) => (
                  <Link className="news-card" key={post.id} to={`/news/${post.slug}`}>
                    <NewsArtwork post={post} />
                    <div>
                      <span>{newsDate(post.published_at)} · {readingTime(post.content)} min read</span>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <strong>Read more <FiArrowRight /></strong>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </motion.div>
  );
}

export function NewsArticlePage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [state, setState] = useState({ loading: true, error: '' });
  usePageMeta(post?.title || 'News Article', post?.excerpt || 'Read the latest news and insights from CHILL TECH LTD.', `/news/${slug}`);

  useEffect(() => {
    let active = true;
    const loadPost = async () => {
      if (!isSupabaseConfigured || !supabase) {
        if (active) setState({ loading: false, error: 'This article is temporarily unavailable.' });
        return;
      }
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
      if (!active) return;
      setPost(data || null);
      setState({ loading: false, error: error?.message || '' });
    };
    loadPost();
    return () => { active = false; };
  }, [slug]);

  if (state.loading) return <section className="news-article-state section-pad"><span className="news-loader" /><strong>Loading article…</strong></section>;
  if (state.error || !post) return <section className="news-article-state section-pad"><FiFileText /><h1>Article not found.</h1><p>{state.error || 'This story may be unpublished or the link may be incorrect.'}</p><Link className="button button-primary" to="/news"><FiArrowLeft /> Back to News</Link></section>;

  const paragraphs = post.content.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);

  return (
    <motion.article className="news-article" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28 }}>
      <header className="news-article-header section-pad">
        <Link to="/news"><FiArrowLeft /> Back to News</Link>
        <span className="eyebrow eyebrow-light">{post.category}</span>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div><span><FiCalendar /> {newsDate(post.published_at)}</span><span><FiClock /> {readingTime(post.content)} min read</span><span>By {post.author_name}</span></div>
      </header>
      {post.cover_image_url && <div className="news-article-cover section-pad"><img src={post.cover_image_url} alt="" /></div>}
      <div className="news-article-body section-pad">
        <aside><span>Published by</span><strong>{post.author_name}</strong><small>CHILL TECH LTD</small></aside>
        <div>{paragraphs.map((paragraph, index) => <p key={`${post.id}-${index}`}>{paragraph}</p>)}</div>
      </div>
      <footer className="news-article-footer section-pad"><div><span>Have a project in mind?</span><h2>Turn the next idea into something real.</h2></div><Link className="button button-primary" to="/enquiry">Start a project <FiArrowRight /></Link></footer>
    </motion.article>
  );
}
