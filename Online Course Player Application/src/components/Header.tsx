import React, { useState, useEffect } from 'react';
import { Menu, Bell, ChevronDown, User, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  courseTitle: string;
  toggleSidebar: () => void;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ courseTitle, toggleSidebar, isMobile }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-10 transition-all duration-200 ${
        scrolled 
          ? 'bg-white shadow-sm py-2' 
          : 'bg-white/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {isMobile && (
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-md"
          >
            <Menu size={24} />
          </button>
        )}
        
        <div className="flex items-center space-x-2">
          <img 
            src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Course logo" 
            className="w-8 h-8 rounded object-cover"
          />
          <h1 className={`font-semibold ${isMobile ? 'text-base' : 'text-xl'} text-gray-800`}>
            {courseTitle}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="text-gray-600 hover:text-gray-900 p-1.5 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
            >
              <img 
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="User" 
                className="w-8 h-8 rounded-full object-cover"
              />
              {!isMobile && (
                <>
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </>
              )}
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} className="mr-2 text-gray-500" />
                  Profile
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="mr-2 text-gray-500" />
                  Settings
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LogOut size={16} className="mr-2 text-gray-500" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;