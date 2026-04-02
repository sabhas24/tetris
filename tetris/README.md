# Tetris Classic Implementation

## Descripción del Proyecto

El presente proyecto consiste en el desarrollo e implementación del clásico videojuego Tetris utilizando tecnologías web estándar. La aplicación fue construida utilizando JavaScript nativo, implementando el patrón de diseño orientado a objetos para garantizar la encapsulación, modularidad y escalabilidad del código. La lógica de renderizado gráfico de alta frecuencia está impulsada a través de la API HTML5 Canvas, y la estilización de la interfaz de usuario se desarrolló mediante CSS3 para definir el diseño arquitectónico de los paneles.

## Características Principales

* **Mecánicas de Juego Completas**: Implementación rigurosa de las mecánicas base, incluyendo traslación lateral, rotación horaria/antihoraria, "soft drop" (caída acelerada) y "hard drop" (desplome instantáneo).
* **Super Rotation System (SRS)**: Integración de algoritmos de corrección de pared ("wall kicks") conformes a las especificaciones teóricas del Tetris moderno, validando rotaciones complejas en confinamiento.
* **Sistema de Puntuación Estandarizado**: Algoritmo matemático que procesa bonificaciones por combinaciones consecutivas ("Combos"), "T-Spins" y líneas despejadas simples o múltiples, escalando la penalización de caída de acuerdo a los niveles de progresión.
* **Renderización Diferida**: Minimización del impacto en memoria y mejora de rendimiento mediante el uso de Contextos de Canvas separados para el tablero central (`board`) y el visor de colas (`nextPieceDisplay`).
* **Interrupción de Estado (Handling)**: Desarrollo de subrutinas limpias que paralizan el ciclo ("Game Loop") gestionando menús dinámicos de Pausa y Cese de Juego a nivel del Document Object Model (DOM).

## Pila Tecnológica (Stack)

* **Lenguaje:** JavaScript (ECMAScript 6+)
* **Motores Gráficos y Marcado:** HTML5, Canvas 2D API
* **Hojas de Estilos:** Vanilla CSS3
* **Empaquetador / Compilador:** Vite

## Requisitos Previos e Instalación

Para ejecutar y modificar este entorno, se precisa la versión actual de Node.js instalada a nivel sistema.

1. Clonar el repositorio en un entorno local.
2. Iniciar una interfaz de terminal apuntando a la ruta principal del repositorio.
3. Descargar y enlazar las dependencias ejecutando:
   ```bash
   npm install
   ```
4. Inicializar el servidor en modo desarrollo mediante el comando:
   ```bash
   npm run dev
   ```

## Especificación de Controles

Las solicitudes de interacción se procesan a través de detectores de eventos asíncronos en el hilo base, bajo la siguiente conformación cartográfica:

| Input Físico (Teclado) | Acción Detonada |
| :--- | :--- |
| **Flecha Izquierda / Derecha** | Traslación del Tetromino sobre el plano X |
| **Flecha Abajo** | Traslación acelerada sobre el parámetro absoluto Y |
| **Flecha Arriba / Z** | Orientación cardinal inversa (Anti-horario) |
| **X** | Orientación cardinal derecha (Horario) |
| **Barra Espaciadora** | Colocación forzosa terminal en plano inferior Y |
| **P / ESC** | Suspensión preventiva del flujo de procesos del sistema |

## Arquitectura Modular del Subsistema

La aplicación segmenta responsabilidades exclusivas en múltiples archivos base bajo el directorio de trabajo principal `/src`:
- `main.js`: Script de arranque lógico; instanciación de controladores DOM y contexto gráfico primario.
- `game.js`: Controlador superior responsable de dictar periodos de recurrencia en cuadros por segundo de la instancia gráfica, cálculo de matriz de colisión temporal y estado global del juego.
- `board.js`: Instancia encargada de manipular el buffer subyacente de cuadros (matriz de grilla) y su consecuente colapso tras verificación de filas completas.
- `tetrominos.js` / `tetrominoType.js`: Clase instanciable para iteraciones de formas poliominós; posee las matrices de color y compensación SRS adjuntas para cálculo físico puro.
- `nextPieceDisplay.js`: Clase delegada a recibir y proyectar vectores del ciclo subsecuente de la partida en el cuadro visual asilado.

---
*Desarrollo estructurado para fines de uso técnico, académico o integración ulterior.*
