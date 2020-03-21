<template>
  <div id="app">
    <md-app md-mode="reveal">
      
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{this.$route.name}}</span>
      </md-app-toolbar>
        <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>
      
      <md-app-content  >
        <div class="md-layout">

              <div class="md-layout-item md-size-50 md-small-size-100"><router-view/></div>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.md-layout-item{
  margin: auto;
}


</style>
