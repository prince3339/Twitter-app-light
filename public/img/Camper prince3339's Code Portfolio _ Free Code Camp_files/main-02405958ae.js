"use strict";var main=window.main||{};main.mapShareKey="map-shares",main.ga=window.ga||function(){},main=function(e,a){var t=a.Mousetrap;return((window.gitter={}).chat={}).options={disableDefaultChat:!0},e.chat={},e.chat.isOpen=!1,e.chat.createHelpChat=function(){throw new Error("Sidecar chat has not initialized")},document.addEventListener("gitter-sidecar-ready",function(a){function n(){e.chat.isOpen||e.chat.mainChat.toggleChat(!0)}function i(){$("#chat-embed-main").addClass("is-collapsed"),document.activeElement.blur()}function o(){var e=$("#chat-embed-main").hasClass("is-collapsed");e?n():i()}e.chat.GitterChat=a.detail.Chat,e.chat.createHelpChat=function(a,t,n){n=a.replace(/([A-Z])/g," $1").replace("Java Script","JavaScript"),$("body").append('<aside id="chat-embed-help" class="gitter-chat-embed is-collapsed" />'),e.chat.helpChat=new e.chat.GitterChat({room:"freecodecamp/"+a,activationElement:!1,targetElement:$("#chat-embed-help")}),$(t).on("click",function(){var a=!$(this).hasClass("active");e.chat.helpChat.toggleChat(a),a&&$(t).addClass("active")});var i=!1;$("#chat-embed-help").on("gitter-chat-toggle",function(e){var a=!!e.originalEvent.detail.state;return i||(i=!0,$("#chat-embed-help > .gitter-chat-embed-action-bar").prepend('<div class="chat-embed-main-title"><span>'+n+"</span></div>")),a?$(t).addClass("active"):$(t).removeClass("active")})},$("body").append('<aside id="chat-embed-main" class="gitter-chat-embed is-collapsed" />'),e.chat.mainChat=new e.chat.GitterChat({room:"freecodecamp/freecodecamp",activationElement:!1,targetElement:$("#chat-embed-main")});var c=!1;$("#chat-embed-main").on("gitter-chat-toggle",function(){return c?null:(c=!0,$("#chat-embed-main > .gitter-chat-embed-action-bar").prepend('<div class="chat-embed-main-title"><span>Free Code Camp\'s Main Chat</span></div>'),null)}),$("#nav-chat-btn").on("click",function(e){e.ctrlKey||e.metaKey||o()}),t.bind("g c",o)}),e}(main,window);var lastCompleted="undefined"!=typeof lastCompleted?lastCompleted:"";main.getMapShares=function(){var e=JSON.parse(localStorage.getItem(main.mapShareKey)||"[]");return e&&Array.isArray(e)||(localStorage.setItem(main.mapShareKey,JSON.stringify([])),e=[]),e},main.setMapShare=function(e){var a=main.getMapShares(),t=!1;return a.forEach(function(a){a===e&&(t=!0)}),t||a.push(e),localStorage.setItem(main.mapShareKey,JSON.stringify(a)),a},$(document).ready(function(){function e(a){a.preventDefault();for(var t=this,n=t.id,i=$(t).data().upVotes,o="undefined"!=typeof o?o:"",c=!1,s=0;s<i.length;s++)if(i[s].upVotedBy===o){c=!0;break}c||$.post("/stories/upvote",{id:n}).fail(function(){$(t).bind("click",e)}).done(function(e){$(t).text("Upvoted!").addClass("disabled"),$("#storyRank").text(e.rank+" points")})}function a(e){$(e).prev().find(".fa-caret-right").removeClass("fa-caret-right").addClass("fa-caret-down")}function t(e){$(e).prev().find(".fa-caret-down").removeClass("fa-caret-down").addClass("fa-caret-right")}function n(e){$(e).addClass("in").css("height","auto"),a(e)}function i(e){$(e).removeClass("in").css("height","auto"),t(e)}function o(){if(!main.isMapAsideLoad){var e=$('<iframe id = "map-aside-frame" >');e.attr({src:"/map-aside",frameBorder:"0"}),$(".map-aside").append(e),main.isMapAsideLoad=!0}$(".map-aside").removeClass("is-collapsed")}function c(){$(".map-aside").addClass("is-collapsed"),document.activeElement.blur()}function s(){var e=$(".map-aside").hasClass("is-collapsed");e?o():c()}function d(){if(!main.isWikiAsideLoad){var e=window.location.toString().match(/\/\w{2}\//);e=e?e[0]:"/en/";var a="//freecodecamp.github.io/wiki"+e,t=$("<iframe>");t.attr({src:a,frameBorder:"0"}),$(".wiki-aside").append(t),main.isWikiAsideLoad=!0}$(".wiki-aside").removeClass("is-collapsed")}function l(){$(".wiki-aside").addClass("is-collapsed"),document.activeElement.blur()}function r(){var e=$(".wiki-aside").hasClass("is-collapsed");e?d():l()}function h(){k.val(""),k.next().children().removeClass("fa-times").addClass("fa-search"),k.next().removeClass("filled"),$(".map-accordion").find(".hidden").removeClass("hidden"),$("#noneFound").hide()}function p(){var e=!1;try{e=!JSON.parse(localStorage.getItem("nightMode"))}catch(a){console.error("Error parsing value form local storage:","nightMode",a)}localStorage.setItem("nightMode",String(e)),m(e)}function m(e){var a=document.getElementById("map-aside-frame");a&&(a.src=a.src);var t=$("body");t.hide(),e?t.addClass("night"):t.removeClass("night"),t.fadeIn("100")}var f="X-CSRF-Token",u=function(e){jQuery.ajaxPrefilter(function(a,t,n){n.crossDomain||n.setRequestHeader(f,e)})};u($('meta[name="csrf-token"]').attr("content")),$("img").error(function(){$(this).unbind("error").attr("src","https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png")}),$("#story-list").on("click","button.btn-upvote",e);var g=function E(){if(!$("#story-submission-form")[0].checkValidity())return null;var e=$("#story-url").val(),a=$("#story-title").val(),t=$("#description-box").val(),n={data:{link:e,headline:a,timePosted:Date.now(),description:t,storyMetaDescription:main.storyMetaDescription,rank:1,image:main.storyImage}};return $("#story-submit").unbind("click"),$.post("/stories/",n).fail(function(){$("#story-submit").bind("click",E)}).done(function(e){var a=e.storyLink,t=e.isBanned;return t?(window.location="/news",null):(window.location="/stories/"+a,null)})};$("#story-submit").on("click",g);var v=main.getMapShares();lastCompleted&&-1===v.indexOf(lastCompleted)&&$('div[id="'+lastCompleted+'"]').parent().parent().removeClass("hidden"),$(".map-challenge-block-share").on("click",function(e){e.preventDefault();var a=$(this).children().attr("id"),t=a.replace(/\s/,"%20"),n="undefined"!=typeof window.username?window.username:"",i="https://www.facebook.com/dialog/feed?app_id=1644598365767721&display=page&caption=I%20just%20completed%20the%20"+t+"%20section%20on%20Free%20Code%20Camp%2E&link=http%3A%2F%2Ffreecodecamp%2Ecom%2F"+n+"&redirect_uri=http%3A%2F%2Ffreecodecamp%2Ecom%2Fmap";main.setMapShare(a),window.ga("send","event","FB_LINK","SHARE","Facebook map share"),window.location.href=i}),$.each($(".sr-only"),function(e,a){" Complete"===$(a).text()&&$(a).parents("p").addClass("manip-hidden")}),$.each($(".map-collapse"),function(e,a){$(a).find(".manip-hidden").length===$(a).find("p").length&&(i(a),$(a).prev("h3").addClass("faded"),$(a).prev("h2").addClass("faded"))});var w,C,b=localStorage.getItem("currentDashedName"),y=$("p.padded-ionic-icon a");!b&&$(".sr-only").length&&(y=$(".sr-only")),C=y.filter(function(){return b?$(this).attr("href").match(b):" Complete"===$(this).text()}),C.length&&(C=C[C.length-1],w=$(C).offset().top-380,$("html, body, .map-accordion").scrollTop(w)),String(window.location).match(/\/map$/gi)&&($("body>.flashMessage").find(".alert").css("display","none"),$(".map-fixed-header").css("top","50px"));var k=$("#map-filter"),S=$("#showAll");if($("#nav-map-btn").on("click",function(e){e.ctrlKey||e.metaKey||s()}),$(".map-aside-action-collapse").on("click",c),$("#nav-wiki-btn").on("click",function(e){e.ctrlKey||e.metaKey||r()}),$(".wiki-aside-action-collapse").on("click",l),$("#accordion").on("show.bs.collapse",function(e){a(e.target),$("a[data-toggle=collapse]").length===$(".fa-caret-down").length&&(S.text("Collapse all challenges"),S.addClass("active"))}).on("hide.bs.collapse",function(e){t(e.target),$("a[data-toggle=collapse]").length===$(".fa-caret-right").length&&(S.text("Expand all challenges"),S.removeClass("active"))}),S.on("click",function(){var e=S.hasClass("active");return e?($.each($(".map-collapse.in"),function(e,a){i(a)}),S.text("Expand all challenges"),S.removeClass("active")):($.each($('.map-collapse:not(".in")'),function(e,a){n(a)}),S.text("Collapse all challenges"),S.addClass("active"))}),k.on("keyup",function(){if(k.val().length>0){var e=k.val().replace(/ /g,"."),a=new RegExp(e.split("").join(".*"),"i");$(".challenge-title").each(function(e,t){a.test($(t).attr("name"))?(n($(t).closest(".chapterBlock")),n($(t).closest(".certBlock")),$(t).removeClass("hidden")):$(t).addClass("hidden")}),$.each($(".chapterBlock"),function(e,a){$(a).find(".hidden").length===$(a).find("p").length?($(a).addClass("hidden"),$(a).prev("h3").addClass("hidden")):($(a).removeClass("hidden"),$(a).prev("h3").removeClass("hidden"))}),$.each($(".certBlock"),function(e,a){$(a).children("#nested").children("h3.hidden").length===$(a).children("#nested").children("h3").length?$(a).prev("h2").addClass("hidden"):$(a).prev("h2").removeClass("hidden")}),k.next().children().hasClass("fa-search")&&(k.next().children().removeClass("fa-search").addClass("fa-times"),k.next().addClass("filled"),$("html, body, .map-accordion").scrollTop(0))}else h();$.find(".certBlock").length===$(".map-accordion").children(".hidden").length?$("#noneFound").show():$("#noneFound").hide()}),k.focus(),$(".map-buttons .input-group-addon").on("click",h),k.on("keydown",function(e){27===e.keyCode&&(e.preventDefault(),h())}),window.Mousetrap.bind("esc",h),window.Mousetrap.bind("g m",s),"undefined"!=typeof localStorage.getItem("nightMode")){var M=!1;try{M=JSON.parse(localStorage.getItem("nightMode"))}catch(x){console.error("Error parsing value form local storage:","nightMode",x)}m(M),$(".nightMode-btn").on("click",function(){p()})}else localStorage.setItem("nightMode","false"),m("false");window.Mousetrap.bind("g t n",p),window.Mousetrap.bind("g n n",function(){window.location="/challenges/next-challenge"}),window.Mousetrap.bind("g n a",function(){window.location="/account"}),window.Mousetrap.bind("g n m",function(){window.location="/map"}),window.Mousetrap.bind("g n w",function(){window.location="/wiki"}),window.Mousetrap.bind("g n a",function(){window.location="/about"}),window.Mousetrap.bind("g n s",function(){window.location="/shop"}),window.Mousetrap.bind("g n o",function(){window.location="/settings"}),window.Mousetrap.bind("g n r",function(){window.location="https://github.com/freecodecamp/freecodecamp/"}),function(){var e="__flyerId__";$.ajax({url:"/api/flyers/findOne",method:"GET",dataType:"JSON",data:{filter:{order:"id DESC"}}}).fail(function(e){return console.error(e)}).done(function(a){var t=localStorage.getItem(e);a&&a.isActive&&t!==a.id&&($("#dismiss-bill").on("click",function(){localStorage.setItem(e,a.id)}),$("#bill-content").html(a.message),$("#bill-board").fadeIn())})}()});