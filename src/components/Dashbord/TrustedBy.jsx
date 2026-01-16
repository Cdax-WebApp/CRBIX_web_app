import { motion } from "framer-motion";

export default function TrustedBy() {
  const logos = [
    {
      light: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
      dark: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
      alt: "Google",
    },
    {
      light: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/500px-Microsoft_logo.svg.png",
      dark: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/500px-Microsoft_logo.svg.png",
      alt: "Microsoft",
    },
    {
  light: "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png",
  dark: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFEyDif_hzcK_cBjlvpFLgauiW_OSRsa0MPYo7UCdAvUu5NfPh-lzl5Yk&s", // Simple SVG version
  alt: "Amazon",
},
    {
      light: "https://pngimg.com/d/meta_PNG5.png",
      dark: "https://pngimg.com/d/meta_PNG5.png",
      alt: "Meta",
    },
  ];

  return (
    <section className="pt-10 pb-10 border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Trusted by learners at top companies worldwide
        </motion.p>

        <motion.div
          className="flex justify-center items-center gap-10 md:gap-14 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {logos.map((logo, i) => (
            <div key={i} className="relative h-7 md:h-8">
              {/* Light mode logo */}
              <motion.img
                src={logo.light}
                alt={logo.alt}
                className="h-full w-auto dark:hidden"
                loading="lazy"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08 }}
              />
              {/* Dark mode logo with colored version */}
              <motion.img
                src={logo.dark}
                alt={logo.alt}
                className="h-full w-auto hidden dark:block filter brightness-100 contrast-125"
                loading="lazy"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08 }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}