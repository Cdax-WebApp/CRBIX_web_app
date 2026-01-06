import { Link } from "react-router-dom";
import { 
  FaApple, 
  FaGooglePlay, 
  FaPhoneAlt, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube   
} from "react-icons/fa";

const Footer = () => {
  return (
   
    <footer className="bg-[#d2f1ff]  text-black text-sm">
       <div className="border-t border-gray-700 "></div>
      {/* Main footer content */}
      <div className="px-6 md:px-20 py-10 grid grid-cols-1 lg:grid-cols-3 gap-28">
        {/* Column 1 - Company Info & App Stores */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-bold text-black mb-4">CDaX App</h3>
          <p className="mb-6 text-gray-600">
            CDaX is democratising education, making it accessible to all. Join the revolution, learn on India's largest learning platform.
          </p>

          <div className="mb-6">
            <h4 className="font-semibold text-black mb-3">App Store</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-black text-white  px-4 py-2 rounded-lg hover:bg-gray-800 transition w-48"
              >
                <FaApple className="mr-2 text-xl" />
                <div className="text-left">
                  <div className="font-semibold">Apple Store</div>
                </div>
              </a>
              <a 
                href="https://play.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition w-48"
              >
                <FaGooglePlay className="mr-2 text-xl" />
                <div className="text-left">
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-black mb-3">Reach out to us</h4>
            <p className="text-gray-600 mb-3">
              Get your questions answered about learning with CDaX.
            </p>
            <div className="flex items-center mt-2">
              <FaPhoneAlt className="mr-2" />
              <span className="font-medium">Call +91 8308818374</span>
            </div>
          </div>
        </div>

        {/* Columns 2 & 3 - Right section (2/3 width) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side (About & Legal) */}
          <div className="grid grid-cols-1 gap-6">
            {/* About */}
            <div>
              <h4 className="font-semibold text-black mb-4 text-lg">About</h4>
              <ul className="space-y-3 text-gray-600" >
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/investors">Investors</Link></li>
              </ul>
            </div>

            {/* Legal Accessibility */}
            <div>
              <h4 className="font-semibold text-black mb-4 text-lg">Legal Accessibility</h4>
              <ul className="space-y-2 text-gray-600" >
                <li><Link to="Accessibility">Accessibility Statement</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>

          {/* Right side (Discover & Skills) */}
          <div className="grid grid-cols-1 gap-6">
            {/* Discover CDaX */}
            <div>
              <h4 className="font-semibold text-black mb-4 text-lg">Discover CDaX</h4>
              <ul className="space-y-3 text-gray-600">
                <li><Link to="/tech-on-cdax">Tech on CDaX</Link></li>
                <li><Link to="/plans-pricing">Plans & Pricing</Link></li>
                <li><Link to="/help-support">Help & Support</Link></li>
              </ul>
            </div>

            {/* Top Skills & Certifications */}
            <div>
              <h4 className="font-semibold text-black mb-4 text-lg">Explore top Skills and Certifications</h4>
              <ul className="space-y-2 grid grid-cols-2 md:grid-cols-1 gap-x-6 text-gray-600 ">
                <li><Link to="/skills/android">Android Development</Link></li>
                <li><Link to="/skills/web">Web Development</Link></li>
                <li><Link to="/skills/java">Java Development</Link></li>
                <li><Link to="/skills/python">Python Development</Link></li>
                <li><Link to="/skills/dotnet">.NET Development</Link></li>
                <li><Link to="/skills/uiux">UI/UX Development</Link></li>
                <li><Link to="/skills/aiml">AI / ML</Link></li>
                <li><Link to="/skills/data">Data Analytics</Link></li>
                <li><Link to="/skills/testing">Software Testing</Link></li>
                <li><Link to="/skills/networking">Networking</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom footer */}
      <div className="px-6 md:px-20 py-6 ">
        <div className="flex flex-col items-center justify-center text-center ">
          <div className="flex items-center space-x-4 mb-3 ">
            <a href="https://www.facebook.com/" className="text-black hover:text-gray-300 transition"><FaFacebook size={20} /></a>
            <a href="https://x.com/" className="text-black hover:text-gray-300 transition"><FaTwitter size={20} /></a>
            <a href="https://www.instagram.com/" className="text-black hover:text-gray-300 transition"><FaInstagram size={20} /></a>
            <a href="https://in.linkedin.com/" className="text-black hover:text-gray-300 transition"><FaLinkedin size={20} /></a>
            <a href="https://www.youtube.com/" className="text-black hover:text-gray-300 transition"><FaYoutube size={20} /></a>
          </div>
          <span className="text-gray-400 text-xs">
            © {new Date().getFullYear()} CDaX. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;