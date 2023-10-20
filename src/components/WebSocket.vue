<template>
  <div>
    <ul>
      <div id="box1"></div>

      <div id="box2"></div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      messages: [],
      socket: null,
      socket1: null,
      colour: 'White',
      color_50: null,
      r: null,
      alpha: 1
    }
  },
  methods: {
    parseTuple(t) {
      return JSON.parse(t.replace(/\(/g, '[').replace(/\)/g, ']'))
    }
  },
  mounted() {
    this.socket_category = new WebSocket('ws://localhost:3000')
    this.socket_ampltitude = new WebSocket('ws://localhost:3001')
    this.socket_ampltitude.onmessage = (event) => {
      console.log(event.data)
      this.alpha = event.data
      this.color_50 = 'rgba(' + [this.r[0], this.r[1], this.r[2], this.alpha * 0.8].join(',') + ')'
      this.colour = 'rgba(' + [this.r[0], this.r[1], this.r[2], this.alpha].join(',') + ')'
    }
    this.socket_category.onmessage = (event) => {
      console.log('Category Changed')
      this.r = this.parseTuple(event.data)
    }
  }
}
</script>

<style scoped>
@keyframes pulse-black {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 v-bind('colour_50') 0.5;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px v-bind('colour');
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 v-bind('colour');
  }
}

@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 red 1;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px red;
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 red;
  }
}

#h1 {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
}
#box1 {
  width: 50px;
  height: 50px;
  margin: 10px;
  padding: 10px;
  background-color: v-bind('colour');
  transition: background-color 0.5s ease;
  border-radius: 50%;
  transform: scale(1.5);
  animation: pulse-black 3s infinite;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
#box2 {
  width: 20px;
  height: 20px;
  margin: 10px;
  padding: 10px;
  background-color: red;
  border-radius: 50%;
  transform: scale(1);
  top: 46rem;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  animation: pulse-red 3s infinite;
}
</style>
