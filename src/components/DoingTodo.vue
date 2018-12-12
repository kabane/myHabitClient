<template>
  <div :id="todo._id" class="todo">
    <header class="todo__index">{{ todo.name }}</header>
    <footer class="todo__footer">
      <div class="todo__footer__col">
        <ul class="todo__categories labels">
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
  import { mapGetters } from 'vuex'
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
    computed: {
      ...mapGetters({
        appConfig: 'appConfig'
      })
    },
    created: function() {
      if (this.todo.status === this.$store.getters.statusDoing) {
        this.start()
      }
    },
    methods: {
      start () {
        var _this = this

        if (this.$store.getters.progressTodo) {
          this.$emit('failActivateTodo')
          return
        }
        
        let params = new URLSearchParams({
          status: this.$store.getters.statusDoing
        })

        this.updateTodo(params)
          .then(
            function (res) {
              _this.todo.status = res.data.todo.status
              _this.$store.commit('updateTodo', _this)
              _this.interval_id = setInterval(function () {
                var elapsedTime = _this.todo.elapsed_time++

                _this.h = _this.getHourStr(elapsedTime)
                _this.m = _this.getMinStr(elapsedTime)
                _this.s = _this.getSecStr(elapsedTime)
              }, 1000)
            }
          ).catch(function(e) {
            console.error(e)
          })

      },
      stop () {
        var _this = this,
            url = this.appConfig.APIURL + 'todos/' + this.todo._id,
            params = new URLSearchParams({
              status: _this.$store.getters.statusReady,
              elapsed_time: _this.todo.elapsed_time
            })

        this.updateTodo(params)
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
            params = new URLSearchParams({
              status: _this.$store.getters.statusDone
            })

        this.updateTodo(params).then(function() {
          console.log('succes complate todo')
          clearInterval(_this.interval_id)
          _this.todo.status = _this.$store.getters.statusDone
          _this.$store.commit('destroyProgressTodo')
        }).catch(function(e) {
          consolo.error(e)
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
      },
      updateTodo (params, callback) {
        var url = this.appConfig.APIURL + 'todos/' + this.todo._id

        return axios.post(url, params)
      }
    }
  }
</script>

<style lang="scss" scoped>
/******************
variables
******************/
  //////////////////////
  // color
  /////////////////////
  $color_border: #BBBBBB;
  $color_primary: #22556E;
  $paleblue: #F6FAFB;



/******************
style
******************/

  .todo{
      padding: 20px;
      list-style: none;
      border-radius: 2px;
      background-color: $paleblue;

      &__index{
        font-size: 2.2rem;
        font-weight: bold;

        @media screen and ( max-width: 640px ){
          font-size: 2rem;
        } 
      }

      &:not( :last-child ){
        margin-top: 20px;
      }


      &__footer{
        margin-top: 20px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        @media screen and ( max-width: 640px ){
          margin-top: 30px;
          align-items: flex-start;
          flex-direction: column;
        }      


        &__col{
          @media screen and ( max-width: 320px ){
            width: 100%;
          }           
        }   
      }

      //////カテゴリラベル
      &__categories{
      }

      //////経過時間
      &__elapsedTime{
        line-height: 1;
        margin-top: 20px;
        margin-bottom: 0;
        letter-spacing: 0.055em;

        .elapsedTime{
          font-family: 'Barlow',sans-serif;
          font-weight: bold;
        }
      }


      ////// button
      &__buttons{
        @media screen and ( max-width: 640px ){
          margin-top: 20px;
        }           
        @media screen and ( max-width: 360px ){
          flex-direction: column;
        }        
      }
  }

</style>
