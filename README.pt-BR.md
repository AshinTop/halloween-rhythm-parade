[English](README.md) | [简体中文](README.zh-CN.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [日本語](README.ja.md)

# 🎃 Midnight Rhythm Parade — Jogo de ritmo de Halloween com música original

**Quatro monstrinhos, três músicas originais e uma rua iluminada para o Halloween.** Midnight Rhythm Parade é um jogo musical de quatro pistas criado para o [Sprunki Game](https://sprunki-game.top/). Acerte a linha dourada, acenda lanternas com seu combo ou reduza a velocidade para treinar. Abóbora, gato, fantasma e morcego esperam a próxima batida.

**[Jogar agora](https://halloween-rhythm-parade.crazy3d.org/)** · [Coleção de Halloween](https://github.com/AshinTop/halloween-games) · [Guia de incorporação](EMBEDDING.md) · [Notas de design](DESIGN.md)

**Idiomas da documentação:** English, 简体中文, Español, Português (Brasil), 日本語. **Interface do jogo:** apenas inglês e chinês simplificado. Os demais idiomas do README não significam que os menus do jogo já foram traduzidos.

![Midnight Rhythm Parade de Halloween com quatro pistas, linha dourada e botões de monstrinhos](docs/images/gameplay.jpg)

## Entre no desfile 👻

- Três músicas originais completas, sintetizadas no navegador com Web Audio.
- Quatro formas de notas e botões de monstros: forma e posição ajudam a identificar cada cor.
- Julgamentos de precisão, Lantern Fever após 20 acertos e bônus de combo de até 50%.
- **Treino a 75%**, pausar e continuar, recordes locais e links de músicas.
- Ajuste de tempo de **−150 a +150 ms** e som opcional.

## Repertório

| Música | Andamento | Notas | Duração normal |
|---|---:|---:|---:|
| Lantern Walk / 南瓜灯的散步 | 96 BPM | 70 | 48,5 s |
| Velvet Wings / 天鹅绒蝠翼 | 112 BPM | 133 | 50,3 s |
| Midnight Confetti / 午夜糖果雨 | 126 BPM | 168 | 48,6 s |

As durações incluem uma contagem inicial de quatro tempos. Lantern Walk começa com calma; Velvet Wings traz síncopes e notas simultâneas; Midnight Confetti acelera os padrões. Melodias, instrumentos de osciladores e percussão de ruído determinístico foram criados para o projeto, sem gravações baixadas.

## Como jogar

Escolha uma música, ative Practice se quiser e pressione **Start the parade**. O som começa depois da sua interação. Aperte a pista correspondente quando a nota chegar à linha dourada. Duas notas juntas exigem dois comandos simultâneos.

Perfect fica em **±55 ms**, Good em **±115 ms** e Okay em **±180 ms**. Errar quebra o combo, mas a música continua: não há barra de vida que encerre a partida antes do fim. Vinte acertos seguidos ativam Lantern Fever. O resultado mostra pontuação, precisão, melhor combo e contagem de julgamentos.

O treino mantém todas as notas a 75% da velocidade e não substitui recordes normais. Ajuste o deslocamento de tempo para seu equipamento; isso não elimina a latência física da saída de áudio.

## Controles

| Ação | Teclado | Toque / mouse |
|---|---|---|
| Pistas 1–4 | D, F, J, K | Quatro botões de monstros |
| Iniciar / pausar / continuar | Espaço fora de formulários | Botão principal |
| Escolher música | Foco no seletor | Seletor |
| Ajustar tempo | Foco nos ajustes | Engrenagem |
| Ajuda / reiniciar / compartilhar | Tab e Enter | Botões visíveis |

Há suporte a toques simultâneos. Segurar uma tecla não gera acertos repetidos, e uma nota não pode pontuar duas vezes.

## Volte à sua música favorita

Um [link de treino de Velvet Wings](https://halloween-rhythm-parade.crazy3d.org/#song=velvet-wings&practice=1) compartilha música e velocidade, sem iniciar o áudio ou enviar uma apresentação.

Idioma, som, ajuste de tempo e recordes normais ficam no navegador. Uma apresentação incompleta não é retomada depois de sair. A página oculta ou o áudio interrompido pausa automaticamente; continue ao voltar, sem ouvir sons acumulados.

## Perguntas frequentes

**É um mod de Sprunki?** É um jogo original de quatro pistas, ao lado de Pumpkin Jam na mesma coleção.

**Posso terminar errando bastante?** Sim. Toda música pode chegar ao resultado, dando espaço para recuperar o ritmo.

**Treinar muda meu recorde?** Não. Os recordes em velocidade normal continuam intactos.

**Os testes medem o atraso do alto-falante?** Não. Eles verificam relógios e agendamento; a saída real depende do navegador, dispositivo, volume e equipamento.

## Imagens e vídeo

![Midnight Rhythm Parade compacto com notas caindo, pontuação e quatro controles de toque](docs/images/mobile.jpg)

Interface real capturada em um iframe compacto no navegador. A imagem mostra a organização dos controles; não representa um teste de desempenho em um celular físico.

[Assista à apresentação de 24 segundos](https://halloween-rhythm-parade.crazy3d.org/intro.html) · [Baixe o MP4 com legendas](docs/media/intro.mp4). O vídeo é silencioso e foi montado com capturas reais do jogo, não com uma partida gravada continuamente. As imagens registram a interface na data da captura e podem ser anteriores a melhorias visuais posteriores.

## Coloque o jogo no seu site

```html
<iframe src="https://halloween-rhythm-parade.crazy3d.org/"
  title="Midnight Rhythm Parade"
  style="display:block;width:100%;height:654px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

Os tamanhos planejados são 1160×654, 390×650, 390×794 e 844×340 pixels CSS. Use navegador atual com Canvas 2D, módulos ES e Web Audio. O som depende de permissões e latência; verificar o layout responsivo não certifica todos os celulares físicos.

A versão on-line é publicada no Cloudflare a partir deste repositório do GitHub. Defina uma altura real para o iframe e reserve espaço para a barra do site principal. O site pode oferecer tela cheia. Consulte [EMBEDDING.md](EMBEDDING.md) para os detalhes.

## Executar e verificar localmente

```sh
python3 -m http.server 4173
```

Sirva a pasta raiz do repositório e abra [http://localhost:4173/](http://localhost:4173/). O jogo é estático, sem compilação ou instalação de dependências. Use HTTP(S), pois abrir por `file://` pode bloquear os módulos JavaScript. Os testes exigem Node.js.

```sh
npm test
```

Os **13 testes** cobrem todas as músicas com acertos perfeitos simulados, limites de precisão, duplicatas, erros, treino, preferências, links, agendamento limitado de áudio, abas congeladas, pausa, cancelamento de fontes pendentes e callbacks de início obsoletos. As simulações não são apresentações humanas nem testes acústicos.

O código do jogo não exige conta, API remota, SDK de anúncios nem CDN de arquivos externos. Os registros ficam no navegador, sem sincronização na nuvem. O Cloudflare pode adicionar scripts de hospedagem e registros de requisições. O áudio sintetizado opcional segue as permissões do navegador.

## Outras aventuras ao luar 🍬

- [Pumpkin Jam](https://halloween-sprunki.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-sprunki) — Monte uma banda original de monstrinhos.
- [Ghostkeeper Maze 3D](https://halloween-haunted-maze.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-haunted-maze) — Explore corredores em primeira pessoa e resgate espíritos.
- [Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-mirror-hearts) — Leve dois fantasmas espelhados de volta para casa.
- [Trick-or-Treat TriPeaks](https://halloween-tripeaks.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-tripeaks) — Paciência com valores vizinhos e Moon Bridges.

## Créditos e apoio

Criado para o **Midnight Candy Club de AshinTop**, com colaboração de IA orientada por pessoas em design, programação, documentação, testes e revisão. As ilustrações originais e os sons sintetizados foram feitos para este projeto. Veja as [notas de design](DESIGN.md).

Gostou desta pequena aventura? **[Deixe uma estrela para Midnight Rhythm Parade no GitHub](https://github.com/AshinTop/halloween-rhythm-parade)** para guardar o projeto e acompanhar novidades. Ao relatar um problema, informe fase ou modo, navegador, tamanho da janela e passos para reproduzi-lo. Conheça a [coleção completa de Halloween](https://github.com/AshinTop/halloween-games).
