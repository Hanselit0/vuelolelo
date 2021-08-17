(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_22E8D860_3706_C6F3_41C8_A0ADE50476F8]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_20E0E598_336B_494C_414A_BEAF17FD2B40], 'gyroscopeAvailable'); var self = this; this.autotriggerAtStart(this.mainPlayList, function(){ self.Container_461888A3_551A_DB43_41C5_C42CF61540E2.trigger('click') }, true); if(!this.get('fullscreenAvailable')) { [this.IconButton_20E0D598_336B_494C_41C5_8150B8259487].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_20E08598_336B_494C_41C2_5719384DCE78",
  "this.WebFrame_0D8C200B_3919_4635_41C7_096F2C6DFD02",
  "this.Image_0EE1F158_390F_46D3_41C2_A6291CF83977",
  "this.Container_461888A3_551A_DB43_41C5_C42CF61540E2",
  "this.WebFrame_4FA39F49_552F_F5CF_41B1_98886B6F8B18",
  "this.Image_4FEF3ECA_5536_B4CD_41A6_3230427F004B",
  "this.IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8",
  "this.IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scripts": {
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "existsKey": function(key){  return key in window; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "registerKey": function(key, value){  window[key] = value; },
  "unregisterKey": function(key){  delete window[key]; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getKey": function(key){  return window[key]; }
 },
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "buttonToggleFullscreen": "this.IconButton_20E0D598_336B_494C_41C5_8150B8259487",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "class": "Player",
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_20E0F598_336B_494C_41A4_FC5B319BEDFA",
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "data": {
  "name": "Player11567"
 },
 "overflow": "visible",
 "definitions": [{
 "duration": 2000,
 "label": "galeria_s7-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_5",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_5_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_5.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "duration": 2000,
 "label": "galeria_s23-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_21",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_21_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_21.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s21-1",
 "id": "album_1DB2ACB1_3709_5E55_41BB_8CAF76D1EB2A",
 "thumbnailUrl": "media/album_1DB2ACB1_3709_5E55_41BB_8CAF76D1EB2A_t.png",
 "playList": "this.album_1DB2ACB1_3709_5E55_41BB_8CAF76D1EB2A_AlbumPlayList"
},
{
 "items": [
  {
   "media": "this.album_1DB2ACB1_3709_5E55_41BB_8CAF76D1EB2A",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_597EE676_5638_8D19_41B5_4AED694D4EEB",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -1.63,
   "backwardYaw": 179.8,
   "distance": 1,
   "panorama": "this.panorama_2D903BEE_3709_39CF_41CB_5765B74B3756",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 179.71,
   "backwardYaw": -0.73,
   "distance": 1,
   "panorama": "this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_2D91D72C_370A_CA72_41C5_FF36118FC190",
 "thumbnailUrl": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_t.jpg",
 "label": "interior 04",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2BBD247A_3706_CED7_419F_76C5298DC1E7",
  "this.overlay_2AF111B8_3709_C652_4171_BA27A0A37547",
  "this.overlay_107BF6E2_3707_4BF7_4198_AA4E016C7DDE",
  "this.overlay_1FFB079B_3709_4A56_41C7_C584BC04676B",
  "this.overlay_1F73472C_370B_CA73_419A_68EDAB672B60",
  "this.overlay_1F126F6F_370A_DACD_41C5_32B0A7F80333"
 ],
 "class": "Panorama"
},
{
 "duration": 7000,
 "label": "galeria_s16",
 "id": "album_1ED82782_3709_4A36_41AA_5DD3B07F1060_0",
 "thumbnailUrl": "media/album_1ED82782_3709_4A36_41AA_5DD3B07F1060_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_1ED82782_3709_4A36_41AA_5DD3B07F1060_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "items": [
  {
   "media": "this.panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "camera": "this.panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "camera": "this.panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "camera": "this.panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "camera": "this.panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "camera": "this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "camera": "this.panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "camera": "this.panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "camera": "this.panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C15026F_3709_CACE_41B4_65C8176FA269",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "camera": "this.panorama_3C15026F_3709_CACE_41B4_65C8176FA269_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "camera": "this.panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "camera": "this.panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "camera": "this.panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', false)",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "camera": "this.panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "camera": "this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "camera": "this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "camera": "this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_2D903BEE_3709_39CF_41CB_5765B74B3756",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "camera": "this.panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C",
   "start": "this.keepComponentVisibility(this.IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8, true); this.keepComponentVisibility(this.IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93, true)",
   "begin": "this.registerKey('visibility_IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93', this.IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93.get('visible')); this.registerKey('visibility_IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8', this.IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8.get('visible')); this.setEndToItemIndex(this.mainPlayList, 17, 0); this.keepComponentVisibility(this.IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8, false); this.setComponentVisibility(this.IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8, true, -1, this.effect_789D9BC7_5516_BCC3_41B1_7F66FEAB0B29, 'showEffect', false); this.keepComponentVisibility(this.IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93, false); this.setComponentVisibility(this.IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93, true, -1, this.effect_789DFBC7_5516_BCC3_41B0_E871FD251BDE, 'showEffect', false)",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "end": "if(this.existsKey('visibility_IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8')){ if(this.getKey('visibility_IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8')) { this.setComponentVisibility(this.IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8, true, -1, this.effect_789D9BC7_5516_BCC3_41B1_7F66FEAB0B29, 'showEffect', false); } else { this.setComponentVisibility(this.IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8, false, -1, this.effect_476448B7_5638_8506_41BE_2F7ADBCF43F5, 'hideEffect', false); } }; this.unregisterKey('visibility_IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8'); if(this.existsKey('visibility_IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93')){ if(this.getKey('visibility_IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93')) { this.setComponentVisibility(this.IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93, true, -1, this.effect_789DFBC7_5516_BCC3_41B0_E871FD251BDE, 'showEffect', false); } else { this.setComponentVisibility(this.IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93, false, -1, this.effect_476418B7_5638_8506_41D1_82BA2AC6283E, 'hideEffect', false); } }; this.unregisterKey('visibility_IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93'); this.trigger('tourEnded')",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s13",
 "id": "album_17EDE1CB_3719_C635_4181_D260CE6D85FB",
 "thumbnailUrl": "media/album_17EDE1CB_3719_C635_4181_D260CE6D85FB_t.png",
 "playList": "this.album_17EDE1CB_3719_C635_4181_D260CE6D85FB_AlbumPlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -106.4,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_59F906F0_5638_8D1A_41C3_BB657ECF133F",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "unnamed (3)",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_23",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_23_t.jpg",
 "width": 512,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_23.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 346,
 "class": "Photo"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 179.8,
   "backwardYaw": -0.31,
   "distance": 1,
   "panorama": "this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -1.17,
   "backwardYaw": 179.52,
   "distance": 1,
   "panorama": "this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915",
 "thumbnailUrl": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_t.jpg",
 "label": "interior 02",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2CDC70E8_373B_47F3_41A6_6CC168FCE59C",
  "this.overlay_2B44DDF6_3739_39DF_41BF_66452954C012",
  "this.overlay_10CAFDCB_373A_FE35_41C7_37DB10B65891",
  "this.overlay_1211FBC5_3739_7A3D_4192_89171230FF70",
  "this.overlay_10832AFF_3739_3BCD_41B5_A4C6B9F05A4A",
  "this.overlay_115D309D_373E_C64D_41BF_3F81DFC12191"
 ],
 "class": "Panorama"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 29.42,
   "backwardYaw": -44.05,
   "distance": 1,
   "panorama": "this.panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -22.29,
   "backwardYaw": 46.96,
   "distance": 1,
   "panorama": "this.panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "label": "fuera 1",
 "id": "panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC",
 "thumbnailUrl": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 10000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 10000,
 "overlays": [
  "this.overlay_23E608AD_336E_C747_41C9_786D697FF6B2",
  "this.overlay_23EB8FAB_336F_3943_41C8_8F572F164268"
 ],
 "class": "LivePanorama"
},
{
 "items": [
  {
   "media": "this.album_10083024_3706_C673_41B6_7BB9C8314467",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_597A7672_5638_8D19_41CB_E4AAB5D29B3C",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 162.61,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_59CF26E4_5638_8D3A_41CE_B5407DF25246",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_camera",
 "class": "PanoramaCamera"
},
{
 "duration": 7000,
 "label": "galeria_s14",
 "id": "album_103113E4_373B_49F3_41C0_B1CEF9A0A1A0_0",
 "thumbnailUrl": "media/album_103113E4_373B_49F3_41C0_B1CEF9A0A1A0_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_103113E4_373B_49F3_41C0_B1CEF9A0A1A0_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s16",
 "id": "album_1ED82782_3709_4A36_41AA_5DD3B07F1060",
 "thumbnailUrl": "media/album_1ED82782_3709_4A36_41AA_5DD3B07F1060_t.png",
 "playList": "this.album_1ED82782_3709_4A36_41AA_5DD3B07F1060_AlbumPlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_camera",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s14",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_12",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_12_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_12.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "items": [
  {
   "media": "this.album_1EB5F57E_370F_4ECF_41BD_8B196DD54159",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_597DB677_5638_8D07_41B5_5381C33026FE",
 "class": "PlayList"
},
{
 "duration": 2000,
 "label": "galeria_s2-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_0",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 104.07,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_462E3815_5638_851A_4196_C8D1482EB1D8",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -6.87,
  "pitch": 2.06,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "duration": 5000,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "duration": 15000,
    "yawDelta": 119.4,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "duration": 5000,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_camera",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s21-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_19",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_19_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_19.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "items": [
  {
   "media": "this.album_16F50D22_371A_FE76_41CA_3680AED88022",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_594CB66C_5638_8D09_41CA_F6E27D63D520",
 "class": "PlayList"
},
{
 "duration": 2000,
 "label": "galeria_s11-2",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_9",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_9_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_9.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": -137.94,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_460D37EF_5638_8B06_41D2_A684D777954F",
 "class": "PanoramaCamera"
},
{
 "duration": 7000,
 "label": "galeria_s4-1",
 "id": "album_1EE89E7E_3707_DACE_41CB_03967704E722_0",
 "thumbnailUrl": "media/album_1EE89E7E_3707_DACE_41CB_03967704E722_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_1EE89E7E_3707_DACE_41CB_03967704E722_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -92.39,
  "pitch": -4.25,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 179.8,
   "backwardYaw": -1.63,
   "distance": 1,
   "panorama": "this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_2D903BEE_3709_39CF_41CB_5765B74B3756",
 "thumbnailUrl": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_t.jpg",
 "label": "interior 05",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_290B0C1F_370A_FE4E_41CB_60C04A6DD2D3",
  "this.overlay_1745ECBE_370B_7E4F_41B8_5928716B244E",
  "this.overlay_1F1A53F3_3709_C9D5_418E_3B90DF361FFD",
  "this.overlay_1F4581BD_370E_C652_41B0_C1E2418A56A1",
  "this.overlay_1ED010B6_370F_C65E_41CA_CD8FF744568E",
  "this.overlay_1E976086_370E_C63F_41CB_BB7653EA18A7",
  "this.overlay_1ED5FD15_370B_5E52_41C0_124BF5482926"
 ],
 "class": "Panorama"
},
{
 "duration": 2000,
 "label": "galeria_s15",
 "id": "album_107D25FF_373B_49CE_41C1_54D20836AFBC_0",
 "thumbnailUrl": "media/album_107D25FF_373B_49CE_41C1_54D20836AFBC_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_107D25FF_373B_49CE_41C1_54D20836AFBC_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -81.49,
  "pitch": 8.09,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_camera",
 "class": "PanoramaCamera"
},
{
 "duration": 7000,
 "label": "galeria_s8-1",
 "id": "album_1FD2D4E3_3709_4FF5_41C1_75AC8B34BE5B_0",
 "thumbnailUrl": "media/album_1FD2D4E3_3709_4FF5_41C1_75AC8B34BE5B_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_1FD2D4E3_3709_4FF5_41C1_75AC8B34BE5B_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPhotoAlbumPlayer",
 "buttonPrevious": "this.IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93",
 "buttonNext": "this.IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8",
 "class": "PhotoAlbumPlayer"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 129.28,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_5901A696_5638_8D19_41D5_75F8D630202E",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.album_1EE89E7E_3707_DACE_41CB_03967704E722",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_597AF673_5638_8D1F_41D4_7AB66D4A8705",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -101.4,
   "backwardYaw": 113.63,
   "distance": 1,
   "panorama": "this.panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 152.28,
   "backwardYaw": -101.38,
   "distance": 1,
   "panorama": "this.panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat izq 08",
 "id": "panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5",
 "thumbnailUrl": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_24203E65_370B_5AFD_41C3_A3868B0ECB08",
  "this.overlay_22259E57_3709_DADD_41C3_8F429027CE36"
 ],
 "class": "LivePanorama"
},
{
 "items": [
  {
   "media": "this.album_100D8B00_3709_7A32_41B0_81BE3A4FBD38",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_597FE675_5638_8D1B_41A3_658B0BFE819D",
 "class": "PlayList"
},
{
 "duration": 7000,
 "label": "galeria_s12-1",
 "id": "album_2981F364_370E_CAF2_41C4_B421B313269C_0",
 "thumbnailUrl": "media/album_2981F364_370E_CAF2_41C4_B421B313269C_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_2981F364_370E_CAF2_41C4_B421B313269C_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 78.6,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_46A7987E_5638_8506_41B9_19C15BFDBDA8",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s19",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_17",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_17_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_17.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 42.06,
   "backwardYaw": -50.72,
   "distance": 1,
   "panorama": "this.panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -44.05,
   "backwardYaw": 29.42,
   "distance": 1,
   "panorama": "this.panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "label": "lat der 01",
 "id": "panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0",
 "thumbnailUrl": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_23F4E389_336B_C94F_41B8_D849439BD34D",
  "this.overlay_23999257_3369_CBC3_41C4_388820B08B96"
 ],
 "class": "LivePanorama"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 46.19,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_46C8282F_5638_8506_41D3_35A9F7BEC0B7",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s24-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_22",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_22_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_22.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 78.62,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_460327D7_5638_8B06_4182_9F968FDBBDC1",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -100.53,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_46EA584A_5638_850E_41B2_CB1EE1B762AD",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s6-1-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_4",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_4_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_4.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -102.19,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_4661C7A6_5638_8B06_41D0_B1EDA5D5F9BE",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.album_15DCA865_371B_C6FD_41BC_6DE476EA1F45",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_5973366C_5638_8D09_41C0_5B79799C5370",
 "class": "PlayList"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos unnamed (3)",
 "id": "album_100D8B00_3709_7A32_41B0_81BE3A4FBD38",
 "thumbnailUrl": "media/album_100D8B00_3709_7A32_41B0_81BE3A4FBD38_t.png",
 "playList": "this.album_100D8B00_3709_7A32_41B0_81BE3A4FBD38_AlbumPlayList"
},
{
 "duration": 2000,
 "label": "galeria_s4-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_2",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_2_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_2.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -63.08,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_46B5E871_5638_851A_418C_AE623DE5D3F3",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s17",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_15",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_15_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_15.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "duration": 1000,
 "id": "effect_789DFBC7_5516_BCC3_41B0_E871FD251BDE",
 "easing": "cubic_in_out",
 "class": "FadeInEffect"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 178.37,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_592C06C9_5638_8D0A_41C1_77F798C4156F",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s13",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_11",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_11_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_11.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "duration": 1000,
 "id": "effect_476448B7_5638_8506_41BE_2F7ADBCF43F5",
 "easing": "cubic_in_out",
 "class": "FadeOutEffect"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 64.07,
  "pitch": -1.01,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -169.68,
   "backwardYaw": 38.66,
   "distance": 1,
   "panorama": "this.panorama_3C15026F_3709_CACE_41B4_65C8176FA269",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -101.38,
   "backwardYaw": 152.28,
   "distance": 1,
   "panorama": "this.panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat izq 07",
 "id": "panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4",
 "thumbnailUrl": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_242687BC_3719_CA53_41A3_78E05F176827",
  "this.overlay_26D42D58_3707_5EC8_41BC_BE3AC6D04757"
 ],
 "class": "LivePanorama"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s2-1",
 "id": "album_16F50D22_371A_FE76_41CA_3680AED88022",
 "thumbnailUrl": "media/album_16F50D22_371A_FE76_41CA_3680AED88022_t.png",
 "playList": "this.album_16F50D22_371A_FE76_41CA_3680AED88022_AlbumPlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -0.48,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_4647E777_5638_8B06_41BC_61E58BFD56E3",
 "class": "PanoramaCamera"
},
{
 "duration": 1000,
 "id": "effect_476418B7_5638_8506_41D1_82BA2AC6283E",
 "easing": "cubic_in_out",
 "class": "FadeOutEffect"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 10.32,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_59843718_5638_8B0A_41A2_D562AE18991F",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s9",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_7",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_7_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_7.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s5-1",
 "id": "album_10083024_3706_C673_41B6_7BB9C8314467",
 "thumbnailUrl": "media/album_10083024_3706_C673_41B6_7BB9C8314467_t.png",
 "playList": "this.album_10083024_3706_C673_41B6_7BB9C8314467_AlbumPlayList"
},
{
 "items": [
  {
   "media": "this.album_2981F364_370E_CAF2_41C4_B421B313269C",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_594DA66C_5638_8D09_41C9_CABA2F2495CD",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 116.92,
   "backwardYaw": -126.14,
   "distance": 1,
   "panorama": "this.panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -133.81,
   "backwardYaw": -17.39,
   "distance": 1,
   "panorama": "this.panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat izq 010",
 "id": "panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656",
 "thumbnailUrl": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_24F8A6A6_3709_4A7E_41C7_4B2977723136",
  "this.overlay_244BECEE_3709_DFCF_41B6_32BCC8CDEC19"
 ],
 "class": "LivePanorama"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_22E8D860_3706_C6F3_41C8_A0ADE50476F8.mp3",
  "oggUrl": "media/audio_22E8D860_3706_C6F3_41C8_A0ADE50476F8.ogg",
  "class": "AudioResource"
 },
 "id": "audio_22E8D860_3706_C6F3_41C8_A0ADE50476F8",
 "data": {
  "label": "y2mate.com - Se piloto Se tu sue\u00f1o  Video motivacional de aviaci\u00f3n"
 },
 "class": "MediaAudio"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -126.14,
   "backwardYaw": 116.92,
   "distance": 1,
   "panorama": "this.panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 113.63,
   "backwardYaw": -101.4,
   "distance": 1,
   "panorama": "this.panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat izq 09",
 "id": "panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E",
 "thumbnailUrl": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_24522F69_370F_3AF5_41C8_A8D633F8006A",
  "this.overlay_226DE562_370F_4EF7_41B8_3A995C12D620"
 ],
 "class": "LivePanorama"
},
{
 "duration": 7000,
 "label": "galeria_s9",
 "id": "album_1EB5F57E_370F_4ECF_41BD_8B196DD54159_0",
 "thumbnailUrl": "media/album_1EB5F57E_370F_4ECF_41BD_8B196DD54159_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_1EB5F57E_370F_4ECF_41BD_8B196DD54159_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s18",
 "id": "album_1EF12A1B_3709_DA55_41A4_3A0187528638",
 "thumbnailUrl": "media/album_1EF12A1B_3709_DA55_41A4_3A0187528638_t.png",
 "playList": "this.album_1EF12A1B_3709_DA55_41A4_3A0187528638_AlbumPlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -66.87,
   "backwardYaw": 4.58,
   "distance": 1,
   "panorama": "this.panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 38.66,
   "backwardYaw": -169.68,
   "distance": 1,
   "panorama": "this.panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat der 06",
 "id": "panorama_3C15026F_3709_CACE_41B4_65C8176FA269",
 "thumbnailUrl": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_26862428_3719_CE73_419E_5040F0EA2C2E",
  "this.overlay_25678B22_371B_5A77_41B8_54F2A6DDDE7C"
 ],
 "class": "LivePanorama"
},
{
 "duration": 2000,
 "label": "galeria_s3-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_1",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_1_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_1.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "duration": 2000,
 "label": "galeria_s16",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_14",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_14_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_14.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s15",
 "id": "album_107D25FF_373B_49CE_41C1_54D20836AFBC",
 "thumbnailUrl": "media/album_107D25FF_373B_49CE_41C1_54D20836AFBC_t.png",
 "playList": "this.album_107D25FF_373B_49CE_41C1_54D20836AFBC_AlbumPlayList"
},
{
 "items": [
  {
   "media": "this.album_1E7BFE5B_370F_3AD5_41B0_0EC12FF29558",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_597D0677_5638_8D07_41D2_18584D78E208",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -133.04,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_592236BD_5638_8D0B_41D4_6E2A8D1BCADF",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 71.38,
  "pitch": 4.28,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 46.96,
   "backwardYaw": -22.29,
   "distance": 1,
   "panorama": "this.panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -17.39,
   "backwardYaw": -133.81,
   "distance": 1,
   "panorama": "this.panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat izq 011",
 "id": "panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344",
 "thumbnailUrl": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_2388E2F5_3377_C8C4_41A3_65A6AD458E49",
  "this.overlay_22437492_3376_CF5D_41B2_211B616586AC"
 ],
 "class": "LivePanorama"
},
{
 "duration": 2000,
 "label": "galeria_s18",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_16",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_16_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_16.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "duration": 2000,
 "label": "galeria_s22",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_20",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_20_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_20.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_camera",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s20",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_18",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_18_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_18.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -0.29,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_4771E8A6_5638_8506_41D5_6BC95AA02B71",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -27.72,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_59A60748_5638_8B0A_4191_6E19C3331BF4",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -75.93,
   "backwardYaw": 73.6,
   "distance": 1,
   "panorama": "this.panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 77.81,
   "backwardYaw": -83.18,
   "distance": 1,
   "panorama": "this.panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat der 03",
 "id": "panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1",
 "thumbnailUrl": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_380CB87E_3707_C6CF_417B_492E3AEE4546",
  "this.overlay_38E71773_3719_4AD5_41BE_C870A2CC93E1",
  "this.overlay_4C58124F_552E_CFC3_41D0_EDD2F6CB8383"
 ],
 "class": "LivePanorama"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_camera",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s5-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_3",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_3_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_3.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 157.71,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "duration": 5000,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "duration": 15000,
    "yawDelta": 119.4,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "duration": 5000,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_46D8E821_5638_853A_41CF_2A53248F9035",
 "class": "PanoramaCamera"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s3-1",
 "id": "album_15DCA865_371B_C6FD_41BC_6DE476EA1F45",
 "thumbnailUrl": "media/album_15DCA865_371B_C6FD_41BC_6DE476EA1F45_t.png",
 "playList": "this.album_15DCA865_371B_C6FD_41BC_6DE476EA1F45_AlbumPlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -141.34,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_59B4772F_5638_8B06_41CF_024C775C97AD",
 "class": "PanoramaCamera"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s2-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_t.png",
 "playList": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_AlbumPlayList"
},
{
 "duration": 7000,
 "label": "galeria_s21-1",
 "id": "album_1DB2ACB1_3709_5E55_41BB_8CAF76D1EB2A_0",
 "thumbnailUrl": "media/album_1DB2ACB1_3709_5E55_41BB_8CAF76D1EB2A_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_1DB2ACB1_3709_5E55_41BB_8CAF76D1EB2A_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -0.2,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_46947857_5638_8506_41C3_15FF385B6206",
 "class": "PanoramaCamera"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s8-1",
 "id": "album_1FD2D4E3_3709_4FF5_41C1_75AC8B34BE5B",
 "thumbnailUrl": "media/album_1FD2D4E3_3709_4FF5_41C1_75AC8B34BE5B_t.png",
 "playList": "this.album_1FD2D4E3_3709_4FF5_41C1_75AC8B34BE5B_AlbumPlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 113.13,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_46FAD83C_5638_850A_416B_4CAA026937FC",
 "class": "PanoramaCamera"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s12-1",
 "id": "album_2981F364_370E_CAF2_41C4_B421B313269C",
 "thumbnailUrl": "media/album_2981F364_370E_CAF2_41C4_B421B313269C_t.png",
 "playList": "this.album_2981F364_370E_CAF2_41C4_B421B313269C_AlbumPlayList"
},
{
 "duration": 7000,
 "label": "galeria_s3-1",
 "id": "album_15DCA865_371B_C6FD_41BC_6DE476EA1F45_0",
 "thumbnailUrl": "media/album_15DCA865_371B_C6FD_41BC_6DE476EA1F45_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_15DCA865_371B_C6FD_41BC_6DE476EA1F45_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "items": [
  {
   "media": "this.album_17EDE1CB_3719_C635_4181_D260CE6D85FB",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_594CC66C_5638_8D09_41C3_EB6207330F08",
 "class": "PlayList"
},
{
 "duration": 7000,
 "label": "galeria_s13",
 "id": "album_17EDE1CB_3719_C635_4181_D260CE6D85FB_0",
 "thumbnailUrl": "media/album_17EDE1CB_3719_C635_4181_D260CE6D85FB_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_17EDE1CB_3719_C635_4181_D260CE6D85FB_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 99.85,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_4671B78E_5638_8B06_41B3_47D4F54FA3E1",
 "class": "PanoramaCamera"
},
{
 "duration": 7000,
 "label": "galeria_s23-1",
 "id": "album_10056E2A_370B_7A77_41C3_4BCA90227C30_0",
 "thumbnailUrl": "media/album_10056E2A_370B_7A77_41C3_4BCA90227C30_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_10056E2A_370B_7A77_41C3_4BCA90227C30_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "items": [
  {
   "media": "this.album_10056E2A_370B_7A77_41C3_4BCA90227C30",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_597F4675_5638_8D1B_41C2_ABC23A01646F",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.album_103113E4_373B_49F3_41C0_B1CEF9A0A1A0",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_5974C671_5638_8D1B_41B5_ABF375CCF227",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -95.41,
  "pitch": 3.9,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_camera",
 "class": "PanoramaCamera"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s9",
 "id": "album_1EB5F57E_370F_4ECF_41BD_8B196DD54159",
 "thumbnailUrl": "media/album_1EB5F57E_370F_4ECF_41BD_8B196DD54159_t.png",
 "playList": "this.album_1EB5F57E_370F_4ECF_41BD_8B196DD54159_AlbumPlayList"
},
{
 "duration": 7000,
 "label": "galeria_s20",
 "id": "album_1E7BFE5B_370F_3AD5_41B0_0EC12FF29558_0",
 "thumbnailUrl": "media/album_1E7BFE5B_370F_3AD5_41B0_0EC12FF29558_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_1E7BFE5B_370F_3AD5_41B0_0EC12FF29558_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s14",
 "id": "album_103113E4_373B_49F3_41C0_B1CEF9A0A1A0",
 "thumbnailUrl": "media/album_103113E4_373B_49F3_41C0_B1CEF9A0A1A0_t.png",
 "playList": "this.album_103113E4_373B_49F3_41C0_B1CEF9A0A1A0_AlbumPlayList"
},
{
 "items": [
  {
   "media": "this.album_1ED82782_3709_4A36_41AA_5DD3B07F1060",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_5979A674_5638_8D19_417A_AA810DCC967E",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -50.72,
   "backwardYaw": 42.06,
   "distance": 1,
   "panorama": "this.panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -0.45,
   "backwardYaw": 90.11,
   "distance": 1,
   "panorama": "this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 73.6,
   "backwardYaw": -75.93,
   "distance": 1,
   "panorama": "this.panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat der 02",
 "id": "panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D",
 "thumbnailUrl": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_2585A8A3_3359_477C_41C9_A56A2FB40B37",
  "this.overlay_259CBCC9_335E_D8CF_41C2_C9297577E3DF",
  "this.overlay_244AA6D1_335F_48DF_41C5_0EE60B7F84D0",
  "this.overlay_49DFA8BE_5529_5B44_41CF_FD22940B647D"
 ],
 "class": "LivePanorama"
},
{
 "duration": 2000,
 "label": "galeria_s10",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_8",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_8_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_8.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 53.86,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_59DFB6D6_5638_8D06_41D0_B314664F8173",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3C15026F_3709_CACE_41B4_65C8176FA269_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 179.27,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_46859863_5638_853E_41A7_83DECCD05A4D",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -0.73,
   "backwardYaw": 179.71,
   "distance": 1,
   "panorama": "this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 179.52,
   "backwardYaw": -1.17,
   "distance": 1,
   "panorama": "this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7",
 "thumbnailUrl": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_t.jpg",
 "label": "interior 03",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2B47A993_373A_C655_41CB_985C962676F7",
  "this.overlay_2B724331_3739_4A52_41C5_94CFCD1D62D4",
  "this.overlay_10B6FDF2_373B_59D7_41C4_B91D930ADF7B",
  "this.overlay_1FF4FBBD_373A_DA4D_41BC_9C96C2A08DDD",
  "this.overlay_1E7349A8_3739_4673_41C2_E80B7BFF127A",
  "this.overlay_1F899472_3707_4ED7_41BC_504C81EED5BB"
 ],
 "class": "Panorama"
},
{
 "duration": 7000,
 "label": "galeria_s18",
 "id": "album_1EF12A1B_3709_DA55_41A4_3A0187528638_0",
 "thumbnailUrl": "media/album_1EF12A1B_3709_DA55_41A4_3A0187528638_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_1EF12A1B_3709_DA55_41A4_3A0187528638_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 179.55,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_4757388B_5638_850E_41BF_38CF6C54B8F4",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 79.47,
   "backwardYaw": -80.15,
   "distance": 1,
   "panorama": "this.panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -83.18,
   "backwardYaw": 77.81,
   "distance": 1,
   "panorama": "this.panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat der 04",
 "id": "panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E",
 "thumbnailUrl": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_38ACA424_371A_CE73_41CA_C0A4AC8C8F3B",
  "this.overlay_38DCFDE6_371A_D9FE_41B5_C682A7CEF208"
 ],
 "class": "LivePanorama"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 4.58,
   "backwardYaw": -66.87,
   "distance": 1,
   "panorama": "this.panorama_3C15026F_3709_CACE_41B4_65C8176FA269",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -80.15,
   "backwardYaw": 79.47,
   "distance": 1,
   "panorama": "this.panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "lat der 05",
 "id": "panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B",
 "thumbnailUrl": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1_t.jpg",
 "pitch": 0,
 "frameDisplayTime": 5000,
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_0_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_1_t.jpg",
   "class": "CubicPanoramaFrame"
  },
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "frameTransitionTime": 5000,
 "overlays": [
  "this.overlay_272738DC_3719_C7D3_41C0_F29E1731571F",
  "this.overlay_2758CCF4_371E_DFD2_41C7_9EFF01B260EA"
 ],
 "class": "LivePanorama"
},
{
 "items": [
  {
   "media": "this.album_107D25FF_373B_49CE_41C1_54D20836AFBC",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_5975B670_5638_8D19_41D3_CC948D05BCAE",
 "class": "PlayList"
},
{
 "duration": 2000,
 "label": "galeria_s12-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_10",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_10_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_10.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s20",
 "id": "album_1E7BFE5B_370F_3AD5_41B0_0EC12FF29558",
 "thumbnailUrl": "media/album_1E7BFE5B_370F_3AD5_41B0_0EC12FF29558_t.png",
 "playList": "this.album_1E7BFE5B_370F_3AD5_41B0_0EC12FF29558_AlbumPlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 96.82,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_59EA96FE_5638_8D06_41CA_BDD0F4759D6A",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_camera",
 "class": "PanoramaCamera"
},
{
 "gyroscopeEnabled": true,
 "buttonCardboardView": "this.IconButton_20E00598_336B_494C_4198_4A9EF9DF7B20",
 "buttonToggleHotspots": "this.IconButton_20E0C598_336B_494C_41C1_EA058A00BA71",
 "class": "PanoramaPlayer",
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonToggleGyroscope": "this.IconButton_20E0E598_336B_494C_414A_BEAF17FD2B40",
 "mouseControlMode": "drag_acceleration"
},
{
 "duration": 1000,
 "id": "effect_789D9BC7_5516_BCC3_41B1_7F66FEAB0B29",
 "easing": "cubic_in_out",
 "class": "FadeInEffect"
},
{
 "items": [
  {
   "media": "this.album_1EF12A1B_3709_DA55_41A4_3A0187528638",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_59783674_5638_8D19_41BD_CF3E37C2175A",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -0.2,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_47404899_5638_850A_41D1_94E41679E693",
 "class": "PanoramaCamera"
},
{
 "duration": 2000,
 "label": "galeria_s8-1",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_6",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_6_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_6.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 178.83,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_476388B4_5638_851A_41C5_62BB7142622D",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 90.11,
   "backwardYaw": -0.45,
   "distance": 1,
   "panorama": "this.panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -0.31,
   "backwardYaw": 179.8,
   "distance": 1,
   "panorama": "this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC",
 "thumbnailUrl": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_t.jpg",
 "label": "interior 01",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_23A20498_377A_CE53_41C9_72EC1024FDAF",
  "this.overlay_2B550CB1_3739_5E55_41AF_6913D3F243B5",
  "this.overlay_14273C3B_370B_DE55_41C9_8367B771F79E",
  "this.overlay_165E3312_3719_4A57_41BC_DF88F7850C2B",
  "this.overlay_16CCC70C_3719_4A32_41C0_4853EE11A951",
  "this.overlay_16DFBDC6_371B_5E3F_41C8_C7433F447791",
  "this.overlay_0C61838A_397B_4A37_41C9_E8EEE477B51E",
  "this.overlay_76850818_557A_BB4D_41C3_82E3A82D9190"
 ],
 "class": "Panorama"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -150.58,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "duration": 5000,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "duration": 15000,
    "yawDelta": 119.4,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "duration": 5000,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_590E26A3_5638_8D3F_41CF_656753485DD7",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -66.37,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_4613E7BD_5638_8B0A_41CC_AEE44F1249DB",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -97.3,
  "pitch": 3.61,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -175.42,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_599A270B_5638_8B0E_41BD_C39850BCAB23",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -89.89,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_463D4808_5638_850A_41C5_892B931334BC",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 179.69,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_4657B75F_5638_8B06_41CB_3CD468BDBDEB",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": 135.95,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_593B66AF_5638_8D07_41C0_72E7D27934DB",
 "class": "PanoramaCamera"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s23-1",
 "id": "album_10056E2A_370B_7A77_41C3_4BCA90227C30",
 "thumbnailUrl": "media/album_10056E2A_370B_7A77_41C3_4BCA90227C30_t.png",
 "playList": "this.album_10056E2A_370B_7A77_41C3_4BCA90227C30_AlbumPlayList"
},
{
 "duration": 7000,
 "label": "galeria_s2-1",
 "id": "album_16F50D22_371A_FE76_41CA_3680AED88022_0",
 "thumbnailUrl": "media/album_16F50D22_371A_FE76_41CA_3680AED88022_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_16F50D22_371A_FE76_41CA_3680AED88022_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "duration": 7000,
 "label": "galeria_s5-1",
 "id": "album_10083024_3706_C673_41B6_7BB9C8314467_0",
 "thumbnailUrl": "media/album_10083024_3706_C673_41B6_7BB9C8314467_0_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_10083024_3706_C673_41B6_7BB9C8314467_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "items": [
  {
   "media": "this.album_1FD2D4E3_3709_4FF5_41C1_75AC8B34BE5B",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_597CD678_5638_8D09_41AC_039BB72F718A",
 "class": "PlayList"
},
{
 "duration": 2000,
 "label": "galeria_s15",
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_13",
 "thumbnailUrl": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_13_t.jpg",
 "width": 800,
 "image": {
  "levels": [
   {
    "url": "media/album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_13.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 541,
 "class": "Photo"
},
{
 "duration": 7000,
 "label": "unnamed (3)",
 "id": "album_100D8B00_3709_7A32_41B0_81BE3A4FBD38_0",
 "thumbnailUrl": "media/album_100D8B00_3709_7A32_41B0_81BE3A4FBD38_0_t.jpg",
 "width": 512,
 "image": {
  "levels": [
   {
    "url": "media/album_100D8B00_3709_7A32_41B0_81BE3A4FBD38_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 346,
 "class": "Photo"
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos galeria_s4-1",
 "id": "album_1EE89E7E_3707_DACE_41CB_03967704E722",
 "thumbnailUrl": "media/album_1EE89E7E_3707_DACE_41CB_03967704E722_t.png",
 "playList": "this.album_1EE89E7E_3707_DACE_41CB_03967704E722_AlbumPlayList"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "class": "ViewerArea",
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_20E08598_336B_494C_41C2_5719384DCE78",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "paddingLeft": 0,
 "children": [
  "this.Container_20E05598_336B_494C_41AC_09BF58CF1A6B",
  "this.Container_20E03598_336B_494C_41C4_1B9A756241D8"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 115.05,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "height": 641,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "absolute",
 "overflow": "scroll",
 "data": {
  "name": "--SETTINGS"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_0D8C200B_3919_4635_41C7_096F2C6DFD02",
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "19.42%",
 "borderSize": 0,
 "url": "https://sketchfab.com/models/9e7bfa1049ec44a2a8d8d0bdaf51533c/embed",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "width": "59.11%",
 "bottom": "14.75%",
 "minWidth": 1,
 "class": "WebFrame",
 "insetBorder": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "height": "68.421%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "WebFrame55467"
 }
},
{
 "maxHeight": 152,
 "propagateClick": false,
 "id": "Image_0EE1F158_390F_46D3_41C2_A6291CF83977",
 "paddingRight": 0,
 "right": "19.42%",
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_0EE1F158_390F_46D3_41C2_A6291CF83977.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "minHeight": 1,
 "width": "3.498%",
 "class": "Image",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.WebFrame_0D8C200B_3919_4635_41C7_096F2C6DFD02, false, 0, null, null, false); this.setComponentVisibility(this.Image_0EE1F158_390F_46D3_41C2_A6291CF83977, false, 0, null, null, false)",
 "height": "6.667%",
 "top": "17.38%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "Image60285"
 },
 "maxWidth": 152
},
{
 "backgroundColorRatios": [
  0,
  0.47,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_461888A3_551A_DB43_41C5_C42CF61540E2",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.Container_44EC1DA0_551E_B57D_419E_C5D2020B4E57"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000",
  "#FFFFFF"
 ],
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "aainicio"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_4FA39F49_552F_F5CF_41B1_98886B6F8B18",
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "23.1%",
 "borderSize": 0,
 "url": "https://sketchfab.com/models/db7b8d15247a4b7e9003142467200b9f/embed",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "width": "48.372%",
 "bottom": "21.64%",
 "minWidth": 1,
 "class": "WebFrame",
 "insetBorder": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "height": "50.279%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "turbina"
 }
},
{
 "maxHeight": 152,
 "propagateClick": false,
 "id": "Image_4FEF3ECA_5536_B4CD_41A6_3230427F004B",
 "paddingRight": 0,
 "right": "25.21%",
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_4FEF3ECA_5536_B4CD_41A6_3230427F004B.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "minHeight": 1,
 "width": "2.476%",
 "class": "Image",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.WebFrame_4FA39F49_552F_F5CF_41B1_98886B6F8B18, false, 0, null, null, false); this.setComponentVisibility(this.Image_4FEF3ECA_5536_B4CD_41A6_3230427F004B, false, 0, null, null, false)",
 "height": "3.825%",
 "top": "30.16%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "Image14360"
 },
 "maxWidth": 152
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "id": "IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8",
 "paddingRight": 0,
 "right": "6.57%",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 66,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8.png",
 "minWidth": 0,
 "class": "IconButton",
 "mode": "push",
 "height": 64.05,
 "top": "46.22%",
 "rollOverIconURL": "skin/IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_7966CBEA_551A_BCCD_41B3_A5E3F00717D8_pressed.png",
 "visible": false,
 "cursor": "hand",
 "data": {
  "name": "siguiente"
 }
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "id": "IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93",
 "left": "5.97%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 68,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93.png",
 "bottom": "44.81%",
 "minWidth": 0,
 "class": "IconButton",
 "mode": "push",
 "height": 86.05,
 "rollOverIconURL": "skin/IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_79455DEF_5516_B4C3_41C5_0E2FBF31FD93_pressed.png",
 "visible": false,
 "cursor": "hand",
 "data": {
  "name": "atras"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_20E0D598_336B_494C_41C5_8150B8259487",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_20E0D598_336B_494C_41C5_8150B8259487.png",
 "pressedRollOverIconURL": "skin/IconButton_20E0D598_336B_494C_41C5_8150B8259487_pressed_rollover.png",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_20E0D598_336B_494C_41C5_8150B8259487_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_20E0F598_336B_494C_41A4_FC5B319BEDFA",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_20E0F598_336B_494C_41A4_FC5B319BEDFA.png",
 "pressedRollOverIconURL": "skin/IconButton_20E0F598_336B_494C_41A4_FC5B319BEDFA_pressed_rollover.png",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_20E0F598_336B_494C_41A4_FC5B319BEDFA_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "items": [
  {
   "media": "this.album_1DB2ACB1_3709_5E55_41BB_8CAF76D1EB2A_0",
   "camera": {
    "scaleMode": "fit_outside",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_1DB2ACB1_3709_5E55_41BB_8CAF76D1EB2A_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2D903BEE_3709_39CF_41CB_5765B74B3756, this.camera_46947857_5638_8506_41C3_15FF385B6206); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 26.31,
   "yaw": -1.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.31,
   "image": "this.AnimatedImageResource_120B5A9C_370F_5A53_41C6_3664BB2D000B",
   "pitch": -23.72,
   "yaw": -1.63,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2BBD247A_3706_CED7_419F_76C5298DC1E7",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7, this.camera_46859863_5638_853E_41A7_83DECCD05A4D); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 22.96,
   "yaw": 179.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.74,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.96,
   "image": "this.AnimatedImageResource_0442BC90_3979_3E53_41CB_F8BDE1CC4B73",
   "pitch": -21.74,
   "yaw": 179.71,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2AF111B8_3709_C652_4171_BA27A0A37547",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_5979A674_5638_8D19_417A_AA810DCC967E, 0, this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 8.84,
   "yaw": 54.31,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0_HS_2_1_0_map.gif",
      "width": 49,
      "height": 64,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_107BF6E2_3707_4BF7_4198_AA4E016C7DDE",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_59783674_5638_8D19_41BD_CF3E37C2175A, 0, this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 7.38,
   "yaw": 58.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0_HS_3_1_0_map.gif",
      "width": 41,
      "height": 65,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1FFB079B_3709_4A56_41C7_C584BC04676B",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_597F4675_5638_8D1B_41C2_ABC23A01646F, 0, this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 6.56,
   "yaw": -24.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0_HS_4_1_0_map.gif",
      "width": 36,
      "height": 31,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.42,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1F73472C_370B_CA73_419A_68EDAB672B60",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_597FE675_5638_8D1B_41A3_658B0BFE819D, 0, this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 5.96,
   "yaw": -27.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0_HS_5_1_0_map.gif",
      "width": 33,
      "height": 30,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1F126F6F_370A_DACD_41C5_32B0A7F80333",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.album_17EDE1CB_3719_C635_4181_D260CE6D85FB_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_17EDE1CB_3719_C635_4181_D260CE6D85FB_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7, this.camera_4647E777_5638_8B06_41BC_61E58BFD56E3); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 26.42,
   "yaw": -1.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_1_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.42,
   "image": "this.AnimatedImageResource_16E119DD_3739_59CD_41C9_21D57C4C55FB",
   "pitch": -23.17,
   "yaw": -1.17,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2CDC70E8_373B_47F3_41A6_6CC168FCE59C",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC, this.camera_4657B75F_5638_8B06_41CB_3CD468BDBDEB); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 26.43,
   "yaw": 179.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.43,
   "image": "this.AnimatedImageResource_1FB45E6B_371E_DAF5_41C5_3F388AA58E08",
   "pitch": -23.1,
   "yaw": 179.8,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2B44DDF6_3739_39DF_41BF_66452954C012",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_594CB66C_5638_8D09_41CA_F6E27D63D520, 0, this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 8.63,
   "yaw": -36.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0_HS_2_1_0_map.gif",
      "width": 48,
      "height": 45,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_10CAFDCB_373A_FE35_41C7_37DB10B65891",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_5973366C_5638_8D09_41C0_5B79799C5370, 0, this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 7.11,
   "yaw": -40.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0_HS_3_1_0_map.gif",
      "width": 39,
      "height": 41,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1211FBC5_3739_7A3D_4192_89171230FF70",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_5975B670_5638_8D19_41D3_CC948D05BCAE, 0, this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 5.55,
   "yaw": 16.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0_HS_4_1_0_map.gif",
      "width": 30,
      "height": 27,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_10832AFF_3739_3BCD_41B5_A4C6B9F05A4A",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_5974C671_5638_8D1B_41B5_ABF375CCF227, 0, this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 5.09,
   "yaw": 19.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0_HS_5_1_0_map.gif",
      "width": 28,
      "height": 25,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_115D309D_373E_C64D_41BF_3F81DFC12191",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0, this.camera_593B66AF_5638_8D07_41C0_72E7D27934DB); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 8.95,
   "yaw": 29.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.95,
   "image": "this.AnimatedImageResource_222E704A_3379_47CD_41A2_8215A99B95F3",
   "pitch": -6.11,
   "yaw": 29.42,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_23E608AD_336E_C747_41C9_786D697FF6B2",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344, this.camera_592236BD_5638_8D0B_41D4_6E2A8D1BCADF); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 6.93,
   "yaw": -22.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.93,
   "image": "this.AnimatedImageResource_22D1704A_3379_47CD_41B9_BEFEFC5DD565",
   "pitch": -5.11,
   "yaw": -22.29,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_23EB8FAB_336F_3943_41C8_8F572F164268",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.album_1ED82782_3709_4A36_41AA_5DD3B07F1060_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_1ED82782_3709_4A36_41AA_5DD3B07F1060_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 26.43,
   "image": "this.AnimatedImageResource_12146AAC_370F_5A72_41A4_2562A629E146",
   "pitch": -23.1,
   "yaw": -1.59,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_290B0C1F_370A_FE4E_41CB_60C04A6DD2D3",
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 26.43,
   "yaw": -1.59,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190, this.camera_592C06C9_5638_8D0A_41C1_77F798C4156F); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 27.07,
   "yaw": 179.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 27.07,
   "image": "this.AnimatedImageResource_1FB62E6B_371E_DAF5_41C2_3286763E101A",
   "pitch": -19.59,
   "yaw": 179.8,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_1745ECBE_370B_7E4F_41B8_5928716B244E",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_597EE676_5638_8D19_41B5_4AED694D4EEB, 0, this.panorama_2D903BEE_3709_39CF_41CB_5765B74B3756)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 9.18,
   "yaw": 52.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0_HS_2_1_0_map.gif",
      "width": 51,
      "height": 65,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1F1A53F3_3709_C9D5_418E_3B90DF361FFD",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_597D0677_5638_8D07_41D2_18584D78E208, 0, this.panorama_2D903BEE_3709_39CF_41CB_5765B74B3756)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 7.71,
   "yaw": 56.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0_HS_3_1_0_map.gif",
      "width": 42,
      "height": 67,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1F4581BD_370E_C652_41B0_C1E2418A56A1",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_597DB677_5638_8D07_41B5_5381C33026FE, 0, this.panorama_2D903BEE_3709_39CF_41CB_5765B74B3756)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 6.21,
   "yaw": -24.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0_HS_4_1_0_map.gif",
      "width": 34,
      "height": 29,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1ED010B6_370F_C65E_41CA_CD8FF744568E",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_597CD678_5638_8D09_41AC_039BB72F718A, 0, this.panorama_2D903BEE_3709_39CF_41CB_5765B74B3756)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 5.93,
   "yaw": -27.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0_HS_5_1_0_map.gif",
      "width": 32,
      "height": 28,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1E976086_370E_C63F_41CB_BB7653EA18A7",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_1ED5FD15_370B_5E52_41C0_124BF5482926",
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 8.26,
   "yaw": -1.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0_HS_6_1_0_map.gif",
      "width": 45,
      "height": 79,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.39,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E, this.camera_4613E7BD_5638_8B0A_41CC_AEE44F1249DB); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 6.67,
   "yaw": -101.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.67,
   "image": "this.AnimatedImageResource_24924ACB_3707_5A35_41C4_A44AC73BAAEB",
   "pitch": -6.69,
   "yaw": -101.4,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_24203E65_370B_5AFD_41C3_A3868B0ECB08",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4, this.camera_460327D7_5638_8B06_4182_9F968FDBBDC1); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 6.55,
   "yaw": 152.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.99,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.55,
   "image": "this.AnimatedImageResource_24921ACC_3707_5A33_41B2_37030A260D63",
   "pitch": -12.99,
   "yaw": 152.28,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_22259E57_3709_DADD_41C3_8F429027CE36",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC, this.camera_590E26A3_5638_8D3F_41CF_656753485DD7); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 8.86,
   "yaw": -44.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.86,
   "image": "this.AnimatedImageResource_22D1304A_3379_47CD_4194_66B42C0D2B5F",
   "pitch": -10.3,
   "yaw": -44.05,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_23F4E389_336B_C94F_41B8_D849439BD34D",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D, this.camera_5901A696_5638_8D19_41D5_75F8D630202E); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 7.21,
   "yaw": 42.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.21,
   "image": "this.AnimatedImageResource_22D0C04A_3379_47CD_41B2_C689FE4648F2",
   "pitch": -9.47,
   "yaw": 42.06,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_23999257_3369_CBC3_41C4_388820B08B96",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.album_100D8B00_3709_7A32_41B0_81BE3A4FBD38_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_100D8B00_3709_7A32_41B0_81BE3A4FBD38_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C15026F_3709_CACE_41B4_65C8176FA269, this.camera_59B4772F_5638_8B06_41CF_024C775C97AD); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 5.28,
   "yaw": -169.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.62,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.28,
   "image": "this.AnimatedImageResource_24911ACB_3707_5A35_41C4_75C10E31D0F5",
   "pitch": -6.62,
   "yaw": -169.68,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_242687BC_3719_CA53_41A3_78E05F176827",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5, this.camera_59A60748_5638_8B0A_4191_6E19C3331BF4); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 5.28,
   "yaw": -101.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.28,
   "image": "this.AnimatedImageResource_2492AACB_3707_5A35_41C5_6CB21F639238",
   "pitch": -6.4,
   "yaw": -101.38,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_26D42D58_3707_5EC8_41BC_BE3AC6D04757",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.album_16F50D22_371A_FE76_41CA_3680AED88022_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_16F50D22_371A_FE76_41CA_3680AED88022_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "items": [
  {
   "media": "this.album_10083024_3706_C673_41B6_7BB9C8314467_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_10083024_3706_C673_41B6_7BB9C8314467_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E, this.camera_59DFB6D6_5638_8D06_41D0_B314664F8173); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 7.41,
   "yaw": 116.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.14,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.41,
   "image": "this.AnimatedImageResource_2494FACC_3707_5A33_417B_06167F849906",
   "pitch": -10.14,
   "yaw": 116.92,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_24F8A6A6_3709_4A7E_41C7_4B2977723136",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344, this.camera_59CF26E4_5638_8D3A_41CE_B5407DF25246); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 5.52,
   "yaw": -133.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.45,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.52,
   "image": "this.AnimatedImageResource_2494BACD_3707_5BCD_419E_118BEAAFAFFA",
   "pitch": -8.45,
   "yaw": -133.81,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_244BECEE_3709_DFCF_41B6_32BCC8CDEC19",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5, this.camera_46A7987E_5638_8506_41B9_19C15BFDBDA8); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 5.52,
   "yaw": 113.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.52,
   "image": "this.AnimatedImageResource_24938ACC_3707_5A33_41B6_D6BA65B314AB",
   "pitch": -8.26,
   "yaw": 113.63,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_24522F69_370F_3AF5_41C8_A8D633F8006A",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656, this.camera_46B5E871_5638_851A_418C_AE623DE5D3F3); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 5.53,
   "yaw": -126.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.47,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.53,
   "image": "this.AnimatedImageResource_24934ACC_3707_5A33_41C2_2BED73F911E5",
   "pitch": -7.47,
   "yaw": -126.14,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_226DE562_370F_4EF7_41B8_3A995C12D620",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.album_1EF12A1B_3709_DA55_41A4_3A0187528638_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_1EF12A1B_3709_DA55_41A4_3A0187528638_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B, this.camera_599A270B_5638_8B0E_41BD_C39850BCAB23); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 8.62,
   "yaw": -66.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.62,
   "image": "this.AnimatedImageResource_2491CACA_3707_5A37_41CA_A4D7C60E39B0",
   "pitch": -9.78,
   "yaw": -66.87,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_26862428_3719_CE73_419E_5040F0EA2C2E",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4, this.camera_59843718_5638_8B0A_41A2_D562AE18991F); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 8.6,
   "yaw": 38.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.6,
   "image": "this.AnimatedImageResource_24917ACB_3707_5A35_41A1_E667C73C0D8C",
   "pitch": -10.41,
   "yaw": 38.66,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_25678B22_371B_5A77_41B8_54F2A6DDDE7C",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.album_107D25FF_373B_49CE_41C1_54D20836AFBC_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_107D25FF_373B_49CE_41C1_54D20836AFBC_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC, this.camera_46D8E821_5638_853A_41CF_2A53248F9035); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 10.72,
   "yaw": 46.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.74,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.72,
   "image": "this.AnimatedImageResource_22D0804A_3379_47CD_41B7_36701327A966",
   "pitch": -10.74,
   "yaw": 46.96,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2388E2F5_3377_C8C4_41A3_65A6AD458E49",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656, this.camera_46C8282F_5638_8506_41D3_35A9F7BEC0B7); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 7.46,
   "yaw": -17.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.46,
   "image": "this.AnimatedImageResource_22D0504A_3379_47CD_41AD_F1C1DA396506",
   "pitch": -7.64,
   "yaw": -17.39,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_22437492_3376_CF5D_41B2_211B616586AC",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D, this.camera_59F906F0_5638_8D1A_41C3_BB657ECF133F); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 11.71,
   "yaw": -75.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.71,
   "image": "this.AnimatedImageResource_249FAAC9_3707_5A35_41AB_3090549C593B",
   "pitch": -11.05,
   "yaw": -75.93,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_380CB87E_3707_C6CF_417B_492E3AEE4546",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E, this.camera_59EA96FE_5638_8D06_41CA_BDD0F4759D6A); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 8.89,
   "yaw": 77.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.54,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.89,
   "image": "this.AnimatedImageResource_249F4AC9_3707_5A35_41A5_DACE190C3F02",
   "pitch": -9.54,
   "yaw": 77.81,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_38E71773_3719_4AD5_41BE_C870A2CC93E1",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setComponentVisibility(this.WebFrame_4FA39F49_552F_F5CF_41B1_98886B6F8B18, true, 0, null, null, false); this.setComponentVisibility(this.Image_4FEF3ECA_5536_B4CD_41A6_3230427F004B, true, 0, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 4.15,
   "yaw": -1.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0_HS_2_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 13.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.15,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_0_HS_2_0.png",
      "width": 47,
      "height": 41,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 13.73,
   "yaw": -1.42,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_4C58124F_552E_CFC3_41D0_EDD2F6CB8383",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.album_15DCA865_371B_C6FD_41BC_6DE476EA1F45_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_15DCA865_371B_C6FD_41BC_6DE476EA1F45_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "items": [
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_1",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_2",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_3",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_4",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_5",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_6",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_7",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_8",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_9",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_10",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_11",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_12",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_13",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_14",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_15",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_16",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_17",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_18",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_19",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_20",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_21",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_22",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_23",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_4AEC7510_5569_D55C_41C8_8BF09DE13D2C_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "items": [
  {
   "media": "this.album_1FD2D4E3_3709_4FF5_41C1_75AC8B34BE5B_0",
   "camera": {
    "scaleMode": "fit_outside",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_1FD2D4E3_3709_4FF5_41C1_75AC8B34BE5B_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "items": [
  {
   "media": "this.album_2981F364_370E_CAF2_41C4_B421B313269C_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_2981F364_370E_CAF2_41C4_B421B313269C_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "items": [
  {
   "media": "this.album_1EB5F57E_370F_4ECF_41BD_8B196DD54159_0",
   "camera": {
    "scaleMode": "fit_outside",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_1EB5F57E_370F_4ECF_41BD_8B196DD54159_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "items": [
  {
   "media": "this.album_103113E4_373B_49F3_41C0_B1CEF9A0A1A0_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_103113E4_373B_49F3_41C0_B1CEF9A0A1A0_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0, this.camera_460D37EF_5638_8B06_41D2_A684D777954F); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 9.25,
   "yaw": -50.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.25,
   "image": "this.AnimatedImageResource_2F704938_3359_D94D_41BC_B79DDA7AFC7F",
   "pitch": -7.56,
   "yaw": -50.72,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2585A8A3_3359_477C_41C9_A56A2FB40B37",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC, this.camera_463D4808_5638_850A_41C5_892B931334BC); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 9.85,
   "yaw": -0.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.85,
   "image": "this.AnimatedImageResource_2F73B938_3359_D94D_41C3_09AC74D901E6",
   "pitch": 4.48,
   "yaw": -0.45,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_259CBCC9_335E_D8CF_41C2_C9297577E3DF",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1, this.camera_462E3815_5638_851A_4196_C8D1482EB1D8); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 13.18,
   "yaw": 73.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_3_HS_2_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.18,
   "image": "this.AnimatedImageResource_2F732938_3359_D94D_419C_D6541DF28E9C",
   "pitch": -7.75,
   "yaw": 73.6,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_244AA6D1_335F_48DF_41C5_0EE60B7F84D0",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setComponentVisibility(this.WebFrame_4FA39F49_552F_F5CF_41B1_98886B6F8B18, true, 0, null, null, false); this.setComponentVisibility(this.Image_4FEF3ECA_5536_B4CD_41A6_3230427F004B, true, 0, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 2.13,
   "yaw": 43.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0_HS_3_0_0_map.gif",
      "width": 19,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.13,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_0_HS_3_0.png",
      "width": 24,
      "height": 20,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.08,
   "yaw": 43.29,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_49DFA8BE_5529_5B44_41CF_FD22940B647D",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2D91D72C_370A_CA72_41C5_FF36118FC190, this.camera_4771E8A6_5638_8506_41D5_6BC95AA02B71); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 27.09,
   "yaw": -0.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 27.09,
   "image": "this.AnimatedImageResource_120BFA9C_370F_5A53_41CA_86E607822CBF",
   "pitch": -19.46,
   "yaw": -0.73,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2B47A993_373A_C655_41CB_985C962676F7",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915, this.camera_476388B4_5638_851A_41C5_62BB7142622D); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 22.71,
   "yaw": 179.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.71,
   "image": "this.AnimatedImageResource_04440C90_3979_3E53_4176_37DB3A36D974",
   "pitch": -21.84,
   "yaw": 179.52,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2B724331_3739_4A52_41C5_94CFCD1D62D4",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_5975B670_5638_8D19_41D3_CC948D05BCAE, 0, this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 8.29,
   "yaw": 48.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0_HS_2_1_0_map.gif",
      "width": 46,
      "height": 62,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.67,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_10B6FDF2_373B_59D7_41C4_B91D930ADF7B",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_5974C671_5638_8D1B_41B5_ABF375CCF227, 0, this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 7.96,
   "yaw": 52.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0_HS_3_1_0_map.gif",
      "width": 44,
      "height": 56,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.9,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1FF4FBBD_373A_DA4D_41BC_9C96C2A08DDD",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_597A7672_5638_8D19_41CB_E4AAB5D29B3C, 0, this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 6,
   "yaw": -22.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0_HS_4_1_0_map.gif",
      "width": 33,
      "height": 29,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1E7349A8_3739_4673_41C2_E80B7BFF127A",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_597AF673_5638_8D1F_41D4_7AB66D4A8705, 0, this.panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 5.95,
   "yaw": -25.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0_HS_5_1_0_map.gif",
      "width": 33,
      "height": 29,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_1F899472_3707_4ED7_41BC_504C81EED5BB",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1, this.camera_4661C7A6_5638_8B06_41D0_B1EDA5D5F9BE); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 9.02,
   "yaw": -83.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.02,
   "image": "this.AnimatedImageResource_249F0AC9_3707_5A35_41C3_A8D463E74B17",
   "pitch": -5.48,
   "yaw": -83.18,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_38ACA424_371A_CE73_41CA_C0A4AC8C8F3B",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B, this.camera_4671B78E_5638_8B06_41B3_47D4F54FA3E1); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 12.18,
   "yaw": 79.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.15,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.18,
   "image": "this.AnimatedImageResource_2490AACA_3707_5A37_41C2_B0FF75F6BE9D",
   "pitch": -9.15,
   "yaw": 79.47,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_38DCFDE6_371A_D9FE_41B5_C682A7CEF208",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C15026F_3709_CACE_41B4_65C8176FA269, this.camera_46FAD83C_5638_850A_416B_4CAA026937FC); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 8.25,
   "yaw": 4.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_3_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.25,
   "image": "this.AnimatedImageResource_24907ACA_3707_5A37_41A7_AC44F2F8B38F",
   "pitch": -7.72,
   "yaw": 4.58,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_272738DC_3719_C7D3_41C0_F29E1731571F",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E, this.camera_46EA584A_5638_850E_41B2_CB1EE1B762AD); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 4.7,
   "yaw": -80.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_3_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.7,
   "image": "this.AnimatedImageResource_24900ACA_3707_5A37_41BB_132E5957C40E",
   "pitch": -6.21,
   "yaw": -80.15,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2758CCF4_371E_DFD2_41C7_9EFF01B260EA",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.album_1E7BFE5B_370F_3AD5_41B0_0EC12FF29558_0",
   "camera": {
    "scaleMode": "fit_outside",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_1E7BFE5B_370F_3AD5_41B0_0EC12FF29558_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_20E00598_336B_494C_4198_4A9EF9DF7B20",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_20E00598_336B_494C_4198_4A9EF9DF7B20.png",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "push",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_20E00598_336B_494C_4198_4A9EF9DF7B20_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "visible": false,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_20E0C598_336B_494C_41C1_EA058A00BA71",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_20E0C598_336B_494C_41C1_EA058A00BA71.png",
 "pressedRollOverIconURL": "skin/IconButton_20E0C598_336B_494C_41C1_EA058A00BA71_pressed_rollover.png",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_20E0C598_336B_494C_41C1_EA058A00BA71_pressed.png",
 "visible": false,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton HS "
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_20E0E598_336B_494C_414A_BEAF17FD2B40",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_20E0E598_336B_494C_414A_BEAF17FD2B40.png",
 "pressedRollOverIconURL": "skin/IconButton_20E0E598_336B_494C_414A_BEAF17FD2B40_pressed_rollover.png",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_20E0E598_336B_494C_414A_BEAF17FD2B40_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D, this.camera_4757388B_5638_850E_41BF_38CF6C54B8F4); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 23.56,
   "yaw": 90.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_0_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.56,
   "image": "this.AnimatedImageResource_2D980AD1_3709_3BD2_41C9_BAA39418E826",
   "pitch": -34.91,
   "yaw": 90.11,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_23A20498_377A_CE53_41C9_72EC1024FDAF",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915, this.camera_47404899_5638_850A_41D1_94E41679E693); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 03c"
 },
 "maps": [
  {
   "hfov": 19.95,
   "yaw": -0.31,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_1_0_0_map.gif",
      "width": 61,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.95,
   "image": "this.AnimatedImageResource_16EA99CD_3739_59CD_41A3_CA5B13F290D6",
   "pitch": -17.77,
   "yaw": -0.31,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_2B550CB1_3739_5E55_41AF_6913D3F243B5",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_594DA66C_5638_8D09_41C9_CABA2F2495CD, 0, this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 6.37,
   "yaw": 21.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_3_1_0_map.gif",
      "width": 35,
      "height": 29,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_14273C3B_370B_DE55_41C9_8367B771F79E",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_594CC66C_5638_8D09_41C3_EB6207330F08, 0, this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 5.98,
   "yaw": 23.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_4_1_0_map.gif",
      "width": 33,
      "height": 28,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_165E3312_3719_4A57_41BC_DF88F7850C2B",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_594CB66C_5638_8D09_41CA_F6E27D63D520, 0, this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 4.29,
   "yaw": -13.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_5_1_0_map.gif",
      "width": 23,
      "height": 20,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_16CCC70C_3719_4A32_41C0_4853EE11A951",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_5973366C_5638_8D09_41C0_5B79799C5370, 0, this.panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 4.29,
   "yaw": -15.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_6_1_0_map.gif",
      "width": 23,
      "height": 19,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_16DFBDC6_371B_5E3F_41C8_C7433F447791",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setComponentVisibility(this.WebFrame_0D8C200B_3919_4635_41C7_096F2C6DFD02, true, 0, null, null, false); this.setComponentVisibility(this.Image_0EE1F158_390F_46D3_41C2_A6291CF83977, true, 0, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 6.64,
   "yaw": 179.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_7_0_0_map.gif",
      "width": 16,
      "height": 31,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 12.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.64,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_7_0.png",
      "width": 75,
      "height": 148,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 12.78,
   "yaw": 179.82,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_0C61838A_397B_4A37_41C9_E8EEE477B51E",
 "class": "HotspotPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 3.46,
   "yaw": -0.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_8_0_0_map.gif",
      "width": 16,
      "height": 19,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.46,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_8_0.png",
      "width": 38,
      "height": 46,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.44,
   "yaw": -0.32,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_76850818_557A_BB4D_41C3_82E3A82D9190",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "media": "this.album_10056E2A_370B_7A77_41C3_4BCA90227C30_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_10056E2A_370B_7A77_41C3_4BCA90227C30_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "items": [
  {
   "media": "this.album_1EE89E7E_3707_DACE_41CB_03967704E722_0",
   "camera": {
    "scaleMode": "none",
    "class": "PhotoCamera"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_1EE89E7E_3707_DACE_41CB_03967704E722_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_20E05598_336B_494C_41AC_09BF58CF1A6B",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "paddingLeft": 0,
 "children": [
  "this.IconButton_20E02598_336B_494C_41A4_7966068577F9"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 110,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "height": 110,
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "layout": "horizontal",
 "overflow": "visible",
 "data": {
  "name": "button menu sup"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_20E03598_336B_494C_41C4_1B9A756241D8",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "children": [
  "this.IconButton_20E00598_336B_494C_4198_4A9EF9DF7B20",
  "this.IconButton_20E0E598_336B_494C_414A_BEAF17FD2B40",
  "this.IconButton_20E0F598_336B_494C_41A4_FC5B319BEDFA",
  "this.IconButton_20E0C598_336B_494C_41C1_EA058A00BA71",
  "this.IconButton_20E0D598_336B_494C_41C5_8150B8259487",
  "this.IconButton_20E0A598_336B_494C_41C8_789BFA644FE8",
  "this.IconButton_20E0B598_336B_494C_41B6_7C66EDCB0E2B"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": "85.959%",
 "width": "91.304%",
 "gap": 3,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "layout": "vertical",
 "data": {
  "name": "-button set"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_44EC1DA0_551E_B57D_419E_C5D2020B4E57",
 "left": "12%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "12%",
 "children": [
  "this.Container_47DC37AA_5519_754C_41BF_2355A107760C",
  "this.Container_474EA67A_55F9_D7CD_41C4_FB89CA3F33D4"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "10%",
 "contentOpaque": false,
 "minWidth": 1,
 "top": "10%",
 "class": "Container",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "layout": "absolute",
 "data": {
  "name": "2"
 },
 "overflow": "scroll"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_120B5A9C_370F_5A53_41C6_3664BB2D000B",
 "levels": [
  {
   "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_0442BC90_3979_3E53_41CB_F8BDE1CC4B73",
 "levels": [
  {
   "url": "media/panorama_2D91D72C_370A_CA72_41C5_FF36118FC190_0_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_16E119DD_3739_59CD_41C9_21D57C4C55FB",
 "levels": [
  {
   "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_1_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_1FB45E6B_371E_DAF5_41C5_3F388AA58E08",
 "levels": [
  {
   "url": "media/panorama_2D86DE16_370A_DA5F_41BF_FDD69B7C3915_0_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_222E704A_3379_47CD_41A2_8215A99B95F3",
 "levels": [
  {
   "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_22D1704A_3379_47CD_41B9_BEFEFC5DD565",
 "levels": [
  {
   "url": "media/panorama_3BB3BED8_2EDC_4F36_4185_DB48BA441DBC_0_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_12146AAC_370F_5A72_41A4_2562A629E146",
 "levels": [
  {
   "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_1FB62E6B_371E_DAF5_41C2_3286763E101A",
 "levels": [
  {
   "url": "media/panorama_2D903BEE_3709_39CF_41CB_5765B74B3756_0_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_24924ACB_3707_5A35_41C4_A44AC73BAAEB",
 "levels": [
  {
   "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_24921ACC_3707_5A33_41B2_37030A260D63",
 "levels": [
  {
   "url": "media/panorama_3C1D4BE2_370A_D9F7_41CB_05901420B7E5_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_22D1304A_3379_47CD_4194_66B42C0D2B5F",
 "levels": [
  {
   "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_22D0C04A_3379_47CD_41B2_C689FE4648F2",
 "levels": [
  {
   "url": "media/panorama_22EB84E7_336B_48C3_41BE_95892B7F92B0_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_24911ACB_3707_5A35_41C4_75C10E31D0F5",
 "levels": [
  {
   "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2492AACB_3707_5A35_41C5_6CB21F639238",
 "levels": [
  {
   "url": "media/panorama_3C17D1A4_3709_4672_41C9_DB2692D9CAA4_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2494FACC_3707_5A33_417B_06167F849906",
 "levels": [
  {
   "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2494BACD_3707_5BCD_419E_118BEAAFAFFA",
 "levels": [
  {
   "url": "media/panorama_3C66E66B_370B_CAF5_41C5_67084CBF6656_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_24938ACC_3707_5A33_41B6_D6BA65B314AB",
 "levels": [
  {
   "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_24934ACC_3707_5A33_41C2_2BED73F911E5",
 "levels": [
  {
   "url": "media/panorama_3C1C9428_370B_4E72_41C4_63EC28AB4D9E_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2491CACA_3707_5A37_41CA_A4D7C60E39B0",
 "levels": [
  {
   "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_24917ACB_3707_5A35_41A1_E667C73C0D8C",
 "levels": [
  {
   "url": "media/panorama_3C15026F_3709_CACE_41B4_65C8176FA269_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_22D0804A_3379_47CD_41B7_36701327A966",
 "levels": [
  {
   "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_22D0504A_3379_47CD_41AD_F1C1DA396506",
 "levels": [
  {
   "url": "media/panorama_3CB0D57D_336B_C9C4_41B1_F01D8AC95344_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_249FAAC9_3707_5A35_41AB_3090549C593B",
 "levels": [
  {
   "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_249F4AC9_3707_5A35_41A5_DACE190C3F02",
 "levels": [
  {
   "url": "media/panorama_3C489A21_370F_5A72_41CA_296B2E11EBF1_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2F704938_3359_D94D_41BC_B79DDA7AFC7F",
 "levels": [
  {
   "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2F73B938_3359_D94D_41C3_09AC74D901E6",
 "levels": [
  {
   "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2F732938_3359_D94D_419C_D6541DF28E9C",
 "levels": [
  {
   "url": "media/panorama_2446E16B_3359_49C3_41B1_5D1AF4BD253D_3_HS_2_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_120BFA9C_370F_5A53_41CA_86E607822CBF",
 "levels": [
  {
   "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_04440C90_3979_3E53_4176_37DB3A36D974",
 "levels": [
  {
   "url": "media/panorama_2D91B2B7_370A_CA5D_41B3_C6B6D9EAF7E7_0_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_249F0AC9_3707_5A35_41C3_A8D463E74B17",
 "levels": [
  {
   "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2490AACA_3707_5A37_41C2_B0FF75F6BE9D",
 "levels": [
  {
   "url": "media/panorama_3C6442A7_370E_CA7D_41B8_D9864C8CE87E_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_24907ACA_3707_5A37_41A7_AC44F2F8B38F",
 "levels": [
  {
   "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_3_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_24900ACA_3707_5A37_41BB_132E5957C40E",
 "levels": [
  {
   "url": "media/panorama_3C0AA238_3709_4A53_41C1_D765BA7CDA0B_3_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_2D980AD1_3709_3BD2_41C9_BAA39418E826",
 "levels": [
  {
   "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_0_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_16EA99CD_3739_59CD_41A3_CA5B13F290D6",
 "levels": [
  {
   "url": "media/panorama_2BC8DDB9_335A_D94C_41C9_AD2AAA355ADC_0_HS_1_0.png",
   "width": 1220,
   "height": 480,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "transparencyActive": true,
 "maxHeight": 60,
 "propagateClick": true,
 "id": "IconButton_20E02598_336B_494C_41A4_7966068577F9",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 60,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_20E02598_336B_494C_41A4_7966068577F9.png",
 "pressedRollOverIconURL": "skin/IconButton_20E02598_336B_494C_41A4_7966068577F9_pressed_rollover.png",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "toggle",
 "click": "if(!this.Container_20E03598_336B_494C_41C4_1B9A756241D8.get('visible')){ this.setComponentVisibility(this.Container_20E03598_336B_494C_41C4_1B9A756241D8, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_20E03598_336B_494C_41C4_1B9A756241D8, false, 0, null, null, false) }",
 "height": 60,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_20E02598_336B_494C_41A4_7966068577F9_pressed.png",
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "image button menu"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_20E0A598_336B_494C_41C8_789BFA644FE8",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_20E0A598_336B_494C_41C8_789BFA644FE8.png",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "push",
 "click": "this.shareTwitter(window.location.href)",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_20E0A598_336B_494C_41C8_789BFA644FE8_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "visible": false,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton TWITTER"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_20E0B598_336B_494C_41B6_7C66EDCB0E2B",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 58,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_20E0B598_336B_494C_41B6_7C66EDCB0E2B.png",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "push",
 "click": "this.openLink('http://https://www.facebook.com/EscuelaVitar/', '_blank')",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_20E0B598_336B_494C_41B6_7C66EDCB0E2B_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FB"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_47DC37AA_5519_754C_41BF_2355A107760C",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.IconButton_46FB0368_55EB_4DCD_41CA_346750096EEA",
  "this.Image_46129B8D_55EA_DD47_4186_FF1D8E93E90C"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "top": "0%",
 "gap": 10,
 "height": "15%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "layout": "absolute",
 "data": {
  "name": "Container5998"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_474EA67A_55F9_D7CD_41C4_FB89CA3F33D4",
 "left": "0%",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.Container_4765C2B3_55F9_4F43_41B2_335A5775E489",
  "this.Container_461535A0_55F9_757C_41B1_9DEC08CC1F4A"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "99.994%",
 "gap": 10,
 "height": "84.704%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "layout": "horizontal",
 "data": {
  "name": "Container9743"
 },
 "overflow": "scroll"
},
{
 "transparencyActive": true,
 "maxHeight": 152,
 "propagateClick": false,
 "id": "IconButton_46FB0368_55EB_4DCD_41CA_346750096EEA",
 "paddingRight": 0,
 "right": "2.06%",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 75,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "minHeight": 1,
 "iconURL": "skin/IconButton_46FB0368_55EB_4DCD_41CA_346750096EEA.png",
 "pressedRollOverIconURL": "skin/IconButton_46FB0368_55EB_4DCD_41CA_346750096EEA_pressed_rollover.png",
 "minWidth": 1,
 "class": "IconButton",
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_461888A3_551A_DB43_41C5_C42CF61540E2, false, 0, null, null, false)",
 "height": 56,
 "top": "19.09%",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_46FB0368_55EB_4DCD_41CA_346750096EEA_pressed.png",
 "cursor": "hand",
 "maxWidth": 152,
 "data": {
  "name": "IconButton8870"
 }
},
{
 "maxHeight": 34,
 "propagateClick": false,
 "id": "Image_46129B8D_55EA_DD47_4186_FF1D8E93E90C",
 "left": "26%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_46129B8D_55EA_DD47_4186_FF1D8E93E90C.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "19.048%",
 "bottom": "25.55%",
 "class": "Image",
 "minWidth": 1,
 "height": "30.909%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image10848"
 },
 "maxWidth": 240
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_4765C2B3_55F9_4F43_41B2_335A5775E489",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.Image_4672B11A_55EF_4D4D_41A4_898B657C6A47"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "65%",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "layout": "absolute",
 "data": {
  "name": "Container9896"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_461535A0_55F9_757C_41B1_9DEC08CC1F4A",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "children": [
  "this.Image_4170DEDD_551E_B4C7_41C0_8B447F7DAE1B"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "35%",
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "layout": "absolute",
 "data": {
  "name": "Container9926"
 },
 "overflow": "scroll"
},
{
 "maxHeight": 541,
 "propagateClick": false,
 "id": "Image_4672B11A_55EF_4D4D_41A4_898B657C6A47",
 "left": "15%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_4672B11A_55EF_4D4D_41A4_898B657C6A47.jpg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "minHeight": 1,
 "width": "80.69%",
 "class": "Image",
 "minWidth": 1,
 "height": "71.935%",
 "top": "10.35%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image11046"
 },
 "maxWidth": 800
},
{
 "maxHeight": 1000,
 "propagateClick": false,
 "id": "Image_4170DEDD_551E_B4C7_41C0_8B447F7DAE1B",
 "left": "0%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_4170DEDD_551E_B4C7_41C0_8B447F7DAE1B.jpg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "minHeight": 1,
 "width": "100%",
 "class": "Image",
 "minWidth": 1,
 "height": "100%",
 "top": "0%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image11174"
 },
 "maxWidth": 700
}],
 "width": "100%",
 "layout": "absolute"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
