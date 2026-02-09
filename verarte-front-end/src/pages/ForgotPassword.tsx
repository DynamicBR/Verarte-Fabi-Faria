import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  Mail,
  KeyRound,
  Lock,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Passo 1: Solicitar Código
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await fetch("http://127.0.0.1:8000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // Sempre avança, por segurança (mesmo se email não existir no back)
      setStep(2);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Request code failed:", err.message);
      }
      setError("Erro de comunicação com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Passo 2: Trocar Senha
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code, new_password: newPassword }),
        },
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const message = errData?.detail || "Código inválido ou expirado.";
        throw new Error(message);
      }

      alert("Senha alterada com sucesso!");
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-creme min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-rosa-antigo w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl text-cafe font-serif font-bold">
              Recuperar Senha
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {step === 1
                ? "Digite seu e-mail para receber um código."
                : `Código enviado para ${email}`}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Seu e-mail cadastrado"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-3 border rounded-lg focus:border-rosa-antigo outline-none"
                  required
                />
              </div>
              <button
                disabled={loading}
                className="w-full bg-cafe text-creme py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Enviar Código <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleResetPassword}
              className="space-y-4 animate-fade-in"
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
                  className="w-full pl-10 p-3 border rounded-lg focus:border-rosa-antigo outline-none tracking-widest text-center font-mono"
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
                  placeholder="Nova Senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 p-3 border rounded-lg focus:border-rosa-antigo outline-none"
                  required
                />
              </div>
              <button
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Redefinir Senha <CheckCircle size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-gray-500 hover:text-cafe underline"
            >
              Voltar para o Login
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
