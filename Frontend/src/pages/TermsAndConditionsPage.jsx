import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsAndConditionsPage() {
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
              Terms &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Conditions</span>
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
                These Terms and Conditions ("Terms") constitute a legally binding agreement between <strong>Association of Clinical Perfusionist Maharashtra</strong>, a society registered under the Societies Registration Act, 1860, bearing Registration No. MAHA-86/16, having its office at Plot No 11, Vishal Nagar Sandesh Nagar, Opp Cada Office Garkheda Aurangabad, 431005 (hereinafter referred to as the "Platform Owner" or "Data Fiduciary"), and any person ("User" / "Data Principal") accessing or using the website <a href="https://acpm.in" className="text-primary-600 hover:underline">https://acpm.in/</a> ("Platform").
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                By accessing, browsing, or submitting any information on the Platform, the User expressly agrees to be bound by these Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Eligibility and Legal Capacity</h2>
              <p className="text-gray-600 leading-relaxed mb-4">1.1 The Platform is intended only for individuals competent to contract under applicable law.</p>
              <p className="text-gray-600 leading-relaxed mb-8">1.2 By using the Platform, the User represents and warrants that: (a) they are at least eighteen (18) years of age; (b) they possess full legal capacity to enter into a binding agreement.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Nature and Scope of Platform</h2>
              <p className="text-gray-600 leading-relaxed mb-4">2.1 The Platform facilitates submission of applications/memberships, including uploading of personal, academic, and supporting documentation.</p>
              <p className="text-gray-600 leading-relaxed mb-4">2.2 Nothing contained on the Platform shall be construed as: (a) a guarantee of acceptance or selection; (b) a contractual offer or assurance of outcome; (c) a representation of eligibility.</p>
              <p className="text-gray-600 leading-relaxed mb-8">2.3 All decisions relating to applications shall remain at the sole and absolute discretion of the Platform Owner.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Fees, Payment and Verification</h2>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Fees</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Certain services or membership applications on the Platform may be subject to payment of applicable fees ("Fees"), as specified on the Platform from time to time.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Modes of Payment</h3>
              <p className="text-gray-600 leading-relaxed mb-2">Payments may be made through the modes provided on the Platform, including but not limited to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>QR code-based payments</li>
                <li>Bank transfers</li>
                <li>Any other authorised payment method</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.3 User Responsibility</h3>
              <p className="text-gray-600 leading-relaxed mb-2">The User shall ensure that:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>Payment is made to the correct and authorised payment details displayed on the Platform</li>
                <li>Accurate reference details (such as name, application ID, or contact details) are provided</li>
                <li>Proof of payment is retained and produced upon request</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">The Platform Owner shall not be responsible for payments made to incorrect or unauthorised payment details.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.4 Payment Confirmation</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>Payment shall not constitute automatic confirmation of application or membership</li>
                <li>All payments are subject to verification and reconciliation</li>
                <li>Confirmation shall be communicated only upon successful verification</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.5 Right to Verify and Reject</h3>
              <p className="text-gray-600 leading-relaxed mb-2">The Platform Owner reserves the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>Request proof of payment</li>
                <li>Place applications on hold pending verification</li>
                <li>Reject or cancel applications where payment cannot be verified</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.6 No Guarantee of Outcome</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Payment of Fees does not guarantee: (a) acceptance of application; (b) approval of membership; (c) provision of any specific outcome or benefit.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.7 Refund Policy</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Fees once paid shall be non-refundable, except: (a) where expressly stated on the Platform; or (b) where required under applicable law.</p>
              <p className="text-gray-600 leading-relaxed mb-4">In case of duplicate or excess payment, a refund may be processed at the sole discretion of the Platform Owner upon verification.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.8 Payment Disputes</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Any payment-related dispute must be raised within 15 days from the date of transaction, along with valid proof, failing which the claim may not be entertained.</p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">3.9 Fraud and Misuse</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Any attempt to falsely claim payment, manipulate payment records, or use unauthorised payment methods shall result in rejection/termination and may invite legal action.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Representations and Warranties</h2>
              <p className="text-gray-600 leading-relaxed mb-4">The User irrevocably represents and warrants that:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-8">
                <li>All information and documents submitted are true, accurate, and complete</li>
                <li>No forged, fabricated, or misleading documents are uploaded</li>
                <li>The User has lawful authority to submit all documents, including third-party materials</li>
                <li>Submission does not violate any law or third-party rights</li>
                <li>The User shall not upload unlawful or infringing content</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Document Submission and Verification</h2>
              <p className="text-gray-600 leading-relaxed mb-4">5.1 The Platform Owner reserves the absolute right to: (a) verify any document or information submitted; (b) request additional documents or clarification; (c) reject any application without assigning reasons; (d) report suspected fraudulent activity to appropriate authorities.</p>
              <p className="text-gray-600 leading-relaxed mb-8">5.2 The Platform Owner shall not be responsible for consequences arising from reliance on incorrect or misleading data submitted by the User.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Notice and Transparency</h2>
              <p className="text-gray-600 leading-relaxed mb-4">6.1 The User acknowledges that, at or prior to the time of collection of personal data, they have been provided with a clear notice specifying: (a) the categories of personal data collected; (b) the purpose of processing; (c) the manner of exercising rights; (d) grievance redressal details.</p>
              <p className="text-gray-600 leading-relaxed mb-8">6.2 Such notice forms an integral part of the User's informed decision to provide personal data.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Consent and Lawful Processing</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-8">
                <li>The User provides free, specific, informed, unconditional, and unambiguous consent for processing of personal data through a clear affirmative action</li>
                <li>Personal data shall be processed only for lawful purposes connected with application evaluation and related administrative functions</li>
                <li>The User may withdraw consent at any time, and such withdrawal shall be as easy as the mechanism through which consent was provided</li>
                <li>Withdrawal of consent shall not affect processing already undertaken prior to such withdrawal</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Purpose Limitation and Data Minimisation</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-8">
                <li>Personal data shall be processed strictly for the specified purpose communicated at the time of collection</li>
                <li>The Platform Owner shall collect only such personal data as is necessary for such purpose</li>
                <li>The User is advised not to submit excessive or irrelevant personal data</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Principal Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Subject to applicable law, the User shall have the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-8">
                <li>Obtain confirmation regarding processing of personal data</li>
                <li>Access personal data</li>
                <li>Request correction, completion, or updating</li>
                <li>Request erasure of personal data</li>
                <li>Withdraw consent</li>
                <li>Nominate another individual to exercise rights in case of death or incapacity</li>
                <li>Seek grievance redressal</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Accuracy Obligation</h2>
              <p className="text-gray-600 leading-relaxed mb-8">The User shall ensure that all personal data provided is accurate, complete, and up to date. Any inaccuracy may result in rejection of application or other appropriate action.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Security Safeguards and Data Breach</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-8">
                <li>The Platform Owner shall implement reasonable technical and organisational safeguards to protect personal data</li>
                <li>In the event of a personal data breach, appropriate measures shall be taken in accordance with applicable law</li>
                <li>The User acknowledges that no system is completely secure, and the Platform Owner shall not be liable for breaches occurring despite implementation of reasonable safeguards, except as required under law</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Intellectual Property Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-8">All rights, title, and interest in the Platform, including content, design, layout, and structure, are owned by the Platform Owner. Users shall not reproduce, distribute, or exploit any part of the Platform without prior written consent.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed mb-4">The Platform is provided on an "as is" and "as available" basis without warranties of any kind.</p>
              <p className="text-gray-600 leading-relaxed mb-8">The Platform Owner does not guarantee: (a) acceptance of applications; (b) accuracy or completeness of information; (c) uninterrupted or error-free operation.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed mb-8">To the fullest extent permitted by law: (a) The Platform Owner shall not be liable for indirect, incidental, or consequential damages; (b) No liability shall arise from rejection or non-selection; (c) Aggregate liability shall not exceed the amount paid by the User, if any.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Indemnity</h2>
              <p className="text-gray-600 leading-relaxed mb-8">The User agrees to indemnify and hold harmless the Platform Owner and its affiliates against any claims, damages, losses, or expenses arising out of: (a) breach of these Terms; (b) submission of false or unlawful data; (c) violation of third-party rights; (d) misuse of the Platform.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed mb-8">The Platform may utilise third-party service providers for hosting, storage, and processing. The Platform Owner shall not be liable for acts or omissions of such third parties, subject to applicable law.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Suspension and Termination</h2>
              <p className="text-gray-600 leading-relaxed mb-8">The Platform Owner reserves the right to suspend or terminate access, or reject/cancel any application, at its sole discretion, without prior notice.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Force Majeure</h2>
              <p className="text-gray-600 leading-relaxed mb-8">The Platform Owner shall not be liable for any failure or delay due to events beyond reasonable control, including natural disasters, cyber incidents, governmental actions, or network failures.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Governing Law and Jurisdiction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">These Terms shall be governed by the laws of India.</p>
              <p className="text-gray-600 leading-relaxed mb-8">All disputes shall be subject to the exclusive jurisdiction of courts at Mumbai, Maharashtra.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Severability</h2>
              <p className="text-gray-600 leading-relaxed mb-8">If any provision is held invalid, the remaining provisions shall continue in full force.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Entire Agreement</h2>
              <p className="text-gray-600 leading-relaxed mb-8">These Terms, read with the Privacy Policy, constitute the entire agreement between the User and the Platform Owner.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">22. Amendments</h2>
              <p className="text-gray-600 leading-relaxed mb-8">The Platform Owner reserves the right to modify these Terms at any time. Continued use constitutes acceptance of such modifications.</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">23. Contact</h2>
              <p className="text-gray-600 leading-relaxed mb-2">Email: <a href="mailto:support@acpm.in" className="text-primary-600 hover:underline">support@acpm.in</a></p>
              <p className="text-gray-600 leading-relaxed">Registered Address: Plot No 11, Vishal Nagar Sandesh Nagar, Opp Cada Office Garkheda Aurangabad, 431005</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
