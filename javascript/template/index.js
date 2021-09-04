function vue () {
  function Vue (options) {
    if (options.created) {
      options.created()
    }

    if (options.mounted) {
      options.mounted()
    }

  }

  new Vue({
    created () {
      console.log('created')
    },

    mounted () {
      console.log('mounted')
    }
  })

}

module.exports = {
  vue
}