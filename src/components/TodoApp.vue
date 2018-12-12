<template>
  <main class="main">
    <div class="wrap">
      <ul class="alerts">
        <li class="alert" v-for="(message) in valid_messages" v-bind:key=message.index>
          {{message}}
        </li>
      </ul>
      <section class="todoform appSection">
        <div class="inputTodo">
          <div class="inputTodo__col">
            <dl class="inputTodo__row">
              <dt class="inputTodo__index">
                タスク
              </dt>
              <dd class="inputTodo__content">
                <input v-model="text" type="text" class="todo_form_field" placeholder="例：朝イチのメールチェック 呑み会の店の手配 etc…">
              </dd>
            </dl>
            <dl class="inputTodo__row">
              <dt class="inputTodo__index">
                カテゴリ
              </dt>
              <dd class="inputTodo__content">
                <select v-model="category_id">
                  <option value="" selected>カテゴリー選択</option>
                  <option v-for="(category) in this.getCategories" :key="category._id" :value="category._id">
                    {{ category.name }}
                  </option>
                </select>
              </dd>
            </dl>
          </div>
          <div class="inputTodo__col inputTodo__col--button">
            <button class="button button--primary" v-on:click="add()">追加する</button>
          </div>
        </div>
      </section>
      <section class="todo-active todolistSection todolistSection--active appSection">
  			<h2 class="appSection__index">タスク一覧</h2>
  			<ul class="todos">
  				<li class="todo" v-for="(todo) in this.doingTodos" :key="todo._id">
            <doing-todo :todo="todo" @activateTodo="activateTodo" @failActivateTodo="failActivateTodo"></doing-todo>
  				</li>
  			</ul>
  	</section>
    <section class="todo-done todolist todolist--done appSection">
  			<h2 class="appSection__index">完了タスク一覧</h2>
  			<ul class="todo">
  				<li v-for="(todo) in this.doneTodos" :key="todo._id">
            <done-todo :todo="todo"></done-todo>
  				</li>
  			</ul>
  	</section>
    </div>
  </main>
</template>

<script>
  import DoingTodo from './DoingTodo.vue'
  import DoneTodo from './DoneTodo.vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  export default {
    name: 'todo-app',
    components: {
      DoingTodo,
      DoneTodo
    },
    data: function () {
      return {
        valid_messages: [],
        text: '',
        todos: [],
        category_id: '',
      }
    },
    computed: {
      ...mapGetters({
        doingTodos: 'doingTodos',
        doneTodos: 'doneTodos',
        getCategories: 'categories',
        appConfig: 'appConfig'
      })
    },
    methods: {
      add: function () {
        var _this = this

        this.createTodo().then(function (res) {
            _this.$store.dispatch('getTodos')
            _this.text = ''
            _this.category_id = ''
        })        
      },
      // Callbacks
      activateTodo (todo) {
        var validMessages = [
          todo.name + 'を開始しました'
        ]
        this.$store.commit('updateCurrentTodo', todo)
        this.createValidMessage(validMessages)
      },
      failActivateTodo () {
        var validMessages = [
          '現在進行中のタスクが存在します',
          '新たにタスクを開始するには、進行中のタスクを完了するか中断してください'
        ]
        this.createValidMessage(validMessages)
      },
      createValidMessage (messages) {
        for(var i = 0; i < this.valid_messages.length; i++) {
          this.valid_messages.splice(i, 1)  
        }
        var count = messages.length
        if (count === 0) return
        for (var i = 0; i < count; i++) {
          this.$set(this.valid_messages, i, messages[i])
        }

        setInterval(function () {
          this.valid_messages = []
        }, 3000)
      },
      createTodo () {
        var _this = this,
            params = new URLSearchParams({
              name: this.text,
              elapsed_time: 0,
              status: this.$store.getters.statusReady,
              category_id: this.category_id
            }),
            url = this.appConfig.APIURL + 'todos'

        return axios.post(
          url,
          params,
          {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }
        )
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
  $color_disabled: #bababa;
  $color_primary: #22556E;
  $paleblue: #F6FAFB;
  $color_accent: #00D1E5;

/******************
style
******************/

.alerts{
  padding: 0;
  margin: 0 0 40px 0px;

  .alert{
    font-size: 1.5rem;
    text-align: center;
    padding: 1em;
    font-weight: bold;
    list-style: none;
    color: $color_disabled;
    border: 1px solid $color_border;
  }
}

  .inputTodo{
    width: 100%;
    display: flex;

    &__col{
      width: 100%;


      &--button{
        width: 150px;
        margin-left: 10px;

        @media screen and ( max-width: 480px ){
          width: 70px;
        }
      }
    }

    &__row{
      margin-top: 0;
      margin-bottom: 0;
      display: flex;
      align-items: center;
      &:not( :first-child ){
        margin-top: 10px;
      }
    }

    &__index{
      width: 90px;
      letter-spacing: 0.025em;
      padding-right: 10px;
      font-weight: bold;
    }

    &__content{
      width: 100%;
      margin-left: 0;

      input,select{
        width: 100%;
      }

      select{
        height: 70px;
        font-weight: bold;

        @media screen and ( max-width: 480px ){
          height: 50px;
        }

      }
    }


    &__col--button{

      .button{
        width: 100%;
        height: 100%;
        display: flex;
      }
    }
  }



  /////////// tood
  .todos{
    margin: 0;
    padding: 0;

    > li{
        list-style: none;
        &:not( :first-child ){
          margin-top: 20px;
        }
    }
  }

</style>
