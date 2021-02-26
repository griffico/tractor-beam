<template>
  <div class="person-component">
    <ThoughtBubble :feeling="feeling" :need="need" :offer="offer" />
    <div class="person" :style="personStyles">
      <div class="emoji" :style="{ backgroundColor: color }">
        {{ emoji }}
      </div>
      <img class="avatar" :src="imagePath" alt="Nope" />
      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>

<script>
  import ThoughtBubble from '@/components/ThoughtBubble';

  export default {
    name: 'Person',
    components: {
      ThoughtBubble
    },
    props: {
      name: String,
      imagePath: String,
      emoji: String,
      color: String,
      feeling: String,
      need: String,
      offer: String
    },
    computed: {
      personStyles: function () {
        return {
          backgroundColor: this.color,
          border: `0.3rem solid ${this.color}`,
          borderBottom: 'none'
        };
      }
    }
  };
</script>

<style scoped>
  .person-component {
    position: relative;
    display: inline-block;
    margin: 1rem;
  }

  .emoji {
    position: absolute;
    top: -1.5rem;
    left: calc(50% - 1.25rem);
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.7rem;
    font-size: 1.5rem;
    border-radius: 50%;
  }

  .person {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 10rem;
    height: 12rem;
  }

  .avatar {
    width: 10rem;
    height: 10rem;
  }

  .name {
    height: 2rem;
    color: white;
    font-weight: bold;
    line-height: 2rem;
  }
</style>
