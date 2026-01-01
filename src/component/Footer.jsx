import React from 'react'

const Footer = ({filteredData,currentPage,itemsPerPage,totalPages,setCurrentPage }) => {
  return (
   <footer className="mt-4 md:mt-2 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-gray-500 pt-3 shrink-0 border-t border-gray-100">
            <p>Showing {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}</p>
            
            <div className="flex items-center space-x-1">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} 
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 cursor-pointer">
                    &lt;
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} 
                        className={`w-6 h-6 rounded-full font-bold text-[10px] transition-all ${currentPage === i + 1 ? 'bg-[#115e59] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                        {i + 1}
                    </button>
                ))}
                
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} 
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 cursor-pointer">
                    &gt;
                </button>
            </div>
        </footer>
  )
}

export default Footer
