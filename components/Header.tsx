
import React from 'react';
import { Feather } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-base-100 dark:bg-dark-200/80 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-base-300 dark:border-dark-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Feather className="w-8 h-8 text-brand-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content dark:text-dark-content">
              AI Blog Weaver
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
