import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Briefcase, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 w-full z-50 glass-card border-b-0 rounded-none shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.div whileHover={{ rotate: 15 }} transition={{ type: 'spring' }}>
                                <Briefcase className="w-8 h-8 text-indigo-600 dark:text-cyan-400" />
                            </motion.div>
                            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500">SkillBridge</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/services" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400 font-medium transition-colors">
                            Explore Services
                        </Link>

                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4 border-l border-gray-200 dark:border-slate-700 pl-6">
                                <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400 font-medium transition-colors">
                                    Dashboard
                                </Link>
                                
                                <div 
                                    className="relative"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <button className="flex items-center gap-2 focus:outline-none">
                                        {user.profilePicture ? (
                                            <img src={user.profilePicture} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-indigo-100 dark:border-slate-700 shadow-md" />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </button>
                                    
                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-slate-700 py-2 z-50"
                                            >
                                                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                                    <UserIcon className="w-4 h-4" /> Profile
                                                </Link>
                                                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-left transition-colors">
                                                    <LogOut className="w-4 h-4" /> Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-cyan-400 font-medium transition-colors">
                                    Log in
                                </Link>
                                <Link to="/signup" className="btn-glow text-sm py-2 px-5">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button Tabs */}
                    <div className="md:hidden flex items-center gap-4">
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                        </button>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="p-2 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                Explore Services
                            </Link>
                            
                            {user ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                        Dashboard
                                    </Link>
                                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                        Profile ({user.name})
                                    </Link>
                                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 grid gap-3">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium btn-secondary">
                                        Log in
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full text-center btn-glow py-2">
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
