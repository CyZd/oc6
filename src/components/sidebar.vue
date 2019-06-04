<template>
    <nav class="panel">
        <p class="panel-heading">
            repositories
        </p>
        <div class="panel-block">
            <p class="control has-icons-left">
            <input class="input is-small" type="text" placeholder="search">
            <span class="icon is-small is-left">
                <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            </p>
        </div>
        <p class="panel-tabs">
            <a class="is-active">all</a>
            <a>public</a>
            <a>private</a>
            <a>sources</a>
            <a>forks</a>
        </p>
        <a class="panel-block is-active">
            <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            bulma
        </a>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      buttons: ["Transport", "Santé", "Enfance", "Quotidien"],
      group: 0,
    };
  },
  methods: {
    changeGroup: function(number) {
      this.group = number;
      serverBus.fire("changeGroup", this.group);
    },
  },
  mounted() {
    serverBus.fire("changeGroup", this.group);
  }
}
</script>

<style>

</style>

