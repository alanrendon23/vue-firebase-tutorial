<template>
<div class="hello">
    <div v-if="loading" class="spinner">Cargando...<br></div>
    <Plotly :data="data" :layout="layout" :display-mode-bar="false" v-if="!loading" ></Plotly>
</div>
</template>  

<script>
import firebase from 'firebase';
import { Plotly } from 'vue-plotly'
export default {
  name: 'HelloWorld',
  components: {
    Plotly
  },
  mounted: function () {
    // this.loading = false;
    var db = firebase.database();
    var scoresRef = db.ref().child('answers');
    
    scoresRef.once('value', snapshot => {
        var matrix = [];
        Object.keys(snapshot.val()).forEach(element => {
          if(matrix[snapshot.val()[element].questionId] == null){
            matrix[snapshot.val()[element].questionId]= [];
            matrix[snapshot.val()[element].questionId][0] = 0;
            matrix[snapshot.val()[element].questionId][1] = 0;
          }
          if(snapshot.val()[element].right == true) {
            matrix[snapshot.val()[element].questionId][1] = (matrix[snapshot.val()[element].questionId][1] != null) ? matrix[snapshot.val()[element].questionId][1] +1 : 0;
          }else{
            matrix[snapshot.val()[element].questionId][0] = (matrix[snapshot.val()[element].questionId][0] != null) ? matrix[snapshot.val()[element].questionId][0] +1 : 0;
          }  
        });
        var errores = new Array();
        var aciertos = new Array();
        Object.keys(matrix).sort().forEach(element => {
          errores.push(matrix[element][0]);
          aciertos.push(matrix[element][1]);
        });

        var trace1 = {
          x: aciertos,
          y: Object.keys(matrix).sort(),
          name: 'B',
          orientation: 'h',
          marker: {
            color: 'rgba(42,79,143,0.6)',
            width: 1
          },
          type: 'bar'
        };

      var trace2 = {
        x: errores,
        y: Object.keys(matrix).sort(),
        name: 'Errores',
        orientation: 'h',
        type: 'bar',
        marker: {
          color: 'rgba(226,139,5,0.6)',
          width: 1
        }
      };
    
      var data = [trace1, trace2];
      this.data = data;
      this.layout = {
        autosize: false,
        width: 1200,
        height: 800,
        title: 'Aciertos y Errores Por pregunta',
        barmode: 'stack'
      };
      this.loading= false;
    });
    
  },
  data(){
    return {
      loading: true,
      data: [],
      layout:{}
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
