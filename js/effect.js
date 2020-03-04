function getRandom(min, max){
  return Math.random() * (max - min) + min;
}

var isSafari = /constructor/i.test(window.HTMLElement);
var isFF = !!navigator.userAgent.match(/firefox/i);

if (isSafari) {
  document.getElementsByTagName('html')[0].classList.add('safari');
}

// Remove click on button for demo purpose
Array.prototype.slice.call(document.querySelectorAll('.button'), 0).forEach(function(bt) {
  bt.addEventListener('click', function(e) {
    e.preventDefault();
  });
});



// Button 9
function initBt9() {
  var bt = document.querySelectorAll('#component-9');
  var turb = document.querySelectorAll('#filter-ripple-2 feImage');
  var dm = document.querySelectorAll('#filter-ripple-2 feDisplacementMap');
  var i;
  for (i = 0; i < bt.length; i++) {

    bt[i].addEventListener('click', function(e) {
      console.log(e.target)

      if(e.target == ???????? ){

        TweenLite.set(turb, { attr: { x: isFF ? e.offsetX : e.offsetX + 20, y: isFF ? e.offsetY : e.offsetY + 20, width: 0, height: 0 } });
        TweenLite.to(turb, 5, { attr: { x: '-=300', y: '-=300', width: 600, height: 600 } });
        TweenLite.fromTo(dm, 3, { attr: { scale: 30 } }, { attr: { scale: 0 } });
      }

    });
  }
     

}
