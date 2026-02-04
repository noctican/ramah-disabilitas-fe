import remarkGfm from 'remark-gfm'
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import ReactPlayer from 'react-player'
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
  RotateCw,
  Save,
} from "lucide-react";



import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/data/store/auth_store";
import { getToken } from "@/lib/token-handler";
import { apiClient } from "@/lib/api-client";
import { AUTH, COURSE, MATERIAL } from "@/data/const/api_path";
import { useQueryData, useMutationAction } from "@/hooks/api/use-global-fetch";
import { useVoiceStore } from "@/data/store/voice_store";
import { useRegisterCommands } from "@/hooks/use-register-command";
import type { ApiResponseType } from "@/data/types/api_response_types";
import type {
  StudentCourseDetail,
  MaterialDetailType,
} from "@/data/types/course_type";
import { z } from "zod";

export const Route = createFileRoute("/learn/$classId")({
  validateSearch: z.object({
    materialId: z.number().optional(),
  }),
  // beforeLoad removed to match other layouts logic
  component: ClassLessonView,
});

function ClassLessonView() {
  const { classId } = Route.useParams();
  const { materialId } = Route.useSearch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore()
  const speak = useVoiceStore((state) => state.speak)
  
  // Auth Check (Client Side)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" })
    }
  }, [isAuthenticated, navigate])

  const [activeTab, setActiveTab] = useState<
    "chat" | "flashcards" | "quiz" | "summary"
  >("summary");


  const [sidebarWidth, setSidebarWidth] = useState(384); // Default w-96 (24rem = 384px)
  const [isResizing, setIsResizing] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Handlers for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      // Calculate new width relative to the right side of the screen
      const newWidth = window.innerWidth - e.clientX;

      // Set limits (min 300px, max 900px)
      if (newWidth >= 300 && newWidth <= 900) {
        setSidebarWidth(newWidth);
        setIsSidebarExpanded(newWidth > 500);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);



  // Fetch Course Detail (for navigation context)
  const { data: courseData } = useQueryData<
    ApiResponseType<"single", StudentCourseDetail>
  >(COURSE.STUDENT_DETAIL, { course_id: classId });
  const course = courseData?.data;

  // Determine active material ID
  const activeMaterialId =
    materialId || course?.modules?.[0]?.materials?.[0]?.id;

  // Fetch Material Detail
  const { data: materialData, isLoading: isLoadingMaterial } = useQueryData<
    ApiResponseType<"single", MaterialDetailType>
  >(activeMaterialId ? MATERIAL.GET_DETAIL : "", {
    material_id: activeMaterialId,
  });
  const material = materialData?.data;

  const { trigger: markAsDone, isMutating: isMarkingDone } = useMutationAction(
    MATERIAL.MARK_AS_DONE,
    "post",
    { refreshKey: MATERIAL.GET_DETAIL }
  );

  const handleMarkAsDone = async () => {
    if (!material?.id || material.is_completed) return;
    try {
      await markAsDone({ material_id: material.id });
      speak("Selamat! Materi berhasil diselesaikan.");
    } catch (error) {
      console.error(error);
      speak("Gagal menandai materi selesai.");
    }
  };

  useRegisterCommands([
    {
      pattern: /^buka chat$/i,
      priority: 5,
      description: "Membuka tab chat AI",
      action: () => {
        setActiveTab("chat")
        speak("Membuka chat AI")
      }
    },
    {
      pattern: /^buka panel\s+(.+)$/i,
      priority: 10,
      description: "buka panel <nama panel> ",
      action: ([match]) => {
        let tabName = match
        if(['ringkasan', 'summary'].includes(tabName.toLowerCase())){
          tabName = 'summary'
        }else if(['kuis', 'quiz'].includes(tabName.toLowerCase())){
          tabName = 'quiz'
        }else if(['flashcard', 'kartu'].includes(tabName.toLowerCase())){
          tabName = 'flashcards'
        }else if(['chat', 'ai', 'cat', 'cet', 'obrolan', 'chatbot'].includes(tabName.toLowerCase())){
          tabName = 'chat'
        }
        setActiveTab(tabName as "chat" | "flashcards" | "quiz" | "summary")
        console.log({tabName})
        speak(`Membuka panel ${tabName}`)
      }
    },
    {
      pattern: /^tandai+(.+)+selesai$/i,
      description: "Menandai materi sebagai selesai",
      action: () => {
         handleMarkAsDone()
      }
    }
  ])

  // Redirect to first material if no materialId in URL
  if (course && !materialId && activeMaterialId) {
    navigate({
      to: "/learn/$classId",
      params: { classId },
      search: { materialId: activeMaterialId },
      replace: true,
    });
  }

  if (!course || (isLoadingMaterial && !material)) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Memuat materi...
      </div>
    );
  }

  // Determine current module based on active material
  const currentModule = course.modules.find((m) =>
    m.materials.some((mat) => mat.id === activeMaterialId)
  );

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
              <Link
                to="/classes"
                className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px] md:max-w-none"
              >
                {course?.title}
              </Link>
              {currentModule && (
                <>
                  <span className="mx-2 text-slate-300">/</span>
                  <span className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px] md:max-w-none">
                    {currentModule.title}
                  </span>
                </>
              )}
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-slate-900 dark:text-white font-semibold text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px] md:max-w-none">
                {material?.title}
              </span>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-[#F8F8F8] dark:bg-black/20 p-6 lg:p-10 flex flex-col">
            <div className="max-w-5xl mx-auto w-full flex flex-col gap-6 flex-1">
              {/* Video Player or Content */}
              {(material?.type === "video" || material?.type === "youtube") ? (
                <div className="aspect-video w-full bg-black rounded-2xl shadow-lg overflow-hidden relative group">
                  {/* React Player for Youtube and other video sources */}
                  {material.source_url ? (
                    <div className="w-full h-full">
                         {(() => {
                             const getYoutubeId = (url: string) => {
                                 const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                                 const match = url?.match(regExp);
                                 return (match && match[2].length === 11) ? match[2] : null;
                             }
                             const youtubeId = getYoutubeId(material.source_url);

                             if (youtubeId) {
                                 return (
                                    <iframe 
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${youtubeId}`}
                                        title={material.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                 )
                             }

                             const VideoPlayer = ReactPlayer as any;
                             return (
                                <VideoPlayer
                                    url={material.source_url}
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                />
                             )
                         })()}
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      Sumber Video Tidak Tersedia
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 lg:p-4 min-h-[600px] flex flex-col">
                  {(material?.type === "pdf" ||
                    material?.source_url?.toLowerCase().includes(".pdf")) &&
                  material.source_url ? (
                    <div className="h-[800px] border border-slate-200 dark:border-zinc-700 rounded-lg overflow-hidden relative">
                      <iframe
                        src={material.source_url.replace('http:', 'https:')}
                        className="w-full h-full"
                        title={material.title}
                      />
                    </div>
                  ) : (
                    <div className="prose dark:prose-invert max-w-none p-4">
                      {material?.raw_content ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: material.raw_content,
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                          <FileText className="w-16 h-16 text-slate-300 mb-4" />
                          <p className="text-slate-500 mb-4">
                            Materi ini berupa file eksternal.
                          </p>
                          {material?.source_url && (
                            <a
                              href={material.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors cursor-pointer"
                            >
                              Buka Materi
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-200 dark:border-zinc-800">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {material?.title}
                  </h1>
                  {/* <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {material?.smart_feature?.summary ||
                      "Tidak ada ringkasan tersedia."}
                  </p> */}
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    {material?.duration_min && (
                      <div className="flex items-center gap-1.5">
                        <span>Dapat diselesaikan dalam {material.duration_min} menit</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleMarkAsDone}
                  disabled={isMarkingDone || material?.is_completed}
                  className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 font-semibold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                    material?.is_completed
                      ? "bg-green-100 text-green-700 shadow-none"
                      : "bg-primary-500 hover:bg-primary-600 text-white shadow-[0_0_15px_rgba(34,128,195,0.15)]"
                  }`}
                >
                  {isMarkingDone ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Proses...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {material?.is_completed ? "Selesai" : "Tandai Selesai"}
                    </>
                  )}
                </button>
              </div>

              <div className="flex gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Catatan Instruktur
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Perhatikan baik-baik bagian `grid-template-areas` pada menit 08:30. Ini sangat penting untuk desain responsif!
                  </p>
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside
            className="bg-white dark:bg-zinc-900 border-l border-slate-100 dark:border-zinc-800 flex flex-col z-20 shadow-xl hidden xl:flex relative"
            style={{
              width: sidebarWidth,
              transition: isResizing ? "none" : "width 300ms ease-in-out",
            }}
          >
            {/* Drag Handle */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5 hover:bg-primary-400 cursor-ew-resize z-50 transition-colors group"
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizing(true);
              }}
            >
              <div className="absolute inset-y-0 left-[-2px] right-[-2px] group-hover:bg-primary-500/10"></div>
            </div>

            <div className="p-5 border-b border-slate-100 dark:border-zinc-800 bg-gradient-to-r from-white to-primary-50 dark:from-zinc-900 dark:to-primary-900/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    Asisten Belajar
                  </h2>
                  <p className="text-xs text-primary font-medium">
                    Ditenagai oleh EduAI
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (isSidebarExpanded) {
                    setSidebarWidth(384);
                    setIsSidebarExpanded(false);
                  } else {
                    setSidebarWidth(600);
                    setIsSidebarExpanded(true);
                  }
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title={
                  isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"
                }
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
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-3 px-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 cursor-pointer
                                    ${
                                      activeTab === "chat"
                                        ? "text-primary border-primary bg-primary-50/50 dark:bg-primary-900/10"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                                    }`}
              >
                Chat AI
              </button>
              <button
                onClick={() => setActiveTab("flashcards")}
                className={`flex-1 py-3 px-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 cursor-pointer
                                    ${
                                      activeTab === "flashcards"
                                        ? "text-primary border-primary bg-primary-50/50 dark:bg-primary-900/10"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                                    }`}
              >
                Flashcard
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`flex-1 py-3 px-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 cursor-pointer
                                    ${
                                      activeTab === "quiz"
                                        ? "text-primary border-primary bg-primary-50/50 dark:bg-primary-900/10"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                                    }`}
              >
                Kuis
              </button>
              <button
                onClick={() => setActiveTab("summary")}
                className={`flex-1 py-3 px-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 cursor-pointer
                                    ${
                                      activeTab === "summary"
                                        ? "text-primary border-primary bg-primary-50/50 dark:bg-primary-900/10"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                                    }`}
              >
                Ringkasan
              </button>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/30 dark:bg-black/20">
              {activeTab === "summary" && <SummaryView material={material} />}
              {activeTab === "chat" && <ChatView material={material} />}
              {activeTab === "flashcards" && <FlashcardsView material={material} />}
              {activeTab === "quiz" && <QuizView material={material} />}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SummaryView({ material }: { material?: MaterialDetailType }) {
  const [previewSummary, setPreviewSummary] = useState<string | null>(null);

  const { trigger: generateSummary, isMutating: isGenerating } =
    useMutationAction(MATERIAL.GENERATE_SUMMARY, "post");

  const { trigger: saveSummary, isMutating: isSaving } = useMutationAction(
    MATERIAL.SAVE_SUMMARY,
    "post",
    { refreshKey: MATERIAL.GET_DETAIL }
  );

  const speak = useVoiceStore((state) => state.speak)

  const materialRef = useRef(material)
  useEffect(() => {
    materialRef.current = material
  }, [material])

  const displaySummaryRef = useRef(previewSummary)
  useEffect(() => {
    displaySummaryRef.current = previewSummary
  }, [previewSummary])

  const previewSummaryRef = useRef(previewSummary)
  useEffect(() => {
    previewSummaryRef.current = previewSummary
  }, [previewSummary])

  useRegisterCommands([
    {
      pattern: /^buat ringkasan$/i,
      description: "Generate ringkasan otomatis",
      action: () => {
        if (!materialRef.current?.smart_feature?.summary && !previewSummaryRef.current) {
             speak("Sedang membuat ringkasan, mohon tunggu sebentar.")
             handleGenerate()
        } else {
             speak("Ringkasan sudah tersedia.")
        }
      }
    },
    {
      pattern: /^bacakan ringkasan$/i,
      description: "Membacakan isi ringkasan",
      action: () => {
         const text = displaySummaryRef.current || "Belum ada ringkasan."
         speak(text.substring(0, 200) + (text.length > 200 ? "... dan seterusnya" : ""))
      }
    },
    {
      pattern: /^simpan ringkasan$/i,
      description: "Menyimpan ringkasan yang sedang dipreview",
      action: () => {
        if (previewSummaryRef.current) {
            handleSave()
            speak("Menyimpan ringkasan")
        } else {
            speak("Tidak ada ringkasan baru untuk disimpan")
        }
      }
    }
  ])

  const handleGenerate = async () => {
    if (!material?.id) return;
    try {
      const res = await generateSummary({ material_id: material.id });
      if (res?.data?.summary) {
        setPreviewSummary(res.data.summary);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!material?.id || !previewSummary) return;
    try {
      await saveSummary({ material_id: material.id, summary: previewSummary });
      setPreviewSummary(null);
    } catch (error) {
      console.error(error);
    }
  };

  const displaySummary = previewSummary || material?.smart_feature?.summary;

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Ringkasan Topik
          </h3>
        </div>

        {displaySummary ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{displaySummary}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 dark:border-zinc-700 rounded-xl mt-10">
            <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Belum ada ringkasan
            </h4>
            <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
              Generate ringkasan otomatis menggunakan AI untuk materi ini.
            </p>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-500/20 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Membuat...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Buat Ringkasan
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Save Preview Bar */}
      {previewSummary && (
        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800 flex justify-end gap-3 animate-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setPreviewSummary(null)}
            className="px-4 py-2 text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 font-medium text-sm cursor-pointer"
          >
            {isSaving ? (
              "Menyimpan..."
            ) : (
              <>
                <Save className="w-4 h-4" />
                Simpan Ringkasan
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: string
}

function ChatView({ material }: { material?: MaterialDetailType }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { trigger: sendChat, isMutating: isLoading } = useMutationAction(
        MATERIAL.CHAT,
        'post'
    )

    const speak = useVoiceStore((state) => state.speak)

    const handleSendMessage = async (msg?: string) => {
        const messageToSend = msg || input.trim()
        if (!messageToSend || !material?.id) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageToSend,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")

        try {
            const res = await sendChat({ 
                material_id: material.id,
                question: userMessage.content 
            })

            const answer = res?.data?.answer || "Maaf, saya tidak dapat menemukan jawaban saat ini."
            
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: answer,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            
            setMessages(prev => [...prev, aiMessage])
            speak(answer)

        } catch (error) {
            console.error(error)
             const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Maaf, terjadi kesalahan saat memproses pertanyaan Anda. Silakan coba lagi.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, errorMessage])
            speak("Maaf, terjadi kesalahan.")
        }
    }

    useRegisterCommands([
        {
          pattern: /(?:tanya|bertanya|chat)\s+(.+)/i,
          description: "Bertanya kepada AI. Contoh: 'tanya apa itu react'",
          action: ([question]) => {
            handleSendMessage(question)
          }
        }
    ])

    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: 'init',
                    role: 'assistant',
                    content: "Halo! Saya asisten belajar Anda. Tanyakan apa saja mengenai materi ini, saya siap membantu!",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ])
        }
    }, [])

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])



    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className="flex gap-3 max-w-[85%]">
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary-600 flex items-center justify-center shrink-0 mt-1">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                            )}
                            
                            <div 
                                className={`p-3 rounded-2xl text-sm shadow-sm
                                ${msg.role === 'assistant' 
                                    ? 'bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-700 dark:text-slate-300 rounded-tl-none' 
                                    : 'bg-primary text-white rounded-tr-none'
                                }`}
                            >
                                <div className="markdown-body">
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-400 px-1">{msg.timestamp}</span>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shrink-0 mt-1">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                         <div className="bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 p-4 rounded-2xl rounded-tl-none shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-.3s]"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-.5s]"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800">
                <div className="relative">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        placeholder="Tanyakan sesuatu tentang materi ini..."
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-60"
                    />
                    <button 
                        onClick={() => handleSendMessage()}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

interface Flashcard {
    front: string
    back: string
}

function FlashcardsView({ material }: { material?: MaterialDetailType }) {
    const [cards, setCards] = useState<Flashcard[]>([])
    const [currentCard, setCurrentCard] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [hasGenerated, setHasGenerated] = useState(false)

    const { trigger: generateFlashcards, isMutating: isLoading } = useMutationAction(
        MATERIAL.FLASHCARDS,
        'post'
    )
    
    const speak = useVoiceStore((state) => state.speak)

    useRegisterCommands([
        {
          pattern: /^(?:lanjut|next|selanjutnya)$/i,
          description: "Flashcard selanjutnya",
          action: () => {
            handleNext()
            speak("Kartu selanjutnya")
          }
        },
        {
          pattern: /^(?:balik|mundur|sebelumnya)$/i,
          description: "Flashcard sebelumnya",
          action: () => {
            handlePrev()
            speak("Kartu sebelumnya")
          }
        },
        {
          pattern: /^(?:putar|flip|balik kartu)$/i,
          description: "Memutar kartu flashcard",
          action: () => {
            setIsFlipped(!isFlipped)
            speak("Memutar kartu")
          }
        }, {
          pattern: /^(?:buat|generate)\skartu$/i,
          description: "Membuat flashcard otomatis dari materi ini",
          action: () => {
            handleGenerate()
            speak("Membuat flashcard otomatis dari materi ini")
          }
        }
    ])

    const handleGenerate = async () => {
        if (!material?.id) return
        try {
            const res = await generateFlashcards({ material_id: material.id })
            if (res?.data && Array.isArray(res.data)) {
                setCards(res.data)
                setHasGenerated(true)
                setCurrentCard(0)
                setIsFlipped(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleNext = () => {
        setIsFlipped(false)
        setTimeout(() => setCurrentCard((prev) => (prev + 1) % cards.length), 300)
    }

    const handlePrev = () => {
        setIsFlipped(false)
        setTimeout(() => setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length), 300)
    }

    if (!hasGenerated && cards.length === 0) {
         return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                 <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/10 rounded-full flex items-center justify-center mb-6">
                    <BrainCircuit className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Review Materi Cepat
                </h3>
                <p className="text-slate-500 mb-8 max-w-sm">
                    Buat kartu flashcard otomatis dari materi ini untuk membantu mengingat poin-poin penting.
                </p>
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-[0_0_20px_rgba(139,92,246,0.25)] active:scale-95 cursor-pointer disabled:opacity-70"
                >
                    {isLoading ? (
                        <>
                             <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                             Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 fill-current" />
                            Buat Flashcards
                        </>
                    )}
                </button>
            </div>
        )
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

            <div className="flex items-center justify-between mb-4 shrink-0">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-primary" />
                    Review Konsep
                </h3>
                <span className="text-xs font-medium text-slate-400">
                    {currentCard + 1} / {cards.length}
                </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center perspective-1000 min-h-0 w-full my-2">
                <div 
                    className={`relative w-full h-full max-h-72 aspect-4/5 cursor-pointer transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-10 h-10 bg-primary-50 dark:bg-zinc-700/50 rounded-full flex items-center justify-center mb-3 text-primary">
                            <HelpCircle className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-6">
                            {cards[currentCard]?.front}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-auto pt-4">Ketuk untuk balik</p>
                    </div>

                    {/* Back */}
                    <div 
                        className="absolute inset-0 backface-hidden bg-primary text-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 text-center rotate-y-180"
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3 text-white">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-medium leading-relaxed overflow-y-auto max-h-full scrollbar-hide">
                            {cards[currentCard]?.back}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 shrink-0">
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
                        Balik Kartu
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

interface QuizQuestion {
    question_text: string
    option_a: string
    option_b: string
    option_c: string
    option_d: string
    option_e: string
    correct_answer: string
    explanation: string
    difficulty: string
}

function QuizView({ material }: { material?: MaterialDetailType }) {
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [quizState, setQuizState] = useState<'idle' | 'loading' | 'active' | 'finished'>('idle')

    const { trigger: generateQuiz, isMutating: isLoading } = useMutationAction(
        MATERIAL.QUIZ,
        'post'
    )

    const handleStartQuiz = async () => {
        if (!material?.id) return
        setQuizState('loading')
        try {
            const res = await generateQuiz({ 
                material_id: material.id,
                count: 5 
            })
            if (res?.data && Array.isArray(res.data)) {
                setQuestions(res.data)
                setQuizState('active')
                setCurrentIndex(0)
                setScore(0)
                setShowResult(false)
                setSelectedAnswer(null)
            }
        } catch (error) {
            console.error(error)
            setQuizState('idle')
        }
    }

    const handleAnswer = (option: string) => {
        if (showResult) return
        setSelectedAnswer(option)
    }

    const handleCheckAnswer = () => {
        if (!selectedAnswer) return
        
        const currentQuestion = questions[currentIndex]
        const isCorrect = selectedAnswer === currentQuestion.correct_answer
        
        if (isCorrect) {
            setScore(prev => prev + 1)
        }
        
        setShowResult(true)
    }

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelectedAnswer(null)
            setShowResult(false)
        } else {
            setQuizState('finished')
        }
    }

    if (quizState === 'idle') {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                 <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Uji Pemahamanmu
                </h3>
                <p className="text-slate-500 mb-8 max-w-sm">
                    Generate kuis interaktif dari materi ini untuk menguji seberapa jauh pemahaman kamu.
                </p>
                <button
                    onClick={handleStartQuiz}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-[0_0_20px_rgba(139,92,246,0.25)] active:scale-95 cursor-pointer disabled:opacity-70"
                >
                    {isLoading ? (
                        <>
                             <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                             Membuat Kuis...
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5 fill-current" />
                            Mulai Kuis
                        </>
                    )}
                </button>
            </div>
        )
    }

    if (quizState === 'loading') {
         return (
            <div className="flex flex-col items-center justify-center h-full">
                <span className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></span>
                <p className="text-slate-500 font-medium">Sedang membuat soal kuis...</p>
            </div>
        )
    }

    if (quizState === 'finished') {
        return (
             <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                 <div className="w-20 h-20 bg-green-50 dark:bg-green-900/10 rounded-full flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Kuis Selesai!
                </h3>
                <p className="text-slate-500 mb-2">Skor Kamu</p>
                <div className="text-5xl font-black text-primary mb-8">
                    {Math.round((score / questions.length) * 100)}
                </div>
                <div className="flex gap-4">
                     <button
                        onClick={handleStartQuiz}
                        className="px-6 py-2.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        Coba Lagi
                    </button>
                     <button
                        onClick={() => setQuizState('idle')}
                        className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors cursor-pointer"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        )
    }

    const currentQuestion = questions[currentIndex]
    
    // Map API options to easier format
    const options = [
        { key: 'a', text: currentQuestion.option_a },
        { key: 'b', text: currentQuestion.option_b },
        { key: 'c', text: currentQuestion.option_c },
        { key: 'd', text: currentQuestion.option_d },
        { key: 'e', text: currentQuestion.option_e },
    ].filter(opt => opt.text) // Filter out empty options if any

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Safe-Check Quiz
                </h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                    {currentIndex + 1} / {questions.length}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
                <div className="space-y-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        Pertanyaan {currentIndex + 1}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {currentQuestion.question_text}
                    </h4>
                </div>

                <div className="space-y-3">
                    {options.map((option) => {
                        const isSelected = selectedAnswer === option.key
                        const isCorrect = option.key === currentQuestion.correct_answer
                        
                        let borderClass = "border-slate-200 dark:border-zinc-700 hover:border-primary"
                        let bgClass = "bg-white dark:bg-zinc-800"
                        
                        if (showResult) {
                            if (isCorrect) {
                                borderClass = "border-green-500"
                                bgClass = "bg-green-50 dark:bg-green-900/20"
                            } else if (isSelected && !isCorrect) {
                                borderClass = "border-red-500"
                                bgClass = "bg-red-50 dark:bg-red-900/20"
                            }
                        } else if (isSelected) {
                             borderClass = "border-primary"
                             bgClass = "bg-primary-50 dark:bg-primary-900/10"
                        }

                        return (
                             <button
                                key={option.key}
                                onClick={() => handleAnswer(option.key)}
                                disabled={showResult}
                                className={`w-full flex items-start gap-3 p-4 border rounded-xl text-left transition-all group ${borderClass} ${bgClass} ${showResult ? '' : 'cursor-pointer'}`}
                            >
                                <div className={`relative flex items-center justify-center w-5 h-5 mt-0.5 rounded-full border border-slate-300 dark:border-zinc-600 ${isSelected || (showResult && isCorrect) ? 'border-primary' : ''}`}>
                                    {(isSelected || (showResult && isCorrect)) && (
                                         <div className={`w-2.5 h-2.5 rounded-full ${showResult && isCorrect ? 'bg-green-500' : (showResult && isSelected ? 'bg-red-500' : 'bg-primary')}`}></div>
                                    )}
                                </div>
                                <span className={`text-sm ${isSelected ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-600 dark:text-slate-300'}`}>
                                    {option.text}
                                </span>
                            </button>
                        )
                    })}
                </div>
                
                {showResult && (
                    <div className="p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 rounded-xl text-sm leading-relaxed border border-primary-100 dark:border-primary-900/30 animate-in fade-in slide-in-from-top-2">
                        <strong>Penjelasan:</strong> {currentQuestion.explanation}
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
                {!showResult ? (
                    <button 
                        onClick={handleCheckAnswer}
                        disabled={!selectedAnswer}
                        className="w-full py-3 bg-primary hover:bg-primary-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all transform active:scale-95 cursor-pointer disabled:opacity-50 disabled:shadow-none disabled:active:scale-100"
                    >
                        Periksa Jawaban
                    </button>
                ) : (
                    <button 
                        onClick={handleNext}
                        className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer"
                    >
                        {currentIndex < questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Selesaikan Kuis'}
                    </button>
                )}
            </div>
        </div>
    )
}
