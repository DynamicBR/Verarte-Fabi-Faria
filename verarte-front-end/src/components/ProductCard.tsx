import { useState } from "react";
import { PaymentModal } from "./PaymentModal"; // Importe o Modal

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
}

export function ProductCard({ title, price, image }: ProductCardProps) {
  // Estado para controlar se o modal deste card está aberto
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-72 bg-white border-2 border-rosa-antigo rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-5 text-center flex flex-col gap-2 flex-grow">
          <h3 className="text-2xl font-bold text-cafe font-serif">{title}</h3>

          <p className="text-verde-musgo font-semibold text-lg">{price}</p>

          <div className="mt-auto pt-4">
            {/* Mudamos de <a> para <button> para abrir o modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-cafe text-creme py-2 rounded-lg font-medium hover:bg-opacity-90 transition-opacity text-center cursor-pointer shadow-sm"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>

      {/* O Modal fica "escondido" aqui até o estado mudar para true */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productTitle={title}
        productPrice={price}
      />
    </>
  );
}
