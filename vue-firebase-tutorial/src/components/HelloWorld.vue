<template>
<div class="hello">
    <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
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
  data(){
    var db = firebase.database();
    var scoresRef = db.ref().child('answers');
    var matrix = [];
    scoresRef.on('child_added', function(snapshot) {
      if(matrix[snapshot.val().questionId] == null){
        matrix[snapshot.val().questionId]= [];
        matrix[snapshot.val().questionId][0] = 0;
        matrix[snapshot.val().questionId][1] = 0;
      }
      if(snapshot.val().right == true) {
        matrix[snapshot.val().questionId][1] = (matrix[snapshot.val().questionId][1] != null) ? matrix[snapshot.val().questionId][1] +1 : 0;
      }else{
        matrix[snapshot.val().questionId][0] = (matrix[snapshot.val().questionId][0] != null) ? matrix[snapshot.val().questionId][0] +1 : 0;
      }      
    });
    


    //console.log(Object.values(matrix));
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


    return {data,
    layout:{
      autosize: false,
      width: 1200,
      height: 800,
      title: 'Aciertos y Errores Por pregunta',
      barmode: 'stack'
    }};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
