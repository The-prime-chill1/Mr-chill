import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './company/SiteLayout';
import AdminDashboard from './company/AdminDashboard';
import {
  AboutCompanyPage,
  CEOPortfolioPage,
  CompanyContactPage,
  CompanyFAQPage,
  CompanyPrivacyPage,
  CompanyReviewsPage,
  HomePage,
  InvoiceGeneratorPage,
  NotFoundPage,
  ProjectDetailPage,
  ProjectsPage,
  ServicesPage,
  SolutionsPage,
} from './company/pages';
import CVPage from './components/CVPage';
import QuotePage from './components/QuotePage';
import './company/company.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutCompanyPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="portfolio" element={<CEOPortfolioPage />} />
          <Route path="contact" element={<CompanyContactPage />} />
          <Route path="faq" element={<CompanyFAQPage />} />
          <Route path="privacy" element={<CompanyPrivacyPage />} />
          <Route path="reviews" element={<CompanyReviewsPage />} />
          <Route path="invoice" element={<InvoiceGeneratorPage />} />
          <Route path="work-with-me" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="cv" element={<CVPage />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="quote" element={<QuotePage />} />
      </Routes>
    </BrowserRouter>
  );
}
