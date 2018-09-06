<template>
  <div :id="todo.id" :class="active">
    <p>{{ todo.name }}</p>
    <p class="todo_elapsed_time">{{ this.h + ':' + this.m + ':' + this.s  }}</p>
    <button v-on:click="start()" :disabled="can_do()">開始</button>
    <button v-on:click="stop()" :disabled="can_stop()">中断</button>
    <button v-on:click="done()" :disabled="can_done()">完了</button>
  </div>
</template>

<script>
  export default {
    name: 'todo',
    props: [
      'todo',
      'config',
      'current'
    ],
    data: function () {
      return {
        todo: this.todo,
        config: this.config,
        current: this.current,
        interval_id: null,
        h: '00',
        m: '00',
        s: '00'
      }
    },
    methods: {
      start () {
        var _this = this
        if (this.current) {
          this.$emit('fail_activate_todo')
          return
        }
        this.interval_id = setInterval(function () {
          var elapsedTime = _this.todo.elapsed_time++

          _this.h = _this.get_hour_str(elapsedTime)
          _this.m = _this.get_min_str(elapsedTime)
          _this.s = _this.get_sec_str(elapsedTime)
        }, 1000)
        this.todo.status = this.config.status['doing']
        this.$emit('activated_todo', this.todo)
      },
      stop () {
        clearInterval(this.interval_id)
        this.todo.status = this.config.status['stop']
      },
      done () {
        this.todo.status = this.config.status['done']
        this.$emit('doneTodo', this.todo.id)
      },
      can_do () {
        return this.todo.status !== this.config.status['ready']
      },
      can_stop () {
        return this.todo.status !== this.config.status['doing']
      },
      can_done () {
        return this.todo.status !== this.config.status['doing']
      },
      get_hour_str (time) {
        var h = time / 3600 | 0
        return h < 10 ? '0' + h : h
      },
      get_min_str (time) {
        var min = time % 3600 / 60 | 0
        return min < 10 ? '0' + min : min
      },
      get_sec_str (time) {
        var sec = time % 60
        return sec < 10 ? '0' + sec : sec
      }
    }
  }
</script>

<style>
</style>
