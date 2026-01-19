import { motion } from "framer-motion";
import { 
  FaCertificate, 
  FaChalkboardTeacher, 
  FaBriefcase, 
  FaProjectDiagram 
} from "react-icons/fa";

const features = [
  {
    title: "Certificates",
    desc: "Earn recognized certifications upon completion that validate your skills with employers worldwide.",
    icon: <FaCertificate className="w-6 h-6" />,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    title: "Expert Mentors",
    desc: "Learn directly from industry professionals with years of real-world experience, offering personalized guidance.",
    icon: <FaChalkboardTeacher className="w-6 h-6" />,
    color: "text-green-500 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  },
  {
    title: "Career Guidance",
    desc: "Get dedicated career support including resume building and job placement assistance to launch your dream career.",
    icon: <FaBriefcase className="w-6 h-6" />,
    color: "text-purple-500 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30"
  },
  {
    title: "Real-World Projects",
    desc: "Build your portfolio with hands-on projects that solve actual industry problems, giving you practical experience.",
    icon: <FaProjectDiagram className="w-6 h-6" />,
    color: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30"
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#eaf9ff] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT SIDE */}
          <div>
            <h2 className="mt-3 text-5xl font-extrabold text-gray-900 dark:text-white">
              Why people choose us
            </h2>

            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl">
              Unlock your potential with industry-aligned programs, expert-led training, 
              and career-focused learning designed to help you succeed in today's competitive landscape.  
            </p>

            <div className="mt-12 max-w-md rounded-[40px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                alt="Why choose us"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative cursor-pointer"
              >
                {/* BACKGROUND SHAPE */}
                <motion.div
                  variants={{
                    rest: { scale: 0, opacity: 0 },
                    hover: { scale: 1, opacity: 1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`absolute -top-10 -right-10 w-36 h-36 rounded-full ${item.bgColor} z-0`}
                />

                {/* CARD */}
                <motion.div
                  variants={{
                    rest: { y: 0 },
                    hover: { y: -12 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-800/50 transition-shadow duration-300"
                >
                  {/* ICON */}
                  <motion.div
                    variants={{
                      rest: { y: 0, rotate: 0 },
                      hover: { y: -6, rotate: 5 },
                    }}
                    transition={{ duration: 0.4 }}
                    className={`w-12 h-12 mb-5 rounded-full ${item.bgColor} ${item.color}
                    flex items-center justify-center font-bold text-lg`}
                  >
                    {item.icon}
                  </motion.div>

                  {/* TEXT */}
                  <motion.h4
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 4 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-lg font-bold text-gray-900 dark:text-white"
                  >
                    {item.title}
                  </motion.h4>

                  <motion.p
                    variants={{
                      rest: { opacity: 0.7 },
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
                  >
                    {item.desc}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}