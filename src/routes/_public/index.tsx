import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Accessibility, ArrowRight, BookOpen, Ear, Eye, Users, Volume2 } from 'lucide-react'

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
                  Platform LMS Ramah Disabilitas
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl xl:text-6xl text-balance">
                  Pendidikan Tanpa Batas untuk <span className="text-primary-600">Semua Potensi</span>
                </h1>
                <p className="max-w-150 text-lg text-muted-foreground md:text-xl leading-relaxed">
                  Wujudkan pengalaman belajar yang inklusif dengan fitur aksesibilitas adaptif. Dirancang khusus untuk mendukung pelajar disabilitas meraih prestasi gemilang.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full shadow-lg shadow-primary-500/20 transition-all hover:scale-105 active:scale-95">
                    Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-white/50 backdrop-blur-sm border-primary-200 text-primary-700 hover:bg-white hover:text-primary-800">
                    Pelajari Fitur
                  </Button>
                </a>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-primary-200 flex items-center justify-center text-xs font-bold text-primary-700">A</div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-primary-300 flex items-center justify-center text-xs font-bold text-primary-800">R</div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-primary-400 flex items-center justify-center text-xs font-bold text-primary-900">S</div>
                </div>
                <p>Bergabung dengan <span className="font-bold text-primary-700">1,000+</span> pelajar lainnya</p>
              </div>
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
                                <CardTitle className="text-lg">Kelas Bahasa Isyarat</CardTitle>
                                <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">Live</span>
                             </div>
                          </CardHeader>
                          <CardContent>
                              <div className="h-2 w-full bg-primary-100 rounded-full mb-2 overflow-hidden">
                                  <div className="h-full bg-primary-500 w-[65%] rounded-full"></div>
                              </div>
                              <p className="text-xs text-muted-foreground">Progres: 65%</p>
                          </CardContent>
                      </Card>
                      <Card className="bg-primary-600 text-white border-none shadow-md">
                          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                              <Volume2 className="h-8 w-8 mb-2 opacity-90" />
                              <p className="font-bold text-sm">Text-to-Speech</p>
                          </CardContent>
                      </Card>
                      <Card className="bg-white/80 border-primary-100 shadow-sm">
                          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                              <Eye className="h-8 w-8 mb-2 text-primary-600" />
                              <p className="font-bold text-sm text-foreground">High Contrast</p>
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
              Teknologi Pendukung untuk <span className="text-primary-600">Setiap Kebutuhan</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Kami mengintegrasikan standar untuk memastikan tidak ada pelajar yang tertinggal.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             <FeatureCard 
                icon={<Ear className="h-10 w-10 text-primary-500" />}
                title="Dukungan Tuna Rungu"
                description="Navigasi dan akses materi pembelajaran menggunakan perintah suara untuk kemudahan akses tanpa sentuhan."
             />
             <FeatureCard 
                icon={<Eye className="h-10 w-10 text-primary-500" />}
                title="Visual Adaptif"
                description="Mode kontras tinggi, penyesuaian ukuran teks dinamis, dan dukungan screen reader untuk pelajar dengan gangguan penglihatan."
             />
             <FeatureCard 
                icon={<Accessibility className="h-10 w-10 text-primary-500" />}
                title="Navigasi Ramah Motorik"
                description="Seluruh platform dapat dioperasikan sepenuhnya menggunakan keyboard."
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
                    <div className="text-4xl lg:text-5xl font-extrabold text-primary-100 mb-2">10k+</div>
                    <div className="text-primary-200">Pelajar Aktif</div>
                </div>
                <div className="p-4">
                    <div className="text-4xl lg:text-5xl font-extrabold text-primary-100 mb-2">500+</div>
                    <div className="text-primary-200">Materi Inklusif</div>
                </div>
                <div className="p-4">
                    <div className="text-4xl lg:text-5xl font-extrabold text-primary-100 mb-2">98%</div>
                    <div className="text-primary-200">Kepuasan Pengguna</div>
                </div>
                <div className="p-4">
                    <div className="text-4xl lg:text-5xl font-extrabold text-primary-100 mb-2">24/7</div>
                    <div className="text-primary-200">Dukungan Aksesibilitas</div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Siap Memulai Perjalanan Belajarmu?</h2>
                <p className="text-primary-100 text-lg">
                    Bergabunglah sekarang dan rasakan pengalaman belajar yang benar-benar mengerti kebutuhanmu. Gratis untuk pendaftaran pertama.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Link to="/register">
                      <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-primary-50 rounded-full text-lg px-8">
                        Daftar Gratis
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white bg-transparent rounded-full text-lg px-8">
                        Masuk
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
