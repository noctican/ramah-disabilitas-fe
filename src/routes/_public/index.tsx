import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, AudioLines, FileAudio, Headphones, Mic, Speech, Volume2 } from 'lucide-react'

export const Route = createFileRoute('/_public/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-8 animate-in slide-in-from-left duration-700 fade-in">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700">
                  LMS Khusus Sahabat Netra
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl xl:text-6xl text-balance">
                  Melihat Dunia Lewat <span className="text-primary-600">Suara dan Nada</span>
                </h1>
                <p className="max-w-150 text-lg text-muted-foreground md:text-xl leading-relaxed">
                  Platform pembelajaran yang didesain 100% untuk pelajar tunanetra. Nikmati pengalaman belajar mandiri dengan navigasi suara penuh dan berbagai fitur berbasis audio.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full shadow-lg shadow-primary-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                    Mulai Belajar <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-white/50 backdrop-blur-sm border-primary-200 text-primary-700 hover:bg-white hover:text-primary-800 cursor-pointer">
                    Dengar Fitur
                  </Button>
                </a>
              </div>
              
              {/* <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-primary-200 flex items-center justify-center text-xs font-bold text-primary-700">A</div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-primary-300 flex items-center justify-center text-xs font-bold text-primary-800">R</div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-primary-400 flex items-center justify-center text-xs font-bold text-primary-900">S</div>
                </div>
                <p>Dipercaya oleh <span className="font-bold text-primary-700">1,000+</span> sahabat netra</p>
              </div> */}
            </div>
            
            <div className="relative mx-auto lg:ml-auto w-full max-w-125 lg:max-w-none animate-in slide-in-from-right duration-700 fade-in delay-200">
               {/* Decorative blobs */}
               <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
               <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
               
               {/* Hero Image / Illustration Placeholder */}
               <div className="relative rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl p-6 lg:p-10 transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="grid grid-cols-2 gap-4">
                      <Card className="col-span-2 bg-white/80 border-primary-100 shadow-sm">
                          <CardHeader className="pb-2">
                             <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Audiobook Sejarah</CardTitle>
                                <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">Sedang Diputar</span>
                             </div>
                          </CardHeader>
                          <CardContent>
                              <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                      <Headphones className="h-5 w-5" />
                                  </div>
                                  <div className="flex-1">
                                      <div className="h-2 w-full bg-primary-100 rounded-full mb-2 overflow-hidden">
                                          <div className="h-full bg-primary-500 w-[65%] rounded-full animate-pulse"></div>
                                      </div>
                                      <p className="text-xs text-muted-foreground">Bab 3: Era Reformasi (12:30 / 45:00)</p>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                      <Card className="bg-primary-600 text-white border-none shadow-md">
                          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                              <Speech className="h-8 w-8 mb-2 opacity-90" />
                              <p className="font-bold text-sm">Screen Reader</p>
                          </CardContent>
                      </Card>
                      <Card className="bg-white/80 border-primary-100 shadow-sm">
                          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                              <Mic className="h-8 w-8 mb-2 text-primary-600" />
                              <p className="font-bold text-sm text-foreground">Perintah Suara</p>
                          </CardContent>
                      </Card>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Didesain Khusus untuk <span className="text-primary-600">Telinga Anda</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Teknologi asistif mutakhir yang membuat belajar terasa alami dan tanpa hambatan.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             <FeatureCard 
                icon={<Mic className="h-10 w-10 text-primary-500" />}
                title="Kontrol Suara Penuh"
                description="Lupakan mouse dan keyboard. Navigasi seluruh aplikasi, kerjakan kuis, dan cari materi hanya dengan suara Anda."
             />
             <FeatureCard 
                icon={<Volume2 className="h-10 w-10 text-primary-500" />}
                title="Screen Reader Friendly"
                description="Struktur kode semantik (ARIA) yang dioptimalkan untuk NVDA, JAWS, dan TalkBack. Tidak ada tombol tanpa label."
             />
             <FeatureCard 
                icon={<FileAudio className="h-10 w-10 text-primary-500" />}
                title="Materi Berbasis Audio"
                description="Seluruh materi pembelajaran dapat diakses sebagai audio."
             />
          </div>
        </div>
      </section>

      {/* Stats/CTA Section */}
      <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 divide-x divide-primary-800">
                <div className="p-4">
                    <div className="text-4xl lg:text-5xl font-extrabold text-primary-100 mb-2">8+</div>
                    <div className="text-primary-200">Kelas</div>
                </div>
                <div className="p-4">
                    <div className="text-4xl lg:text-5xl font-extrabold text-primary-100 mb-2">2+</div>
                    <div className="text-primary-200">Sekolah LB Bermitra</div>
                </div>
                <div className="p-4">
                    <div className="text-4xl lg:text-5xl font-extrabold text-primary-100 mb-2">99%</div>
                    <div className="text-primary-200">Aksesibilitas Web</div>
                </div>
                <div className="p-4">
                    <div className="text-4xl lg:text-5xl font-extrabold text-primary-100 mb-2">24/7</div>
                    <div className="text-primary-200">Asisten Suara AI</div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Dengar dan Pelajari Sekarang</h2>
                <p className="text-primary-100 text-lg">
                    Bergabunglah sekarang. Platform inklusif yang benar-benar mengerti cara Anda melihat dunia.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Link to="/register">
                      <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-primary-50 rounded-full text-lg px-8 cursor-pointer">
                        Mulai Gratis
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white bg-transparent rounded-full text-lg px-8 cursor-pointer">
                        Masuk Akun
                      </Button>
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <Card className="border-primary-100 hover:border-primary-300 transition-colors hover:shadow-lg hover:shadow-primary-100/50 group">
            <CardHeader>
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 group-hover:bg-primary-100 transition-colors">
                    {icon}
                </div>
                <CardTitle className="text-xl group-hover:text-primary-700 transition-colors">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-base leading-relaxed">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}
