<template>
  <div>
    <main class="main main-todoapp">
      <div class="wrap">
        <section class="appSection">
          <h2 class="appSection__index">カテゴリー登録</h2>
          <ul class="alerts">
            <li class="todo" v-for="error in errors" v-bind:key=error.index>
            {{error}}
            </li>
          </ul>
          <section class="toCreateCategory childSection">
            <h3 class="childSection__index">
            入力して追加する
            </h3>
            <div class="inputRow">
              <input type="text" name="name" placeholder="タスクの分類を入力してください（「アポ」「ランチ」…）" v-model="name">
              <button class="button button--primary" v-on:click="add()">追加する</button>
            </div>
          </section>
          <section class="createdCategory childSection">
            <h3 class="childSection__index">
            追加済みのカテゴリ
            </h3>
            <ul class="labels">
              <li class="label label--category" v-for="(category) in this.getCategories" :key="category._id">
              {{ category.name }}
              </li>
            </ul>
          </section>
          <footer class="appSection__footer">
            <router-link to="/" class="backlink">タスク一覧に戻る</router-link>
          </footer>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import HeaderParts from './common/HeaderParts'
  
  export default {
    name: 'category',
    components: {
      HeaderParts
    },
    data: function () {
      return {
        errors: [],
        name: ''
      }
    },
    created: function() {
      this.fetchCategories()
    },
		computed: {
      ...mapGetters({
        getCategories: 'category/categories',
        appConfig: 'appConfig'
      })
    },
    methods: {
      add: function () {
          let params = {
                name: this.name,
              }

          this.$store.dispatch('category/create', params)
          .then(function() {
            this.name = ''
            this.errors = []
          }.bind(this))
          .catch(function(e) {
            let res = e.response,
            error_message = res.data.error_message

            this.onErrorCatch(error_message)
          }.bind(this))
      },
      onErrorCatch (message) {
        this.errors = []
        this.errors.push(message)
      },
      fetchCategories() {
        this.$store.dispatch('category/getAll')
        .catch(function(res){
          this.$router.push({path: '/login'});
        }.bind(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*******************
  variables
  *******************/

  //////////////////////
  // color
  /////////////////////
  $color_border: #BBBBBB;
  $color_disabled: #bababa;
  $color_primary: #22556E;
  $paleblue: #F6FAFB;
  $color_accent: #00D1E5;


  /*******************
  style
  *******************/

  .childSection{
    margin-top: 40px;

    &__index{
      margin-top: 0;
      font-size: 1em;
      font-weight: lighter;
      font-weight: 600;
    }
  }

  .toCreateCategory{

    margin-top: 0;

    .inputRow{
      display: flex;

      input{
        width: 100%;
      }

      .button{
        width: 150px;
        margin-left: 20px;
      }
    }
  }


  .createdCategory{
    padding: 20px;
    background-color: $paleblue;
  }


</style>
