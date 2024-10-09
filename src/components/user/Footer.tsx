const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center py-6">
            <p className="text-sm text-gray-400 mb-2">
              © {new Date().getFullYear()} PSB Online. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Tentang Kami</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Kontak</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Kebijakan Privasi</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;