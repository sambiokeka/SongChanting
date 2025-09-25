# SongChanting

**Mais que ouvir, sentir.**

SongChanting é uma aplicação web imersiva para amantes de música, projetada para criar uma conexão mais profunda entre o ouvinte e a canção através de letras sincronizadas em tempo real. O projeto simula uma experiência de player de música moderno, com foco na interface e na interação do usuário.

---

## Funcionalidades

- **Player de Áudio Funcional:** Controle total de play/pause e navegação pela música.
- **Letras Sincronizadas:** Acompanhe a letra da música com destaque em tempo real e rolagem automática que não interfere na navegação da página.
- **Barra de Progresso Interativa:** Clique ou arraste a barra para avançar ou retroceder a música de forma fluida e intuitiva.
- **Componentização Dinâmica:** O Header, Sidebar e Footer são carregados dinamicamente com JavaScript, criando uma experiência de "Single Page Application" e facilitando a manutenção.
- **Design Responsivo:** Interface totalmente adaptável para desktops, tablets e dispositivos móveis, com um menu lateral funcional para telas menores.
- **Tema Dark/Light:** Alterne entre os modos claro e escuro com um clique. A preferência do usuário é salva no navegador para futuras visitas.
- **Landing Page Profissional:** Uma página de apresentação elegante para atrair novos usuários.

---

## Tecnologias Utilizadas

- **HTML5:** Estrutura semântica do conteúdo.
- **CSS3:** Estilizações customizadas, animações e layouts.
- **Tailwind CSS (via CDN):** Framework utility-first para interfaces modernas.
- **JavaScript (ES6+):** Interatividade, manipulação do DOM, controle do áudio e carregamento de componentes.
- **Font Awesome:** Ícones modernos para a interface.

---

## Como Executar o Projeto

Como o projeto utiliza apenas tecnologias front-end, não há necessidade de build complexo ou instalação de dependências.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/sambiokeka/SongChanting.git
   ```

2. **Navegue até a pasta do projeto:**
   ```bash
   cd SongChanting
   ```

3. **Abra os arquivos no navegador:**
   - Para ver a página de apresentação, abra `pages/LandingPage.html`.
   - Para ver a aplicação principal, abra `index.html`.

---

## Estrutura de Arquivos

A estrutura de pastas foi organizada para separar as responsabilidades e facilitar a manutenção:

```
/
├── index.html                  
├── README.md                  
├── pages/
│   └── LandingPage.html        
└── src/
    ├── components/            
    │   ├── header.html
    │   ├── sidebar.html
    │   └── footer.html
    ├── css/                    
    │   ├── header.css
    │   ├── sidebar.css
    │   ├── footer.css
    │   └── index.css
    ├── js/                   
    │   ├── header.js
    │   ├── sidebar.js
    │   ├── index.js
    │   ├── landing.js
    │   └── main.js
    └── audio/               
        └── starshopping.mp3
```

---
