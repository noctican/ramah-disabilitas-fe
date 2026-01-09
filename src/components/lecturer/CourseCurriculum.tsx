import { useState } from 'react'
import {
  LayoutGrid,
  GripVertical,
  Trash2,
  PlayCircle,
  Plus,
  ChevronDown,
  PlusCircle,
  FileText,
  Upload
} from 'lucide-react'
import { AddMaterialModal, type MaterialPayload } from './AddMaterialModal'

export interface Material {
  id: number | string
  title: string
  type: 'text' | 'youtube' | 'pdf' | 'video'
  raw_content?: string
  source_url?: string
  duration_min: number
  has_captions?: boolean // made optional
  file?: File // Added file property
}

export interface Module {
  id: number | string
  title: string
  order: number
  materials: Material[]
  isExpanded: boolean 
}

interface CourseCurriculumProps {
  modules: Module[]
  setModules: React.Dispatch<React.SetStateAction<Module[]>>
}

export function CourseCurriculum({ modules, setModules }: CourseCurriculumProps) {
  const [isAllExpanded, setIsAllExpanded] = useState(true)
  const [activeModuleId, setActiveModuleId] = useState<number | string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddModule = () => {
    setModules(prev => [
      ...prev,
      {
        id: Date.now(),
        title: `Bab ${prev.length + 1}: Judul Baru`,
        order: prev.length + 1,
        isExpanded: true,
        materials: []
      }
    ])
  }

  const toggleModule = (id: string | number) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, isExpanded: !m.isExpanded } : m))
  }
  
  const toggleAllModules = () => {
      const newState = !isAllExpanded
      setIsAllExpanded(newState)
      setModules(prev => prev.map(m => ({ ...m, isExpanded: newState })))
  }

  const updateModuleTitle = (id: string | number, newTitle: string) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, title: newTitle } : m))
  }

  const deleteModule = (id: string | number) => {
    if (window.confirm('Yakin ingin menghapus modul ini? Semua materi di dalamnya akan hilang.')) {
        setModules(prev => prev.filter(m => m.id !== id))
    }
  }

  const openAddMaterialModal = (moduleId: number | string) => {
      setActiveModuleId(moduleId)
      setIsModalOpen(true)
  }

  const handleSaveMaterial = (payload: MaterialPayload) => {
      if (!activeModuleId) return
      
      setModules(prev => prev.map(m => {
          if (m.id === activeModuleId) {
              return {
                  ...m,
                  materials: [...m.materials, {
                      id: Date.now(),
                      title: payload.title,
                      type: payload.type,
                      raw_content: payload.raw_content,
                      source_url: payload.source_url,
                      duration_min: payload.duration_min,
                      file: payload.file,
                      has_captions: false
                  }]
              }
          }
          return m
      }))
  }

  const deleteMaterial = (moduleId: number | string, materialId: number | string) => {
      setModules(prev => prev.map(m => {
          if (m.id === moduleId) {
              return {
                  ...m,
                  materials: m.materials.filter(mat => mat.id !== materialId)
              }
          }
          return m
      }))
  }

  return (
    <>
    <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                <LayoutGrid className="w-5 h-5" />
            </div>
            Kurikulum
            </h3>
            <button onClick={toggleAllModules} className="text-sm font-semibold text-[#4f46e5] hover:text-[#4338ca] dark:text-[#6366f1] cursor-pointer">
            {isAllExpanded ? 'Tutup Semua' : 'Buka Semua'}
            </button>
        </div>

        <div className="p-6 bg-gray-50/50 dark:bg-[#0f172a]/50 space-y-4">
            
            {modules.map((module, index) => (
            <div key={module.id} className="bg-white dark:bg-[#1e293b] rounded-xl border border-[#e0e7ff] dark:border-[#1e293b]/50 shadow-sm overflow-hidden ring-1 ring-[#6366f1]/20">
                {/* Module Header */}
                <div className="p-4 flex items-center gap-3">
                    <GripVertical className="text-slate-300 cursor-grab hover:text-slate-500 w-5 h-5" />
                    <div className="flex-1">
                    {module.isExpanded ? (
                        <div className="flex justify-between items-start">
                        <div className="w-full mr-4">
                            <input 
                            value={module.title}
                            onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                            type="text" 
                            className="w-full font-bold text-slate-900 dark:text-white bg-transparent border-none p-0 focus:ring-0 text-base outline-none" 
                            />
                            <p className="text-xs text-slate-500 mt-1">{module.materials.length} Pelajaran • Bab {index + 1}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => deleteModule(module.id)} className="p-1 text-slate-400 hover:text-red-500 transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{module.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{module.materials.length} Pelajaran</p>
                        </div>
                        </div>
                    )}
                    </div>
                    <button onClick={() => toggleModule(module.id)} className="p-1.5 text-slate-400 hover:bg-gray-100 dark:hover:bg-[#0f172a] rounded-lg transition-all cursor-pointer">
                    <ChevronDown className={`w-5 h-5 transition-transform ${module.isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Module Content */}
                {module.isExpanded && (
                    <div className="px-4 pb-4">
                    <div className="space-y-2 pl-2 border-l-2 border-gray-100 dark:border-gray-700 ml-2">
                        {module.materials.map((mat) => (
                            <div key={mat.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1e293b]/50 group transition-all">
                                <div className={`w-8 h-8 rounded-lg ${
                                    mat.type === 'youtube' || mat.type === 'video' ? 'bg-red-100 text-red-600' : 
                                    mat.type === 'pdf' ? 'bg-orange-100 text-orange-600' :
                                    'bg-blue-100 text-blue-600'
                                } flex items-center justify-center shrink-0`}>
                                    {mat.type === 'youtube' || mat.type === 'video' ? <PlayCircle className="w-5 h-5" /> : 
                                     mat.type === 'pdf' ? <Upload className="w-5 h-5" /> :
                                    <FileText className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1">{mat.title}</p>
                                    <p className="text-xs text-slate-400">{mat.duration_min} Menit • {mat.type}</p>
                                </div>
                                <button 
                                    onClick={() => deleteMaterial(module.id, mat.id)}
                                    className="p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {module.materials.length === 0 && (
                            <div className="text-sm text-slate-400 italic p-2 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-center py-4 bg-gray-50/50">
                                Belum ada materi. Klik tombol di bawah untuk menambahkan.
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => openAddMaterialModal(module.id)}
                        className="mt-3 ml-2 text-xs font-bold text-[#4f46e5] dark:text-[#6366f1] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Tambah Pelajaran
                    </button>
                    </div>
                )}
            </div>
            ))}

            {/* Add Module Button */}
            <button onClick={handleAddModule} className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm font-semibold text-slate-500 hover:text-[#4f46e5] hover:border-[#6366f1] hover:bg-[#eef2ff] dark:hover:bg-[#0f172a]/10 transition-all flex items-center justify-center gap-2 group cursor-pointer">
            <PlusCircle className="group-hover:scale-110 transition-all w-5 h-5" />
            Tambah Modul Baru
            </button>

        </div>
    </div>
    
    <AddMaterialModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveMaterial}
        moduleId={activeModuleId || ''} 
    />
    </>
  )
}
