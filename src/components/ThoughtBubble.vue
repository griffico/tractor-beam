<template>
  <div class="thought-bubble thought">
    <p>I feel: {{ feeling }}</p>
    <p>I need: {{ need }}</p>
    <p>I offer: {{ offer }}</p>
  </div>
</template>

<script>
  export default {
    name: 'thought-bubble',
    props: {
      feeling: String,
      need: String,
      offer: String
    }
  };
</script>

<style scoped>
  /* Styles borrowed from: https://codepen.io/JoeHastings/pen/gPrPMo */
  .thought-bubble {
    position: relative;
    width: 200px;
    text-align: left;
    line-height: 1.4em;
    margin-bottom: 40px;
    margin-left: 7rem;
    background-color: #fff;
    border: 3px solid #333;
    border-radius: 30px;
    font-family: sans-serif;
    padding: 20px;
    font-size: large;
  }

  p {
    margin: 0.5rem;
  }

  .thought-bubble:before,
  .thought-bubble:after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
  }

  .thought {
    border-radius: 50px;
    padding: 15px 30px;
  }

  .thought:before,
  .thought:after {
    left: 10px;
    bottom: -30px;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: 3px solid #333;
    -webkit-border-radius: 28px;
    -moz-border-radius: 28px;
    border-radius: 28px;
  }

  .thought:after {
    width: 20px;
    height: 20px;
    left: 5px;
    bottom: -40px;
    -webkit-border-radius: 18px;
    -moz-border-radius: 18px;
    border-radius: 18px;
  }
</style>
