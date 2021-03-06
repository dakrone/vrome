var Zoom = (function(){
  var levels = ['30%', '50%', '67%', '80%', '90%', '100%', '110%', '120%', '133%', '150%', '170%', '200%', '240%', '300%'];
  var default_index = levels.indexOf('100%');

  function currentLevel() {
    for(var i in levels){
      if(levels[i] == (document.body.style.zoom || '100%')){
        return Number(i);
      }
    }
  }

  function setZoom(/*Number*/ count,/*Boolean*/ keepCurrentPage) {
		var index = count ? (currentLevel() + (times() * Number(count))) : default_index
    // index should >= 0 && < levels.length
    index = Math.min(levels.length - 1, Math.max(0,index));

    localStorage.__vrome_zoom_count = index - default_index;
    var topPercent = scrollY / document.height;

    document.body.style.zoom  = levels[index];
    if(keepCurrentPage) scrollTo(0,topPercent * document.height);
  }


	return {
		setZoom    : setZoom,
		'in'       : function() { setZoom( 1); },
		out        : function() { setZoom(-1); },
		more       : function() { setZoom( 3); },
		reduce     : function() { setZoom(-3); },
		reset      : function() { setZoom(  ); },

		cur_in     : function() { setZoom( 1, true); },
		cur_out    : function() { setZoom(-1, true); },
		cur_more   : function() { setZoom( 3, true); },
		cur_reduce : function() { setZoom(-3, true); },
		cur_reset  : function() { setZoom( 0, true); },

		current    : function() { return (parseInt(levels[currentLevel()]) / 100); },
		init       : function() { Zoom.setZoom(localStorage.__vrome_zoom_count); }
	}
})()
