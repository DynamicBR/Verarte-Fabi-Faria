import uvicorn
import os

if __name__ == "__main__":
    # Garante que estamos rodando da raiz
    # Isso evita erros de importação como "No module named app"

    # Se quiser, pode ler portas de variáveis de ambiente aqui
    port = int(os.getenv("PORT", 8000))

    print(f"🚀 Iniciando servidor Verarte na porta {port}...")

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=True,  # Reload automático para desenvolvimento
        log_level="info",
    )
