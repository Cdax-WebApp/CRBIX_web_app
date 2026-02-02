import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Heart } from "lucide-react";

const Testimonials = () => {
  const [activeReview, setActiveReview] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sundar Bhardwaj",
      role: "Full Stack Developer",
      company: "Meta",
      rating: 5,
      source: "via Twitter",
      content:
        "Transformative learning experience. The hands-on projects mirror real industry challenges. Career support team is outstanding.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Prasanna Rathod",
      role: "Product Manager",
      company: "Microsoft",
      rating: 5,
      source: "via LinkedIn",
      content:
        "Great courses and supportive mentors. Loved the AI specialization. Good project selection. Perfect for upskilling while working.",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Vrunda Rathi",
      role: "Data Scientist",
      company: "Amazon",
      rating: 5,
      source: "via Google",
      content:
        "The best learning platform in town. I take courses regularly. The instructors are extremely knowledgeable, and always available to help. It gets busy sometimes but it's worth it. I learn here every week just to stay updated.",
      date: "3 weeks ago",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-10 bg-[#eaf9ff] dark:bg-gray-900 from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-1">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            They all love{" "}
            <span className="text-blue-600 dark:text-blue-400">
              our courses
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Learners from diverse backgrounds trust our platform for industry-relevant skills, expert-led instruction, and measurable career growth. Our courses are designed to deliver real value, not just certificates.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Active Review */}
          <motion.div
            key={testimonials[activeReview].id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-100 dark:bg-yellow-900/30 rounded-full opacity-50"></div>

            {/* Main Review Card */}
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-gray-900/50 p-10 z-10 border border-gray-100 dark:border-gray-700">
              {/* Quote Icon */}
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="text-white" size={24} />
              </div>

              {/* Review Number */}
              <div className="mb-8">
                <span className="text-6xl font-bold text-gray-900 dark:text-gray-700 opacity-10">
                  {activeReview + 1}
                </span>
              </div>

              {/* Review Content */}
              <p className="text-2xl text-gray-800 dark:text-gray-200 mb-8 leading-relaxed">
                "{testimonials[activeReview].content}"
              </p>

              {/* Review Info */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                      {testimonials[activeReview].name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonials[activeReview].role} at{" "}
                        {testimonials[activeReview].company}
                      </p>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {testimonials[activeReview].source}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - All Reviews */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {testimonials.map((review, index) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-800/50 ${
                  index === activeReview
                    ? "border-blue-500 dark:border-blue-400 shadow-xl dark:shadow-gray-800/50"
                    : "border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                }`}
                onClick={() => setActiveReview(index)}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-4">
                  {/* Review Number */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index === activeReview
                          ? "bg-blue-600 dark:bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <span className="font-bold text-lg">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {review.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {review.source}
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className="fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                      "{review.content}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                label: "Total Reviews",
                value: "2,000+",
                color: "text-purple-600 dark:text-purple-400",
              },
              {
                label: "Average Rating",
                value: "4.2/5.0",
                color: "text-yellow-600 dark:text-yellow-400",
              },
              {
                label: "Response Rate",
                value: "85%",
                color: "text-green-600 dark:text-green-400",
              },
              {
                label: "Happy Students",
                value: "10K+",
                color: "text-blue-600 dark:text-blue-400",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-4xl md:text-5xl font-bold ${stat.color} mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-5"
        ></motion.div>
      </div>
    </section>
  );
};

export default Testimonials;