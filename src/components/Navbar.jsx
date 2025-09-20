import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsDropdownOpen(false); // Close dropdown on logout
    toast("Logged out successfully!");
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='p-3 shadow-sm flex items-center justify-between px-5'>
        <Link to="/"><img className='h-12 w-24' src="/logo3.jpg" alt="Logo"/></Link>
        {user ? (
          <div className='flex items-center gap-3 relative'>
            <img 
              src={user.picture}
              alt="User profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-48 bg-white border rounded-md shadow-lg z-10 py-2">
                <Link to="/my-trips" onClick={() => setIsDropdownOpen(false)}>
                  <Button variant="ghost" className="w-full text-left">My Trips</Button>
                </Link>
                <Button onClick={handleLogout} variant="ghost" className="w-full text-left">Log Out</Button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Button onClick={() => navigate('/create-trip')}>Sign In</Button>
          </div>
        )}
    </div>
  );
}

export default Navbar;