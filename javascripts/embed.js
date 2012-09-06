 jQuery(function() {
	var url = 'magnet:?xt=urn:btih:684551F3802FE60D9528387C5276447D3CA3F910&dn=breaking+bad+s05e06+hdtv+x264+evolve+mp4&tr=http%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce';
	var hash = '684551F3802FE60D9528387C5276447D3CA3F910';
	 
	var btapp = new Btapp;
	btapp.connect();
	 
	// Once the add functionality is available add the torrent.
	// Specify METADATA_ONLY to ensure we don't start downloading immediately
	btapp.live('add', function(add) {
	  add.torrent({
	    url: url,
	    priority: Btapp.TORRENT.PRIORITY.METADATA_ONLY
	  });
	});
	 
	// Only listen for the specific torrent hash in the torrent list 
	btapp.live('torrent ' + hash, function(torrent) {
	  // Make sure that files that don't match our filter have a priority of 0
	  torrent.get('file').each(function(file) {
	    var name = file.get('properties').get('name');
	    var ext = name.substr(name.lastIndexOf('.') + 1);
	    
	    if(ext !== 'mp4') {
	      file.get('properties').save({
	        priority: 0 // Will be adding file priority constants shortly
	      });
	    } else {
	    	console.log('found mp4: ' + file.get('properties').get('name'));
			var src = file.get('properties').get('streaming_url');
			_V_("video").ready(function(){
				console.log(src);
      			this.src({ type: "video/mp4", src: src});
      		});
	    }
	  });
	  // Resume the normal download behavior
	  torrent.set_priority(Btapp.TORRENT.PRIORITY.MEDIUM);
	  torrent.start();
	}); 	
});