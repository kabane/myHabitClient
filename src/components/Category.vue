<template>
	<main class="main">
    <div class="wrap ">
    		<section class="appSection">
          <h2 class="appSection__index">カテゴリー登録</h2>
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
</template>

<script>
	import axios from 'axios'
  import { mapGetters } from 'vuex'
  export default {
    name: 'category',
    components: {
    },
    data: function () {
      return {
        valid_messages: [],
        name: ''
      }
		},
		computed: {
      ...mapGetters({
        getCategories: 'category/categories',
        appConfig: 'appConfig'
      })
    },
    methods: {
        add: function () {
            var _this = this,
                params = {
                  name: this.name,
                }

            this.$store.dispatch('category/create', params)
            .then(function() {
              _this.name = ''
            })
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
    }
  }

  .toCreateCategory{

    margin-top: 0;

    .childSection__index{
      padding-left: 20px;
    }

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
