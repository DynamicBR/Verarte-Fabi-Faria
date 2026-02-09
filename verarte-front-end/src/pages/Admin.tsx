import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Trash2 } from "lucide-react"; // Ícone de lixeira

interface Product {
  id: number;
  title: string;
  price: number;
}

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Carregar produtos ao abrir a página
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://127.0.0.1:8000/products");
    const data = await response.json();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja apagar este produto?")) {
      try {
        await fetch(`http://127.0.0.1:8000/products/${id}`, {
          method: "DELETE",
        });
        fetchProducts(); // Recarrega a lista
      } catch (error) {
        alert("Erro ao deletar.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadResponse = await fetch("http://127.0.0.1:8000/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }

      const productData = {
        title,
        description: "Produto artesanal",
        price: parseFloat(price.replace(",", ".")),
        image_url: imageUrl,
      };

      await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      // Limpa o formulário e recarrega a lista
      setTitle("");
      setPrice("");
      setImage(null);
      fetchProducts();
      alert("Produto cadastrado!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-creme min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-8 max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-8">
        {/* LADO ESQUERDO: Formulário */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-rosa-antigo h-fit">
          <h2 className="text-2xl text-cafe font-serif mb-4">Novo Produto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-cafe">Nome</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-cafe">Preço</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-cafe">Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="w-full text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cafe text-creme py-2 rounded font-bold hover:opacity-90"
            >
              {loading ? "Salvando..." : "Cadastrar"}
            </button>
          </form>
        </div>

        {/* LADO DIREITO: Lista de Produtos */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl text-cafe font-serif mb-4">
            Gerenciar Produtos
          </h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded border-b"
              >
                <div>
                  <p className="font-bold text-cafe">{product.title}</p>
                  <p className="text-sm text-gray-500">R$ {product.price}</p>
                </div>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-gray-400 text-center">
                Nenhum produto cadastrado.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
