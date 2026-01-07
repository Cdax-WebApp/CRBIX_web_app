import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote,Heart } from 'lucide-react';

const Testimonials = () => {
  const [activeReview, setActiveReview] = useState(0);

  const testimonials = [
  {
      id: 1,
      name: "David Wilson",
      role: "Full Stack Developer",
      company: "Meta",
      rating: 5,
      source: "via Twitter",
      content: "Transformative learning experience. The hands-on projects mirror real industry challenges. Career support team is outstanding.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "Microsoft",
      rating: 5,
      source: "via LinkedIn",
      content: "Great courses and supportive mentors. Loved the AI specialization. Good project selection. Perfect for upskilling while working.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Data Scientist",
      company: "Amazon",
      rating: 5,
      source: "via Google",
      content: "The best learning platform in town. I take courses regularly. The instructors are extremely knowledgeable, and always available to help. It gets busy sometimes but it's worth it. I learn here every week just to stay updated.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      date: "3 weeks ago"
    },
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-10 bg-[#eaf9ff] from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-1">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-2">
            They all love <span className="text-blue-600">our courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Consectetur adipiscing elit elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-100 rounded-full opacity-50"></div>
            
            {/* Main Review Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-10 z-10 border border-gray-100">
              {/* Quote Icon */}
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="text-white" size={24} />
              </div>

              {/* Review Number */}
              <div className="mb-8">
                <span className="text-6xl font-bold text-gray-900 opacity-10">
                  {activeReview + 1}
                </span>
              </div>

              {/* Review Content */}
              <p className="text-2xl text-gray-800 mb-8 leading-relaxed">
                "{testimonials[activeReview].content}"
              </p>

              {/* Review Info */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeReview].avatar}
                    alt={testimonials[activeReview].name}
                    className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">
                      {testimonials[activeReview].name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600 text-sm">
                        {testimonials[activeReview].role} at {testimonials[activeReview].company}
                      </p>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-bule-600 font-medium">
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

              {/* Date & Like */}
              <div className="flex items-center justify-between mt-6">
                <span className="text-gray-500 text-sm">
                  {testimonials[activeReview].date}
                </span>
                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition">
                  <Heart size={18} />
                  <span className="text-sm">Helpful</span>
                </button>
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
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  index === activeReview 
                    ? 'border-blue-500 shadow-xl' 
                    : 'border-transparent hover:border-blue-200'
                }`}
                onClick={() => setActiveReview(index)}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-4">
                  {/* Review Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === activeReview 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className="font-bold text-lg">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{review.source}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                      "{review.content}"
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{review.date}</span>
                      <div className="flex items-center gap-4">
                        <button className="text-xs text-gray-500 hover:text-red-500 transition">
                          Helpful
                        </button>
                        <button className="text-xs text-gray-500 hover:text-blue-500 transition">
                          Reply
                        </button>
                      </div>
                    </div>
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
              { label: "Total Reviews", value: "2,000+", color: "text-purple-600" },
              { label: "Average Rating", value: "4.2/5.0", color: "text-yellow-600" },
              { label: "Response Rate", value: "85%", color: "text-green-600" },
              { label: "Happy Students", value: "10K+", color: "text-blue-600" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
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
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;