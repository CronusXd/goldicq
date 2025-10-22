# GoldICQ - Plataforma de Comércio de Moedas Virtuais para Jogos Online

## 📋 Sobre o Projeto

GoldICQ é uma plataforma de e-commerce especializada na venda de moedas virtuais, itens e serviços de power leveling para mais de 300 jogos online (MMORPGs). O site oferece uma interface multilíngue e sistema completo de gerenciamento de pedidos.

## 🎮 Jogos Suportados

A plataforma suporta centenas de jogos populares, incluindo:

- **MMORPGs Populares**: World of Warcraft, Final Fantasy XIV, Guild Wars 2, Black Desert Online
- **Jogos de Ação**: Diablo 4, Path of Exile, Lost Ark, New World
- **Jogos Clássicos**: Lineage 2, Ragnarok Online, Aion, TERA
- **Jogos Mobile**: Ragnarok M, Perfect World Mobile, Lineage 2M
- E muitos outros...

## 🚀 Funcionalidades

### Para Usuários
- ✅ Navegação por categorias de jogos (A-Z)
- ✅ Sistema de busca rápida
- ✅ Carrinho de compras
- ✅ Sistema de login/registro
- ✅ Programa VIP com descontos
- ✅ Múltiplos métodos de pagamento
- ✅ Suporte multilíngue (Inglês, Alemão, Francês)
- ✅ Chat ao vivo para suporte
- ✅ Sistema de avaliações e testemunhos

### Para Administradores
- 📊 Gerenciamento de produtos
- 📦 Controle de estoque
- 💰 Processamento de pedidos
- 👥 Gerenciamento de usuários
- 📈 Relatórios e estatísticas
- 📰 Sistema de notícias/promoções

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e layout responsivo
- **JavaScript** - Interatividade e validações
- **jQuery** - Manipulação DOM e AJAX

### Backend
- **ASP Classic** - Lógica de servidor
- **VBScript** - Processamento server-side

### Integrações
- **Google Analytics** - Análise de tráfego
- **Facebook SDK** - Integração social
- **Bing Ads** - Rastreamento de conversões
- **PayPal** - Gateway de pagamento
- **Skype/Discord** - Suporte ao cliente

## 📁 Estrutura do Projeto

```
goldicq/
├── index.html                 # Página principal
├── aboutus.html              # Sobre nós
├── contactus.html            # Contato
├── register.html             # Registro de usuários
├── vip.html                  # Programa VIP
├── selltous.html             # Venda para nós
├── goldicq_faq.html          # FAQ
├── sitemaps.xml              # Sitemap para SEO
│
├── files0/                   # Recursos estáticos
│   ├── css.css              # Estilos principais
│   ├── quickbuy.css         # Estilos de compra rápida
│   ├── images/              # Imagens do site
│   └── paylogo/             # Logos de pagamento
│
├── commonunit/              # Componentes compartilhados
│   └── javascript/          # Scripts JS
│       ├── jquery-1.4.2.min.js
│       ├── checkform.js
│       ├── qb.js
│       └── chatonline.js
│
├── [game-folders]/          # Pastas individuais por jogo
│   ├── news.html           # Notícias do jogo
│   └── news/               # Arquivos de notícias
│
├── goldicqnews/            # Sistema de notícias
│   └── [news-files].html  # Artigos de notícias
│
├── upfile/                 # Uploads de arquivos
├── up_files/               # Arquivos adicionais
├── page/                   # Sistema de páginas
│   ├── article/
│   └── system/
│
└── mobile/                 # Versão mobile
    └── images/
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Servidor web com suporte a ASP Classic (IIS)
- Banco de dados compatível (Access ou SQL Server)
- Certificado SSL para transações seguras

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/goldicq.git
cd goldicq
```

2. **Configure o servidor IIS**
   - Crie um novo site no IIS
   - Aponte para a pasta do projeto
   - Habilite ASP Classic
   - Configure permissões de escrita para pastas de upload

3. **Configure o banco de dados**
   - Importe o schema do banco de dados
   - Atualize as strings de conexão nos arquivos ASP

4. **Configure variáveis de ambiente**
   - Atualize as chaves de API (Google Analytics, Facebook, etc.)
   - Configure credenciais de pagamento
   - Defina URLs de produção

5. **Teste a instalação**
   - Acesse http://localhost/
   - Verifique todas as funcionalidades
   - Teste o processo de compra

## 🔐 Segurança

- ✅ Validação de entrada em todos os formulários
- ✅ Proteção contra SQL Injection
- ✅ Proteção contra XSS
- ✅ Sessões seguras
- ✅ Criptografia de senhas
- ✅ HTTPS obrigatório para transações
- ✅ Validação de pagamentos

## 📱 Responsividade

O site é otimizado para:
- 💻 Desktop (1920x1080 e superiores)
- 💻 Laptop (1366x768)
- 📱 Tablet (768x1024)
- 📱 Mobile (320x568 e superiores)

## 🌐 SEO e Performance

- ✅ Sitemap XML
- ✅ Meta tags otimizadas
- ✅ URLs amigáveis
- ✅ Compressão de imagens
- ✅ Minificação de CSS/JS
- ✅ Cache de recursos estáticos
- ✅ Google Analytics integrado

## 📊 Métodos de Pagamento

- 💳 PayPal
- 💳 Cartões de Crédito (Visa, Mastercard)
- 💳 Western Union
- 💳 Moneybookers
- 💳 Paysafecard
- 💳 Game Cards

## 🤝 Suporte ao Cliente

- 💬 Chat ao vivo (24/7)
- 📧 Email: support@goldicq.com
- 💬 Skype: goldicq_support
- 💬 Discord: GoldICQ#1234
- 📱 WhatsApp: +1 (XXX) XXX-XXXX

## 📈 Roadmap

### Versão 2.0 (Planejado)
- [ ] Migração para tecnologias modernas (Node.js/React)
- [ ] API RESTful
- [ ] App mobile nativo
- [ ] Sistema de afiliados melhorado
- [ ] Criptomoedas como método de pagamento
- [ ] Sistema de leilão
- [ ] Marketplace peer-to-peer

### Melhorias Futuras
- [ ] Suporte a mais idiomas
- [ ] Sistema de recompensas
- [ ] Programa de fidelidade
- [ ] Integração com Discord bot
- [ ] Sistema de tickets de suporte

## 📄 Licença

Este projeto é proprietário. Todos os direitos reservados © 2007-2024 GoldICQ.com

## ⚠️ Aviso Legal

Este site comercializa moedas virtuais e itens de jogos online. Os usuários devem verificar os Termos de Serviço dos respectivos jogos antes de realizar transações. GoldICQ não se responsabiliza por ações tomadas pelos desenvolvedores dos jogos contra contas de usuários.

## 👥 Equipe

- **Desenvolvimento**: Equipe GoldICQ
- **Design**: Equipe GoldICQ
- **Suporte**: Equipe GoldICQ 24/7

## 📞 Contato

- **Website**: https://www.goldicq.com
- **Email**: info@goldicq.com
- **Suporte**: support@goldicq.com

---

**Nota**: Este é um projeto legado que utiliza tecnologias antigas (ASP Classic). Recomenda-se modernização para tecnologias atuais para melhor manutenibilidade e segurança.
