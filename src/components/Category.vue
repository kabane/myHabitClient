<template>
	<div>
		<p>カテゴリー登録してね</p>
		<input type="text" name="name" v-model="name">
		<button v-on:click="add()">送信</button>
		<div class="createdCategory">
			<ul class="categoryList">
				<li class="category" v-for="(category) in this.getCategories" :key="category._id">
					{{ category.name }}
				</li>
			</ul>
		</div>
	</div>
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

<style>
</style>
