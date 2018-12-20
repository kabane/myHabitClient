<template>
  <div class="todo">
    <header class="todo__index">{{ todo.name }}</header>
    <footer class="todo__footer">
      <div class="todo__footer__col">
        <ul class="todo__categories labels">
          <li class="todo__category label label--category">
            {{ this.categoryName() }}
          </li>
        </ul>
      </div>
    </footer>    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'done-todo',
    props: ['todo'],
    data: function () {
      return {
        donetodo: this.todo
      }
    },
    computed: {
        // getCategoryById: 'category/categoryById'
      ...mapGetters({
        getCategoryById: 'category/categoryById'
      })
    },
    methods: {
      categoryName () {
        var category = this.getCategoryById(this.donetodo.category_id)

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
  //////////////////////
  $color_border: #BBBBBB;
  $color_disabled: #bababa;
  $color_primary: #22556E;
  $paleblue: #F6FAFB;
  $color_accent: #00D1E5;


/******************
style
******************/

  .todo{
      // color: $color_disabled;
      padding-left: 3em;
      position: relative;
      // color: $color_disabled;
      // background-color: $paleblue;  
      color: #fff;
      background-color: lighten($color_disabled,6%);  


      &:before{
        content:"";
        width: 1em;
        height: 1em;
        margin: auto;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 1em;
        border-radius: 10000px;
        background-image: url(../assets/img/icon-done.svg);
        background-size: 1em auto;
        background-position: center;
        background-repeat: no-repeat;
        // background-color: currentColor;
      }       

      &__index{
        font-weight: bold;

        @media screen and ( max-width: 640px ){
        } 
      }

      &:not( :last-child ){
        margin-top: 20px;
      }
  }
</style>

