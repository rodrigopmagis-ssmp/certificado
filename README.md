# 🏥 Validador de Certificações Terapêuticas
### SC Saúde / GEMED — Sistema de validação de certificados via IA

---

## Sobre o projeto

Sistema web para validar certificações profissionais em terapias especializadas, baseado no POP da GEMED (atualização 08/12/2025). Integrado com:

- **n8n** — orquestração de agentes IA especializados por terapia
- **GPT-4o** — leitura inteligente de PDFs (visão computacional)
- **Supabase** — banco de dados de beneficiários e histórico de validações

---

## Terapias suportadas

ABA, Denver/ESDM, Bobath, PECS, PROMPT, PODD, Plushand, CAA, TEACCH, CME®, TheraSuit/PediaSuit, RTA, Fisioterapia Aquática, Bandagem Neurofuncional, Integração Sensorial, Psicomotricidade, Musicoterapia, Estimulação Visual, Equoterapia

---

## Deploy no Vercel

### 1. Fork e clone o repositório
```bash
git clone https://github.com/SEU_USUARIO/validador-certificacoes
cd validador-certificacoes
```

### 2. Instale o Vercel CLI
```bash
npm i -g vercel
```

### 3. Configure as variáveis de ambiente no Vercel

Acesse o painel do Vercel → seu projeto → **Settings → Environment Variables** e adicione:

| Variável | Valor |
|---|---|
| `SUPABASE_URL` | `https://zwyfwhjcwlsjqlonqspw.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGci...` (anon key do Supabase) |
| `N8N_WEBHOOK_URL` | `https://n8n360.navegar360.com.br/webhook/validar-certificado` |
| `OPENAI_API_KEY` | `sk-proj-...` |

### 4. Deploy
```bash
vercel --prod
```

---

## Estrutura do projeto

```
validador-certificacoes/
├── api/
│   └── config.js          # Serverless function — serve as credenciais do servidor
├── public/
│   └── index.html         # Interface completa (SPA)
├── .env.example           # Exemplo de variáveis de ambiente
├── .gitignore
├── vercel.json            # Configuração do Vercel
└── README.md
```

---

## Banco de dados — Supabase

O banco já está criado no projeto **terapia** (`zwyfwhjcwlsjqlonqspw`). Tabelas:

- `beneficiarios` — nome, decisão judicial, vara/comarca
- `clinicas_beneficiario` — clínicas/instituições por beneficiário (N:1)
- `validacoes` — terapia, profissional, resultado, parecer completo, arquivo

---

## Segurança

As credenciais **nunca** são expostas no código frontend. O arquivo `api/config.js` é uma função serverless que lê as variáveis de ambiente do Vercel e as serve ao cliente em tempo de execução. O `.env` está no `.gitignore` e nunca deve ser commitado.
