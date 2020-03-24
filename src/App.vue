<template>
  <div id="app">
    <md-app md-mode="reveal">
      
      <md-app-toolbar class="md-primary">
        
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
        <span class="md-title">{{this.$route.name}}</span>
          </div></div>
            <div class="md-toolbar-row">
          <md-tabs class="md-primary" md-sync-route>
            <md-tab id="tab-home" md-label="Simulator" to="/" exact></md-tab>
            <md-tab id="tab-about" md-label="About" to="/about" ></md-tab>
            <md-tab id="tab-contribute" md-label="Contribute" to="/contribute" ></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>
      
      <md-app-content  >
        <div class="md-layout">

              <div class="md-layout-item md-size-50 md-small-size-100"><router-view/></div>
        </div>
      </md-app-content>
    </md-app>
    <footer>
        <p>Made by <a href="https://github.com/RemiTheWarrior">Rémi Delaporte-Mathurin</a>, <a href="https://github.com/Lili-Gigi">Lilian Gilier</a> and <a href="https://github.com/BilelJegham">Bilel Jegham</a><br/>
        under <a href="https://raw.githubusercontent.com/BilelJegham/epidemic-simulator-front/master/LICENSE">MIT license</a></p>
    </footer>
    
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
#app .md-card-header {
  background: #448aff;
  margin-bottom: 18px;
}

#app .md-card {
  background: #474747;
}
footer{
  padding: 0.5%;
  text-align: center;
}

</style>
