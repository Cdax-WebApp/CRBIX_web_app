import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users,  BarChart3, ChevronRight } from "lucide-react";

const GetCertified = () => {
  const stats = [
    {
      number: "20 lakhs+",
      label: "Careers advanced",
      icon: <TrendingUp size={24} />,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      number: "300",
      label: "Live classes every month",
      icon: <Users size={24} />,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      number: "80%",
      label: "Report career benefits",
      icon: <BarChart3 size={24} />,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <section className="py-20 bg-[#eaf9ff] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Get Certified.<br />
              <span className="text-blue-600 dark:text-blue-400">Get Ahead.</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-lg">
              Advance your career with industry-recognized certifications and
              hands-on learning.
            </p>

            {/* STATS WITH HOVER ANIMATION */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="relative cursor-pointer"
                >
                  {/* Background Circle */}
                  <motion.div
                    variants={{
                      rest: { scale: 0, opacity: 0 },
                      hover: { scale: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`absolute -top-8 -right-8 w-32 h-32 rounded-full ${stat.bgColor} z-0`}
                  />

                  {/* Card */}
                  <motion.div
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -10 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-800/50 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <motion.div
                        variants={{
                          rest: { y: 0, rotate: 0 },
                          hover: { y: -4, rotate: 8 },
                        }}
                        transition={{ duration: 0.4 }}
                        className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}
                      >
                        {stat.icon}
                      </motion.div>

                      {/* Text */}
                      <div>
                        <motion.div
                          variants={{
                            rest: { x: 0 },
                            hover: { x: 4 },
                          }}
                          className="text-2xl font-bold text-gray-900 dark:text-white"
                        >
                          {stat.number}
                        </motion.div>

                        <motion.div
                          variants={{
                            rest: { opacity: 0.7 },
                            hover: { opacity: 1 },
                          }}
                          className="text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          {stat.label}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => {
                document.getElementById("courses")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-10 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-colors"
            >
              Explore Programs
              <ChevronRight className="ml-2" size={20} />
            </motion.button>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-gray-900/50 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Students learning"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Decorative Circles */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-100 dark:bg-yellow-900/30 rounded-full opacity-70"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-70"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetCertified;