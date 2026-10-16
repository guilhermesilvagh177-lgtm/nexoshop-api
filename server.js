const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL;

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "20kb" }));

app.use(cors({
  origin(origin, callback) {
    // Permite chamadas sem Origin (ex.: monitoramento) e o site configurado.
    if (!origin || !frontendUrl || origin === frontendUrl) return callback(null, true);
    return callback(new Error("Origem não autorizada pelo CORS"));
  }
}));

// Catálogo provisório. Os preços devem ser revisados antes de ativar vendas.
const products = [
  { id: "cartao-nfc", name: "Cartão NFC personalizado", priceCents: 2990, currency: "BRL" },
  { id: "chaveiro-nfc", name: "Chaveiro NFC", priceCents: 1990, currency: "BRL" },
  { id: "adesivo-nfc", name: "Adesivo NFC", priceCents: 990, currency: "BRL" }
];

app.get("/", (_req, res) => {
  res.json({ name: "Nexo Shop API", status: "online", mode: "setup" });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/products", (_req, res) => {
  res.json({ products });
});

// Bloqueado intencionalmente até integrar e testar uma cotação real.
// Não retorna frete fictício nem confirma pedidos sem cotação.
app.post("/api/frete", (_req, res) => {
  res.status(503).json({
    error: "FREIGHT_NOT_CONFIGURED",
    message: "A cotação de frete ainda não foi integrada. Nenhum valor estimado deve ser cobrado."
  });
});

// Bloqueado intencionalmente: não gerar cobrança até implementar checkout real,
// validação do lado do servidor, persistência de pedidos e confirmação autenticada.
app.post("/api/checkout", (_req, res) => {
  res.status(503).json({
    error: "CHECKOUT_NOT_CONFIGURED",
    message: "O checkout ainda não está ativo. Nenhum pagamento foi iniciado."
  });
});

app.use((err, _req, res, _next) => {
  if (err && err.message === "Origem não autorizada pelo CORS") {
    return res.status(403).json({ error: "ORIGIN_NOT_ALLOWED" });
  }
  console.error("Erro interno:", err?.message || "desconhecido");
  return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
});

app.listen(port, () => {
  console.log(`Nexo Shop API listening on port ${port}`);
});
