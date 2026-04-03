import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { Instagram, Heart } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  image_url: string;
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col font-sans">
      <Header />

      {/* SEÇÃO 1: HERO (Boas vindas) */}
      <section className="bg-rosa-antigo text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight">
            Feito à mão, com coração.
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Peças únicas de artesanato para encantar o seu dia a dia.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2: O CARTÃO DE VISITAS (Sobre a Fabi) */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-verde-musgo rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Lado Esquerdo: Foto da Dona/Ateliê */}
          <div className="md:w-1/2 h-96 md:h-auto bg-gray-200 relative">
            {/* COLOQUE A FOTO DA FABI AQUI */}
            <img
              src="../src/assets/foto-perfil.jpeg"
              alt="Fabiana Faria no Ateliê"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
              <p className="text-cafe font-serif font-bold">Fabiana Faria</p>
              <p className="text-xs text-shadow-cafe uppercase tracking-wider">
                Artesã & Fundadora
              </p>
            </div>
          </div>

          {/* Lado Direito: Texto Institucional */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl text-cafe font-serif font-bold flex items-center gap-2">
              Olá, bem-vindo à Verarte!{" "}
              <Heart className="text-rosa-antigo fill-current" size={24} />
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              A Verarte nasceu do desejo de transformar materiais simples em
              memórias duradouras. Cada peça que sai do nosso ateliê carrega
              horas de dedicação, cuidado e um toque pessoal que nenhuma máquina
              consegue replicar.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Trabalhamos com personalização exclusiva para presentes, decoração
              e utilitários. Sinta-se em casa e explore nossa coleção abaixo.
            </p>

            <a
              href="https://www.instagram.com/fabi.silva.faria/"
              target="_blank"
              className="inline-flex items-center gap-2 text-rosa-antigo font-bold hover:text-cafe transition-colors self-start border-b-2 border-transparent hover:border-rosa-antigo pb-1"
            >
              <Instagram size={20} /> Siga nosso Instagram
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: VITRINE DE PRODUTOS */}
      <main className="flex-grow p-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-cafe border-l-4 border-rosa-antigo pl-4">
            Disponível agora
          </h2>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Carregando as belezas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={`R$ ${product.price.toFixed(2).replace(".", ",")}`}
                image={
                  product.image_url ||
                  "https://placehold.co/300x200/png?text=Sem+Imagem"
                }
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
