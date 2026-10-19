Markdown
# Desafio Técnico — Mini Inbox

Sistema full-stack de gerenciamento de tickets de suporte integrado com pipeline de ETL em Pandas, automação de workflows com n8n e interface moderna em Next.js.

---

## Stack Tecnológica

- **Backend:** Python, FastAPI, SQLAlchemy, SQLite, Requests
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Axios
- **Dados & ETL:** Python, Pandas (processamento de dataset do Kaggle)
- **Automação:** n8n (Docker) com Webhook integrado

---

## Estrutura do Repositório

```text
/backend
  ├─ app/
  │   ├─ routes/
  │   │   ├─ tickets.py
  │   │   └─ metrics.py
  │   ├─ schemas.py
  │   ├─ storage.py
  │   └─ database.py
  ├─ main.py
  ├─ requirements.txt
  └─ db.sqlite (gerado automaticamente)
/frontend
  ├─ app/
  │   ├─ dashboard/
  │   ├─ tickets/
  │   └─ page.tsx
  ├─ package.json
  └─ ...
/data
  ├─ raw/          (dataset do Kaggle)
  ├─ processed/    (metrics.json)
  └─ etl.py
/n8n
  ├─ workflow.json
  └─ screenshots/
      └─ image_9b0244.png
README.md
Como Rodar o Projeto Localmente
Certifique-se de ter instalado na sua máquina: Python 3.10+, Node.js 18+ e Docker.

1. Configurar o Ambiente Virtual (Na Raiz)
Abra um terminal na raiz do projeto e execute:

Bash
python -m venv .venv
source .venv/bin/activate  # No Windows: .venv\Scripts\activate
pip install -r backend/requirements.txt
2. Rodar o Backend (Direto da Raiz)
Com o ambiente virtual ativado, suba o FastAPI apontando para o módulo do backend:

Bash
PYTHONPATH=backend uvicorn backend.main:app --reload
O backend estará rodando em http://localhost:8000 (Documentação interativa em http://localhost:8000/docs). Ele criará e populará o db.sqlite automaticamente na primeira execução através das seeds.

3. Executar o Pipeline de ETL (Direto da Raiz)
Em outro terminal (com o ambiente virtual ativado na raiz), execute o script de ETL para processar os dados:

Bash
python data/etl.py
Isso gerará/atualizará o arquivo de métricas em data/processed/metrics.json consumido pela API.

4. Rodar o n8n e Configurar o Webhook
Para rodar o n8n mapeando os dados para a pasta local do projeto:

Bash
sudo chmod -R 777 n8n
docker run -it --rm --name n8n -p 5678:5678 -v "$(pwd)/n8n:/home/node/.n8n" n8nio/n8n
Acesse o n8n em http://localhost:5678.

Importe o arquivo JSON localizado em n8n/workflow.json.

O workflow está configurado para escutar o Webhook POST do backend quando um ticket for atualizado para status = closed ou priority = high.

5. Iniciar o Frontend (Next.js)
Abra um novo terminal na pasta do frontend:

Bash
cd frontend
npm install
npm run dev
Acesse a aplicação em http://localhost:3000.

Exemplo de Payload do Webhook
Quando um ticket é atualizado para closed ou high, o backend dispara automaticamente o seguinte JSON para o n8n:

![Print do n8n](n8n/screenshots/image_9b0244.png)

JSON
{
  "id": 1,
  "customer_name": "Cliente Exemplo",
  "subject": "Dúvida sobre fatura",
  "status": "closed",
  "priority": "high"
}