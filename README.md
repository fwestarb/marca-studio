# Marca Studio

Editor visual para criar um site comercial com apresentação da empresa e catálogo de produtos. Projeto de Felipe Westarb, inspirado na composição editorial de Christy Anne Jones e na organização de produtos da Simply Chocolate. Código, marca e mídias dessas referências não foram copiados.

## Usar

1. **Empresa:** preencha nome, apresentação, imagens e contatos públicos.
2. **Seções:** ative e ordene história, diferenciais, galeria, equipe, perguntas e contato.
3. **Produtos:** cadastre até 12 itens, com categoria, descrição, até três fotos, características e preço opcional. Escolha destaques para a coleção.
4. **Visual:** escolha paleta, cores, tipografia, cantos e movimento.
5. **Baixar:** salve o projeto editável e baixe o ZIP do site.

O ZIP contém `index.html`, `produtos.html`, CSS, JavaScript, imagens, fontes locais, licenças e instruções. Extraia tudo e abra `index.html`; não é necessário instalar o editor para visualizar o resultado. Os contatos e links externos dependem dos respectivos serviços.

O rascunho fica no IndexedDB deste navegador. Limpar dados do navegador pode apagá-lo. Guarde o arquivo `.marca.json` para continuar em outro dispositivo. O conteúdo não é enviado a um backend. Fontes e mídias são carregadas da própria instalação do editor.

### Limites desta versão

- Catálogo de apresentação: **sem carrinho, checkout, pagamento, pedidos ou controle de estoque**.
- Até 12 produtos, três fotos por produto, duas imagens de galeria e imagens de marca.
- Upload: PNG, JPEG ou WebP até 12 MB; redução local para até 1600 px, em WebP, com limite de tamanho após processamento. Sem SVG enviado pelo usuário.
- Importação de projeto: até 40 MB, com validação de formato. Projetos do Folio Studio são independentes.
- Cores são livres: confira o contraste antes de publicar.
- Casa Amora é fictícia. A foto do ateliê foi gerada por IA; os produtos são ilustrações de exemplo. Substitua por conteúdo que você possa usar.

## Desenvolvimento

```sh
npm ci
npm run dev -- --port 8830
npm run build
npm test
```

React 19, Vite 8 e fflate. O site baixado usa apenas HTML, CSS e JavaScript, sem React ou serviços externos. Fontes Cormorant Garamond, Manrope e Barlow Condensed incluídas com suas licenças SIL OFL.

Os testes usam Microsoft Edge no Windows. Ajuste `playwright.config.js` para outro navegador instalado quando necessário. Resultados e evidências estão em [verification/QA.md](verification/QA.md).

## Publicar depois da revisão

O editor pode ser publicado em hospedagem estática usando `dist/` após `npm run build`. O site criado pelo editor é outro artefato: publique todo o conteúdo do ZIP, sem remover as pastas de recursos. O editor é distribuído pelo GitHub Pages; a exportação em ZIP continua independente da hospedagem do editor.

## English

Marca Studio is a visual editor for a business introduction website and a connected product catalog. Customize content, images, contact information, section order, up to 12 products, colors and typography. Preview desktop, tablet or mobile, save a local draft, import/export an editable JSON project, and download a standalone website ZIP.

The exported website contains two HTML pages with local fonts, images, CSS and JavaScript. Extract the ZIP and open `index.html`; no server or editor is required to view it. Contact links open external services. This release does not include shopping carts, payments, order processing, authentication or stock synchronization.

All sample branding is fictional. The workshop image is AI generated; product illustrations are placeholders. Replace them with authorized business content. Drafts are stored in the current browser only; keep an editable project backup.

## Licença e créditos

Código MIT. Créditos dos recursos em [verification/ASSETS.md](verification/ASSETS.md). Licença do fflate em `FFLATE-LICENSE.txt`; fontes em `public/fonts/*/OFL.txt`.


## GitHub Pages

- Editor: https://fwestarb.github.io/marca-studio/
- Repositório: https://github.com/fwestarb/marca-studio

Para atualizar a publicação: execute `npm ci`, `npm test` e `npm run pages:build`. O último comando gera `dist/` e atualiza somente a pasta `docs/` deste projeto. Revise, faça commit e envie a branch `main`. GitHub Pages usa `main /docs`. Não edite os arquivos compilados manualmente; altere `src/` e gere a publicação novamente.
