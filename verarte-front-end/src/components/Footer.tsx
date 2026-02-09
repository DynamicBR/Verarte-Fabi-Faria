import { Instagram, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    // bg-cafe: Fundo escuro para contrastar com o resto do site
    // text-creme: Texto claro para leitura
    <footer className="bg-cafe text-creme pt-12 pb-6 mt-12 border-t-4 border-rosa-antigo">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna 1: Sobre */}
        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-rosa-antigo">
            Verarte Ateliê
          </h3>
          <p className="text-verde-musgo opacity-80 leading-relaxed">
            Transformando carinho em arte. Produtos artesanais feitos à mão com
            dedicação exclusiva para você.
          </p>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-rosa-antigo">Navegação</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-verde-musgo transition-colors">
                Início
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-verde-musgo transition-colors">
                Todos os Produtos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-verde-musgo transition-colors">
                Sobre a Artesã
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-verde-musgo transition-colors">
                Política de Envio
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-rosa-antigo">
            Fale Conosco
          </h4>
          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center gap-3 hover:text-verde-musgo transition-colors"
            >
              <Instagram size={20} />
              <span>@fabi.silva.faria</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 hover:text-verde-musgo transition-colors"
            >
              <MessageCircle size={20} />
              <span>(11) 98988-1367</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 hover:text-verde-musgo transition-colors"
            >
              <Mail size={20} />
              <span>fabiana.silva.faria@hotmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs opacity-60 mt-12 pt-6 border-t border-creme/20">
        &copy; 2026 Verarte Ateliê. Todos os direitos reservados.
      </div>
    </footer>
  );
}
