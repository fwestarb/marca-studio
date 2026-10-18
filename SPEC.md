# Marca Studio — especificação e implementação, 17/10/2026

## Escopo desta etapa

Editor comercial implementado após autorização do autor, seguindo o fluxo do Folio Studio. Nome: Marca Studio. Sem publicação nesta etapa: o autor quer revisar e publicar os dois projetos juntos depois. As seções de evolução abaixo permanecem como planejamento e não constituem funcionalidades desta versão.

## Decisões consolidadas após resposta do autor

O autor delegou a escolha da estrutura e definiu a primeira versão como preenchimento de campos.

Escolha: um único site comercial com apresentação da marca e catálogo conectados, no mesmo editor e identidade. O editor exportará páginas de empresa e produtos com navegação coerente. Não serão dois modelos desconectados.

Primeira versão: editar dados da empresa, seções, fotos, contatos e produtos; personalizar aparência, conferir prévia e baixar o site. Sem carrinho, pagamentos, login de clientes, estoque sincronizado, pedidos ou integrações de checkout. O catálogo poderá exibir preço e ficha de produto, mas não apresentará compra confirmada. Campos não preenchidos ocultam o respectivo conteúdo/ação.

As propostas de loja completa abaixo são referências de evolução e não estão autorizadas para esta primeira versão.

## Referências observadas

### Simply Chocolate — https://www.simplychocolate.dk/

Inspeção visual da abertura desktop/móvel, vitrine e rodapé. Cabeçalho branco com logotipo central; navegação por categorias e acesso à pesquisa/sacola. Abertura dividida em mídia de produto e painel sólido verde com chamada e botões retangulares. Em celular, painel de texto seguido da mídia. Fonte condensada e firme para títulos. Produtos isolados em fundo claro, categorias, preço, adicionar à sacola e pequenos destaques. A página atual tem campanha sazonal e mídia em movimento; não assumir que toda a experiência é 3D ou shader. Inclui recomendador interativo, que pode inspirar um filtro por preferências baseado em regras, sem chamar de IA.

### Christy Anne Jones — https://www.christyannejones.com/

Inspeção da abertura desktop/móvel e da página About. Site de autora/ilustradora, usado aqui como referência editorial. Fundo quase branco, serifas elegantes, marca em tom ameixa, navegação discreta, imagens amplas, composição em duas colunas, texto com respiro e botões com acabamento arredondado parcial. About usa título amplo e fotografia recortada em arco. O conteúdo pessoal, capas, fotos, marca e textos não serão reutilizados.

## Duas composições

### Modelo Empresa

1. Cabeçalho com logotipo, navegação e chamada de contato.
2. Abertura com fotografia ampla em arco/retrato, título serifado, breve apresentação e CTA.
3. Nossa história: texto, imagem secundária e divisor animado.
4. Serviços/diferenciais: três ou mais itens configuráveis, sem métricas fictícias.
5. Galeria/processo: sequência de imagens e legendas.
6. Equipe, opcional, sem nomes ou credenciais inventadas.
7. Perguntas frequentes em acordeão.
8. Contato: e-mail/WhatsApp/endereço/horários opcionais e links externos.
9. Rodapé com informações da empresa e navegação.

Não incluir depoimentos, prêmios ou números por padrão. Fotos enviadas pelo usuário ou ilustrações originais de exemplo, explicitamente identificadas.

### Página de produtos — primeira versão

1. Cabeçalho da mesma marca, com navegação para empresa/produtos/contato.
2. Banner configurável com imagem e título de coleção.
3. Categorias configuráveis e vitrine com fotos, nomes, descrições e preços opcionais.
4. Ficha de produto com galeria e informações preenchidas no editor.
5. Seção opcional de destaque/coleção.
6. Informações comerciais fornecidas pela empresa (entrega/trocas/FAQ), opcionais e sem texto jurídico inventado.
7. Contato/links configurados, sem checkout ou simulação de pedido.

Campos: nome, categoria, descrição curta/completa, preço/moeda (opcional), imagens e alt, características (material, tamanho, composição etc. como pares nome/valor) e link externo opcional. Descontos e disponibilidade não são gerados automaticamente. Sem carrinho, transação ou controle de estoque nesta etapa.

## Editor comum

Abas: Empresa / Páginas e seções / Produtos / Aparência / Download.

- Editar marca, logotipo, textos, fotos, chamadas, contatos e redes.
- Habilitar/desabilitar e reordenar seções suportadas.
- Catálogo editável: categoria, preço/moeda opcional, descrição, imagens e características informativas.
- Cores livres e paletas próprias para cada composição, sem impor a paleta escura do portfólio.
- Fontes, proporções de imagens, recortes, cantos e intensidade dos efeitos.
- Prévia isolada de desktop/tablet/celular.
- Rascunho local e arquivo de projeto portátil com imagens; desfazer/refazer.
- ZIP estático com imagens, fontes/licenças, scripts, estilos e instruções; validar exportação independente.
- Limites de mídia e projeto coerentes entre salvar/importar/exportar. Vídeo opcional com limite e poster; não exigir vídeo para o modelo funcionar.

## Direção visual

Empresa: papel #fbf9f3, tinta #25231f, ameixa #7e6170, verde suave #7b8570. Serifas abertas licenciadas, como Cormorant Garamond; fonte auxiliar simples. Colunas e arcos com margens generosas.

Loja: branco #ffffff, superfície #f1f1ef, tinta #1d1d1b, verde #315f3c. Fonte aberta condensada para títulos, a selecionar e validar; fonte auxiliar sem serifa. Produtos e preço têm prioridade visual.

## Movimento e efeitos propostos

- Empresa: entrada coordenada de títulos; revelação da foto por arco; parallax leve com amplitude menor no celular; divisores SVG que se desenham; transições de acordeão.
- Loja: movimento de produto limitado ao hover, sem deformar rótulos; troca entre fotos; transição de categorias e carrossel por arraste/setas/teclado. Sem sacola na primeira versão.
- Construção visual por rolagem com sequência de máscaras e textos; sem esconder preço ou ação de compra enquanto a pessoa tenta usar o catálogo.
- Um efeito gráfico opcional no banner: refração orgânica/transição de textura. OGL/shader próprio apenas se demonstrar ganho visual e desempenho adequado. Fallback de imagem e exportação com os mesmos recursos; nada necessário à compra depende de WebGL.
- Sem partículas, áudio automático, rotação constante ou pacotes de efeito sem função.

## Bibliotecas/skills

- frontend-design: direção e composição; playwright-interactive: verificação visual e funcional.
- React/Vite: editor, reutilizando padrões validados no Folio Studio.
- HTML/CSS/JS para exportação independente; recursos opcionais empacotados localmente.
- GSAP/ScrollTrigger para coreografia quando necessário: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Embla como candidato para carrossel de coleção: https://www.embla-carousel.com/docs/v8/api/options ; validar versão estável/licença antes de adicionar.
- OGL como candidato gráfico: https://github.com/oframe/ogl ; sem adoção automática.
- Componentes próprios: banner, galeria, cartão de produto, filtros, sacola, acordeão e editor de seções. React Bits apenas se um componente e sua licença forem adequados ao modelo distribuível; nenhum Pro sem licença.

## Execução após consolidar escolhas

1. Consolidado: editor comercial único, com empresa e catálogo; primeira versão sem venda transacional.
2. Fechar conteúdo de exemplo e esboços desktop/móvel das duas composições.
3. Criar modelos estáticos bonitos e utilizáveis, antes dos efeitos.
4. Conectar editor, mídia e prévia.
5. Implementar cadastro e exibição dos produtos, galeria e características informativas; sem fluxo de pedido.
6. Implementar coreografia e efeitos específicos e validar alternativas.
7. Salvar/importar/exportar; verificar arquivos offline ou hospedados conforme os recursos.
8. Testar teclado/foco, mobile, imagens quebradas, catálogo vazio, preços opcionais, dados importados e URLs; conferir desempenho e direitos dos recursos.
9. Revisar Folio Studio e Marca Studio; só então publicar os dois e verificar URLs públicas.

## Critérios de pronto

Proximidade com as referências na composição, não somente na paleta. Conteúdo comercial utilizável, sem controles falsos. Editor e site exportado equivalentes. Sem chaves/pagamentos sensíveis no frontend. Imagens e código próprios ou licenciados. Campos e catálogo demonstrados sem prometer processamento de vendas. Nenhum deploy nesta etapa de planejamento.

## Páginas e navegação do site exportado

Home/apresentação → Empresa/história → Produtos/catálogo → Ficha do produto → Contato. Para a primeira versão, Home e Empresa podem compartilhar a página institucional; catálogo tem página própria e ficha abre no contexto do catálogo, mantendo exportação estática simples. Nome, logotipo, navegação, cores principais e rodapé se repetem. A composição institucional segue a referência Christy, e a composição de catálogo segue Simply, com a mesma identidade configurada pelo usuário.

Publicar Folio Studio e este editor juntos depois da implementação e revisão. Não publicar agora.

## Entrega implementada

Empresa + catálogo no mesmo editor, até 12 produtos, três fotos por item, preço opcional, categorias, busca e ordenação, ficha em diálogo, destaques com setas/teclado, contatos validados, seções reordenáveis, quatro paletas, três escolhas de tipografia, cantos e movimento configuráveis. Rascunho IndexedDB, histórico de 20 alterações, projeto JSON e ZIP independente.

Movimento implementado em CSS/JavaScript: textos ligados à rolagem, recorte progressivo das fotos institucionais, parallax limitado a 16 px, divisor que se revela, troca de fotos no hover e trilho horizontal. Respeita movimento reduzido. Não foi necessário incluir GSAP, OGL, Embla ou um shader WebGL. Não há vídeo, editor de proporções ou intensidade contínua nesta versão; a fotografia principal tem recorte em arco, e os movimentos podem ser ativados ou desativados.

Marca fictícia Casa Amora, foto de ateliê gerada por IA e ilustrações de cerâmica próprias. Fontes locais com OFL. Documentação em português e resumo em inglês no README. Sem deploy; prévia local de produção disponível para revisão.
