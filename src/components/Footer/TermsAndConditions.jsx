import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen px-6 py-12 bg-[#eaf9ff] dark:bg-gray-900">
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/50 p-8 ">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Terms and Conditions</h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Last Updated: <span className="font-medium dark:text-gray-300">01-01-2026</span>
      </p>

      <p className="mb-6 dark:text-gray-300">
        Welcome to <strong className="dark:text-white">CDaX Learning Platform</strong> ("Platform", "we",
        "our", "us"). By accessing or using our website, services, and courses,
        you agree to comply with and be bound by the following Terms and
        Conditions. If you do not agree, please do not use our services.
      </p>

      {/* 1 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">1. Eligibility</h2>
        <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
          <li>You must be at least 18 years old or have parental consent.</li>
          <li>Information provided during registration must be accurate.</li>
        </ul>
      </section>

      {/* 2 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">2. Account Registration</h2>
        <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
          <li>An account is required to access courses and purchases.</li>
          <li>You are responsible for safeguarding your login credentials.</li>
          <li>All activities under your account are your responsibility.</li>
        </ul>
      </section>

      {/* 3 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">3. Courses & Content</h2>
        <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
          <li>Content is for personal learning use only.</li>
          <li>No copying, sharing, or reselling without permission.</li>
          <li>Course content and pricing may change without notice.</li>
        </ul>
      </section>

      {/* 4 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">4. Payments & Pricing</h2>
        <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
          <li>Some courses require paid access.</li>
          <li>All prices are shown in INR (₹) unless stated otherwise.</li>
          <li>Payments are processed via secure third-party gateways.</li>
          <li>We do not store card or banking information.</li>
        </ul>
      </section>

      {/* 5 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">5. Refund Policy</h2>
        <p className="dark:text-gray-300">
          Refunds are subject to our Refund Policy. No refunds will be issued
          once a course has been completed or significantly accessed unless
          explicitly mentioned.
        </p>
      </section>

      {/* 6 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">6. Certifications</h2>
        <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
          <li>Certificates are issued upon successful course completion.</li>
          <li>Certificates do not guarantee jobs or placements.</li>
        </ul>
      </section>

      {/* 7 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">7. User Conduct</h2>
        <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
          <li>No harmful, abusive, or illegal activity.</li>
          <li>No hacking, reverse engineering, or misuse.</li>
          <li>Violations may result in account suspension or termination.</li>
        </ul>
      </section>

      {/* 8 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">
          8. Favorites, Cart & Personalization
        </h2>
        <p className="dark:text-gray-300">
          Personalized features are provided for convenience. We are not
          responsible for accidental loss of saved data.
        </p>
      </section>

      {/* 9 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">9. Intellectual Property</h2>
        <p className="dark:text-gray-300">
          All content, branding, UI design, and course material are the
          intellectual property of CDaX. Unauthorized use may lead to legal
          action.
        </p>
      </section>

      {/* 10 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">10. Limitation of Liability</h2>
        <p className="dark:text-gray-300">
          We do not guarantee uninterrupted service, learning outcomes, or job
          placements. Use of the platform is at your own risk.
        </p>
      </section>

      {/* 11 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">
          11. Privacy & Data Protection
        </h2>
        <p className="dark:text-gray-300">
          User data is handled according to our Privacy Policy. We do not sell
          personal information.
        </p>
      </section>

      {/* 12 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">12. Third-Party Links</h2>
        <p className="dark:text-gray-300">
          We are not responsible for third-party websites or services linked
          from our platform.
        </p>
      </section>

      {/* 13 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">13. Account Termination</h2>
        <p className="dark:text-gray-300">
          We reserve the right to suspend or terminate accounts that violate our
          policies.
        </p>
      </section>

      {/* 14 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">
          14. Modifications to Terms
        </h2>
        <p className="dark:text-gray-300">
          These terms may be updated at any time. Continued use indicates
          acceptance of changes.
        </p>
      </section>

      {/* 15 */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">15. Governing Law</h2>
        <p className="dark:text-gray-300">
          These terms are governed by the laws of India. Disputes fall under
          Indian jurisdiction.
        </p>
      </section>

      {/* 16 */}
      <section>
        <h2 className="text-xl font-semibold mb-2 dark:text-white">16. Contact Information</h2>
        <p className="mb-2 dark:text-gray-300">
        📧 <strong className="dark:text-white">Email : </strong> 
        <a
              href="mailto:info.crbix@gmail.com?subject=Support%20Request"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              info.crbix@gmail.com
            </a>
      </p>
      </section>
    </div>
    </div>
  );
}