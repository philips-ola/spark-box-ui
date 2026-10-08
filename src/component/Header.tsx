import { Link, useNavigate } from '@tanstack/react-router';
import { Sparkles, Menu, X } from 'lucide-react';
import { useAuth } from '#/context/AuthContext';
import { useState } from 'react';
import { logoutUser } from '#/api/auth';

const Header = () => {

  const navigate = useNavigate();
  const {user, setUser, setAccessToken} = useAuth();
    const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async() => {
    try{
      await logoutUser();
      setAccessToken(null);
      setUser(null);
      navigate({ to: '/' })
    }catch(err: any) {
     console.log('Logout failed: ', err)
    }
  }

return (
    <header className='bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100'>
      <div className='container mx-auto px-6 lg:px-14 py-4 flex justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='flex items-center space-x-2 text-gray-800'>
          <div className='bg-blue-50 p-1.5 rounded-xl'>
            <Sparkles className='w-5 h-5 text-blue-600' />
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>SparkBox</h1>
        </Link>



        {/* Desktop Actions */}
        <div className='hidden md:flex items-center gap-3'>
          <Link to='/' className='text-gray-900 hover:text-gray-900 font-medium transition text-[15px]'>
            Home
          </Link>
          <Link to='/ideas' className='text-gray-900 hover:text-gray-900 font-medium transition text-[15px]'>
            Ideas
          </Link>
          {user && (
            <Link
              to='/ideas/new'
              className='bg-blue-800 hover:bg-blue-900 text-white font-medium transition px-4 py-2.5 rounded-full text-sm shadow-sm shadow-blue-200'
            >
              + Submit Idea
            </Link>
          )}

          {!user? (
            <div className='flex items-center gap-2 ml-2'>

              <Link to='/login' className='bg-blue-900 hover:bg-blue text-white font-medium px-5 py-2.5 rounded-full text-sm transition'>
                Login
              </Link>
              <Link to='/register' className='bg-gray-900 hover:bg-black text-white font-medium px-5 py-2.5 rounded-full text-sm transition'>
                Register
              </Link>
            </div>
          ) : (
            <div className='flex items-center gap-4 ml-2 border-l pl-4 border-gray-200'>
              <span className='text-gray-700 text-sm font-medium'>
                Hi, {user?.name?.split(' ')[0] || 'there'}
              </span>
              <button
                onClick={handleLogout}
                className='text-red-500 hover:text-red-700 font-medium transition text-sm'
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition'
        >
          {isOpen? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2'>
          <div className='px-6 py-6 flex flex-col gap-5'>
            <Link onClick={() => setIsOpen(false)} to='/' className='text-gray-700 font-medium'>
              Home
            </Link>
            <Link onClick={() => setIsOpen(false)} to='/ideas' className='text-gray-700 font-medium'>
              Ideas
            </Link>

            <hr className='border-gray-100' />

            {user && (
              <Link
                onClick={() => setIsOpen(false)}
                to='/ideas/new'
                className='bg-blue-600 text-white text-center font-medium px-4 py-3 rounded-xl'
              >
                + Submit Idea
              </Link>
            )}

            {!user? (
              <div className='flex flex-col gap-3'>
                <Link onClick={() => setIsOpen(false)} to='/login' className='text-center bg-gray-100 py-3 rounded-xl font-medium'>
                  Login
                </Link>
                <Link onClick={() => setIsOpen(false)} to='/register' className='text-center bg-gray-900 text-white py-3 rounded-xl font-medium'>
                  Register
                </Link>
              </div>
            ) : (
              <div className='flex flex-col gap-3'>
                <span className='text-gray-600 text-sm'>Welcome, {user?.name}</span>
                <button onClick={handleLogout} className='text-left text-red-600 font-medium'>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );

};

export default Header;
