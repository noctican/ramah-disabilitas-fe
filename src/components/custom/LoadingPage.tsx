import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingPageProps {
    className?: string;
    message?: string;
}

export const LoadingPage = ({ className, message = "Memuat..." }: LoadingPageProps) => {
    return (
        <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen bg-white dark:bg-zinc-950", className)}>
            <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                    <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm animate-pulse">
                    {message}
                </p>
            </div>
        </div>
    );
};
