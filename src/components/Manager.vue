<template>
  <div>
    <input v-model="message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      category: 'Request',
      socket_category: null,
      socket1: null,
      // generate a list of colours
      colours: ['(255, 99, 71)', '(60, 179, 113)', '(255, 165, 0)', '(106, 90, 205)']
    }
  },
  mounted() {
    this.socket_category = new WebSocket('ws://localhost:3000')
    this.socket_amplitude = new WebSocket('ws://localhost:3001')

    this.timer = setInterval(() => {
      const randomColor = this.colours[Math.floor(Math.random() * this.colours.length)]
      this.socket_category.send(randomColor)
      // send a random decibel value to amplitude websocket
    }, 3000)

    this.timer_amplitude = setInterval(() => {
      // send a random decibel between 0.25 and 1 to amplitude websocket
      const randomDecibel = Math.random() * (1 - 0.5) + 0.25
      this.socket_amplitude.send(randomDecibel)
    }, 500)
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        this.socket_category.send(this.message)
        this.socket1.send(this.message)
      }
    }
  }
}
</script>
