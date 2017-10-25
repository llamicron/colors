var colors = new Vue({
  el: "#colors",

  data: {
    color: '#647eff'
  },

  methods: {
    clickColorPicker() {
      // This is pretty hack-y but the html5 color picker doesn't play nice with hidden elements
      document.getElementById("colorPicker").click();
    },

    updateLEDs(color) {
      axios.post('/update', {
        color: color
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    },
  },

  watch: {
    color: function (color) {
      this.updateLEDs(color);
    }
  }
});
