var colorWheel = new ColorWheel("#colorwheel");
colorWheel.bindData(1);
// window.setInterval(function () {
//   console.log(colorWheel.getVisibleMarkers().data()[0].color);
// }, 2000);
function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

var colors = new Vue({
  el: "#colors",

  data: {
    color: colorWheel.getVisibleMarkers().data()[0].color
  },

  methods: {
    updateLEDs(color) {
      axios.post('/update', {
        color: color
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
    }
  },

  computed: {
    RGBColor() {
      return HSVtoRGB(this.color);
    },
  },

  watch: {
    color: {
      handler: function (color) {
        this.updateLEDs(this.RGBColor);
      },
      deep: true
    }
  }
});
