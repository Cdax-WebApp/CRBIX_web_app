// src/pages/TechOnCDaX.jsx

export default function TechOnCDaX() {
  return (
    <div className="min-h-screen  px-6 py-12 bg-[#eaf9ff]">
    <section className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Tech on CDaX
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Last Updated: <span className="font-medium">01-01-2026</span>
      </p>

      <p className="mb-8">
        CDaX Learning Platform is built using modern, scalable, and
        industry-standard technologies to ensure a fast, secure, and
        user-friendly learning experience.
      </p>

      {/* Frontend */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Frontend Technologies
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>React.js</strong> – Component-based UI development</li>
        <li><strong>React Router DOM</strong> – Client-side routing</li>
        <li><strong>Tailwind CSS</strong> – Responsive and modern styling</li>
        <li><strong>JavaScript (ES6+)</strong> – Interactive functionality</li>
        <li><strong>HTML5 & CSS3</strong> – Semantic structure and accessibility</li>
      </ul>

      {/* Backend */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Backend Technologies
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Spring Boot (Java)</strong> – RESTful backend services</li>
        <li><strong>Spring Security</strong> – Authentication & authorization</li>
        <li><strong>JWT</strong> – Secure user sessions</li>
        <li><strong>Hibernate / JPA</strong> – Database ORM layer</li>
      </ul>

      {/* Database */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Database
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>MySQL</strong> – Primary relational database</li>
      </ul>

      {/* Payments */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Payments & Security
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Razorpay / Stripe</strong> – Secure payment processing</li>
        <li><strong>HTTPS / SSL</strong> – Encrypted data transfer</li>
      </ul>

      {/* Auth */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Authentication & User Management
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Role-based access (Student / Admin / Instructor)</li>
        <li>Secure password encryption</li>
        <li>Protected frontend routes</li>
      </ul>

      {/* Hosting */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Hosting & Deployment
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Frontend:</strong> Vercel / Netlify</li>
        <li><strong>Backend:</strong> AWS / Render / Railway</li>
        <li><strong>Database:</strong> AWS RDS / Cloud SQL</li>
      </ul>

      {/* State */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        State Management
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>React Context API (Auth, Cart, Favorites)</li>
        <li>LocalStorage & SessionStorage</li>
      </ul>

      {/* Tools */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Development Tools
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Git & GitHub – Version control</li>
        <li>VS Code – Development environment</li>
        <li>Postman – API testing</li>
        <li>npm / yarn – Package management</li>
      </ul>

      {/* Accessibility */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Accessibility & Performance
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>WCAG 2.1 accessibility guidelines</li>
        <li>Responsive and mobile-first design</li>
        <li>Lazy loading & optimized performance</li>
      </ul>

      <p className="text-sm text-gray-500 mt-10">
        This technology stack allows CDaX to scale efficiently while delivering
        a reliable and inclusive learning experience.
      </p>
    </section>
    </div>
  );
}