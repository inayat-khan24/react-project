import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, ChevronDown, ChevronRight, 
  MoreVertical, Menu, X 
} from 'lucide-react';
import UserCard from '../component/UserCard.jsx';
import Footer from '../component/Footer.jsx';



const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};







const Dashboard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('EVEN');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        const enhancedUsers = users.map(u => ({
            ...u,
            image: `https://i.pravatar.cc/150?img=${u.id + 10}`,
            album: 'Album 1'
        }));
        setData(enhancedUsers);
      } catch (error) {
        console.error("API Error, using fallback");
        setData(Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            image: `https://i.pravatar.cc/150?img=${i + 15}`,
            album: 'Album 1'
        })));
      }
    };
    fetchData();
  }, []);

  // Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const checkHighlight = (id) => {
    if (filterType === 'ODD') return id % 2 !== 0;
    if (filterType === 'EVEN') return id % 2 === 0;
    if (filterType === 'PRIME') return isPrime(id);
    return false;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex h-screen w-screen bg-[#115e59] overflow-hidden font-sans relative">
      
      {/* 1. SIDEBAR (Mobile & Desktop) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#115e59] transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 flex flex-col pt-6 pb-4 text-teal-100 shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col flex-1 space-y-1">
            <div className="px-8 mb-6 md:hidden flex justify-end">
                <X onClick={() => setIsSidebarOpen(false)} className="cursor-pointer" />
            </div>
            {['My Info.', 'Blogs', 'General Info.', 'Team'].map((item) => (
              <div key={item} className="px-8 py-3 cursor-pointer hover:text-white flex justify-between items-center text-sm">
                <span>{item}</span>
                {item.includes('Info') && item !== 'My Info.' && <ChevronRight size={14} className="opacity-70"/>}
              </div>
            ))}
            <div className="relative mt-2">
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-[#f8f9fa] z-0" />
                <div className="bg-[#f8f9fa] ml-6 rounded-l-[30px] py-3 pl-8 pr-4 text-[#115e59] font-bold flex items-center shadow-sm relative z-10 text-sm">
                    <span>Photos</span>
                </div>
            </div>
        </div>
        
        <button className="px-8 py-3 text-left text-red-300 hover:text-red-100 text-sm" onClick={handleLogout}>
            Log Out
        </button>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 bg-[#f8f9fa] md:rounded-l-[40px] my-0 md:my-2 md:mr-2 p-4 md:p-5 flex flex-col shadow-2xl relative h-full md:h-[calc(100vh-16px)] overflow-hidden">
        
        {/* Header */}
      <header className="flex justify-between items-center mb-4 shrink-0">
            <div className="flex items-center gap-3">
                <Menu className="md:hidden text-gray-800 cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
                <h1 className="text-lg md:text-xl font-bold text-gray-800">Photo Management</h1>
            </div>
            <div className="flex items-center space-x-3">
                <Bell size={18} className="text-gray-500 cursor-pointer" />
                <div className="flex items-center space-x-2 cursor-pointer">
                    <span className="hidden sm:inline text-xs font-semibold text-gray-700">{user?.name || "Nirav Parmar"}</span>
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">NP</div>
                </div>
            </div>
        </header>

        {/* Filters Section */}

        <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-3 shrink-0">
            <div className="relative w-full lg:w-64">
                <input type="text" placeholder="Search by name" 
                    className="w-full pl-4 pr-10 py-2 rounded-xl border border-gray-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-600 shadow-sm"
                    value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={14} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
                <button className="px-3 py-1.5 bg-purple-50 text-gray-700 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span>Album</span> <ChevronDown size={12}/>
                </button>
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                    {['ODD', 'EVEN', 'PRIME'].map(type => (
                        <button key={type} onClick={() => { setFilterType(type); setCurrentPage(1); }}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${filterType === type ? 'bg-white shadow text-[#115e59]' : 'text-gray-500 hover:text-gray-700'}`}>
                            {type}
                        </button>
                    ))}
                </div>
                <button className="flex-1 sm:flex-none px-4 py-1.5 bg-[#115e59] text-white text-xs font-bold rounded-xl shadow-lg hover:bg-teal-800 transition">Add Photo</button>
            </div>
        </div>

        {/* Grid Content Container */}
<div className="flex-1 min-h-0 w-full mb-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 h-full w-full">
        {currentItems.map((item) => (
            <UserCard
                key={item.id} 
                item={item} 
                highlight={checkHighlight(item.id)} 
                type={filterType} 
            />
        ))}

        {/* Filler: Agar data 8 se kam ho, to grid structure maintain rahega */}
        {currentItems.length > 0 && currentItems.length < 8 && (
            [...Array(8 - currentItems.length)].map((_, i) => (
                <div key={`empty-${i}`} className="hidden lg:block invisible" />
            ))
        )}
    </div>

    {/* No Results Message */}
    {filteredData.length === 0 && (
        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No results found for "{search}"
        </div>
    )}
</div>

        {/* Pagination Footer */}
        <Footer filteredData = {filteredData } currentPage = {currentPage} itemsPerPage= {itemsPerPage}
        totalPages ={totalPages} setCurrentPage  = {setCurrentPage }
        />
      </main>
    </div>
  );
};

export default Dashboard;