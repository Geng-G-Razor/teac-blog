// ==UserScript==
// @name         i-jump
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/waimai/*
// @match        http://*/eshop/*
// @match        http://*/common/*
// @match        http://*/app/microweb/*
// @match        http://*/market/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  // 在开发网站时，可以从ip网址，跳到域名，反向也可以。
  // 使用正则匹配在适用网址激活功能
  // 域名网址为虚构

  let jumpFunc = function (myIP) {
    let href = window.location.href
    let letUsJump = (/[?&]ijump/).test(href)
    let letUsJumpPre = (/[?&]ijump-pre/).test(href)
    let IMTest = (/m\.test\.ggf\.net/).test(href)
    let IMPre = (/m\.prepub\.ggf\.net/).test(href)
    let IMLocal = (/:9999/).test(href)

    if (letUsJump) {
      let jumpJump
      if (IMTest) {
        jumpJump = href.replace('m.test.ggf.net', `${myIP}:9999`).replace('?ijump', '').replace('&ijump', '')
      } else if (IMPre) {
        jumpJump = href.replace('m.prepub.ggf.net', `${myIP}:9999`).replace('?ijump', '').replace('&ijump', '')
      } else if (IMLocal) {
        if(letUsJumpPre) {
          jumpJump = href.replace(`${myIP}:9999`, 'm.prepub.ggf.net').replace('?ijump-pre', '').replace('&ijump-pre', '')
        } else {
          jumpJump = href.replace(`${myIP}:9999`, 'm.test.ggf.net').replace('?ijump', '').replace('&ijump', '')
        }
      }
      window.location.replace(jumpJump)
    }
  }

  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
  //compatibility for firefox and chrome
  let pc = new RTCPeerConnection({ iceServers: [] }), noop = function () {
  }
  pc.createDataChannel("")    //create a bogus data channel
  pc.createOffer(pc.setLocalDescription.bind(pc), noop)    // create offer and set local description
  pc.onicecandidate = function (ice) {  //listen for candidate events
    if (!ice || !ice.candidate || !ice.candidate.candidate)  return
    let myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1]
    console.log('my IP: ', myIP)
    pc.onicecandidate = noop
    jumpFunc(myIP)
  }

})();