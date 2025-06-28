import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/')
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Anime App
                    </h1>
                </div>
                
                <div className="flex items-center space-x-4">
                    <nav className="hidden md:flex space-x-6">
                        <a 
                            href="/animes" 
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Animes
                        </a>
                        <a 
                            href="/favoritos" 
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Favoritos
                        </a>
                    </nav>
                    
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
}
