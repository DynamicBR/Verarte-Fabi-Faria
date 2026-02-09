import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Mail, Lock, KeyRound, ArrowRight, Loader2 } from "lucide-react";

export function Login() {
  // Controle de Estado
  const [step, setStep] = useState<1 | 2>(1); // 1 = Senha, 2 = Código
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dados do Formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  // PASSO 1: Envia Email/Senha -> Recebe Confirmação
  const handleLoginStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Tenta ler a mensagem de erro do backend
        const errData = await response.json();
        throw new Error(errData.detail || "Credenciais inválidas");
      }

      // Sucesso! Vai para o passo do código
      setStep(2);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  // PASSO 2: Envia Código -> Recebe Token
  const handleVerifyStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        throw new Error("Código incorreto ou expirado");
      }

      const data = await response.json();

      // Salva o Token e Redireciona
      localStorage.setItem("verarte_token", data.access_token);
      localStorage.setItem("verarte_user", data.user_name);
      localStorage.setItem("verarte_role", data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido ao verificar o código.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-creme min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-rosa-antigo w-full max-w-md animate-fade-in transition-all">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-cafe font-serif mb-2">
              Acesso Restrito
            </h2>
            <p className="text-gray-500 text-sm">
              {step === 1
                ? "Digite suas credenciais para continuar"
                : `Código enviado para ${email}`}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-200">
              {error}
            </div>
          )}

          {/* Renderização Condicional do Formulário */}
          {step === 1 ? (
            <form onSubmit={handleLoginStep1} className="space-y-5">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:border-rosa-antigo focus:ring-1 focus:ring-rosa-antigo outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:border-rosa-antigo focus:ring-1 focus:ring-rosa-antigo outline-none transition-all"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs text-rosa-antigo hover:text-cafe font-semibold"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cafe text-creme py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Continuar <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleVerifyStep2}
              className="space-y-5 animate-slide-in"
            >
              <div className="relative">
                <KeyRound
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Código de 6 dígitos"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:border-rosa-antigo focus:ring-1 focus:ring-rosa-antigo outline-none transition-all tracking-widest text-center text-lg font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Verificar e Entrar"
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-gray-500 text-sm hover:text-cafe transition-colors underline"
              >
                Voltar e corrigir e-mail
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
