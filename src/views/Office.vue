<template>
  <div class="office-floorplan">
    <Person
      v-for="user of users"
      :key="user.name"
      v-bind="{
        name: user.name,
        imagePath: user.imagePath,
        feeling: user.feeling,
        need: user.need,
        offer: user.offer,
        emoji: user.emoji,
        color: user.color
      }"
    />
  </div>
</template>

<script>
  import Person from '@/components/Person';

  export default {
    name: 'Office',
    components: {
      Person
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

<style scoped>
  .office-floorplan {
    /*background: url("../assets/officefloor-02.svg") no-repeat;*/
    background-size: cover;
    height: 1000rem;
  }
</style>
