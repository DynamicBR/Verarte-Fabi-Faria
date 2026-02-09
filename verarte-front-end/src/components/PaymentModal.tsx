import { X, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  productPrice: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  productTitle,
  productPrice,
}: PaymentModalProps) {
  const [copied, setCopied] = useState(false);

  // DADOS REAIS DO PIX (Coloque a chave da Fabi aqui)
  const pixKey = "123.456.789-00"; // Ex: CPF ou Email
  const pixName = "Fabiana Faria";
  const bankName = "Nubank"; // Pode ser Inter, PicPay, etc.

  if (!isOpen) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reseta mensagem após 2s
  };

  const handleSendReceipt = () => {
    // Mesma lógica do WhatsApp, mas agora pedindo para enviar comprovante
    const whatsappNumber = "5511999999999";
    const message = `Olá! Fiz o PIX no valor de ${productPrice} referente ao produto *${productTitle}*. Segue o comprovante!`;
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(link, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in relative">
        {/* Cabeçalho do Modal */}
        <div className="bg-cafe text-creme p-4 flex justify-between items-center">
          <h3 className="font-serif text-xl font-bold">Pagamento via PIX</h3>
          <button
            onClick={onClose}
            className="hover:text-rosa-antigo transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Você está comprando:</p>
            <h4 className="text-2xl font-bold text-cafe">{productTitle}</h4>
            <p className="text-xl text-verde-musgo font-semibold mt-1">
              {productPrice}
            </p>
          </div>

          {/* Área da Chave PIX */}
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-rosa-antigo text-center space-y-3">
            <p className="text-sm text-gray-500">
              Aceitamos transferências de: <br />{" "}
              <strong>Nubank, Inter, PicPay, MercadoPago</strong>
            </p>

            <div className="flex flex-col items-center gap-1">
              <span className="text-xs uppercase text-gray-400 font-bold">
                Chave PIX ({bankName})
              </span>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-200 w-full justify-between">
                <span className="font-mono text-cafe truncate select-all">
                  {pixKey}
                </span>
                <button
                  onClick={handleCopyPix}
                  className="text-rosa-antigo hover:text-cafe transition-colors"
                  title="Copiar Chave"
                >
                  {copied ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <Copy size={20} />
                  )}
                </button>
              </div>
              <span className="text-xs text-gray-400">
                Favorecido: {pixName}
              </span>
            </div>

            {copied && (
              <p className="text-xs text-green-600 font-bold animate-pulse">
                Chave copiada!
              </p>
            )}
          </div>

          {/* Botão de Ação */}
          <button
            onClick={handleSendReceipt}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Já paguei! Enviar Comprovante</span>
          </button>

          <p className="text-xs text-center text-gray-400">
            Ao clicar, você será redirecionado para o WhatsApp para enviar a
            foto do comprovante.
          </p>
        </div>
      </div>
    </div>
  );
}
