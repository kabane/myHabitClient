<template>
  <div :id="todo.id" class="todo">
    <header class="todo__index">{{ todo.title }}</header>
    <footer class="todo__footer">
      <div class="todo__footer__col">
        <ul class="todo__categories labels">
          <li class="todo__category label label--category">
            {{ this.categoryName() }}
          </li>
        </ul>
        <p class="todo__elapsedTime">経過時間 <span class="elapsedTime">{{ secondStr }}</span></p>
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
  import secondFormatter from '../util/second_formatter'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'todo',
    props: [
      'prop_todo'
    ],
    data: function () {
      return {
        todo: this.prop_todo,
        interval_id: null,
        secondStr: ''
      }
    },
    computed: {
      ...mapGetters({
        appConfig: 'appConfig',
        getStatus: 'todo/status',
        getProgressTodo: 'todo/progressTodo',
        getCategoryById: 'category/categoryById'
      })
    },
    created: function() {
      this.secondStr = secondFormatter(this.todo.elapsed_time)
      if (this.todo.status === this.getStatus["DOING"]) {
        var progressTodo = this.getProgressTodo
        if (progressTodo.todo && progressTodo.todo.id === this.todo.id) {
          clearInterval(progressTodo.interval_id)
        }
        this.start()
      }
    },
    methods: {
      start () {
        if (this.$store.getters.progressTodo) {
          this.$emit('todo/failActivateTodo')
          return
        }
        
        var params = {
          id: this.todo.id,
          status: this.getStatus["DOING"]
        }
        this.$store.dispatch('todo/update', params)
          .then(function (todo) {
            this.todo = todo
            let interval_id = setInterval(function () {
              let elapsedTime = this.todo.elapsed_time++
              this.secondStr = secondFormatter(elapsedTime)
            }.bind(this), 1000)
            this.$store.commit('todo/setProgressTodo', {todo: todo, interval_id: interval_id})
          }.bind(this))
          .catch(function(e) {
            console.error(e)
          })

      },
      stop () {
        var _this = this,
            url = this.appConfig.APIURL + 'todos/' + this.todo.id,
            params = {
              id: _this.todo.id,
              status: _this.getStatus["READY"],
              elapsed_time: _this.todo.elapsed_time
            }

        this.$store.dispatch('todo/update', params)
        .then(function(todo){
          _this.todo = todo
        })
        .catch(function(e) {
          console.error(e)
        })    
      },
      done () {
        var _this = this,
            params = {
              id: this.todo.id,
              status: _this.getStatus["DONE"]
            }

        this.$store.dispatch('todo/update', params)
        .then(function(todo){
          _this.todo = todo
        })
        .catch(function(e) {
          console.error(e)
        })
      },
      isDisabedStartBtn () {
        return this.todo.status === this.getStatus["DOING"]
      },
      isDisabedStopBtn () {
        return this.todo.status !== this.getStatus["DOING"]
      },
      categoryName () {
        var category = this.getCategoryById(this.todo.category_id)

        return category ? category.name : "カテゴリー未設定"
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
