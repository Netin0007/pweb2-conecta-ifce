🎓 ConectaIFCE
Aplicação web desenvolvida para a conexão entre estudantes, docentes e técnicos do IFCE. O projeto é uma SPA (Single Page Application) moderna, focada em networking institucional e troca de conhecimentos acadêmicos.

Este projeto faz parte do Trabalho Avaliativo N2 da disciplina de Programação Web II (Prof. Lucas Mendes).

📌 Visão Geral
O ConectaIFCE permite que a comunidade acadêmica interaja através de um feed dinâmico, cadastro de perfis institucionais e recomendações de conexões. A plataforma foi construída seguindo rigorosas boas práticas de engenharia de software e arquitetura front-end.

Principais Funcionalidades
Autenticação Institucional: Login e cadastro com validação rigorosa.

Feed de Notícias: Acesso autenticado para visualização de atualizações.

Gestão de Perfil: Exibição de dados do usuário e networking.

Segurança: Rotas protegidas e persistência de sessão via JWT.

🛠️ Tecnologias Utilizadas
A stack principal foca em performance, tipagem estática e escalabilidade:

Core: React 19 + Vite.

Linguagem: TypeScript (Modo estrito para maior segurança).

Estilização: Tailwind CSS v4 + shadcn/ui (Componentes acessíveis e customizáveis).

Roteamento: React Router (Layouts aninhados e Guards de autenticação).

Formulários: React Hook Form + Zod (Validação de schemas).

Qualidade: ESLint + Prettier + EditorConfig.

🧠 Arquitetura e Decisões Técnicas
O projeto adota uma estratégia de Feature-Sliced Design simplificada, priorizando a separação de preocupações:

1. Organização por Features
Em vez de agrupar por "tipo de arquivo", o código é dividido por domínios de negócio (src/features/).

auth/, users/, follow/: Cada pasta contém seus próprios componentes, hooks e serviços específicos.

shared/: Recursos globais reutilizáveis (UI, hooks genéricos, utilitários).

2. Camada de Infraestrutura (HTTP)
Foi implementado um cliente centralizado em src/infra/http/:

Injeção de JWT: O http-client intercepta requisições e injeta automaticamente o token Authorization: Bearer.

Tratamento de Erros: Classe ApiError para mapear respostas do backend de forma tipada.

3. Lógica Desacoplada (Custom Hooks)
Os componentes visuais são "burros" (focados em UI). A lógica complexa reside em hooks customizados (ex: useFormLogin.ts), facilitando a manutenção e testes.

4. Layouts e Rotas
Utilização de <Outlet /> para persistência de elementos (Navbar/Footer):

PublicLayout: Redireciona usuários já logados para o feed.

AppLayout: Protege rotas privadas, redirecionando usuários anônimos para o login.

⚙️ Configuração do Ambiente
Pré-requisitos
Node.js 20+

npm 10+

Instalação
Clone o repositório:

Bash
git clone https://github.com/Netin0007/pweb2-conecta-ifce.git
cd pweb2-conecta-ifce
Instale as dependências:

Bash
npm install
Variáveis de Ambiente:
Crie um arquivo .env na raiz:

Snippet de código
VITE_API_URL=https://conectaifce-api.proflucasmendes.com.br
Execute o projeto:

Bash
npm run dev
Acesse: http://localhost:5173

📜 Scripts Disponíveis
npm run dev: Inicia o servidor de desenvolvimento.

npm run build: Type-check e geração do build de produção.

npm run lint: Executa a análise estática do código.

npm run preview: Visualização local do build de produção.

🚀 Melhorias Futuras
[ ] Tratamento global de erro 401 com logout automático.

[ ] Implementação de Testes Unitários com Vitest.

[ ] Refatoração do cliente HTTP para eliminar tipos any.

[ ] Adição de modo escuro (Dark Mode) nativo.

👨‍💻 Autor
Edilson Gonçalves Alves Estudante do 4° Semestre de Análise e Desenvolvimento de Sistemas – IFCE Campus Tauá

Disciplina: Programação Web II
