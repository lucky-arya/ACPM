import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Privacy<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Last Updated: 05th May 2026
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                This Privacy Policy ("Policy") is issued by <strong>Association of Clinical Perfusionist Maharashtra</strong>, a society registered under the Societies Registration Act, 1860, bearing Registration No. MAHA-86/16, having its office at Plot No 11, Vishal Nagar Sandesh Nagar, Opp Cada Office Garkheda Aurangabad, 431005 (hereinafter referred to as the "Data Fiduciary" or "We"), in relation to the website <a href="https://acpm.in" className="text-primary-600 hover:underline">https://acpm.in/</a>, including its membership/application interface ("Platform").
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                This Policy governs the collection and processing of personal data submitted by users ("Data Principals") through the Platform, in compliance with applicable laws, including the Digital Personal Data Protection Act, 2023.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Scope of Data Collection</h2>
              <p className="text-gray-600 leading-relaxed mb-4">In the course of membership/application submission, the Data Fiduciary collects and processes the following categories of personal data:</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 Personal Identification Data</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-6">
                <li>Full name</li>
                <li>Contact number</li>
                <li>Email address</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 Identity and Verification Data</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-6">
                <li>Passport-size photograph</li>
                <li>Government-issued identification documents (if provided)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">1.3 Academic and Supporting Documentation</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-6">
                <li>Degree certificates</li>
                <li>Academic transcripts</li>
                <li>Curriculum vitae / resume</li>
                <li>Letters of recommendation</li>
                <li>Any additional documents voluntarily submitted by the applicant</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">1.4 Technical and Usage Data</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-8">
                <li>IP address</li>
                <li>Device and browser information</li>
                <li>Access logs and timestamps</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Purpose Limitation</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Personal data is collected and processed strictly for the following lawful purposes:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-6">
                <li>Assessment and evaluation of membership/applications</li>
                <li>Verification of identity, credentials, and supporting documents</li>
                <li>Communication with applicants regarding their application status</li>
                <li>Maintenance of internal records and administrative processing</li>
                <li>Compliance with applicable legal or regulatory obligations</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-8">The Data Fiduciary shall not process personal data for any purpose incompatible with the above without obtaining fresh consent, unless otherwise permitted under law.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Consent and Representations</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Processing of personal data is based on the Consent of the Data Principal.</p>
              <p className="text-gray-600 leading-relaxed mb-4">By submitting the application form, the Data Principal:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-6">
                <li>Provides free, specific, informed, and unambiguous consent for processing</li>
                <li>Confirms that all personal data submitted is accurate and lawfully provided</li>
                <li>Warrants that any third-party personal data (including recommendation letters) has been shared with due authorisation</li>
                <li>Acknowledges that submission of documents is voluntary but necessary for evaluation</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-8">The Data Principal may withdraw consent at any time, subject to the consequences of such withdrawal, including inability to process the application.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Minimisation and Proportionality</h2>
              <p className="text-gray-600 leading-relaxed mb-8">The Data Fiduciary endeavours to collect only such personal data as is necessary for the stated purposes. Users are advised not to submit excessive or irrelevant personal data.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Disclosure and Data Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Personal data may be disclosed strictly on a need-to-know basis:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-6">
                <li>To authorised personnel involved in evaluation and administration</li>
                <li>To third-party service providers (including cloud storage, hosting, or processing vendors), subject to contractual confidentiality and data protection obligations</li>
                <li>To statutory authorities where required under applicable law</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-8">Under no circumstances is personal data sold, rented, or commercially exploited.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cross-Border Data Transfers</h2>
              <p className="text-gray-600 leading-relaxed mb-8">In the event that personal data is stored or processed outside India (including through third-party service providers), such transfer shall be undertaken in accordance with applicable legal requirements and subject to adequate safeguards.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention and Erasure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Personal data shall be retained only for as long as necessary to fulfil the purposes specified under this Policy, or as required under applicable law.</p>
              <p className="text-gray-600 leading-relaxed mb-4">Upon completion of the purpose or withdrawal of consent, such data shall be:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-8">
                <li>securely deleted; or</li>
                <li>anonymised, where retention is required for lawful purposes</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Rights of Data Principals</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Subject to applicable law, Data Principals shall have the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-8">
                <li>Seek confirmation of processing</li>
                <li>Access their personal data</li>
                <li>Request correction, completion, or updating</li>
                <li>Request erasure of personal data</li>
                <li>Withdraw consent</li>
                <li>Nominate another individual to exercise rights in case of death or incapacity</li>
                <li>Seek grievance redressal</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Security Safeguards</h2>
              <p className="text-gray-600 leading-relaxed mb-4">The Data Fiduciary implements reasonable and appropriate technical and organisational measures, including:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-8">
                <li>restricted access controls</li>
                <li>secure storage systems</li>
                <li>encryption and data protection protocols</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-8">to prevent unauthorised access, disclosure, alteration, or destruction of personal data.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Data</h2>
              <p className="text-gray-600 leading-relaxed mb-8">The Platform is not intended for individuals below eighteen (18) years of age. The Data Fiduciary does not knowingly collect personal data of children.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Grievance Redressal Mechanism</h2>
              <p className="text-gray-600 leading-relaxed mb-4">In accordance with applicable law, grievances may be addressed to:</p>
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <p className="text-gray-900 font-semibold">Grievance Officer: Mr. Kiran Ambre</p>
                <p className="text-gray-600">Email: ambre.kiran1@gmail.com</p>
                <p className="text-gray-600">Address: 503 Plot 99-103 Shree Ganesh, Ramseth Naik Road, Mhalapakhadi, & Mazgaon, Mumbai, Maharashtra, 400010</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8">All grievances shall be acknowledged and resolved within prescribed timelines.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Amendments</h2>
              <p className="text-gray-600 leading-relaxed mb-8">The Data Fiduciary reserves the right to modify this Policy at any time. Updated versions shall be published on the Platform and shall become effective upon such publication.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact</h2>
              <p className="text-gray-600 leading-relaxed mb-8">For any queries or clarifications: <a href="mailto:support@acpm.in" className="text-primary-600 hover:underline">support@acpm.in</a></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
