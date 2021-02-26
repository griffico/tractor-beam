<template>
  <div class="user-list">
    <GameWindow />
    <!--    <Person-->
    <!--      v-for="user of users"-->
    <!--      :key="user.name"-->
    <!--      v-bind="{-->
    <!--        name: user.name,-->
    <!--        imagePath: user.imagePath,-->
    <!--        feeling: user.feeling,-->
    <!--        need: user.need,-->
    <!--        offer: user.offer,-->
    <!--        emoji: user.emoji,-->
    <!--        color: user.color-->
    <!--      }"-->
    <!--    />-->
  </div>
</template>

<script lang="ts">
  // import Person from '@/components/Person';

  import GameWindow from '@/components/GameWindow.vue';

  export default {
    name: 'App',
    components: {
      GameWindow
      // Person
    },
    data: function () {
      return {
        users: [
          {
            name: 'Flip Flop Floopy',
            imagePath: '/dolphin-avatar.jpeg',
            feeling: 'Energetic',
            need: 'Fishes',
            offer: 'Nose bops',
            emoji: '🥳',
            color: 'teal'
          },
          {
            name: 'Floppsy',
            imagePath: '/bunny-avatar.jpeg',
            feeling: 'fluffy',
            need: 'cuddles',
            offer: 'Nose bops',
            emoji: '😇',
            color: 'brown'
          },
          {
            name: 'Floofy',
            imagePath: '/cat-avatar.jpeg',
            feeling: 'Sleepy',
            need: 'better about taking breaks to sleeeeeep!',
            offer: 'Nose bops',
            emoji: '😈',
            color: '#ffa62f'
          }
        ]
      };
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
