import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiPrinter, FiDownload, FiMail, FiPhone,
  FiMapPin, FiGlobe, FiLinkedin, FiGithub
} from 'react-icons/fi';
import { profile, experience, education } from '../data';

export default function CVPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/cv/Lamidi_Abdulhameed_Olawale_CV.pdf';
    link.download = 'Lamidi_Abdulhameed_Olawale_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="cv-page-container">
      {/* Top Control Bar (Hidden when printing) */}
      <div className="cv-action-bar no-print">
        <a href="#/" className="cv-back-btn">
          <FiArrowLeft /> Back to Portfolio
        </a>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handlePrint} className="cv-action-btn primary">
            <FiPrinter /> Print / Save PDF
          </button>
          <button onClick={handleDownloadPDF} className="cv-action-btn secondary">
            <FiDownload /> Download PDF
          </button>
        </div>
      </div>

      {/* Main Corporate CV Paper Sheet */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="cv-sheet"
      >
        {/* PAGE 1 */}
        <div className="cv-page-sheet">
          {/* Header Section */}
          <header className="cv-header">
            <h1 className="cv-name">LAMIDI ABDULHAMEED OLAWALE</h1>
            <div className="cv-subtitle">
              ADVANCED DIPLOMA IN SOFTWARE ENGINEERING (ADSE) • WEB DEVELOPER • TECHNOLOGY ENTREPRENEUR
            </div>
            
            <div className="cv-contact-block">
              <div>31 Grace Court, Chois Oasis, Abijo GRA, Ibeju-Lekki, Lagos, Nigeria</div>
              <div>+234 913 763 2195 • chilltech2k26@gmail.com • lamidiabdulhameedolawale@gmail.com</div>
              <div>
                chilltechltd.com • linkedin.com/in/lamidi-abdulhameed-olawale-740985428 • github.com/The-prime-chill1
              </div>
            </div>
          </header>

          {/* PROFESSIONAL SUMMARY */}
          <section className="cv-sec">
            <h2 className="cv-sec-title">PROFESSIONAL SUMMARY</h2>
            <p className="cv-p">
              Advanced Diploma in Software Engineering (ADSE) student at <strong>Aptech Computer Education</strong> with practical experience designing, developing, deploying, and improving modern web applications. Founder of <strong>CHILL TECH LTD</strong>, with hands-on experience delivering digital solutions for businesses across e-commerce, real estate, logistics, education, and business services. Also a <strong>General Manager at CHIL Investment Ltd</strong>, providing real-world experience in operations, stakeholder management, client relations, and leadership. Brings a strong combination of technical problem-solving, business awareness, communication, initiative, and a continuous learning mindset.
            </p>
          </section>

          {/* CORE STRENGTHS */}
          <section className="cv-sec">
            <h2 className="cv-sec-title">CORE STRENGTHS</h2>
            <div className="cv-strengths-box">
              <div className="cv-strengths-col">
                <div>• Software Development</div>
                <div>• Project Delivery</div>
                <div>• Leadership</div>
                <div>• Digital Solutions</div>
              </div>
              <div className="cv-strengths-col">
                <div>• Problem Solving</div>
                <div>• Business Analysis</div>
                <div>• Team Collaboration</div>
                <div>• UI/UX Thinking</div>
              </div>
              <div className="cv-strengths-col">
                <div>• Web Application Development</div>
                <div>• Client Communication</div>
                <div>• Adaptability</div>
                <div>• Continuous Learning</div>
              </div>
            </div>
          </section>

          {/* TECHNICAL SKILLS */}
          <section className="cv-sec">
            <h2 className="cv-sec-title">TECHNICAL SKILLS</h2>
            <table className="cv-table-skills">
              <tbody>
                <tr>
                  <td className="cv-td-label">Frontend</td>
                  <td className="cv-td-val">React.js • JavaScript (ES6+) • HTML5 • CSS3 • Three.js • Responsive Web Development</td>
                </tr>
                <tr>
                  <td className="cv-td-label">Backend</td>
                  <td className="cv-td-val">Node.js • Express.js • REST APIs • Firebase</td>
                </tr>
                <tr>
                  <td className="cv-td-label">Database</td>
                  <td className="cv-td-val">SQL fundamentals • Firebase</td>
                </tr>
                <tr>
                  <td className="cv-td-label">UI/UX</td>
                  <td className="cv-td-val">Figma • Responsive Design • Wireframing • Prototyping</td>
                </tr>
                <tr>
                  <td className="cv-td-label">Tools</td>
                  <td className="cv-td-val">Git • GitHub • VS Code • npm</td>
                </tr>
                <tr>
                  <td className="cv-td-label">Deployment</td>
                  <td className="cv-td-val">Vercel • Netlify</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section className="cv-sec">
            <h2 className="cv-sec-title">PROFESSIONAL EXPERIENCE</h2>
            
            {/* Job 1 */}
            <div className="cv-job-block">
              <div className="cv-job-head">
                <span className="cv-job-title">FOUNDER & WEB DEVELOPER</span>
              </div>
              <div className="cv-job-sub">CHILL TECH LTD | Nigeria | Present</div>
              <ul className="cv-ul">
                <li>Lead the company's digital and technology direction and manage client-facing software projects.</li>
                <li>Design and develop responsive websites and web applications based on business requirements.</li>
                <li>Translate client requirements into practical, user-focused digital solutions.</li>
                <li>Manage projects from consultation and planning through development, testing, deployment, and delivery.</li>
                <li>Build and maintain projects using modern frontend technologies and version-control workflows.</li>
                <li>Deploy and maintain websites using platforms including Vercel and Netlify.</li>
                <li>Develop solutions for e-commerce, real estate, logistics, education, and business use cases.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="cv-job-block" style={{ marginTop: 14 }}>
              <div className="cv-job-head">
                <span className="cv-job-title">GENERAL MANAGER</span>
              </div>
              <div className="cv-job-sub">CHIL INVESTMENT LTD | Nigeria | Present</div>
              <ul className="cv-ul">
                <li>Coordinate day-to-day business operations and support management decision-making.</li>
                <li>Manage relationships with investors, clients, stakeholders, and business partners.</li>
                <li>Support land documentation, property allocation, sales, and estate development activities.</li>
                <li>Contribute to business growth, customer service, property marketing, and operational improvement.</li>
                <li>Coordinate stakeholders and support the effective execution of company initiatives.</li>
              </ul>
            </div>
          </section>

          {/* EDUCATION & QUALIFICATIONS */}
          <section className="cv-sec">
            <h2 className="cv-sec-title">EDUCATION & QUALIFICATIONS</h2>
            <div className="cv-edu-head">
              <span className="cv-edu-title">APTECH COMPUTER EDUCATION</span>
            </div>
            <div className="cv-edu-sub">Advanced Diploma in Software Engineering (ADSE) | Present</div>
            <p className="cv-p" style={{ marginTop: 4 }}>
              Currently pursuing an Advanced Diploma in Software Engineering (ADSE) with practical training in programming, web development, databases, software design, and modern application development.
            </p>
            <p className="cv-p" style={{ marginTop: 4, fontSize: '0.84rem' }}>
              <strong>Relevant Coursework:</strong> Programming Principles & Techniques • Logic Building & C Programming • Modern Website Development • UI/UX Responsive Design • Frontend Development with React • Object-Oriented Programming • Database Management with SQL • Generative AI
            </p>
          </section>

          <footer className="cv-page-footer">
            <span>LAMIDI ABDULHAMEED OLAWALE | CORPORATE SOFTWARE ENGINEERING CV</span>
            <span>Page 1</span>
          </footer>
        </div>

        {/* PAGE BREAK FOR PRINT */}
        <div className="page-break" />

        {/* PAGE 2 */}
        <div className="cv-page-sheet" style={{ marginTop: 32 }}>
          {/* POLICE SECONDARY SCHOOL */}
          <section className="cv-sec">
            <div className="cv-edu-head">
              <span className="cv-edu-title">POLICE SECONDARY SCHOOL, AKURE</span>
            </div>
            <div className="cv-edu-sub">Senior Secondary School Certificate Examination (SSCE)</div>
            <p className="cv-p" style={{ marginTop: 6 }}>
              <strong>Qualification:</strong> SSCE
            </p>
            <p className="cv-p" style={{ marginTop: 4 }}>
              <strong>Leadership Achievement:</strong> Became the first Student Provost in the history of Police Secondary School, Akure, demonstrating leadership, responsibility, discipline, organization, and decision-making.
            </p>
          </section>

          {/* SELECTED SOFTWARE PROJECTS */}
          <section className="cv-sec">
            <h2 className="cv-sec-title">SELECTED SOFTWARE PROJECTS</h2>
            <table className="cv-table-projects">
              <thead>
                <tr>
                  <th style={{ width: '26%' }}>PROJECT</th>
                  <th style={{ width: '50%' }}>DESCRIPTION</th>
                  <th style={{ width: '24%' }}>TECHNOLOGY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>CHIL Investment Ltd</strong></td>
                  <td>Real estate investment platform with property showcases and investment tools.</td>
                  <td>React • Three.js • CSS</td>
                </tr>
                <tr>
                  <td><strong>Queen Smile</strong></td>
                  <td>E-commerce platform with product presentation and WhatsApp ordering.</td>
                  <td>React • CSS • Vercel</td>
                </tr>
                <tr>
                  <td><strong>Dave Cargo</strong></td>
                  <td>Logistics platform connecting the UK and Nigeria with cargo tracking.</td>
                  <td>React • CSS • Netlify</td>
                </tr>
                <tr>
                  <td><strong>Royal Furniture</strong></td>
                  <td>Furniture brand website with gallery and custom order functionality.</td>
                  <td>React • CSS • Vercel</td>
                </tr>
                <tr>
                  <td><strong>LEGACY.streetwear</strong></td>
                  <td>Fashion e-commerce platform with product catalogue and brand storytelling.</td>
                  <td>React • CSS • Vercel</td>
                </tr>
                <tr>
                  <td><strong>Mr. Chills Expense Tracker</strong></td>
                  <td>Expense management application with budget tracking and analytics.</td>
                  <td>React • Netlify</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* LEADERSHIP & EXPERIENCE HIGHLIGHTS */}
          <section className="cv-sec">
            <h2 className="cv-sec-title">LEADERSHIP & PROFESSIONAL EXPERIENCE HIGHLIGHTS</h2>
            <ul className="cv-ul">
              <li>Founded and lead CHILL TECH LTD, combining technology development with business-focused digital solutions.</li>
              <li>Delivered 7+ web projects across different industries.</li>
              <li>Manage professional responsibilities alongside ongoing Software Engineering studies.</li>
              <li>Selected as the first Student Provost in the history of Police Secondary School, Akure.</li>
              <li>Experience working directly with clients, stakeholders, investors, and business partners.</li>
            </ul>
          </section>

          {/* ADDITIONAL INFORMATION */}
          <section className="cv-sec">
            <h2 className="cv-sec-title">ADDITIONAL INFORMATION</h2>
            <table className="cv-table-skills">
              <tbody>
                <tr>
                  <td className="cv-td-label" style={{ width: '18%' }}>Languages</td>
                  <td className="cv-td-val">English — Professional working proficiency • Yoruba — Native</td>
                </tr>
                <tr>
                  <td className="cv-td-label">Availability</td>
                  <td className="cv-td-val">Open to software engineering, technology, graduate trainee, internship, and related opportunities</td>
                </tr>
                <tr>
                  <td className="cv-td-label">References</td>
                  <td className="cv-td-val">Available upon request</td>
                </tr>
              </tbody>
            </table>
          </section>

          <footer className="cv-page-footer">
            <span>LAMIDI ABDULHAMEED OLAWALE | CORPORATE SOFTWARE ENGINEERING CV</span>
            <span>Page 2</span>
          </footer>
        </div>
      </motion.main>

      <style>{`
        .cv-page-container {
          min-height: 100vh;
          background: #090d16;
          color: #1e293b;
          padding: 24px 16px 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, Helvetica, sans-serif;
        }
        .cv-action-bar {
          width: 100%;
          max-width: 820px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cv-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #00c2ff;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .cv-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          border: none;
        }
        .cv-action-btn.primary {
          background: linear-gradient(135deg, #00c2ff, #0284c7);
          color: #fff;
        }
        .cv-action-btn.secondary {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
        }

        /* 2-PAGE PAPER SHEET STYLING MATCHING CV PDF SCREENSHOT EXACTLY */
        .cv-sheet {
          width: 100%;
          max-width: 820px;
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          padding: 44px 48px;
          box-sizing: border-box;
          color: #0f172a;
        }
        .cv-header {
          text-align: center;
          margin-bottom: 18px;
        }
        .cv-name {
          font-size: 1.85rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.01em;
          margin: 0 0 4px;
        }
        .cv-subtitle {
          font-size: 0.82rem;
          font-weight: 700;
          color: #0284c7;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .cv-contact-block {
          font-size: 0.8rem;
          color: #475569;
          line-height: 1.45;
        }
        .cv-sec {
          margin-bottom: 18px;
        }
        .cv-sec-title {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0284c7;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border-bottom: 1.5px solid #0284c7;
          padding-bottom: 3px;
          margin: 0 0 10px;
        }
        .cv-p {
          font-size: 0.84rem;
          line-height: 1.5;
          color: #1e293b;
          margin: 0;
        }
        .cv-strengths-box {
          background: #f0f6fc;
          border-radius: 4px;
          padding: 10px 16px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px 12px;
          font-size: 0.83rem;
          color: #1e293b;
        }
        .cv-strengths-col div {
          margin-bottom: 3px;
        }
        .cv-table-skills {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.83rem;
        }
        .cv-td-label {
          font-weight: 700;
          color: #0f172a;
          width: 15%;
          padding: 4px 6px 4px 0;
          vertical-align: top;
        }
        .cv-td-val {
          color: #334155;
          padding: 4px 0;
          vertical-align: top;
        }
        .cv-job-block, .cv-edu-head {
          margin-bottom: 2px;
        }
        .cv-job-title, .cv-edu-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: #0f172a;
        }
        .cv-job-sub, .cv-edu-sub {
          font-size: 0.82rem;
          color: #475569;
          margin-bottom: 4px;
        }
        .cv-ul {
          margin: 4px 0 0;
          padding-left: 18px;
          font-size: 0.83rem;
          color: #1e293b;
          line-height: 1.48;
        }
        .cv-ul li {
          margin-bottom: 3px;
        }
        .cv-table-projects {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
          margin-top: 6px;
        }
        .cv-table-projects th {
          background: #f1f5f9;
          color: #0284c7;
          font-weight: 700;
          text-align: left;
          padding: 6px 10px;
          font-size: 0.78rem;
          border-bottom: 1px solid #cbd5e1;
        }
        .cv-table-projects td {
          padding: 7px 10px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: top;
          color: #1e293b;
        }
        .cv-page-footer {
          display: flex;
          justify-content: space-between;
          font-size: 0.74rem;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
          padding-top: 10px;
          margin-top: 24px;
        }

        /* PRINT STYLES */
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; margin: 0 !important; }
          .cv-page-container { padding: 0 !important; background: #fff !important; }
          .cv-sheet {
            box-shadow: none !important;
            padding: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .page-break { page-break-after: always; height: 0; }
        }

        /* MOBILE RESPONSIVE STYLES */
        @media (max-width: 640px) {
          .cv-page-container {
            padding: 16px 8px 60px;
          }
          .cv-action-bar {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
            text-align: center;
          }
          .cv-action-bar > div {
            justify-content: center;
          }
          .cv-sheet {
            padding: clamp(18px, 4vw, 28px) clamp(14px, 3vw, 20px);
            border-radius: 8px;
          }
          .cv-name {
            font-size: 1.45rem;
          }
          .cv-subtitle {
            font-size: 0.74rem;
          }
          .cv-strengths-box {
            grid-template-columns: 1fr;
            gap: 4px;
          }
          .cv-table-skills, .cv-table-projects {
            display: block;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}

