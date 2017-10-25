var colors = new Vue({
  el: "#colors",

  data: {
    color: '#647eff'
  },

  methods: {
    clickColorPicker() {
      // This is pretty hack-y but the html5 color picker doesn't play nice with hidden elements
      document.getElementById("colorPicker").click();
    }
  }
  // watch: {
  //   color: function (color) {
  //     // update LEDs / send color to python
  //   }
  // }
});
