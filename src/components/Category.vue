<template>
	<div>
		<p>カテゴリー登録してね</p>
		<input type="text" name="name" v-model="name">
		<button v-on:click="add()">送信</button>
		<div class="createdCategory">
			<ul class="categoryList">
				<li class="category" v-for="(category) in this.categories" :key="category._id">
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
        categories: 'categories',
        appConfig: 'appConfig'
      })
    },
    methods: {
        add: function () {
            var _this = this,
                params = new URLSearchParams({
									name: _this.name,
                }),
                url = this.appConfig.APIURL + 'categories'

            axios.post(
							url,
							params,
							{
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
							}).then(function (res) {
								_this.$store.dispatch('getCategories')
								_this.name = ''
            })        

        }
    }
  }
</script>

<style>
</style>
