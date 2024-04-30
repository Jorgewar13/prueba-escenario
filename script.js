var debugtxt; // Definir la variable globalmente

AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],

    init: function () {
      console.log('ok collider check');
      debugtxt = document.querySelector('a-text'); // Asignar el valor dentro del init

      this.el.addEventListener('raycaster-intersection', this.handleIntersection.bind(this));
      this.el.addEventListener('gripdown', this.handleGripDown.bind(this));
      this.el.addEventListener('gripup', this.handleGripUp.bind(this));
    },
  
    handleIntersection: function (e) {
      this.selectedObj = e.detail.els[0];
      debugtxt.setAttribute('value', 'Player hit something!');
    },
  
    handleGripDown: function (e) {
      this.grip = true;
      debugtxt.setAttribute('value', 'Grip button pressed');
    },
  
    handleGripUp: function (e) {
      this.grip = false;
      debugtxt.setAttribute('value', 'Grip button released');
    },
  
    tick: function(){
      if(!this.selectedObj || !this.grip) return;
  
      var raycast = this.el.getAttribute("raycaster").direction;
      var pos = new THREE.Vector3(raycast.x, raycast.y, raycast.z);
      pos.normalize();
      pos.multiplyScalar(2);
      this.el.object3D.localToWorld(pos);
      this.selectedObj.object3D.position.set(pos.x, pos.y, pos.z);
  
      if (this.selectedObj.components["dynamic-body"]) {
        this.selectedObj.components["dynamic-body"].syncToPhysics();
      }
    }
});
