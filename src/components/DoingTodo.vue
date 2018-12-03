<template>
  <div :id="todo._id">
    <p>{{ todo.name }}</p>
    <p>{{ this.categoryName() }}</p>
    <p class="todo_elapsed_time">{{ this.h + ':' + this.m + ':' + this.s  }}</p>
    <button class="startBtn" v-on:click="start()" :disabled="isDisabedStartBtn()">開始</button>
    <button class="stopBtn" v-on:click="stop()" :disabled="isDisabedStopBtn()">中断</button>
    <button class="doneBtn" v-on:click="done()">完了</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'todo',
    props: [
      'todo'
    ],
    data: function () {
      return {
        interval_id: null,
        h: this.getHourStr(this.todo.elapsed_time),
        m: this.getMinStr(this.todo.elapsed_time),
        s: this.getSecStr(this.todo.elapsed_time)
      }
    },
    created: function() {
      console.log(this.todo.status)
      if (this.todo.status === this.$store.getters.statusDoing) {
        this.start()
      }
    },
    methods: {
      start () {
        var _this = this

        if (this.$store.getters.progressTodo) {
          _this.$emit('failActivateTodo')
          return
        
        }
        
        var url = 'http://localhost:3000/todos/'+_this.todo._id,
            params = new URLSearchParams({
              status: _this.$store.getters.statusDoing
            })
        axios.post(url, params)
          .then(
            function (res) {
              _this.todo.status = res.data.todo.status
              _this.$store.commit('updateCurrentTodo', _this)
              _this.interval_id = setInterval(function () {
                var elapsedTime = _this.todo.elapsed_time++

                _this.h = _this.getHourStr(elapsedTime)
                _this.m = _this.getMinStr(elapsedTime)
                _this.s = _this.getSecStr(elapsedTime)
              }, 1000)
            }
          ).catch(function(e) {
            console.log(e)
            // バリデーションメッセージの表示
          })

      },
      stop () {
        var _this = this,
            url = 'http://localhost:3000/todos/'+this.todo._id,
            params = new URLSearchParams({
              status: _this.$store.getters.statusReady,
              elapsed_time: _this.todo.elapsed_time
            })

        axios.post(url, params)
          .then(
            function (res) {
              clearInterval(_this.interval_id)
              _this.todo.status = _this.$store.getters.statusReady
              _this.todo.elapsed_time = res.data.todo.elapsed_time
              _this.$store.commit('destroyProgressTodo')
            }
          ).catch(function(e) {
            console.log(e)
            // バリデーションメッセージの表示
          })    
        this.$store.commit('destroyProgressTodo')
        this.todo.status = this.$store.getters.statusReady
      },
      done () {
        var _this = this,
            url = 'http://localhost:3000/todos/'+this.todo._id,
            params = new URLSearchParams({
              status: _this.$store.getters.statusDone
            })

        axios.post(url, params)
          .then(
            function (res) {
              _this.todo.status = _this.$store.getters.statusDone
              _this.$store.commit('destroyCurrentTodo')
            }
          ).catch(function(e) {
            console.log(e)
            // バリデーションメッセージの表示
          }) 
        
      },
      isDisabedStartBtn () {
        return this.todo.status !== this.$store.getters.statusReady || this.todo.status == this.$store.getters.statusDoing
      },
      isDisabedStopBtn () {
        return this.todo.status !== this.$store.getters.statusDoing
      },
      categoryName () {
        var category = this.$store.getters.categoryById(this.todo.category_id)

        return category ? category.name : "カテゴリー未設定"
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
