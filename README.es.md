[English](README.md) | [简体中文](README.zh-CN.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [日本語](README.ja.md)

# 🎃 Midnight Rhythm Parade — Juego de ritmo de Halloween con música original

**Cuatro pequeños monstruos, tres canciones originales y una calle iluminada para Halloween.** Midnight Rhythm Parade es un juego musical de cuatro carriles creado para [Sprunki Game](https://sprunki-game.top/). Acierta en la línea dorada, enciende faroles con tu combo o reduce la velocidad para practicar. Calabaza, gato, fantasma y murciélago esperan el siguiente compás.

**[Jugar ahora](https://halloween-rhythm-parade.crazy3d.org/)** · [Colección de Halloween](https://github.com/AshinTop/halloween-games) · [Guía de integración](EMBEDDING.md) · [Notas de diseño](DESIGN.md)

**Idiomas de la documentación:** English, 简体中文, Español, Português (Brasil), 日本語. **Interfaz del juego:** solo inglés y chino simplificado. Los otros idiomas del README no implican una traducción de los menús del juego.

![Midnight Rhythm Parade con cuatro carriles de notas, línea dorada y botones de monstruos de Halloween](docs/images/gameplay.jpg)

## Súmate al desfile 👻

- Tres canciones originales completas, sintetizadas en el navegador con Web Audio.
- Cuatro formas de notas y botones de monstruos: la forma y el carril complementan el color.
- Juicios de precisión, Lantern Fever a los 20 aciertos y bonificación de combo de hasta el 50%.
- **Práctica al 75%**, pausa, continuación, marcas locales y enlaces de canciones.
- Ajuste temporal de **−150 a +150 ms** y sonido opcional.

## Repertorio

| Canción | Tempo | Notas | Duración normal |
|---|---:|---:|---:|
| Lantern Walk / 南瓜灯的散步 | 96 BPM | 70 | 48,5 s |
| Velvet Wings / 天鹅绒蝠翼 | 112 BPM | 133 | 50,3 s |
| Midnight Confetti / 午夜糖果雨 | 126 BPM | 168 | 48,6 s |

Las duraciones incluyen cuatro pulsos de entrada. Lantern Walk empieza suavemente; Velvet Wings añade síncopas y notas simultáneas; Midnight Confetti acelera los patrones. Las melodías, instrumentos de osciladores y percusión de ruido determinista se crearon para este proyecto, sin grabaciones descargadas.

## Cómo jugar

Elige canción, activa Practice si quieres y pulsa **Start the parade**. El sonido comienza tras tu interacción. Pulsa el carril correspondiente cuando la nota alcance la línea dorada. Dos notas simultáneas requieren dos entradas a la vez.

Perfect corresponde a **±55 ms**, Good a **±115 ms** y Okay a **±180 ms**. Fallar rompe el combo, pero la canción continúa: no hay barra de salud que termine la partida antes de tiempo. Veinte aciertos seguidos activan Lantern Fever. Al final aparecen puntuación, precisión, mejor combo y recuentos de juicios.

La práctica conserva todas las notas al 75% de velocidad y no sustituye las marcas normales. Ajusta el desfase para tu equipo; esa opción no elimina la latencia física de salida.

## Controles

| Acción | Teclado | Toque / ratón |
|---|---|---|
| Carriles 1–4 | D, F, J, K | Cuatro botones de monstruos |
| Iniciar / pausar / continuar | Espacio fuera de formularios | Botón principal |
| Elegir canción | Enfocar selector | Selector |
| Ajustar desfase | Enfocar ajustes | Engranaje |
| Ayuda / reinicio / compartir | Tab y Enter | Botones visibles |

Se admiten varios toques simultáneos. Mantener una tecla no genera aciertos repetidos y una nota no puede puntuar dos veces.

## Vuelve a tu canción favorita

Un [enlace de práctica de Velvet Wings](https://halloween-rhythm-parade.crazy3d.org/#song=velvet-wings&practice=1) comparte canción y velocidad, sin iniciar música ni subir una interpretación.

Idioma, sonido, desfase y mejores marcas normales se guardan en el navegador. Una interpretación incompleta no se recupera al salir. Ocultar la página o interrumpir el audio pausa automáticamente; continúa al volver, sin reproducir una cola atrasada.

## Preguntas frecuentes

**¿Es un mod de Sprunki?** Es un juego original de cuatro carriles, compañero de Pumpkin Jam en esta colección.

**¿Puedo terminar aunque falle mucho?** Sí. Todas las canciones llegan a resultados; puedes recuperar el ritmo.

**¿La práctica cambia mi récord?** No. Las marcas a velocidad normal se mantienen.

**¿Las pruebas miden la latencia del altavoz?** No. Verifican relojes y programación; la salida real depende del navegador, dispositivo, volumen y equipo de audio.

## Imágenes y vídeo

![Midnight Rhythm Parade compacto con notas descendentes, puntuación y cuatro controles táctiles](docs/images/mobile.jpg)

Interfaz real capturada en un iframe compacto del navegador. Ilustra la distribución de los controles; no es una prueba de rendimiento en un teléfono físico.

[Ver la introducción de 24 segundos](https://halloween-rhythm-parade.crazy3d.org/intro.html) · [Descargar el MP4 con subtítulos](docs/media/intro.mp4). Este vídeo silencioso está montado con capturas reales del juego, no con una partida grabada de forma continua. Las imágenes reflejan la interfaz del momento de la captura y pueden ser anteriores a mejoras visuales posteriores.

## Añádelo a tu sitio

```html
<iframe src="https://halloween-rhythm-parade.crazy3d.org/"
  title="Midnight Rhythm Parade"
  style="display:block;width:100%;height:654px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

Los tamaños previstos son 1160×654, 390×650, 390×794 y 844×340 píxeles CSS. Se necesita un navegador actual con Canvas 2D, módulos ES y Web Audio. El sonido depende de permisos y latencia; revisar el diseño adaptable no certifica todos los teléfonos físicos.

La versión en línea se publica en Cloudflare desde este repositorio de GitHub. Asigna una altura real al iframe y deja espacio para la barra del sitio anfitrión. El sitio puede ofrecer pantalla completa. Consulta [EMBEDDING.md](EMBEDDING.md) para los detalles.

## Ejecutar y comprobar en local

```sh
python3 -m http.server 4173
```

Sirve la raíz del repositorio y abre [http://localhost:4173/](http://localhost:4173/). Es un juego estático, sin compilación ni instalación de dependencias. Usa HTTP(S): abrirlo mediante `file://` puede bloquear los módulos JavaScript. Las pruebas requieren Node.js.

```sh
npm test
```

Las **13 pruebas** cubren todas las canciones con entradas perfectas simuladas, límites de precisión, duplicados, fallos, práctica, preferencias, enlaces, programación acotada de audio, pestañas congeladas, pausa, cancelación de fuentes pendientes y callbacks de inicio obsoletos. Las simulaciones no son interpretaciones humanas ni pruebas acústicas.

El código del juego no necesita cuentas, API remotas, SDK publicitarios ni una CDN de recursos externos. Los registros se guardan en el navegador, sin sincronización en la nube. Cloudflare puede añadir scripts de alojamiento y registros de solicitudes. El sonido sintetizado opcional respeta los permisos del navegador.

## Más aventuras a la luz de la luna 🍬

- [Pumpkin Jam](https://halloween-sprunki.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-sprunki) — Forma una banda original de monstruos.
- [Ghostkeeper Maze 3D](https://halloween-haunted-maze.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-haunted-maze) — Explora corredores en primera persona y rescata espíritus.
- [Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-mirror-hearts) — Guía a dos fantasmas reflejados hasta casa.
- [Trick-or-Treat TriPeaks](https://halloween-tripeaks.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-tripeaks) — Solitario de rangos vecinos y Moon Bridges.

## Créditos y apoyo

Creado para **Midnight Candy Club de AshinTop** mediante colaboración con IA dirigida por personas en diseño, programación, documentación, pruebas y revisión. Las ilustraciones originales y los sonidos sintetizados se hicieron para este proyecto. Consulta las [notas de diseño](DESIGN.md).

¿Te gustó esta pequeña aventura? **[Dale una estrella a Midnight Rhythm Parade en GitHub](https://github.com/AshinTop/halloween-rhythm-parade)** para encontrarlo después y seguir las novedades. Al informar de un problema, incluye nivel o modo, navegador, tamaño de ventana y pasos para reproducirlo. Descubre la [colección completa de Halloween](https://github.com/AshinTop/halloween-games).
