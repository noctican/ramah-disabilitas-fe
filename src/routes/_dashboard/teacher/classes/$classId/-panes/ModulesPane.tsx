import { useState, type Dispatch, type SetStateAction } from "react"
import { CourseCurriculum, type Module } from "../../-components/CourseCurriculum"
import { fetcher } from "@/lib/api-client"
import { COURSE } from "@/data/const/api_path"
import { useParams } from "@tanstack/react-router"
import { toaster } from "@/lib/toast"
import { Loader2 } from "lucide-react"

type Props = {
    modules: Module[]
    setModules: Dispatch<SetStateAction<Module[]>>
    courseData: any;
}

export const ModulesPane = ({ modules, setModules, courseData }: Props) => {

    const { classId } = useParams({from: "/_dashboard/teacher/classes/$classId/"})

    const [isSaving, setIsSaving] = useState(false)

    
      const handleSaveCurriculum = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = (courseData as any)?.data
        if (!c) return
    
        try {
            setIsSaving(true)
            const formData = new FormData()
            // Re-append existing course info to avoid clearing it
            formData.append('title', c.title)
            formData.append('description', c.description || '')
            formData.append('class_code', c.class_code)
            formData.append('status', c.status)
            // If we had thumbnail file handling here it would be complex, skipping for now as we only edit modules
    
            const modulesPayload = modules.map(({ ...rest }) => ({
                title: rest.title,
                order: rest.order,
                materials: rest.materials.map(mat => ({
                    title: mat.title,
                    type: mat.type,
                    raw_content: mat.raw_content,
                    source_url: mat.source_url,
                    duration_min: mat.duration_min,
                    has_captions: mat.has_captions || false
                }))
            }))
            
            formData.append('modules', JSON.stringify(modulesPayload))
    
            // Note: Actual file upload for materials would require appending files to formData with specific keys
            // or handling them in a separate endpoint. For this UI task, we assume the structure is prepared.
    
            await fetcher.put(COURSE.UPDATE.replace('{course_id}', classId), { arg: formData })
            toaster('Kurikulum berhasil diperbarui!', 'success')
        } catch (error) {
            console.error(error)
            toaster('Gagal menyimpan kurikulum', 'error')
        } finally {
            setIsSaving(false)
        }
      }

    return (
        <div className="space-y-4">
            <CourseCurriculum modules={modules} setModules={setModules} />
            
            <div className="flex justify-end">
                <button 
                    onClick={handleSaveCurriculum}
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan Kurikulum'}
                </button>
            </div>
        </div>
    )
}