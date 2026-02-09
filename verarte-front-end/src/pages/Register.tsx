import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Loader2 } from "lucide-react";

export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/buyers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Tenta ler a mensagem de erro detalhada do backend
        const errData = await response
          .json()
          .catch(() => ({ detail: "Erro de comunicação com o servidor." }));
        throw new Error(
          errData.detail || "Não foi possível completar o cadastro.",
        );
      }

      // Se deu certo, manda pro login
      alert(
        "Cadastro realizado com sucesso! Verifique seu e-mail para continuar.",
      );
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocorreu um erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-creme min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-rosa-antigo w-full max-w-2xl">
          <h2 className="text-3xl text-cafe font-serif mb-6 text-center">
            Junte-se ao nosso clube
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                name="name"
                placeholder="Nome Completo"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:border-rosa-antigo outline-none"
              />
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:border-rosa-antigo outline-none"
              />
              <input
                name="password"
                type="password"
                placeholder="Senha"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:border-rosa-antigo outline-none"
              />
              <input
                name="phone"
                placeholder="Telefone / WhatsApp"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:border-rosa-antigo outline-none"
              />
            </div>

            <div className="space-y-4 flex flex-col">
              <textarea
                name="address"
                placeholder="Endereço de Entrega (Rua, Número, Bairro, CEP)"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:border-rosa-antigo outline-none h-full resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cafe text-creme py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all flex justify-center"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Criar Conta"}
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm text-gray-500">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-rosa-antigo font-bold hover:underline"
            >
              Faça Login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
