import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  LayoutDashboard,
  Book,
  Users,
  MessageSquare,
  MoreVertical,
  Menu,
  Moon,
  Sun,
  Rocket,
  FileEdit,
  Image,
  CloudUpload,
  LayoutGrid,
  GripVertical,
  Edit,
  Trash2,
  PlayCircle,
  FileText,
  Plus,
  ChevronDown,
  PlusCircle,
  Key,
  RefreshCw,
  Copy,
  CheckCircle,
  ChevronRight
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/lecturer/course/create')({
  component: CreateCoursePage,
})

function CreateCoursePage() {
  const [copyFeedback, setCopyFeedback] = useState(false)
  const [isModuleExpanded, setIsModuleExpanded] = useState(true)

  const handleCopyCode = () => {
    navigator.clipboard.writeText('4K8-X9L')
    setCopyFeedback(true)
    setTimeout(() => setCopyFeedback(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#f7f7f8] dark:bg-[#020617] relative font-sans text-slate-800 dark:text-slate-200 rounded-xl overflow-hidden">
      
      {/* Header (recreated to match design, assuming sticky behavior within container) */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
            <a href="/lecturer/course" className="hover:text-slate-900 dark:hover:text-white transition-all">Courses</a>
            <ChevronRight className="mx-2 w-4 h-4 text-slate-300" />
            <span className="text-slate-900 dark:text-white bg-gray-100 dark:bg-[#1e293b] px-2 py-0.5 rounded-md">Create New</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>
          {/* Header Actions Moved to Bottom */}
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth pb-32">
        <div className="max-w-4xl mx-auto pb-10">
          
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Create New Course</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Design your curriculum, upload assets, and get ready to teach.</p>
          </div>

          <div className="space-y-6">
              
              {/* Card: Basic Info */}
              <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <div className="p-1.5 bg-[#e0e7ff] dark:bg-[#1e293b] text-[#4f46e5] rounded-lg">
                    <FileEdit className="w-5 h-5" />
                  </div>
                  Course Details
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label htmlFor="course-title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Course Title</label>
                    <input type="text" id="course-title" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-gray-400 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all outline-none" placeholder="e.g. Masterclass in UX Design" />
                  </div>
                  <div>
                    <label htmlFor="course-desc" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                    <textarea id="course-desc" rows={4} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-white placeholder-gray-400 focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all outline-none resize-none" placeholder="What will students learn in this course?"></textarea>
                  </div>
                </div>
              </div>

               {/* Join Code Widget (Moved here) */}
               <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                        <Key className="text-[#6366f1] w-5 h-5" />
                        Student Access
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                        Share this unique code with students for self-enrollment.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto p-4 bg-slate-50 dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-gray-800">
                        <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white tracking-widest">4K8-X9L</div>
                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                        <div className="flex gap-2">
                             <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer" title="Reset Code">
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={handleCopyCode} 
                                className={`p-2 transition-colors cursor-pointer ${
                                copyFeedback ? 'text-green-500' : 'text-[#4f46e5] hover:text-[#4338ca]'
                                }`}
                                title="Copy Code"
                            >
                                {copyFeedback ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
              </div>

              {/* Card: Media */}
              <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <div className="p-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-lg">
                    <Image className="w-5 h-5" />
                  </div>
                  Cover Media
                </h3>
                
                <div className="relative group cursor-pointer">
                  <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-[#1e293b]/50 hover:bg-[#eef2ff] dark:hover:bg-[#0f172a]/10 hover:border-[#6366f1] dark:hover:border-[#6366f1] transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="p-3 bg-white dark:bg-[#1e293b] rounded-full shadow-sm mb-3 group-hover:scale-110 transition-all">
                        <CloudUpload className="w-8 h-8 text-[#6366f1]" />
                      </div>
                      <p className="mb-1 text-sm text-slate-600 dark:text-slate-300 font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (MAX. 10MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </div>
                </div>
              </div>

              {/* Card: Curriculum */}
              <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    Curriculum
                  </h3>
                  <button onClick={() => setIsModuleExpanded(prev => !prev)} className="text-sm font-semibold text-[#4f46e5] hover:text-[#4338ca] dark:text-[#6366f1] cursor-pointer">
                    {isModuleExpanded ? 'Collapse All' : 'Expand All'}
                  </button>
                </div>

                <div className="p-6 bg-gray-50/50 dark:bg-[#0f172a]/50 space-y-4">
                  
                  {/* Active Module */}
                  {isModuleExpanded && (
                    <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-[#e0e7ff] dark:border-[#1e293b]/50 shadow-sm overflow-hidden ring-1 ring-[#6366f1]/20">
                      <div className="p-4 flex items-start gap-3">
                        <GripVertical className="text-slate-300 cursor-grab mt-1 hover:text-slate-500 w-5 h-5" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div className="w-full mr-4">
                              <input type="text" defaultValue="Module 1: Introduction" className="w-full font-bold text-slate-900 dark:text-white bg-transparent border-none p-0 focus:ring-0 text-base outline-none" />
                              <input type="text" defaultValue="Getting started with the basics." className="w-full text-sm text-slate-500 dark:text-slate-400 bg-transparent border-none p-0 focus:ring-0 mt-1 outline-none" />
                            </div>
                            <div className="flex items-center gap-1">
                              <button className="p-1 text-slate-400 hover:text-[#6366f1] transition-all cursor-pointer"><Edit className="w-4 h-4" /></button>
                              <button className="p-1 text-slate-400 hover:text-red-500 transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>

                          {/* Lessons List */}
                          <div className="space-y-2 pl-2 border-l-2 border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1e293b]/50 group transition-all cursor-pointer">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shrink-0">
                                <PlayCircle className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1">1.1 Welcome to the Course</span>
                              <span className="text-xs text-slate-400">04:20</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1e293b]/50 group transition-all cursor-pointer">
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1">1.2 Course Syllabus & Tools</span>
                              <span className="text-xs text-slate-400">Read</span>
                            </div>
                          </div>
                          
                          <button className="mt-3 text-xs font-bold text-[#4f46e5] dark:text-[#6366f1] hover:underline flex items-center gap-1 cursor-pointer">
                            <Plus className="w-4 h-4" /> Add Lesson
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isModuleExpanded && (
                    <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                       <div className="p-4 flex items-center gap-3">
                         <GripVertical className="text-slate-300 cursor-grab hover:text-slate-500 w-5 h-5" />
                         <div className="flex-1">
                           <h4 className="font-bold text-slate-900 dark:text-white text-sm">Module 1: Introduction</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">2 Lessons • 15 Mins</p>
                         </div>
                         <button onClick={() => setIsModuleExpanded(true)} className="p-1.5 text-slate-400 hover:bg-gray-100 dark:hover:bg-[#0f172a] rounded-lg transition-all cursor-pointer">
                           <ChevronDown className="w-5 h-5" />
                         </button>
                       </div>
                    </div>
                  )}

                  {/* Collapsed Module (Mockup for second module) */}
                  <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                    <div className="p-4 flex items-center gap-3">
                      <GripVertical className="text-slate-300 cursor-grab hover:text-slate-500 w-5 h-5" />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Module 2: Advanced Concepts</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">3 Lessons • 45 Mins</p>
                      </div>
                      <button className="p-1.5 text-slate-400 hover:bg-gray-100 dark:hover:bg-[#0f172a] rounded-lg transition-all cursor-pointer">
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Add Module Button */}
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm font-semibold text-slate-500 hover:text-[#4f46e5] hover:border-[#6366f1] hover:bg-[#eef2ff] dark:hover:bg-[#0f172a]/10 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                    <PlusCircle className="group-hover:scale-110 transition-all w-5 h-5" />
                    Add New Module
                  </button>

                </div>
              </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Bottom Action Bar */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] sticky bottom-0 z-40 flex justify-end gap-3 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)]">
         <button className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-[#2e3b4e] rounded-xl transition-all cursor-pointer">
            Save Draft
          </button>
          <button className="inline-flex items-center gap-2 px-8 py-2.5 text-sm font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] rounded-xl shadow-lg shadow-[#6366f1]/30 transition-all active:scale-95 cursor-pointer">
            <Rocket className="w-[18px] h-[18px]" />
            Publish Course
          </button>
      </div>
      
      {/* Toast Notification (Conditional Render) */}
      {copyFeedback && (
        <div className="fixed bottom-5 right-5 bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <CheckCircle className="text-green-400 dark:text-green-600 w-5 h-5" />
            <span className="font-medium text-sm">Code copied to clipboard!</span>
        </div>
      )}
    </div>
  )
}
