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
import { postFetcher, putFetcher } from '@/lib/api-client'
import { MODULE, MATERIAL } from '@/data/const/api_path'
import { toast } from 'sonner'
import { Edit, Eye } from 'lucide-react'

export interface Material {
  id: number | string
  title: string
  type: 'text' | 'youtube' | 'pdf' | 'video'
  raw_content?: string
  source_url?: string
  duration_min: number
  has_captions?: boolean
  file?: File
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
  onDeleteModule?: (id: number | string) => Promise<void>
  onDeleteMaterial?: (moduleId: number | string, materialId: number | string) => Promise<void>
}

export function CourseCurriculum({ modules, setModules, onDeleteModule, onDeleteMaterial }: CourseCurriculumProps) {
  const [isAllExpanded, setIsAllExpanded] = useState(true)
  const [activeModuleId, setActiveModuleId] = useState<number | string | null>(null)
  const [activeMaterialForEdit, setActiveMaterialForEdit] = useState<Material | null>(null)
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

  const deleteModule = async (id: string | number) => {
    if (window.confirm('Yakin ingin menghapus modul ini? Semua materi di dalamnya akan hilang.')) {
        try {
            if (onDeleteModule) {
                await onDeleteModule(id)
            }
            setModules(prev => prev.filter(m => m.id !== id))
        } catch (error) {
            console.error("Failed to delete module", error)
        }
    }
  }

  const openAddMaterialModal = (moduleId: number | string) => {
      setActiveModuleId(moduleId)
      setActiveMaterialForEdit(null) // Reset edit mode
      setIsModalOpen(true)
  }

  const openEditMaterialModal = (moduleId: number | string, material: Material) => {
      setActiveModuleId(moduleId)
      setActiveMaterialForEdit(material)
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

  const deleteMaterial = async (moduleId: number | string, materialId: number | string) => {
      try {
           if (onDeleteMaterial) {
               await onDeleteMaterial(moduleId, materialId)
           }
           setModules(prev => prev.map(m => {
              if (m.id === moduleId) {
                  return {
                      ...m,
                      materials: m.materials.filter(mat => mat.id !== materialId)
                  }
              }
              return m
          }))
      } catch (error) {
          console.error("Failed to delete material", error)
      }
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
            <button onClick={toggleAllModules} className="text-sm font-semibold text-primary hover:text-primary-700 cursor-pointer">
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
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    {/* Preview Button */}
                                    {mat.source_url && (
                                        <a 
                                            href={mat.source_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                                            title="Preview Materi"
                                            onClick={(e) => {
                                                // If it's a PDF or we want custom preview logic later
                                                // e.preventDefault(); 
                                                // openPreviewModal(mat);
                                            }}
                                        >
                                           <div className="w-4 h-4"><Eye className="w-4 h-4" /></div>
                                        </a>
                                    )}

                                    <button 
                                        onClick={() => openEditMaterialModal(module.id, mat)}
                                        className="p-1.5 text-slate-400 hover:text-[#6366f1] transition-colors cursor-pointer"
                                        title="Edit Materi"
                                    >
                                        <div className="w-4 h-4"><Edit className="w-4 h-4" /></div> 
                                    </button>
                                    <button 
                                        onClick={() => deleteMaterial(module.id, mat.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                                        title="Hapus Materi"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
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
                        className="mt-3 ml-2 text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Tambah Pelajaran
                    </button>
                    </div>
                )}
            </div>
            ))}

            {/* Add Module Button */}
            <button onClick={handleAddModule} className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm font-semibold text-slate-500 hover:text-primary hover:border-[#6366f1] hover:bg-[#eef2ff] dark:hover:bg-[#0f172a]/10 transition-all flex items-center justify-center gap-2 group cursor-pointer">
            <PlusCircle className="group-hover:scale-110 transition-all w-5 h-5" />
            Tambah Modul Baru
            </button>

        </div>
    </div>
    
    <AddMaterialModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
                onSave={async (payload) => {
                    const isTempModule = typeof activeModuleId === 'number' && activeModuleId > 1000000000000
                    const isEditMode = !!payload.id && (typeof payload.id !== 'number' || payload.id < 1000000000000); // Check if existing real ID
                    const isTempMaterial = !!payload.id && typeof payload.id === 'number' && payload.id > 1000000000000;

                    // CASE 1: Updating an Existing Material (On Server)
                    if (isEditMode && !isTempModule) {
                         try {
                             toast.info('Memperbarui materi...')
                             const formData = new FormData()
                             formData.append('title', payload.title)
                             formData.append('type', payload.type)
                             formData.append('duration_min', payload.duration_min.toString())
                             if (payload.file) formData.append('file', payload.file)
                             if (payload.raw_content) formData.append('raw_content', payload.raw_content);
                             if (payload.source_url && !payload.file) formData.append('source_url', payload.source_url);

                             // eslint-disable-next-line @typescript-eslint/no-explicit-any
                             const res = await putFetcher(MATERIAL.UPDATE.replace('{material_id}', String(payload.id)), { arg: formData })

                             setModules(prev => prev.map(m => {
                                if (m.id === activeModuleId) {
                                    return {
                                        ...m,
                                        materials: m.materials.map(mat => mat.id === payload.id ? {
                                            ...mat,
                                            title: res.data.title,
                                            type: res.data.type,
                                            raw_content: res.data.raw_content,
                                            source_url: res.data.source_url, // Updated URL from server
                                            duration_min: res.data.duration_min,
                                        } : mat)
                                    }
                                }
                                return m
                             }))
                             toast.success('Materi berhasil diperbarui')
                         } catch (error: any) {
                             console.error(error)
                             toast.error(error.response?.data?.message || 'Gagal memperbarui materi')
                         }
                         return;
                    }

                    // CASE 2: Uploading NEW Material with File (On Server)
                    if (!isTempModule && payload.file && !isEditMode && !isTempMaterial) {
                        try {
                             toast.info('Mengunggah materi...')
                             const formData = new FormData()
                             formData.append('title', payload.title)
                             formData.append('type', payload.type)
                             formData.append('duration_min', payload.duration_min.toString())
                             if (payload.file) formData.append('file', payload.file)
                             
                             // eslint-disable-next-line @typescript-eslint/no-explicit-any
                             const res = await postFetcher(MODULE.CREATE_MATERIAL.replace('{module_id}', String(activeModuleId)), { arg: formData })
                             
                             setModules(prev => prev.map(m => {
                                if (m.id === activeModuleId) {
                                    return {
                                        ...m,
                                        materials: [...m.materials, {
                                            id: res.data.id, 
                                            title: res.data.title,
                                            type: res.data.type,
                                            raw_content: res.data.raw_content,
                                            source_url: res.data.source_url,
                                            duration_min: res.data.duration_min,
                                            has_captions: res.data.has_captions
                                        }]
                                    }
                                }
                                return m
                             }))
                             toast.success('Materi berhasil diunggah')
                        } catch (error: any) {
                            console.error(error)
                            toast.error(error.response?.data?.message || 'Gagal mengunggah materi')
                        }
                    } 
                    
                    // CASE 3: Local State Update (Temp Module OR Non-File New Material OR Temp Material Edit)
                    else {
                        if (payload.id) {
                            // Update existing temp material
                            setModules(prev => prev.map(m => {
                                if (m.id === activeModuleId) {
                                    return {
                                        ...m,
                                        materials: m.materials.map(mat => mat.id === payload.id ? {
                                            ...mat,
                                            title: payload.title,
                                            type: payload.type,
                                            raw_content: payload.raw_content,
                                            source_url: payload.file ? URL.createObjectURL(payload.file) : payload.source_url,
                                            file: payload.file, // Keep file for later batch upload if needed
                                            duration_min: payload.duration_min
                                        } : mat)
                                    }
                                }
                                return m
                            }))
                        } else {
                            // Add new temp material
                            handleSaveMaterial(payload)
                        }
                    }
                }}
                moduleId={activeModuleId || ''} 
                initialData={activeMaterialForEdit}
            />
    </>
  )
}
