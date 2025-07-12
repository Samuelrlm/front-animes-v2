import useUserData from "@/hooks/use-user-data";
import listOptions from "@/utils/list-options";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SideMenu(){
    const user = useUserData();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/')
    };

    return (
        <div className="fixed top-0 left-0 w-[300px] h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg z-50">
            {/* Header do SideMenu */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Anime App</h2>
                        <p className="text-sm text-gray-600 capitalize">{user?.role || 'Usuário'}</p>
                    </div>
                </div>
            </div>

            {/* Menu Options */}
            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                {listOptions.filter(option => option.enable.includes(user?.role)).map(
                    (option, index) => {
                        const isActive = router.pathname === option.path;
                        return (
                            <Link 
                                key={index}
                                href={option.path}
                                className={`block w-full rounded-xl p-4 transition-all duration-200 transform hover:scale-[1.02] ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg shadow-purple-500/25' 
                                        : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:border-purple-200 border border-transparent hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${
                                        isActive 
                                            ? 'bg-white/20' 
                                            : 'bg-gradient-to-br from-purple-100 to-blue-100'
                                    }`}>
                                        <div className={`${
                                            isActive ? 'text-white' : 'text-purple-600'
                                        }`}>
                                            {option.icon}
                                        </div>
                                    </div>
                                    <span className={`font-semibold ${
                                        isActive ? 'text-white' : 'text-gray-700'
                                    }`}>
                                        {option.label}
                                    </span>
                                </div>
                            </Link>
                        )
                    }
                )}
            </div>

            {/* Botão de Sair */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sair</span>
                </button>
            </div>

            {/* Footer do SideMenu */}
            <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        © 2024 Anime App
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Versão 2.0
                    </p>
                </div>
            </div>
        </div>
    )
}