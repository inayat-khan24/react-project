import React from 'react';
import { 
  
  MoreVertical, Menu, X 
} from 'lucide-react';
const UserCard = ({ item, highlight, type }) => {

    const COLORS = ['bg-blue-100', 'bg-yellow-100', 'bg-purple-100', 'bg-green-100', 'bg-pink-100'];
    return(
  <div className="bg-white rounded-[15px] p-4 lg:p-2 text-center shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col items-center justify-center min-h-[140px] border border-transparent">
    <div className="absolute top-2 right-2 text-gray-300 cursor-pointer hover:text-gray-500">
      <MoreVertical size={14} />
    </div>
    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${COLORS[item.id % COLORS.length]}`}>
      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
    </div>
    <div className="w-full flex flex-col items-center">
      <h3 className="text-gray-800 font-bold text-xs mb-1 truncate w-full px-1">{item.name}</h3>
      {highlight ? (
        <div className="mt-1 w-[80%] bg-[#115e59] text-white text-[10px] py-1 rounded-lg font-bold shadow-sm uppercase tracking-wider">
          {type}
        </div>
      ) : (
        <>
          <div className="inline-block bg-cyan-50 text-cyan-500 text-[9px] font-bold px-2 py-0.5 rounded-full mb-1">Album 1</div>
          <p className="text-gray-400 text-[9px] truncate">{item.email}</p>
        </>
      )}
    </div>
  </div>
)};

export default UserCard