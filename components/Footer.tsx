
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-base-100 dark:bg-dark-200 border-t border-base-300 dark:border-dark-300 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-base-content/70 dark:text-dark-content/70">
        <p>&copy; {new Date().getFullYear()} AI Blog Weaver. All rights reserved.</p>
        <p className="text-sm mt-1">Crafted with AI, for human curiosity.</p>
      </div>
    </footer>
  );
};

export default Footer;
