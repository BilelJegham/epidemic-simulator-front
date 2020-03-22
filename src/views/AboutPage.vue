<template>
<div>
  <md-card>
      <md-card-header>
  <h1 id="epidemic-simulator">epidemic-simulator</h1>
      </md-card-header>
      <md-card-content>
<p>Many countries in Europe and around the world are currently on lockdown. Yet many people still choose to go out in the street despite the control measures!
   We&#39;ll first explain why applying <strong>control measures and lockdown</strong> during an epidemic are indeed <strong>a good thing</strong> and then we&#39;ll then try to use this model to do some predictions !
</p>
<p>will simulate the evolution of the epidemic in a specific country based on <a href="https://github.com/pomber/covid19">pomber/covid19</a> dataset</p>

      </md-card-content>
</md-card>

  <md-card>
    
     <md-card-header>
<h2 id="mathematical-model">Mathematical model</h2>

      </md-card-header>
      <md-card-content>
<p>Let&#39;s first try to create a <strong>mathematical model</strong> that represents the population and the way some get contaminated, some recover, and some people die.
   We&#39;ll name <img src="https://render.githubusercontent.com/render/math?math=P_h"> the <strong>h</strong>ealthy population, <img src="https://render.githubusercontent.com/render/math?math=P_c"> the <strong>c</strong>ontaminated population, <img src="https://render.githubusercontent.com/render/math?math=P_r"> the population which has <strong>r</strong>ecovered from the disease and produced its own antibodies and <img src="https://render.githubusercontent.com/render/math?math=P_d"> the part of the population that has <strong>d</strong>ied.
   The temporal evolution of each population can be modelled with the following system of equations:
</p>
<p><img src="https://render.githubusercontent.com/render/math?math=\left\{\begin{array}{l}\frac{\partial P_{h}}{\partial t}=-K_{c} P_{h} P_{c} \\ \\\frac{\partial P_{c}}{\partial t}=K_{c} P_{h} P_{c}-K_{r} P_{c}-K_{d} P_{c} \\ \\\frac{\partial P_{r}}{\partial t}=K_{r} P_{c} \\ \\\frac{\partial P_{d}}{\partial r}=K_{d} P_{c} \\ \\P_h = P_{h_0} \quad \mathrm{and}  \quad P_c = P_{c_0} \quad \mathrm{for} \quad t=0\end{array}\right."></p>
<p>where <img src="https://render.githubusercontent.com/render/math?math=K_c"> is the contamination probability, <img src="https://render.githubusercontent.com/render/math?math=K_r"> is the recovery probability, <img src="https://render.githubusercontent.com/render/math?math=K_d"> is the death probability.</p>
<p>We&#39;ll assume the contamination probability increases with people&#39;s mobility <img src="https://render.githubusercontent.com/render/math?math=v">.
   If people were 100% immobile that would mean <img src="https://render.githubusercontent.com/render/math?math=v = 0"> . We&#39;ll assume that usual people&#39;s mobility is <img src="https://render.githubusercontent.com/render/math?math=v = 1"> .
</p>
<p><img src="https://render.githubusercontent.com/render/math?math=K_c = 0.4 \cdot v"></p>
<p>Here <img src="https://render.githubusercontent.com/render/math?math=0.4"> is arbitrary.</p>

      </md-card-content>
</md-card>

  <md-card>
    
     <md-card-header>
<h2 id="effect-of-control-measures">Effect of control measures</h2>

      </md-card-header>
      <md-card-content>
<p><strong>How does this model behaves in time ?</strong></p>
<p align="center">
   <img src="https://user-images.githubusercontent.com/40028739/76973966-e6380880-6930-11ea-8ec8-cf7c3003f69f.png" alt="drawing" width="500"/>
</p>
<p>First, <strong>more and more people get contaminated</strong>. Then as people recover and developp antibodies, a <strong>contamination peak</strong> can be seen after which contaminated population <strong>decreases until reaching zero</strong>: the epidemic has ended.</p>
<p>By decreasing people&#39;s mobility, the contamination peak is <strong>delayed</strong> and is <strong>less significant</strong> in terms of contaminated people. Also the epidemic ends later.</p>
<p>Overall, <strong>the curve has been flatted</strong>!</p>
<p><strong>Great! But why would we care ?</strong></p>
<p>Well let&#39;s take a look at the ammount of dead people now...</p>
<p align="center">
   <img src="https://user-images.githubusercontent.com/40028739/76974131-1ed7e200-6931-11ea-9654-324073f08d50.png" alt="drawing" width="500"/>
</p>
<p>Here we start to see the importance of taking control measures! <strong>As the mobility decreases, deaths decrease as well!</strong>
   That&#39;s because if less people get sick, then obviously less people a likely to die from the disease!
</p>
<p>But that&#39;s not quite the way our health system works right ? People don&#39;t miraculously heal themselves (at least not all of them): some of them go to the hospital. And if there are too many patients then ... it is more likely that people will die and heal less rapidly.</p>
<p>In order to take this effect into account in our model, let&#39;s first assume a hospital capacity <img src="https://render.githubusercontent.com/render/math?math=C">. If the number of sick people is above this capacity, the recovering probability <img src="https://render.githubusercontent.com/render/math?math=K_r"> will decrease by 50% and the death probability <img src="https://render.githubusercontent.com/render/math?math=K_d"> will increase by 50%.
   What will happen then ?
</p>
<p><img src="https://user-images.githubusercontent.com/40028739/76974014-f9e36f00-6930-11ea-8da8-2cf38e16fe74.png" alt="drawing" width="420"/><img src="https://user-images.githubusercontent.com/40028739/76974237-3fa03780-6931-11ea-9d15-87671ad77bbf.png" alt="drawing" width="420"/></p>
<p>We added to the previous graphs dashed lines corresponding to the extended model with a hospital saturation limit.
   If people&#39;s mobility is not reduced enough <strong>the number of sick people increases by 12%!</strong> But more important is that <strong>the number of deaths almost doubled</strong>!
</p>
<p>That&#39;s pretty much it!
   The simple code I used is available if you wish to play with it and tweak the parameters a little!
</p>
<h3 id="takeaway-message-stay-home-">Takeaway message: stay home!</h3>

      </md-card-content>
</md-card>

  <md-card>
     <md-card-header>
<h2 id="model-validation-and-predictions">Model validation and predictions</h2>

      </md-card-header>
      <md-card-content>
<p>Alright. Is this model actually representing what&#39;s <strong>happening in reality</strong> ?
   One way to found out: try to <strong>reproduce actual epidemics</strong> that happened in the past!
</p>
<p>Let&#39;s do it with the recent Covid-19 epidemic in China that is nearly ended by now.
   The model&#39;s parameters (contamination, recovering and death rates) will be adjusted in order to fit actual data as best as we can.
</p>
<p><img src="https://user-images.githubusercontent.com/40028739/77149687-72ae0c80-6a92-11ea-831d-a09e8ad57611.png" alt="drawing" width="420"/><img src="https://user-images.githubusercontent.com/40028739/77150925-36c87680-6a95-11ea-8852-a1bf8b910658.png" alt="drawing" width="420"/></p>
<p>Not that bad afterall!
   We now know that <strong>our model can reproduce actual epidemic behaviour</strong> with more or less accuracy.
   Could we use this fitting process to try and <strong>predict the future</strong> ?
   I&#39;d really like to know when I&#39;ll be authorised to go out again...so let&#39;s do it for France!
</p>
<p><img src="https://user-images.githubusercontent.com/40028739/77149693-76da2a00-6a92-11ea-963e-cfafe0ca5a15.png" alt="drawing" width="420"/><img src="https://user-images.githubusercontent.com/40028739/77150929-38923a00-6a95-11ea-877a-036557358c77.png" alt="drawing" width="420"/></p>
<p>Alright, so this is obviously not as accurate as the case for China cause we simply don&#39;t have enough data yet. This means that the predictions will gain in accuracy day by day!
   But so far, all we can expect is that the epidemic in France (assuming there won&#39;t be any changes in the confinement measures) won&#39;t be over until the end of April!
   We&#39;ll come back then and check if the results were okay!
</p>
      </md-card-content>
  </md-card>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

