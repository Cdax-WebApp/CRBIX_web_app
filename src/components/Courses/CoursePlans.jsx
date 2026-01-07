import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const listVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.6 + i * 0.08,
      duration: 0.4,
    },
  }),
};

export default function CoursePlans() {
  return (
    <section className="py-16 bg-[#eefaff]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-12 text-blue-900"
        >
          Choose a plan for your organization
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* MONTHLY */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.08)" }}
            className="bg-white border rounded-xl p-6 text-left transition-all"
          >
            <div className="border-t-4 border-orange-500 items-center justify-center text-center pt-4">
              <h3 className="text-xl font-bold mb-1 ">Monthly Plan</h3>
              <p className="text-sm text-gray-600 mb-4">
                👥 Best for trial users
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-orange-600 text-orange-600 px-4 py-2 rounded-md font-semibold mb-6 hover:bg-orange-50 transition"
              >
                Start subscription
              </motion.button>

              <p className="text-lg font-bold mb-1">₹299 for month per user</p>
              <p className="text-sm text-gray-500 mb-4">
                Premium access. No contracts.
              </p>

              <ul className="space-y-3 text-sm">
                {[
                  "Access to all beginner & intermediate courses",
                  "Certification prep",
                  "Goal-focused recommendations",
                  "Limited AI tools usage",
                  "Community access",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex gap-2"
                  >
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* QUARTERLY */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.08)" }}
            className="bg-white border rounded-xl p-6 text-left transition-all"
          >
            <div className="border-t-4 border-indigo-600 pt-4 items-center justify-center text-center">
              <h3 className="text-xl font-bold mb-1">Quarterly Plan</h3>
              <p className="text-sm text-gray-600 mb-4">
                🏢 Best for serious learners
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md font-semibold mb-6 hover:bg-indigo-50 transition"
              >
                Start subscription
              </motion.button>

              <p className="text-lg font-bold mb-1">
                ₹799 for quarter per user
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Premium access. No contracts.
              </p>

              <ul className="space-y-3 text-sm">
                {[
                  "Advanced courses unlocked",
                  "Priority doubt support",
                  "Advanced analytics & insights",
                  "Project-based learning",
                  "Resume-ready projects",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex gap-2"
                  >
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* YEARLY */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.08)" }}
            className="bg-white border rounded-xl p-6 text-left transition-all"
          >
            <div className="border-t-4 border-pink-600 pt-4 items-center justify-center text-center">
              <h3 className="text-xl font-bold mb-1">Yearly Plan</h3>
              <p className="text-sm text-gray-600 mb-4">
                🏢 Best value for every user
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-pink-600 text-pink-600 px-4 py-2 rounded-md font-semibold mb-6 hover:bg-pink-50 transition"
              >
                Start subscription
              </motion.button>

              <p className="text-lg font-bold mb-1">₹1,799 for year per user</p>
              <p className="text-sm text-gray-500 mb-4">
                Premium access. No contracts.
              </p>

              <ul className="space-y-3 text-sm">
                {[
                  "Everything in Growth",
                  "1:1 mentor session (monthly or quarterly)",
                  "Career roadmap",
                  "Job-ready projects",
                  "Customizable content & add-ons",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex gap-2"
                  >
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      {/* COMBO COURSE SUBSCRIPTIONS */}
      <div className="max-w-7xl mx-auto px-4 mt-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 10 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-8 text-blue-900"
        >
          Combo Course Plans
        </motion.h2>

        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Learn multiple skills together with flexible combo plans designed for
          individual learners.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* MONTHLY COMBO */}
          <motion.div
            whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.08)" }}
            className="bg-white border rounded-xl p-6 transition-all"
          >
            <div className="border-t-4 border-orange-500 pt-4 text-center">
              <h3 className="text-xl font-bold mb-1">Monthly Combo</h3>
              <p className="text-sm text-gray-600 mb-4">
                🎯 Explore multiple skills
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-orange-600 text-orange-600 px-4 py-2 rounded-md font-semibold mb-6 hover:bg-orange-50 transition"
              >
                Start Combo
              </motion.button>

              <p className="text-lg font-bold mb-1">₹499 for month per user</p>
              <p className="text-sm text-gray-500 mb-4">
                Premium access. No contracts.
              </p>

              <ul className="space-y-3 text-sm text-left">
                {[
                  "Access to 2 combo courses",
                  "Learn at your own pace",
                  "Completion certificates",
                  "Community support",
                  "Goal-focused recommendations",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* QUARTERLY COMBO */}
          <motion.div
            whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.08)" }}
            className="bg-white border rounded-xl p-6 transition-all"
          >
            <div className="border-t-4 border-indigo-600 pt-4 text-center">
              <h3 className="text-xl font-bold mb-1">Quarterly Combo</h3>
              <p className="text-sm text-gray-600 mb-4">
                ⭐ Best for consistent learners
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md font-semibold mb-6 hover:bg-indigo-50 transition"
              >
                Start Combo
              </motion.button>

              <p className="text-lg font-bold mb-1">₹1,299 for quarter per user</p>
              <p className="text-sm text-gray-500 mb-4">
                Better value than monthly
              </p>

              <ul className="space-y-3 text-sm text-left">
                {[
                  "Access to 2 combo courses",
                  "Certificates for each course",
                  "Priority support",
                  "Project-based learning",
                  "Flexible learning schedule",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* YEARLY COMBO */}
          <motion.div
            whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.08)" }}
            className="bg-white border rounded-xl p-6 transition-all"
          >
            <div className="border-t-4 border-pink-600 pt-4 text-center">
              <h3 className="text-xl font-bold mb-1">Yearly Combo</h3>
              <p className="text-sm text-gray-600 mb-4">
                🚀 Best value for individuals
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-pink-600 text-pink-600 px-4 py-2 rounded-md font-semibold mb-6 hover:bg-pink-50 transition"
              >
                Start Combo
              </motion.button>

              <p className="text-lg font-bold mb-1">₹4,499 for year per user</p>
              <p className="text-sm text-gray-500 mb-4">Maximum savings</p>

              <ul className="space-y-3 text-sm text-left">
                {[
                  "Access to 2 combo courses",
                  "Lifetime certificates",
                  "Exclusive updates",
                  "Early access to new content",
                  "Best for career-focused learners",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle className="text-green-600 w-5 h-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}