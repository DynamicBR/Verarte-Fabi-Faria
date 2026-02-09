import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, LogIn, UserPlus } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  // Truque simples para saber se está logado (para esconder botões se quiser no futuro)
  const isLoggedIn = !!localStorage.getItem("verarte_token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-red-100 py-4 px-8 shadow-sm border-b-4 border-rosa-antigo sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Home */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-rosa-antigo p-2 rounded-lg text-white group-hover:bg-cafe transition-colors">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-cafe tracking-wide">
              Verarte
            </h1>
            <p className="text-xs text-verde-musgo font-bold tracking-widest uppercase">
              Ateliê Criativo
            </p>
          </div>
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/admin"
                className="flex items-center gap-2 text-cafe hover:text-rosa-antigo font-medium"
              >
                <User size={18} /> Painel Admin
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 text-sm font-bold"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-cafe hover:text-rosa-antigo font-medium transition-colors px-4 py-2"
              >
                <LogIn size={18} /> Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 bg-cafe text-creme px-5 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                <UserPlus size={18} /> Cadastro
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
