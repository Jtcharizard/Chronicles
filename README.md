# Chronicles of Dominion

Uma simulação autônoma de civilizações para navegador. Um mundo em grid nasce de uma seed; governantes com personalidades distintas administram recursos, desenvolvem cidades, pesquisam, negociam, guardam memórias, expandem fronteiras e conduzem guerras enquanto o jogador observa ou interfere.

## Executar e publicar

Não há build nem dependências. Abra `index.html` diretamente (`file://`) ou sirva a pasta com qualquer servidor estático. Para GitHub Pages, publique a raiz da branch: todos os caminhos são relativos e a aplicação funciona offline depois do carregamento dos arquivos locais.

## Funcionalidades e controles

- Geração coerente por ruído interpolado, nove terrenos, sete recursos e capitais espaçadas.
- Economia anual com produção, consumo, fome, crescimento, capacidade, construções e estabilidade.
- IA de utilidade explicável, influenciada pelos dez traços do líder.
- Diplomacia bilateral, comércio, pactos, alianças, tréguas, guerras e memórias com decaimento.
- Árvore tecnológica em três eras; pathfinding BFS; recrutamento, suprimentos, moral, batalhas e conquistas.
- Treze eventos, linha do tempo filtrável, seis gráficos, ranking, vitória e dez poderes do Observador.
- Saves locais, autosave, importação/exportação JSON e estado integral da PRNG.
- Canvas: arraste para mover, roda para zoom, clique para inspecionar; WASD/setas também movem. Espaço pausa.

## Arquitetura

Scripts clássicos formam o namespace global `COD` e são carregados em ordem. `prng` e `world-generator` garantem determinismo; `models`, `economy`, `technology`, `diplomacy`, `military`, `events` e `ai` implementam domínios independentes; `simulation` orquestra um ano; `renderer` desenha apenas células visíveis; `ui` cuida de painéis/modais; `save-system` serializa; `app` mantém relógio e renderização separados.

Toda aleatoriedade da simulação passa por `PRNG`. A geração de seed pelo menu usa aleatoriedade do navegador apenas para sugerir uma nova entrada antes do mundo existir. Com seed, opções e intervenções idênticas, os resultados são idênticos.

## Saves

O formato `1.0.0` preserva mundo, civilizações, cidades, exércitos, relações, memórias, tecnologias, crônica, séries históricas, configurações, ano e estado da PRNG. Há autosave a cada 30 segundos; saves nomeados podem ser carregados/excluídos e JSON pode ser exportado/importado.

## Testes

Abra `tests/test-runner.html`. O runner cobre PRNG, mundos, capitais, economia, fome, expansão, diplomacia, memórias, IA, pathfinding, batalhas, tecnologias, saves, continuidade determinística e 1.000 anos de simulação.

## Limitações e próximos passos

O modelo privilegia desempenho e legibilidade: logística é agregada por estoque civilizacional; comércio é bilateral e instantâneo; exércitos usam uma composição predominante; revoltas reduzem estabilidade em vez de sempre criarem um novo Estado; e a descoberta do mapa não limita a visão do Observador. Futuras versões podem incluir rotas comerciais persistentes, frotas navais, Estados rebeldes completos, mapas hexagonais, replay de intervenções e localização adicional.
