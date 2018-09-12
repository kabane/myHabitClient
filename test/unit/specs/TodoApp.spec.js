import Vue from 'vue'
import TodoApp from '@/components/TodoApp'
import store from '@/store/store'

describe('TodoApp.vue', () => {
  it('add', () => {
    
    const Constructor = Vue.extend(TodoApp)
    const vm = new Constructor({store, el: '#app'}).$mount(document.querySelector('#app'))
    vm.text = 'test1'
    const todo = vm.add()
    
    expect(vm.todos.length).to.equal(1)
    expect(vm.todos[0].status).to.equal(vm.$store.getters.statusReady)
  }),

  it('getDoingTodo', () => {
    const Constructor = Vue.extend(TodoApp)
    const vm = new Constructor({store}).$mount()
    vm.text = 'test1'
    const todo = vm.add()
    
    expect(vm.getDoingTodo().length).to.equal(1)

    todo.status = vm.$store.getters.statusDone
    expect(vm.getDoingTodo().length).to.equal(0)
  })

  it('getDoneTodo', () => {
    const Constructor = Vue.extend(TodoApp)
    const vm = new Constructor({store}).$mount()
    vm.text = 'test1'
    const todo = vm.add()
    
    expect(vm.getDoneTodo().length).to.equal(0)

    todo.status = vm.$store.getters.statusDone
    expect(vm.getDoneTodo().length).to.equal(1)
  })
})
