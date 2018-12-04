<template>
  <div :id="todo._id" class="todo">
    <header class="todo__index">{{ todo.name }}</header>
    <footer class="todo__footer">
      <div class="todo__footer__col">
        <ul class="todo__categories">
          <li class="todo__category label label--category">
            {{ this.categoryName() }}
          </li>
        </ul>
        <p class="todo__elapsedTime">経過時間 <span class="elapsedTime">{{ this.h + ':' + this.m + ':' + this.s  }}</span></p>
      </div>
      <div class="todo__footer__col">
        <div class="todo__buttons buttons">
            <button class="button button--start startBtn" v-on:click="start()" :disabled="isDisabedStartBtn()">開始</button>
            <button class="button button--stop stopBtn" v-on:click="stop()" :disabled="isDisabedStopBtn()">中断</button>
            <button class="button button--done doneBtn" v-on:click="done()">完了</button>
        </div>
      </div>
    </footer>
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
        var _this = this,
            url = 'http://localhost:3000/todos/'+this.todo._id,
            params = new URLSearchParams({
              status: _this.$store.getters.statusDone
            })

        axios.post(url, params)
          .then(
            function (res) {
              // フロント側のTodoを完了状態にする
              _this.todo.status = this.$store.getters.statusDone
              _this.$emit('doneTodo', this.todo._id)
            },
            function (err, status) {
              debugger;
            }
          )
        
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

<style lang="scss" scoped>
  //////////////////////
  // color
  /////////////////////
  $color_border: #BBBBBB;
  $color_primary: #22556E;
  $paleblue: #F6FAFB;

  .todo{
      padding: 20px;
      list-style: none;
      border-radius: 2px;
      background-color: $paleblue;

      &__index{
        font-size: 2.6rem;
        font-weight: bold;

        @media screen and ( max-width: 640px ){
          font-size: 2rem;
        } 
      }

      &:not( :last-child ){
        margin-top: 20px;
      }


      &__footer{
        margin-top: 40px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        @media screen and ( max-width: 640px ){
          margin-top: 30px;
          align-items: flex-start;
          flex-direction: column;
        }         
      }

      //////カテゴリラベル
      &__categories{
        padding: 0;
        margin: 0;
      }

      //////経過時間
      &__elapsedTime{
        line-height: 1;
        margin-top: 20px;
        margin-bottom: 0;
        letter-spacing: 0.025em;

        .elapsedTime{
          letter-spacing: 0.0025em;
          font-family: 'Barlow',sans-serif;
          font-weight: bold;
        }
      }


      ////// button
      &__buttons{
        @media screen and ( max-width: 640px ){
          margin-top: 20px;
        }           
      }
  }

</style>
