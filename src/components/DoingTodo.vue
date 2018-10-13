<template>
  <div :id="todo._id">
    <p>{{ todo.name }}</p>
    <p class="todo_elapsed_time">{{ this.h + ':' + this.m + ':' + this.s  }}</p>
    <button class="startBtn" v-on:click="start()" :disabled="isDisabedStartBtn()">開始</button>
    <button class="stopBtn" v-on:click="stop()" :disabled="isDisabedStopBtn()">中断</button>
    <button class="doneBtn" v-on:click="done()">完了</button>
  </div>
</template>

<script>
  export default {
    name: 'todo',
    props: [
      'todo'
    ],
    data: function () {
      return {
        interval_id: null,
        h: '00',
        m: '00',
        s: '00'
      }
    },
    methods: {
      start () {
        var _this = this
        if (this.$store.getters.progressTodo) {
          _this.$emit('failActivateTodo')
          return
        }
        _this.interval_id = setInterval(function () {
          var elapsedTime = _this.todo.elapsed_time++

          _this.h = _this.getHourStr(elapsedTime)
          _this.m = _this.getMinStr(elapsedTime)
          _this.s = _this.getSecStr(elapsedTime)
        }, 1000)
        _this.todo.status = _this.$store.getters.statusDoing
        _this.$store.commit('updateCurrentTodo', _this)
        _this.$emit('activateTodo', _this.todo)
      },
      stop () {
        this.$store.commit('destroyCurrentTodo')
        clearInterval(this.interval_id)
        this.todo.status = this.$store.getters.statusReady
      },
      done () {
        if (this.todo.status == this.$store.getters.statusDoing) {
          this.$store.commit('destroyCurrentTodo')
        }
        this.todo.status = this.$store.getters.statusDone
        this.$emit('doneTodo', this.todo._id)
      },
      isDisabedStartBtn () {
        return this.todo.status !== this.$store.getters.statusReady || this.todo.status == this.$store.getters.statusDoing
      },
      isDisabedStopBtn () {
        return this.todo.status !== this.$store.getters.statusDoing
      },
      getHourStr (time) {
        var h = time / 3600 | 0
        return h < 10 ? '0' + h : h
      },
      getMinStr (time) {
        var min = time % 3600 / 60 | 0
        return min < 10 ? '0' + min : min
      },
      getSecStr (time) {
        var sec = time % 60
        return sec < 10 ? '0' + sec : sec
      }
    }
  }
</script>

<style>
</style>