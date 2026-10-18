# Inventário de verificação

Antes dos testes: validar empresa e catálogo, campos de textos/contatos, seções e ordem, produtos e preços opcionais, busca/categorias/ordem, fichas e menu, visual/fontes, upload e projetos JSON, rascunho/desfazer/refazer, ZIP independente com recursos locais e navegação.

Verificação visual: editor desktop e celular; apresentação editorial com foto em arco; catálogo com painel verde e títulos condensados; fichas e menus sem transbordamento. Evidências em screenshots e testes automatizados.

Cenários adversos: texto HTML e URL javascript importados; JSON de outro editor; catálogo vazio e busca sem resultados; preços inválidos; navegação por teclado; imagens indisponíveis. Conferir ausência de pedidos de rede externos no ZIP offline.

Limite: não há checkout, pagamento, envio de pedidos ou banco de dados. Não afirmar vendas funcionais.

## Resultado — 17/10/2026

Seis testes Playwright passaram (16,5 s na execução completa após correções):

1. Edição, rascunho recuperado após recarregar, desfazer/refazer e navegação entre as duas páginas.
2. Ocultar/reordenar seções, equipe, paleta/fonte, upload com conversão WebP, projeto JSON e rejeição de projeto incompatível.
3. Preço válido/inválido, filtro por categoria, busca sem acentos, estado vazio, ordenação e ficha de produto.
4. ZIP extraído e aberto por `file://` em contexto offline, fontes e imagens locais, navegação, contatos, duas fotos, ficha no celular, imagem indisponível e movimento reduzido. Nenhuma requisição HTTP externa ou erro JavaScript nesse percurso. Texto HTML escapado e URL javascript omitida.
5. Editor em 390 × 844, menu da prévia, troca para catálogo, ausência de transbordamento horizontal e fechamento do diálogo de restauração por Escape.
6. Normalização de imagens, limite de produtos e cálculo de valores em centavos.

Revisão visual separada em Edge: editor desktop, empresa desktop/celular, catálogo desktop/celular e ficha no celular. Capturas PNG nesta pasta. Conferência adicional de ponteiro real na prévia reduzida: o roteamento funciona. O Playwright reporta coordenadas internas sem escala em iframes transformados; o teste de celular mede a transformação e envia o clique nas coordenadas visuais reais.

`npm run build` concluído. `npm audit --omit=dev`: zero vulnerabilidades reportadas. fflate atualizado de 0.8.2 para 0.8.3 durante a implementação.

Cobertura limitada ao Edge/Chromium disponível neste computador; Safari e Firefox não foram executados. Não houve teste de serviço comercial externo nem publicação no GitHub. O editor permanece local.


## Verificação para publicação — 17/10/2026

Sete testes completos aprovados (19,6 s). Incluída revelação suave das seções institucionais e das fotos de produto ao rolar. Ficha com entrada vertical de cima para baixo, inclusive conteúdo com pequeno intervalo entre foto e texto. Teste específico confirma direção dos quadros-chave, revelação e desligamento com movimento reduzido. Build de produção aprovado.
Publicação autorizada pelo autor no GitHub Pages. Pasta docs gerada por npm run pages:build. Verificação pública registrada em DEPLOY.md após a conclusão.
