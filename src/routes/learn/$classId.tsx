
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { 
    ArrowLeft, 
    Bookmark, 
    Share2, 
    Play, 
    Volume2, 
    Settings, 
    Maximize, 
    CheckCircle, 
    Lightbulb, 
    Sparkles, 
    FileText, 
    Maximize2, 
    Minimize2,
    Download, 
    Copy,
    MessageSquare,
    BrainCircuit,
    HelpCircle,
    Send,
    ChevronLeft,
    ChevronRight,
    RotateCw
} from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/data/store/auth_store'
import { getToken } from '@/lib/token-handler'
import { apiClient } from '@/lib/api-client'
import { AUTH } from '@/data/const/api_path'

export const Route = createFileRoute('/learn/$classId')({
    beforeLoad: async () => {
        const { isAuthenticated, login, logout } = useAuthStore.getState()
        const token = getToken()
        
        if (!isAuthenticated) {
            if (token) {
                try {
                    const userData = await apiClient.get(AUTH.ME)
                    login(userData)
                    return 
                } catch (error) {
                    console.error("Session timeout", error)
                }
            }
            logout()
            throw redirect({ to: '/login' })
        }
    },
    component: ClassLessonView,
})

function ClassLessonView() {
    const { classId } = Route.useParams()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<'chat' | 'flashcards' | 'quiz' | 'summary'>('summary')
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

    return (
        <div className="flex h-screen w-full bg-white dark:bg-zinc-950 text-slate-800 dark:text-slate-100 font-sans overflow-hidden">
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="flex-shrink-0 h-16 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center px-6 justify-between z-10">
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/classes/$classId" 
                            params={{ classId }}
                            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <nav className="flex items-center text-sm font-medium text-slate-500">
                            <span className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer">Web Development 101</span>
                            <span className="mx-2 text-slate-300">/</span>
                            <span className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer">Module 3: CSS Styling</span>
                            <span className="mx-2 text-slate-300">/</span>
                            <span className="text-slate-900 dark:text-white font-semibold">CSS Grid Layout Deep Dive</span>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">
                            <Bookmark className="w-5 h-5" />
                            Save
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    <main className="flex-1 overflow-y-auto bg-[#F8F8F8] dark:bg-black/20 p-6 lg:p-10 flex flex-col">
                        <div className="max-w-5xl mx-auto w-full flex flex-col gap-6 flex-1">
                            {/* Video Player Placeholder */}
                            <div className="aspect-video w-full bg-black rounded-2xl shadow-lg overflow-hidden relative group">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-20 group-hover:bg-[#2280c3] group-hover:text-white active:scale-95">
                                        <Play className="w-8 h-8 text-white ml-1 fill-current" />
                                    </div>
                                </div>
                                {/* Background Image Overlay */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center opacity-60" 
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCys9uc_SI6Ykm2IqM4qQhr-V6AjeCWT-RwSkvEqiwajRcUG-_z-jNsdNbLO4fdZ4a9WY-Ywf2vNHLahMdyqcfk2F9QRIhw3yI2Mr5r1xTOY91BoaeaO1qiity45p7OcgtPWCUL_yHLo2Lep3lS7ntqnNHW8xE3DV6EtgGIh-gHDTczmCfBgmKSjaOZhNUvaOP-ffEJNXECAsA374YM7bHp8tzgqyKdYA-HWNsdo5HwzWKx4H_cz17x02EQyHHORMdoESHaDhdWOjzX')" }}
                                ></div>
                                
                                {/* Video Controls Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end px-6 pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-full flex items-center gap-4 text-white">
                                        <Play className="w-5 h-5 cursor-pointer hover:text-[#2280c3] transition-colors" />
                                        <div className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer relative group/timeline">
                                            <div className="absolute left-0 top-0 h-full w-1/3 bg-[#2280c3] rounded-full"></div>
                                            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm scale-0 group-hover/timeline:scale-100 transition-transform"></div>
                                        </div>
                                        <span className="text-xs font-medium">04:20 / 12:45</span>
                                        <Volume2 className="w-5 h-5 cursor-pointer hover:text-slate-300 transition-colors" />
                                        <Settings className="w-5 h-5 cursor-pointer hover:text-slate-300 transition-colors" />
                                        <Maximize className="w-5 h-5 cursor-pointer hover:text-slate-300 transition-colors" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-200 dark:border-zinc-800">
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">CSS Grid Layout Deep Dive</h1>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Learn how to create complex, two-dimensional layouts using CSS Grid. This lesson covers grid containers, tracks, lines, and areas, giving you full control over your web designs.
                                    </p>
                                    <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            <span>1.2k views</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[18px]">update</span>
                                            <span>Last updated 2 days ago</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#2280c3] hover:bg-[#1a659e] text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(34,128,195,0.15)] transition-all active:scale-95 cursor-pointer">
                                    <CheckCircle className="w-5 h-5" />
                                    Mark as Complete
                                </button>
                            </div>

                            <div className="flex gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-5 h-5 text-slate-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Instructor's Note</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Pay special attention to the `grid-template-areas` section at 08:30. It's a game-changer for responsive design!</p>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className={`bg-white dark:bg-zinc-900 border-l border-slate-100 dark:border-zinc-800 flex flex-col z-20 shadow-xl hidden xl:flex transition-all duration-300 ${isSidebarExpanded ? 'w-[600px]' : 'w-96'}`}>
                        <div className="p-5 border-b border-slate-100 dark:border-zinc-800 bg-gradient-to-r from-white to-purple-50 dark:from-zinc-900 dark:to-purple-900/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Learning Assistant</h2>
                                    <p className="text-xs text-[#8B5CF6] font-medium">Powered by EduAI</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-[#8B5CF6] hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                                title={isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
                            >
                                {isSidebarExpanded ? (
                                    <Minimize2 className="w-4 h-4" />
                                ) : (
                                    <Maximize2 className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <div className="flex border-b border-slate-100 dark:border-zinc-800 overflow-x-auto scrollbar-hide">
                            <button 
                                onClick={() => setActiveTab('chat')}
                                className={`flex-1 py-3 px-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 cursor-pointer
                                    ${activeTab === 'chat' 
                                        ? 'text-[#8B5CF6] border-[#8B5CF6] bg-purple-50/50 dark:bg-purple-900/10' 
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                                    }`}
                            >
                                AI Chat
                            </button>
                            <button 
                                onClick={() => setActiveTab('flashcards')}
                                className={`flex-1 py-3 px-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 cursor-pointer
                                    ${activeTab === 'flashcards' 
                                        ? 'text-[#8B5CF6] border-[#8B5CF6] bg-purple-50/50 dark:bg-purple-900/10' 
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                                    }`}
                            >
                                Flashcards
                            </button>
                            <button 
                                onClick={() => setActiveTab('quiz')}
                                className={`flex-1 py-3 px-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 cursor-pointer
                                    ${activeTab === 'quiz' 
                                        ? 'text-[#8B5CF6] border-[#8B5CF6] bg-purple-50/50 dark:bg-purple-900/10' 
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                                    }`}
                            >
                                Quiz
                            </button>
                            <button 
                                onClick={() => setActiveTab('summary')}
                                className={`flex-1 py-3 px-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 cursor-pointer
                                    ${activeTab === 'summary' 
                                        ? 'text-[#8B5CF6] border-[#8B5CF6] bg-purple-50/50 dark:bg-purple-900/10' 
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                                    }`}
                            >
                                Summary
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/30 dark:bg-black/20">
                            {activeTab === 'summary' && <SummaryView />}
                            {activeTab === 'chat' && <ChatView />}
                            {activeTab === 'flashcards' && <FlashcardsView />}
                            {activeTab === 'quiz' && <QuizView />}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

function SummaryView() {
    return (
        <>
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#8B5CF6]" />
                        Topic Summary
                    </h3>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="space-y-4">
                        <section>
                            <h4 className="text-[13px] uppercase tracking-wider font-bold text-[#8B5CF6] mb-2">Core Concept</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                CSS Grid Layout is a highly powerful 2-dimensional system for the web. Unlike Flexbox, which is primarily 1-dimensional, Grid handles both <strong>columns</strong> and <strong>rows</strong> simultaneously.
                            </p>
                        </section>
                        <section>
                            <h4 className="text-[13px] uppercase tracking-wider font-bold text-[#8B5CF6] mb-2">Key Terminology</h4>
                            <ul className="space-y-2 list-none p-0">
                                <li className="flex gap-2">
                                    <span className="text-[#8B5CF6] font-bold">•</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Grid Container:</strong> The parent element where <code>display: grid</code> is applied.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[#8B5CF6] font-bold">•</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Grid Tracks:</strong> The space between two adjacent grid lines (columns or rows).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[#8B5CF6] font-bold">•</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Grid Cell:</strong> The smallest unit on a grid, where a row and column intersect.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[#8B5CF6] font-bold">•</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300"><strong>Fractional Units (fr):</strong> A flexible unit that represents a fraction of the available space.</span>
                                </li>
                            </ul>
                        </section>
                        <section className="bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10 p-4 rounded-xl border border-[#8B5CF6]/10">
                            <h4 className="text-[13px] uppercase tracking-wider font-bold text-[#8B5CF6] mb-2">Why use Grid?</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                "Grid allows you to define complex layouts that previously required hacky floats or heavy frameworks, making your code cleaner and more maintainable."
                            </p>
                        </section>
                        <section>
                            <h4 className="text-[13px] uppercase tracking-wider font-bold text-[#8B5CF6] mb-2">The 'Magic' Feature</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                <code>grid-template-areas</code> provides a visual way to describe your layout structure directly in your CSS, making it incredibly intuitive for responsive design.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800">
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer">
                        <Download className="w-5 h-5 text-[18px]" />
                        Download PDF
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer">
                        <Copy className="w-5 h-5 text-[18px]" />
                        Copy
                    </button>
                </div>
            </div>
        </>
    )
}

function ChatView() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-indigo-600 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 dark:text-slate-300 shadow-sm max-w-[85%]">
                        Hello! I'm your learning assistant. I can help you understand CSS Grid better. Feel free to ask me anything about the video!
                    </div>
                </div>
                
                <div className="flex flex-col gap-2 items-end">
                    <div className="bg-[#8B5CF6] text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-sm max-w-[85%]">
                        What is the difference between grid-template-rows and grid-auto-rows?
                    </div>
                    <span className="text-[10px] text-slate-400">10:42 AM</span>
                </div>

                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-indigo-600 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 dark:text-slate-300 shadow-sm max-w-[85%]">
                        Great question! 
                        <br/><br/>
                        <strong>grid-template-rows</strong> defines the explicit rows in your grid. You set the exact height for specific rows.
                        <br/><br/>
                        <strong>grid-auto-rows</strong> specifies the size of any <em>implicit</em> rows—rows that are automatically created when you have more content than fits in your defined grid.
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Ask a question..."
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6]"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7c4dff] transition-colors cursor-pointer">
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

function FlashcardsView() {
    const [currentCard, setCurrentCard] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    
    const cards = [
        { q: "What is 'fr' unit?", a: "A fractional unit that represents a fraction of the available space in the grid container." },
        { q: "What does 'grid-gap' do?", a: "It sets the size of the gap (gutter) between rows and columns. It's strictly for spacing, not content." },
        { q: "justify-items vs align-items?", a: "justify-items aligns content horizontally (row axis), while align-items aligns content vertically (column axis)." }
    ]

    const handleNext = () => {
        setIsFlipped(false)
        setTimeout(() => setCurrentCard((prev) => (prev + 1) % cards.length), 300)
    }

    const handlePrev = () => {
        setIsFlipped(false)
        setTimeout(() => setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length), 300)
    }

    return (
        <div className="flex flex-col h-full p-4 pb-6 relative overflow-hidden">
            {/* Inject styles for 3D flip since standard Tailwind might miss these utilities */}
            <style>
                {`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                `}
            </style>

             <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-[#8B5CF6]" />
                    Review Concepts
                </h3>
                <span className="text-xs font-medium text-slate-400">
                    {currentCard + 1} / {cards.length}
                </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center perspective-1000 min-h-0 w-full my-2">
                <div 
                    className={`relative w-full h-full max-h-72 aspect-[4/5] cursor-pointer transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-10 h-10 bg-purple-50 dark:bg-zinc-700/50 rounded-full flex items-center justify-center mb-3 text-[#8B5CF6]">
                            <HelpCircle className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-4">
                            {cards[currentCard].q}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-auto pt-4">Tap to flip</p>
                    </div>

                    {/* Back */}
                    <div 
                        className="absolute inset-0 backface-hidden bg-[#8B5CF6] text-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 text-center rotate-y-180"
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3 text-white">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-medium leading-relaxed overflow-y-auto max-h-full scrollbar-hide">
                             {cards[currentCard].a}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 flex-shrink-0">
                <button 
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <button 
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="w-full py-2.5 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
                    >
                        <RotateCw className="w-4 h-4" />
                        Flip Card
                    </button>
                </div>
                <button 
                    onClick={handleNext}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

function QuizView() {
    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B5CF6]" />
                    Safe-Check Quiz
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
                <div className="space-y-3">
                    <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">Question 1 of 5</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        Which property is used to define the size of columns in a grid container?
                    </h4>
                </div>

                <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl cursor-pointer hover:border-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group">
                        <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 rounded-full border border-slate-300 dark:border-zinc-600 group-hover:border-[#8B5CF6]">
                            <div className="w-2.5 h-2.5 bg-[#8B5CF6] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">grid-template-rows</span>
                    </label>

                    <label className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/10 border border-[#8B5CF6] rounded-xl cursor-pointer transition-all">
                        <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 rounded-full border border-[#8B5CF6]">
                            <div className="w-2.5 h-2.5 bg-[#8B5CF6] rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">grid-template-columns</span>
                    </label>

                    <label className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl cursor-pointer hover:border-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group">
                         <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 rounded-full border border-slate-300 dark:border-zinc-600 group-hover:border-[#8B5CF6]">
                            <div className="w-2.5 h-2.5 bg-[#8B5CF6] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">grid-size</span>
                    </label>

                     <label className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl cursor-pointer hover:border-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group">
                         <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 rounded-full border border-slate-300 dark:border-zinc-600 group-hover:border-[#8B5CF6]">
                            <div className="w-2.5 h-2.5 bg-[#8B5CF6] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">grid-gap</span>
                    </label>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button className="w-full py-3 bg-[#8B5CF6] hover:bg-[#7c4dff] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all transform active:scale-95 cursor-pointer">
                    Check Answer
                </button>
            </div>
        </div>
    )
}
