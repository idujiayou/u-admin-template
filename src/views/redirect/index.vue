<script>
import { h } from 'Vue'

export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function() {
    return h('div')
  }
}
</script>
