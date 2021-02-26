<template>
  <div>
    <h1>Mood Ring Game Demo</h1>
    <img src="../assets/cboyer17.png" alt="" id="image" hidden />
    <canvas ref="myCanvas" id="canvas" />
    <div>
      <button @click="startGame">Start</button>
      <button @click="stopGame">Stop</button>
      <button @click="resetGame">Reset</button>
    </div>
    <div class="content-container">
      <div class="active-users-panel" id="active-user-container">
        <h3 class="panel-title">Active Users:</h3>
      </div>
      <div class="video-chat-container">
        <h2 class="talk-info" id="talking-with-info">
          Select active user on the left menu.
        </h2>
        <div class="video-container">
          <video
            ref="video1"
            autoplay
            class="remote-video"
            id="remote-video"
          ></video>
          <video
            ref="video2"
            autoplay
            muted
            class="local-video"
            id="local-video"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import loop from '@/gameloop/GameLoop.ts';
  import { ref } from '@vue/reactivity';
  import { onMounted } from 'vue';

  export default {
    name: 'GameWindow',
    setup(): any {
      const myCanvas = ref<HTMLCanvasElement | null>(null);
      const video1 = ref<HTMLVideoElement | null>(null);
      const startGame = ref<Function | null>(null);
      const stopGame = ref<Function | null>(null);
      const resetGame = ref<Function | null>(null);

      const currentXPos = ref(0);
      const currentYPos = ref(0);
      const destinationXPos = ref(0);
      const destinationYPos = ref(0);

      onMounted(() => {
        if (myCanvas.value instanceof HTMLCanvasElement) {
          let gameLoop = loop(myCanvas.value, video1.value);
          startGame.value = gameLoop.startGame;
          stopGame.value = gameLoop.stopGame;
          resetGame.value = gameLoop.resetGame;
          currentXPos.value = gameLoop.currentX;
          currentYPos.value = gameLoop.currentY;
          destinationYPos.value = gameLoop.destinationYPos
            ? gameLoop.destinationYPos
            : 0;
          destinationXPos.value = gameLoop.destinationXPos
            ? gameLoop.destinationXPos
            : 0;
        }
      });
      return {
        myCanvas,
        startGame,
        stopGame,
        resetGame,
        currentXPos,
        currentYPos,
        destinationXPos,
        destinationYPos
      };
    }
  };
</script>

<style scoped>
  #canvas {
    border: 1px solid black;
    background-image: url('../assets/office-layout-1-office-layout-example.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
