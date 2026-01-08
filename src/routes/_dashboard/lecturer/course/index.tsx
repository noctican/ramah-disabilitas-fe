import { createFileRoute, Link } from '@tanstack/react-router'
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  Grid, 
  CheckCircle, 
  FileEdit, 
  Archive, 
  MoreHorizontal, 
  ArrowRight, 
  Settings, 
  Edit 
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/lecturer/course/')({
    component: CourseManagementPage,
})

function CourseManagementPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f7f7f8] dark:bg-[#22252a] relative font-sans text-[#121416] dark:text-white rounded-xl">
      {/* Top Header Area */}
      <header className="w-full px-8 pt-8 pb-4 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Title Block */}
          <div className="flex flex-col gap-1">
            <h2 className="text-[#121416] dark:text-white text-3xl font-extrabold tracking-tight">My Courses</h2>
            <p className="text-[#6a7581] dark:text-gray-400 text-base font-normal">Manage your curriculum, content and student progress.</p>

          </div>

          {/* Primary Action */}
          <Link 
            to="/lecturer/course/create"
            className="flex items-center gap-2 bg-[#6699cc] hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-[#6699cc]/30 transition-all active:scale-95 group cursor-pointer"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Create New Course
          </Link>
        </div>
        
        {/* Toolbar / Filters */}
        <div className="mt-8 flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
          {/* Search & Sort */}
          <div className="flex flex-1 w-full xl:w-auto gap-3 items-center">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6699cc] transition-colors w-5 h-5" />
              <input 
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1e2126] border-none rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-[#6699cc]/50 text-[#121416] dark:text-white placeholder:text-gray-400 transition-all outline-none" 
                placeholder="Search courses by name, tag or ID..." 
                type="text"
              />
            </div>
            <div className="relative min-w-[160px]">
              <select className="w-full pl-4 pr-10 py-3 bg-white dark:bg-[#1e2126] border-none rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-[#6699cc]/50 text-[#121416] dark:text-white appearance-none cursor-pointer outline-none">
                <option>Sort by: Newest</option>
                <option>Sort by: Name (A-Z)</option>
                <option>Sort by: Status</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
            </div>
          </div>
          
          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 no-scrollbar w-full xl:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#6699cc] text-white rounded-lg shadow-md shadow-[#6699cc]/20 text-sm font-semibold transition-transform hover:-translate-y-0.5 cursor-pointer">
              <Grid className="w-[18px] h-[18px]" />
              All Courses
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e2126] text-gray-600 dark:text-gray-300 hover:text-[#6699cc] hover:bg-blue-50 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-blue-100 dark:hover:border-white/10 text-sm font-medium transition-all cursor-pointer">
              <CheckCircle className="w-[18px] h-[18px] text-green-500" />
              Live
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e2126] text-gray-600 dark:text-gray-300 hover:text-[#6699cc] hover:bg-blue-50 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-blue-100 dark:hover:border-white/10 text-sm font-medium transition-all cursor-pointer">
              <FileEdit className="w-[18px] h-[18px] text-amber-500" />
              Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e2126] text-gray-600 dark:text-gray-300 hover:text-[#6699cc] hover:bg-blue-50 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-blue-100 dark:hover:border-white/10 text-sm font-medium transition-all cursor-pointer">
              <Archive className="w-[18px] h-[18px] text-purple-500" />
              Archived
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Grid Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          
          {/* Card 1: Live Course */}
          <div className="group bg-white dark:bg-[#1e2126] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_#E0E6F0] dark:shadow-[0_4px_20px_#000000] border border-transparent dark:border-gray-800 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmMR9cCRbbKtrrhmRFk84jf2GIiBS8CEEJqP2HmcY5rwEaefT-rBSLfb-ho46FSnkTpZyuETzMdGx6Za9WBlIIyfyU8KyipgFIcjLbhfVxH5PFIZD1g8xu7fQ0Jqul7BVE0xizzH0SV1_7CBGUMNjIjF-zhgKuMoFtiFVaK2nb0PltomZU2gn3vj3vAQdM_1WaWiymMDZ4BUNow-hLJp780gXz2vi7epgPvQFEpq9d31ugCYKDBMbizU8Oh24D3Hh9d1lb9v_eUhY")' }}
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm text-green-700 dark:text-green-400 text-xs font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2 rounded-full hover:bg-white text-gray-700 shadow-sm cursor-pointer">
                  <MoreHorizontal className="text-lg w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#121416] dark:text-white leading-tight group-hover:text-[#6699cc] transition-colors">Introduction to UX Design</h3>
              </div>
              <p className="text-sm text-[#6a7581] dark:text-gray-400 mb-4 line-clamp-2">Learn the comprehensive fundamentals of user experience design, wireframing, and prototyping.</p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img alt="Student avatar" className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1e2126]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcJhFxeMbGOGb3K739BMqr9Y7J8z5DCHCgABROhr2U2PzpVre982X7JbX0XHX5d-dyJUgdrj77AaOCKFx544f4Xs3DD2JElqCDvx77lUL8Oosb30nb_sV1wDeWQHN1Ct5naQIBHJ5qjYxY6EHwm-8sFEqn-qxHJ_3xEFEv_xxf9xvV1w8xfiYSVM8KbHSr4NOyu94gSFy55aJr3f5VSkIWGnjvq54SkEugDgVLjjdSkicxLMAjDn9Y6IpzBARrzY7Y3NvapQ9YcUU"/>
                    <img alt="Student avatar" className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1e2126]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoEA--BkR3UidnMYLE7CIuU6uydoX8tdA-rh5mMpWk045waU8eMOsRBBGa34DXgWJ3cfqnbcXuJWQytaPeBiHwWQs4q2NEF7maC_Oplzuvh2rNfEjgyTSBsly02HFH7NntiAVov2gILXCsxZlEzWLAY_gDabXJq64r4nDqDk78yU30v2Hxi72vEKqhrCRbf3tMlEuCMFcb6ecNSUmBH2VlSfo4a7MVfZUTIb901Bs_Ad0vUIPPL4oq9wj2ceWm06i5iuiikzcKlC0"/>
                    <img alt="Student avatar" className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1e2126]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCg8T037RpbDYxNlElRnP1oea9_2ojwNDGJBsAuYmtOh91o56idORQjxZI9sKpqB7XVkVgmShJTZFfrOnecBLtXj6qtp7g5dBBSC3rsmS8ETnSzGDcIvxGMFNJG-7Ya2-A5zRG5jnCDvg15ULx_NIWVp3zSobeDDL-YvQahxKInXO_3s9-N7fRAv5SnTqCW-1xR81aIKJYVnbyuxc3gWdubqvH9VbXQUVp9rZQz0nwT9id82HYLBHlgfvp0qA2F1nQvgTA1OeF0SQ"/>
                  </div>
                  <span className="text-xs text-[#6a7581] font-medium">+42 enrolled</span>
                </div>
                <button className="text-[#6699cc] hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm flex items-center gap-1 transition-colors cursor-pointer">
                  Manage <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Draft Course */}
          <div className="group bg-white dark:bg-[#1e2126] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_#E0E6F0] dark:shadow-[0_4px_20px_#000000] border border-transparent dark:border-gray-800 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
               <div 
                 className="absolute inset-0 bg-cover bg-center grayscale-[30%] transition-transform duration-700 group-hover:scale-105" 
                 style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAS-_EjGkwhdhWuIqAjbsglRnTw7oar-3BmIWglfpxh7acXZZMayjlaOw3jM9N148PkrW-F9lV9MITZ8PE0UAEk-EVAvmAtRbW1izSsgM5feXDXl_E79h87xeKO1uHgOLnAQCzkiobxe771pLWEdNtVFsAeGOXCErbZnItWJilqR78KzUL1j9O0HlIuKkeTfCMRm3MkW-cDpwr_0Ma8BD1QzXtwZ6LsjipVGdemDOCyxIc0d84aclIbQq2hhgDjCSbgD82ztoTEXL0")' }}
               />
               <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors"></div>
               <div className="absolute top-3 left-3">
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm text-amber-700 dark:text-amber-400 text-xs font-bold shadow-sm">
                   <FileEdit className="w-[14px] h-[14px]" />
                   Draft
                 </span>
               </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#121416] dark:text-white leading-tight group-hover:text-[#6699cc] transition-colors">Advanced Python for Data Science</h3>
              </div>
              <p className="text-sm text-[#6a7581] dark:text-gray-400 mb-4 line-clamp-2">Master pandas, numpy, and visualization libraries. A deep dive into data manipulation techniques.</p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                <span className="text-xs text-[#6a7581] font-medium italic">Last edited 2h ago</span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[#6a7581] dark:text-gray-300 transition-colors cursor-pointer" title="Edit Content">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[#6a7581] dark:text-gray-300 transition-colors cursor-pointer" title="Settings">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Live Course */}
          <div className="group bg-white dark:bg-[#1e2126] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_#E0E6F0] dark:shadow-[0_4px_20px_#000000] border border-transparent dark:border-gray-800 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                 style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMdi4DKalg1GROOttTv6oh3NDidgygIVO4-Ats1FAHrtUk0pRJJ1GwmLl5EVD4liewlbRu3LIitdglyFGqzRE595ux9dM90Jcf21Do250IjHk6211Hb0XtQ1orvgfl7zI3eMBNlAo7SXZI10eSU_K5WUoCRTz7q7qJ8J4X5uK2MXJk2319x_-H0QndEbr32ska7fb04UuPGX9xKt55pX8Bn_73HlFKRHyXw6lewMEssEI4pD-GpsldLa0bqHxQn6sPX7RR13F1fxY")' }}
               />
               <div className="absolute top-3 left-3">
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm text-green-700 dark:text-green-400 text-xs font-bold shadow-sm">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   Live
                 </span>
               </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#121416] dark:text-white leading-tight group-hover:text-[#6699cc] transition-colors">Modern Architecture 101</h3>
              </div>
              <p className="text-sm text-[#6a7581] dark:text-gray-400 mb-4 line-clamp-2">Exploring the history and theory of modernist architecture from the 20th century to today.</p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img alt="Student avatar" className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1e2126]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5C-hpYvCPIHj7HV4uk7ilxi0apvDuJ1uigMMewBvkE6SWdor7zdiyJNxckmj_6tt1kYOILqwmHdFdDbGrRakcr7hlDMr8y8T75lVTCJUAbrmwyD1dEvZU8AFsFx9noMSyMT1N0K_E8WOBEODWcdnU_nei17dnZG-ELykCoDmT8dV_CWgpPXnzTIsMuY_VqcPFfZ7YkKo04sxuaT1oswiMtgZqw9a5W2B9Qjl3Qt_dkqsjg_2mcDntOzw_e0ZpiIjsiyB1uIHgtQg"/>
                    <img alt="Student avatar" className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1e2126]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZQHxyMVG9tWy_dhb26BP6SMFyKrGlV4fiik6FlmD_aTtmuXCM6FsS4z8sIMsBmxFJFXYW7UWgNdXbejWq7qr6F6ckTT7Y_qalt5IJQO2q7DFBFfDGa1YlVa1TSVHKweGCl9FLzpShPZSAg_tAbg6Zqi8HyH720xW-zurAobM3bJTVGWClFyaorsvqKfuYUlCyfFftnBcpssJyueS-5iOq2Z079F9EDMESi2pDFnay242Waju3a0xz0BHeB_Fq3f7Kk8NtGIwWkB0"/>
                  </div>
                  <span className="text-xs text-[#6a7581] font-medium">+156 enrolled</span>
                </div>
                <button className="text-[#6699cc] hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm flex items-center gap-1 transition-colors cursor-pointer">
                  Manage <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Draft Course */}
          <div className="group bg-white dark:bg-[#1e2126] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_#E0E6F0] dark:shadow-[0_4px_20px_#000000] border border-transparent dark:border-gray-800 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
               <div 
                 className="absolute inset-0 bg-cover bg-center grayscale-[30%] transition-transform duration-700 group-hover:scale-105" 
                 style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQgNVHBjiVsNOzo3pLHwRLGqLHvu1JjANpvNSDk9VxM8nst-Wnx0rjwubo-Rr8s_tqwCaL4mVYsKSpEHbxdErCDlR93qElakH0wcvtZveSG9UtFZ8Qkt60EUgoaAGxuVsRlPSmVPRGUGsNVHuVJYm9AZbo5gWMg1JzxFy7kcg6TX4bNZadjClwZW7FbsqqFNIGJ305j0ZWF5iheTq-0l86Rd7qmBot-3l2r7Xjgt54hczXeIwOaD2WBYircCzORDjXyDHd4HQBSeY")' }}
               />
               <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors"></div>
               <div className="absolute top-3 left-3">
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm text-amber-700 dark:text-amber-400 text-xs font-bold shadow-sm">
                   <FileEdit className="w-[14px] h-[14px]" />
                   Draft
                 </span>
               </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#121416] dark:text-white leading-tight group-hover:text-[#6699cc] transition-colors">Digital Marketing Strategy</h3>
              </div>
              <p className="text-sm text-[#6a7581] dark:text-gray-400 mb-4 line-clamp-2">Building comprehensive digital campaigns. SEO, SEM, and social media analytics.</p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                <span className="text-xs text-[#6a7581] font-medium italic">Created yesterday</span>
                <div className="flex gap-2">
                   <button className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[#6a7581] dark:text-gray-300 transition-colors cursor-pointer" title="Edit Content">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[#6a7581] dark:text-gray-300 transition-colors cursor-pointer" title="Settings">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Live Course */}
          <div className="group bg-white dark:bg-[#1e2126] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_#E0E6F0] dark:shadow-[0_4px_20px_#000000] border border-transparent dark:border-gray-800 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                 style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCd2RKiMQuflFEfO-H8dc6E3sj7XRUhYiIFD0pdWEfbBLNjWAZlHz37FwugNn4qe1AVNV6evyH9yNwl29RdWyt6LeXSJHVSniKuLslwdGeQNhD_hh1Z6JmeTgAnj9l2gGCQODrwFUAxuWdOBD7JEfkBKu74L_WNVUJMniu1S9hZBPtbpcnOJWNWBqamH8B2NJCxUc_jsJMBrhGF3lCVGeGqQ4W165vS1f_MV-RyO2roftumvAiZpb62OpddgdEmrL7gTSKBFPZvMZk")' }}
               />
               <div className="absolute top-3 left-3">
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm text-green-700 dark:text-green-400 text-xs font-bold shadow-sm">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   Live
                 </span>
               </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#121416] dark:text-white leading-tight group-hover:text-[#6699cc] transition-colors">Art History: Renaissance</h3>
              </div>
              <p className="text-sm text-[#6a7581] dark:text-gray-400 mb-4 line-clamp-2">A journey through the masterpieces of Michelangelo, Da Vinci, and Raphael.</p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img alt="Student avatar" className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1e2126]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw13GDcIEUqzj4KNy9S_9defPSSsQjn9GDKcjVe6uDt9p5Uwii6b69nLDvZGLZmMnRfVNgHZySM_7FILAkaxlbxZoGO7km3B81J-zxoWZGOiCb6_aXeLA-U2q2hrHUv2GeddVnzzYxSqCNql7qSpdYyOVRNfFCPREkgRFUlM9XEwu9XDiseTKfZpoXgUf0ltyjxPxNL1XOGgaDOsUzIqFdvVLBjLuJQj9ppxJaXbTp14dypsTKHzsvKSnwGmpdU4pfV9Co9LsGVFU"/>
                    <img alt="Student avatar" className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1e2126]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnm-m5smFHgZ3XY5I6H8DN9Zr2OrZryCaCmykT8SeEK-oQC4GmQpxopdpteIWpF4O_Z7zZB-gdSA7tpr7ko67ld-QHONit2B2lY1OjPFIKMSWJeF-9wa2bmAI4oJvVW6l4uQwGPzQMmpX958-OOjq6iFfHRnC8kp2Sf57J164ALd3OTURU_VtIj5PN-ixKx1Cj5uwmg1Knm9gznXNc2ImFifOSgEMHUZHoTO7w5ue-TM_R1e4sms_AYakcYyiOfqXwJ3W12ZTco34"/>
                    <img alt="Student avatar" className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1e2126]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9RxmTqtFNQNn0clG6_E0BA9SfoWyEJ6RsbQRTEmsjkZx54GnSBaZ9vhzOdkid7gAjfEkv3mYTTub6Y65ydkW9qAhpLbfYhGxa1pMh98-tZbot_byRSNPZCadHsJjX1rEQxO4nROIPu_5E_LYL4Yt9rSjPfWG6ISR_cLBXadGqyhGudooSvtRLp8K-N8YQm2Rm1yFup9iJLxJcL6udrnPLLLTrf0JpqqlHRoAXfhzCWhNl8y10zrm1sJ2T-7eW0C1vg5l2twLZDZM"/>
                    <div className="w-7 h-7 rounded-full border-2 border-white dark:border-[#1e2126] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500">+80</div>
                  </div>
                </div>
                <button className="text-[#6699cc] hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm flex items-center gap-1 transition-colors cursor-pointer">
                  Manage <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* New Placeholder Card */}
          <div className="group border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center h-full min-h-[360px] cursor-pointer hover:border-[#6699cc]/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all">
            <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 group-hover:bg-[#6699cc]/10 flex items-center justify-center mb-4 transition-colors">
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-[#6699cc] transition-colors" />
            </div>
            <p className="text-[#121416] dark:text-white font-bold text-lg">Create New Course</p>
            <p className="text-[#6a7581] dark:text-gray-400 text-sm mt-1">Start from scratch or template</p>
          </div>

        </div>
        
        <div className="mt-12 text-center">
            <p className="text-[#6a7581] text-sm">Showing 5 of 12 courses</p>
            <button className="mt-4 text-[#6699cc] font-medium hover:underline cursor-pointer">Load More</button>
        </div>
      </div>
    </div>
  )
}
