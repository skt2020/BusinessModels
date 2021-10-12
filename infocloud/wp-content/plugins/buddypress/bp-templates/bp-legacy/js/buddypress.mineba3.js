var jq=jQuery,bp_ajax_request=null,newest_activities="",activity_last_recorded=0,directoryPreferences={};function bp_get_directory_preference(e,t){var i={filter:"",scope:"",extras:""};if(!directoryPreferences.hasOwnProperty(e)){var a,s={};for(a in i)i.hasOwnProperty(a)&&(s[a]=i[a]);directoryPreferences[e]=s}return BP_DTheme.store_filter_settings&&(directoryPreferences[e][t]=jq.cookie("bp-"+e+"-"+t)),directoryPreferences[e][t]}function bp_set_directory_preference(e,t,i){var a={filter:"",scope:"",extras:""};if(!directoryPreferences.hasOwnProperty(e)){var s,n={};for(s in a)a.hasOwnProperty(s)&&(n[s]=a[s]);directoryPreferences[e]=n}BP_DTheme.store_filter_settings&&jq.cookie("bp-"+e+"-"+t,i,{path:"/",secure:"https:"===window.location.protocol}),directoryPreferences[e][t]=i}function bp_init_activity(){var e=bp_get_directory_preference("activity","scope"),t=bp_get_directory_preference("activity","filter");void 0!==t&&jq("#activity-filter-select").length&&jq('#activity-filter-select select option[value="'+t+'"]').prop("selected",!0),void 0!==e&&jq(".activity-type-tabs").length&&(jq(".activity-type-tabs li").each(function(){jq(this).removeClass("selected")}),jq("#activity-"+e+", .item-list-tabs li.current").addClass("selected"))}function bp_init_objects(a){jq(a).each(function(e){var t=bp_get_directory_preference(a[e],"scope"),i=bp_get_directory_preference(a[e],"filter");void 0!==i&&jq("#"+a[e]+"-order-select select").length&&jq("#"+a[e]+'-order-select select option[value="'+i+'"]').prop("selected",!0),void 0!==t&&jq("div."+a[e]).length&&(jq(".item-list-tabs li").each(function(){jq(this).removeClass("selected")}),jq("#"+a[e]+"-"+t+", #object-nav li.current").addClass("selected"))})}function bp_filter_request(e,t,i,a,s,n,r,o,c){if("activity"===e)return!1;bp_set_directory_preference(e,"scope",i=null===i?"all":i),bp_set_directory_preference(e,"filter",t),bp_set_directory_preference(e,"extras",r),jq(".item-list-tabs li").each(function(){jq(this).removeClass("selected")}),jq("#"+e+"-"+i+", #object-nav li.current").addClass("selected"),jq(".item-list-tabs li.selected").addClass("loading"),jq('.item-list-tabs select option[value="'+t+'"]').prop("selected",!0),"friends"!==e&&"group_members"!==e||(e="members"),bp_ajax_request&&bp_ajax_request.abort();var l={};l["bp-"+e+"-filter"]=bp_get_directory_preference(e,"filter"),l["bp-"+e+"-scope"]=bp_get_directory_preference(e,"scope");l=encodeURIComponent(jq.param(l));bp_ajax_request=jq.post(ajaxurl,{action:e+"_filter",cookie:l,object:e,filter:t,search_terms:s,scope:i,page:n,extras:r,template:c},function(e){var t;"pag-bottom"===o&&jq("#subnav").length?(t=jq("#subnav").parent(),jq("html,body").animate({scrollTop:t.offset().top},"slow",function(){jq(a).fadeOut(100,function(){jq(this).html(e),jq(this).fadeIn(100)})})):jq(a).fadeOut(100,function(){jq(this).html(e),jq(this).fadeIn(100)}),jq(".item-list-tabs li.selected").removeClass("loading")})}function bp_activity_request(e,t){bp_set_directory_preference("activity","scope",e),bp_set_directory_preference("activity","filter",t),jq(".item-list-tabs li").each(function(){jq(this).removeClass("selected loading")}),jq("#activity-"+e+", .item-list-tabs li.current").addClass("selected"),jq("#object-nav.item-list-tabs li.selected, div.activity-type-tabs li.selected").addClass("loading"),jq('#activity-filter-select select option[value="'+t+'"]').prop("selected",!0),jq(".widget_bp_activity_widget h2 span.ajax-loader").show(),bp_ajax_request&&bp_ajax_request.abort();var i={"bp-activity-filter":bp_get_directory_preference("activity","filter"),"bp-activity-scope":bp_get_directory_preference("activity","scope")},i=encodeURIComponent(jq.param(i));bp_ajax_request=jq.post(ajaxurl,{action:"activity_widget_filter",cookie:i,_wpnonce_activity_filter:jq("#_wpnonce_activity_filter").val(),scope:e,filter:t},function(e){jq(".widget_bp_activity_widget h2 span.ajax-loader").hide(),jq("div.activity").fadeOut(100,function(){jq(this).html(e.contents),jq(this).fadeIn(100),bp_legacy_theme_hide_comments()}),void 0!==e.feed_url&&jq(".directory #subnav li.feed a, .home-page #subnav li.feed a").attr("href",e.feed_url),jq(".item-list-tabs li.selected").removeClass("loading")},"json")}function bp_legacy_theme_hide_comments(){var t,i,a,e=jq("div.activity-comments");if(!e.length)return!1;e.each(function(){jq(this).children("ul").children("li").length<5||(comments_div=jq(this),t=comments_div.parents("#activity-stream > li"),i=jq(this).children("ul").children("li"),a=" ",jq("#"+t.attr("id")+" li").length&&(a=jq("#"+t.attr("id")+" li").length),i.each(function(e){e<i.length-5&&(jq(this).hide(),e||jq(this).before('<li class="show-all"><a href="#'+t.attr("id")+'/show-all/">'+BP_DTheme.show_x_comments.replace("%d",a)+"</a></li>"))}))})}function checkAll(){for(var e=document.getElementsByTagName("input"),t=0;t<e.length;t++)"checkbox"===e[t].type&&(""===$("check_all").checked?e[t].checked="":e[t].checked="checked")}function clear(e){if(e=document.getElementById(e)){var t=e.getElementsByTagName("INPUT"),i=e.getElementsByTagName("OPTION"),a=0;if(t)for(a=0;a<t.length;a++)t[a].checked="";if(i)for(a=0;a<i.length;a++)i[a].selected=!1}}function bp_get_cookies(){for(var e,t,i,a=document.cookie.split(";"),s={},n=0;n<a.length;n++)i=(e=a[n]).indexOf("="),t=jq.trim(unescape(e.slice(0,i))),i=unescape(e.slice(i+1)),0===t.indexOf("bp-")&&(s[t]=i);return encodeURIComponent(jq.param(s))}function bp_get_query_var(e,t){var i={};return(t=(void 0===t?location.search.substr(1):t.split("?")[1]).split("&")).forEach(function(e){i[e.split("=")[0]]=e.split("=")[1]&&decodeURIComponent(e.split("=")[1])}),!(!i.hasOwnProperty(e)||null==i[e])&&i[e]}jq(function(){var l=1;bp_init_activity();var e,i=jq("#whats-new");bp_init_objects(["members","groups","blogs","group_members"]),i.length&&bp_get_querystring("r")?(e=i.val(),jq("#whats-new-options").slideDown(),i.animate({height:"3.8em"}),jq.scrollTo(i,500,{offset:-125,easing:"swing"}),i.val("").trigger("focus").val(e)):jq("#whats-new-options").hide(),i.on("focus",function(){jq("#whats-new-options").slideDown(),jq(this).animate({height:"3.8em"}),jq("#aw-whats-new-submit").prop("disabled",!1),jq(this).parent().addClass("active"),jq("#whats-new-content").addClass("active");var e=jq("form#whats-new-form"),t=jq("#activity-all");e.hasClass("submitted")&&e.removeClass("submitted"),t.length&&(t.hasClass("selected")?"-1"!==jq("#activity-filter-select select").val()&&(jq("#activity-filter-select select").val("-1"),jq("#activity-filter-select select").trigger("change")):(jq("#activity-filter-select select").val("-1"),t.children("a").trigger("click")))}),jq("#whats-new-form").on("focusout",function(e){var t=jq(this);setTimeout(function(){t.find(":hover").length||""===i.val()&&(i.animate({height:"2.2em"}),jq("#whats-new-options").slideUp(),jq("#aw-whats-new-submit").prop("disabled",!0),jq("#whats-new-content").removeClass("active"),i.parent().removeClass("active"))},0)}),jq("#aw-whats-new-submit").on("click",function(){var a=0,e=jq(this),s=e.closest("form#whats-new-form"),i={};return jq.each(s.serializeArray(),function(e,t){"_"!==t.name.substr(0,1)&&"whats-new"!==t.name.substr(0,9)&&(i[t.name]?Array.isArray(i[t.name])?i[t.name].push(t.value):i[t.name]=new Array(i[t.name],t.value):i[t.name]=t.value)}),s.find("*").each(function(e,t){"textarea"!==t.nodeName.toLowerCase()&&"input"!==t.nodeName.toLowerCase()||jq(t).prop("disabled",!0)}),jq("div.error").remove(),e.addClass("loading"),e.prop("disabled",!0),s.addClass("submitted"),object="",item_id=jq("#whats-new-post-in").val(),content=jq("#whats-new").val(),firstrow=jq("#buddypress ul.activity-list li").first(),activity_row=firstrow,timestamp=null,firstrow.length&&(activity_row.hasClass("load-newest")&&(activity_row=firstrow.next()),timestamp=activity_row.prop("class").match(/date-recorded-([0-9]+)/)),timestamp&&(a=timestamp[1]),0<item_id&&(object=jq("#whats-new-post-object").val()),e=jq.extend({action:"post_update",cookie:bp_get_cookies(),_wpnonce_post_update:jq("#_wpnonce_post_update").val(),content:content,object:object,item_id:item_id,since:a,_bp_as_nonce:jq("#_bp_as_nonce").val()||""},i),jq.post(ajaxurl,e,function(e){var t,i;s.find("*").each(function(e,t){"textarea"!==t.nodeName.toLowerCase()&&"input"!==t.nodeName.toLowerCase()||jq(t).prop("disabled",!1)}),e[0]+e[1]==="-1"?(s.prepend(e.substr(2,e.length)),jq("#"+s.attr("id")+" div.error").hide().fadeIn(200)):(0===jq("ul.activity-list").length&&(jq("div.error").slideUp(100).remove(),jq("#message").slideUp(100).remove(),jq("div.activity").append('<ul id="activity-stream" class="activity-list item-list">')),firstrow.hasClass("load-newest")&&firstrow.remove(),jq("#activity-stream").prepend(e),a||jq("#activity-stream li:first").addClass("new-update just-posted"),0!==jq("#latest-update").length&&(t=jq("#activity-stream li.new-update .activity-content .activity-inner p").html(),e=jq("#activity-stream li.new-update .activity-content .activity-header p a.view").attr("href"),i=""!==jq("#activity-stream li.new-update .activity-content .activity-inner p").text()?t+" ":"",i+='<a href="'+e+'" rel="nofollow">'+BP_DTheme.view+"</a>",jq("#latest-update").slideUp(300,function(){jq("#latest-update").html(i),jq("#latest-update").slideDown(300)})),jq("li.new-update").hide().slideDown(300),jq("li.new-update").removeClass("new-update"),jq("#whats-new").val(""),s.get(0).reset(),newest_activities="",activity_last_recorded=0),jq("#whats-new-options").slideUp(),jq("#whats-new-form textarea").animate({height:"2.2em"}),jq("#aw-whats-new-submit").prop("disabled",!0).removeClass("loading"),jq("#whats-new-content").removeClass("active")}),!1}),jq("div.activity-type-tabs").on("click",function(e){var t,i=jq(e.target).parent();if("STRONG"===e.target.nodeName||"SPAN"===e.target.nodeName)i=i.parent();else if("A"!==e.target.nodeName)return!1;return t=i.attr("id").substr(9,i.attr("id").length),e=jq("#activity-filter-select select").val(),"mentions"===t&&jq("#"+i.attr("id")+" a strong").remove(),bp_activity_request(t,e),!1}),jq("#activity-filter-select select").on("change",function(){var e=jq("div.activity-type-tabs li.selected"),t=jq(this).val(),e=e.length?e.attr("id").substr(9,e.attr("id").length):null;return bp_activity_request(e,t),!1}),jq("div.activity").on("click",function(e){var t,i,a,s,n,r,o,c=jq(e.target);return c.hasClass("fav")||c.hasClass("unfav")?(c.hasClass("loading")||(t=c.hasClass("fav")?"fav":"unfav",a=(s=c.closest(".activity-item")).attr("id").substr(9,s.attr("id").length),s=bp_get_query_var("_wpnonce",c.attr("href")),c.addClass("loading"),jq.post(ajaxurl,{action:"activity_mark_"+t,cookie:bp_get_cookies(),id:a,nonce:s},function(e){c.removeClass("loading"),c.fadeOut(200,function(){jq(this).html(e),jq(this).attr("title","fav"==t?BP_DTheme.remove_fav:BP_DTheme.mark_as_fav),jq(this).fadeIn(200)}),"fav"==t?(jq(".item-list-tabs #activity-favs-personal-li").length||(jq(".item-list-tabs #activity-favorites").length||jq(".item-list-tabs ul #activity-mentions").before('<li id="activity-favorites"><a href="#">'+BP_DTheme.my_favs+" <span>0</span></a></li>"),jq(".item-list-tabs ul #activity-favorites span").html(Number(jq(".item-list-tabs ul #activity-favorites span").html())+1)),c.removeClass("fav"),c.addClass("unfav")):(c.removeClass("unfav"),c.addClass("fav"),jq(".item-list-tabs ul #activity-favorites span").html(Number(jq(".item-list-tabs ul #activity-favorites span").html())-1),Number(jq(".item-list-tabs ul #activity-favorites span").html())||(jq(".item-list-tabs ul #activity-favorites").hasClass("selected")&&bp_activity_request(null,null),jq(".item-list-tabs ul #activity-favorites").remove())),"activity-favorites"===jq(".item-list-tabs li.selected").attr("id")&&c.closest(".activity-item").slideUp(100)})),!1):c.hasClass("delete-activity")?(a=(i=c.parents("div.activity ul li")).attr("id").substr(9,i.attr("id").length),s=c.attr("href").split("_wpnonce="),n=i.prop("class").match(/date-recorded-([0-9]+)/),s=s[1],c.addClass("loading"),jq.post(ajaxurl,{action:"delete_activity",cookie:bp_get_cookies(),id:a,_wpnonce:s},function(e){e[0]+e[1]==="-1"?(i.prepend(e.substr(2,e.length)),i.children("#message").hide().fadeIn(300)):(i.slideUp(300),n&&activity_last_recorded===n[1]&&(newest_activities="",activity_last_recorded=0))}),!1):c.hasClass("spam-activity")?(i=c.parents("div.activity ul li"),n=i.prop("class").match(/date-recorded-([0-9]+)/),c.addClass("loading"),jq.post(ajaxurl,{action:"bp_spam_activity",cookie:encodeURIComponent(document.cookie),id:i.attr("id").substr(9,i.attr("id").length),_wpnonce:c.attr("href").split("_wpnonce=")[1]},function(e){e[0]+e[1]==="-1"?(i.prepend(e.substr(2,e.length)),i.children("#message").hide().fadeIn(300)):(i.slideUp(300),n&&activity_last_recorded===n[1]&&(newest_activities="",activity_last_recorded=0))}),!1):c.parent().hasClass("load-more")?(bp_ajax_request&&bp_ajax_request.abort(),jq("#buddypress li.load-more").addClass("loading"),r=l+1,o=[],jq(".activity-list li.just-posted").each(function(){o.push(jq(this).attr("id").replace("activity-",""))}),load_more_args={action:"activity_get_older_updates",cookie:bp_get_cookies(),page:r,exclude_just_posted:o.join(",")},load_more_search=bp_get_querystring("s"),load_more_search&&(load_more_args.search_terms=load_more_search),bp_ajax_request=jq.post(ajaxurl,load_more_args,function(e){jq("#buddypress li.load-more").removeClass("loading"),l=r,jq("#buddypress ul.activity-list").append(e.contents),c.parent().hide()},"json"),!1):void(c.parent().hasClass("load-newest")&&(e.preventDefault(),c.parent().hide(),activity_html=jq.parseHTML(newest_activities),jq.each(activity_html,function(e,t){"LI"===t.nodeName&&jq(t).hasClass("just-posted")&&jq("#"+jq(t).attr("id")).length&&jq("#"+jq(t).attr("id")).remove()}),jq("#buddypress ul.activity-list").prepend(newest_activities),newest_activities=""))}),jq("div.activity").on("click",".activity-read-more a",function(e){var t=jq(e.target),i=t.parent().attr("id").split("-"),e=i[3],i=i[0],a=jq("#"+i+"-"+e+" ."+("acomment"===i?"acomment-content":"activity-inner")+":first");return jq(t).addClass("loading"),jq.post(ajaxurl,{action:"get_single_activity_content",activity_id:e},function(e){jq(a).slideUp(300).html(e).slideDown(300)}),!1}),jq("form.ac-form").hide(),jq(".activity-comments").length&&bp_legacy_theme_hide_comments(),jq("div.activity").on("click",function(e){var t,a,s,i,n,r,o,c,l,d,p=jq(e.target);return p.hasClass("acomment-reply")||p.parent().hasClass("acomment-reply")?(t=(n=(p=p.parent().hasClass("acomment-reply")?p.parent():p).attr("id").split("-"))[2],e=p.attr("href").substr(10,p.attr("href").length),(a=jq("#ac-form-"+t)).css("display","none"),a.removeClass("root"),jq(".ac-form").hide(),a.children("div").each(function(){jq(this).hasClass("error")&&jq(this).hide()}),("comment"!==n[1]?jq("#acomment-"+e):jq("#activity-"+t+" .activity-comments")).append(a),a.parent().hasClass("activity-comments")&&a.addClass("root"),a.slideDown(200),jq.scrollTo(a,500,{offset:-100,easing:"swing"}),jq("#ac-form-"+n[2]+" textarea").trigger("focus"),!1):"ac_form_submit"===p.attr("name")?(n=(a=p.parents("form")).parent(),s=a.attr("id").split("-"),i=n.hasClass("activity-comments")?s[2]:n.attr("id").split("-")[1],content=jq("#"+a.attr("id")+" textarea"),jq("#"+a.attr("id")+" div.error").hide(),p.addClass("loading").prop("disabled",!0),content.addClass("loading").prop("disabled",!0),d={action:"new_activity_comment",cookie:bp_get_cookies(),_wpnonce_new_activity_comment:jq("#_wpnonce_new_activity_comment_"+s[2]).val(),comment_id:i,form_id:s[2],content:content.val()},(n=jq("#_bp_as_nonce_"+i).val())&&(d["_bp_as_nonce_"+i]=n),jq.post(ajaxurl,d,function(t){var i;p.removeClass("loading"),content.removeClass("loading"),t[0]+t[1]==="-1"?a.append(jq(t.substr(2,t.length)).hide().fadeIn(200)):(i=a.parent(),a.fadeOut(200,function(){0===i.children("ul").length&&(i.hasClass("activity-comments")?i.prepend("<ul></ul>"):i.append("<ul></ul>"));var e=jq.trim(t);i.children("ul").append(jq(e).hide().fadeIn(200)),a.children("textarea").val(""),i.parent().addClass("has-comments")}),jq("#"+a.attr("id")+" textarea").val(""),o=Number(jq("#activity-"+s[2]+" a.acomment-reply span").html())+1,jq("#activity-"+s[2]+" a.acomment-reply span").html(o),(r=i.parents(".activity-comments").find(".show-all a"))&&r.html(BP_DTheme.show_x_comments.replace("%d",o))),jq(p).prop("disabled",!1),jq(content).prop("disabled",!1)}),!1):p.hasClass("acomment-delete")?(c=p.attr("href"),l=p.parent().parent(),a=l.parents("div.activity-comments").children("form"),d=(d=c.split("_wpnonce="))[1],i=(i=(i=c.split("cid="))[1].split("&"))[0],p.addClass("loading"),jq(".activity-comments ul .error").remove(),l.parents(".activity-comments").append(a),jq.post(ajaxurl,{action:"delete_activity_comment",cookie:bp_get_cookies(),_wpnonce:d,id:i},function(e){var t,i;e[0]+e[1]==="-1"?l.prepend(jq(e.substr(2,e.length)).hide().fadeIn(200)):(i=jq("#"+l.attr("id")+" ul").children("li"),t=0,jq(i).each(function(){jq(this).is(":hidden")||t++}),l.fadeOut(200,function(){l.remove()}),i=(e=jq("#"+l.parents("#activity-stream > li").attr("id")+" a.acomment-reply span")).html()-(1+t),e.html(i),(e=l.parents(".activity-comments").find(".show-all a"))&&e.html(BP_DTheme.show_x_comments.replace("%d",i)),0==i&&jq(l.parents("#activity-stream > li")).removeClass("has-comments"))}),!1):p.hasClass("spam-activity-comment")?(c=p.attr("href"),l=p.parent().parent(),p.addClass("loading"),jq(".activity-comments ul div.error").remove(),l.parents(".activity-comments").append(l.parents(".activity-comments").children("form")),jq.post(ajaxurl,{action:"bp_spam_activity_comment",cookie:encodeURIComponent(document.cookie),_wpnonce:c.split("_wpnonce=")[1],id:c.split("cid=")[1].split("&")[0]},function(e){var t;e[0]+e[1]==="-1"?l.prepend(jq(e.substr(2,e.length)).hide().fadeIn(200)):(e=jq("#"+l.attr("id")+" ul").children("li"),t=0,jq(e).each(function(){jq(this).is(":hidden")||t++}),l.fadeOut(200),e=l.parents("#activity-stream > li"),jq("#"+e.attr("id")+" a.acomment-reply span").html(jq("#"+e.attr("id")+" a.acomment-reply span").html()-(1+t)))}),!1):p.parent().hasClass("show-all")?(p.parent().addClass("loading"),setTimeout(function(){p.parent().parent().children("li").fadeIn(200,function(){p.parent().remove()})},600),!1):p.hasClass("ac-reply-cancel")?(jq(p).closest(".ac-form").slideUp(200),!1):void 0}),jq(document).on("keydown",function(e){(e=e||window.event).target?element=e.target:e.srcElement&&(element=e.srcElement),3===element.nodeType&&(element=element.parentNode),!0!==e.ctrlKey&&!0!==e.altKey&&!0!==e.metaKey&&27===(e.keyCode||e.which)&&"TEXTAREA"===element.tagName&&jq(element).hasClass("ac-input")&&jq(element).parent().parent().parent().slideUp(200)}),jq(".dir-search, .groups-members-search").on("click",function(e){if(!jq(this).hasClass("no-ajax")){var t,i,a=jq(e.target);if("submit"===a.attr("type")){t=jq(".item-list-tabs li.selected").attr("id").split("-")[0],i=null,a=a.parent().find("#"+t+"_search").val(),"groups-members-search"===e.currentTarget.className&&(t="group_members",i="groups/single/members");e=bp_get_directory_preference(t,"scope");return bp_filter_request(t,bp_get_directory_preference(t,"filter"),e,"div."+t,a,1,bp_get_directory_preference(t,"extras"),null,i),!1}}}),jq("div.item-list-tabs").on("click",function(e){if(jq("body").hasClass("type")&&jq("body").hasClass("directory")&&jq(this).addClass("no-ajax"),!jq(this).hasClass("no-ajax")&&!jq(e.target).hasClass("no-ajax")){var t="SPAN"===e.target.nodeName?e.target.parentNode:e.target,e=jq(t).parent();if("LI"===e[0].nodeName&&!e.hasClass("last")){if("activity"===(e=(t=e.attr("id").split("-"))[0]))return!1;t=t[1];return bp_filter_request(e,jq("#"+e+"-order-select select").val(),t,"div."+e,jq("#"+e+"_search").val(),1,bp_get_directory_preference(e,"extras")),!1}}}),jq("li.filter select").on("change",function(){var e=jq(".item-list-tabs li.selected").length?jq(".item-list-tabs li.selected"):jq(this),t=e.attr("id").split("-"),i=t[0],a=t[1],s=jq(this).val(),n=!1,e=null;return jq(".dir-search input").length&&(n=jq(".dir-search input").val()),(t=jq(".groups-members-search input")).length&&(n=t.val(),i="members",a="groups"),"members"===i&&"groups"===a&&(i="group_members",e="groups/single/members"),bp_filter_request(i="friends"===i?"members":i,s,a,"div."+i,n,1,bp_get_directory_preference(i,"extras"),null,e),!1}),jq("#buddypress").on("click",function(e){var t,i,a,s=jq(e.target);if(s.hasClass("button"))return!0;if(s.parent().parent().hasClass("pagination")&&!s.parent().parent().hasClass("no-ajax")){if(s.hasClass("dots")||s.hasClass("current"))return!1;t=(n=(jq(".item-list-tabs li.selected").length?jq(".item-list-tabs li.selected"):jq("li.filter select")).attr("id").split("-"))[0],i=!1,r=jq(s).closest(".pagination-links").attr("id"),a=null,jq("div.dir-search input").length&&(i=!(i=jq(".dir-search input")).val()&&bp_get_querystring(i.attr("name"))?jq(".dir-search input").prop("placeholder"):i.val()),e=(jq(s).hasClass("next")||jq(s).hasClass("prev")?jq(".pagination span.current"):jq(s)).html(),e=Number(e.replace(/\D/g,"")),jq(s).hasClass("next")?e++:jq(s).hasClass("prev")&&e--,(s=jq(".groups-members-search input")).length&&(i=s.val(),t="members"),"members"===t&&"groups"===n[1]&&(t="group_members",a="groups/single/members"),"admin"===t&&jq("body").hasClass("membership-requests")&&(t="requests");var n=-1!==r.indexOf("pag-bottom")?"pag-bottom":null,r=bp_get_directory_preference(t,"scope");return bp_filter_request(t,bp_get_directory_preference(t,"filter"),r,"div."+t,i,e,bp_get_directory_preference(t,"extras"),n,a),!1}}),jq("#send-invite-form").on("click","#invite-list input",function(){var t,i,a=jq("#send-invite-form > .invite").length;jq(".ajax-loader").toggle(),a&&jq(this).parents("ul").find("input").prop("disabled",!0),t=jq(this).val(),i=!0===jq(this).prop("checked")?"invite":"uninvite",a||jq(".item-list-tabs li.selected").addClass("loading"),jq.post(ajaxurl,{action:"groups_invite_user",friend_action:i,cookie:bp_get_cookies(),_wpnonce:jq("#_wpnonce_invite_uninvite_user").val(),friend_id:t,group_id:jq("#group_id").val()},function(e){jq("#message")&&jq("#message").hide(),a?bp_filter_request("invite","bp-invite-filter","bp-invite-scope","div.invite",!1,1,"","",""):(jq(".ajax-loader").toggle(),"invite"===i?jq("#friend-list").append(e):"uninvite"===i&&jq("#friend-list li#uid-"+t).remove(),jq(".item-list-tabs li.selected").removeClass("loading"))})}),jq("#send-invite-form").on("click","a.remove",function(){var e=jq("#send-invite-form > .invite").length,t=jq(this).attr("id");return jq(".ajax-loader").toggle(),t=(t=t.split("-"))[1],jq.post(ajaxurl,{action:"groups_invite_user",friend_action:"uninvite",cookie:bp_get_cookies(),_wpnonce:jq("#_wpnonce_invite_uninvite_user").val(),friend_id:t,group_id:jq("#group_id").val()},function(){e?bp_filter_request("invite","bp-invite-filter","bp-invite-scope","div.invite",!1,1,"","",""):(jq(".ajax-loader").toggle(),jq("#friend-list #uid-"+t).remove(),jq("#invite-list #f-"+t).prop("checked",!1))}),!1}),jq(".visibility-toggle-link").on("click",function(e){e.preventDefault(),jq(this).attr("aria-expanded","true").parent().hide().addClass("field-visibility-settings-hide").siblings(".field-visibility-settings").show().addClass("field-visibility-settings-open")}),jq(".field-visibility-settings-close").on("click",function(e){e.preventDefault(),jq(".visibility-toggle-link").attr("aria-expanded","false");var t=jq(this).parent(),e=t.find("input:checked").parent().text();t.hide().removeClass("field-visibility-settings-open").siblings(".field-visibility-settings-toggle").find(".current-visibility-level").text(e).end().show().removeClass("field-visibility-settings-hide")}),jq("#profile-edit-form input:not(:submit), #profile-edit-form textarea, #profile-edit-form select, #signup_form input:not(:submit), #signup_form textarea, #signup_form select").on("change",function(){var t=!0;jq("#profile-edit-form input:submit, #signup_form input:submit").on("click",function(){t=!1}),window.onbeforeunload=function(e){if(t)return BP_DTheme.unsaved_changes}}),jq("#friend-list a.accept, #friend-list a.reject").on("click",function(){var e,t=jq(this),i=jq(this).parents("#friend-list li"),a=jq(this).parents("li div.action"),s=i.attr("id").substr(11,i.attr("id").length),n=t.attr("href").split("_wpnonce=")[1];return jq(this).hasClass("accepted")||jq(this).hasClass("rejected")||(jq(this).hasClass("accept")?(e="accept_friendship",a.children("a.reject").css("visibility","hidden")):(e="reject_friendship",a.children("a.accept").css("visibility","hidden")),t.addClass("loading"),jq.post(ajaxurl,{action:e,cookie:bp_get_cookies(),id:s,_wpnonce:n},function(e){t.removeClass("loading"),e[0]+e[1]==="-1"?(i.prepend(e.substr(2,e.length)),i.children("#message").hide().fadeIn(200)):t.fadeOut(100,function(){jq(this).hasClass("accept")?(a.children("a.reject").hide(),jq(this).html(BP_DTheme.accepted).contents().unwrap()):(a.children("a.accept").hide(),jq(this).html(BP_DTheme.rejected).contents().unwrap())})})),!1}),jq("#members-dir-list, #members-group-list, #item-header").on("click",".friendship-button a",function(){jq(this).parent().addClass("loading");var e=jq(this).attr("id"),t=jq(this).attr("href"),i=jq(this);return e=(e=e.split("-"))[1],t=(t=(t=t.split("?_wpnonce="))[1].split("&"))[0],jq.post(ajaxurl,{action:"addremove_friend",cookie:bp_get_cookies(),fid:e,_wpnonce:t},function(e){var t=i.attr("rel");parentdiv=i.parent(),"add"===t?jq(parentdiv).fadeOut(200,function(){parentdiv.removeClass("add_friend"),parentdiv.removeClass("loading"),parentdiv.addClass("pending_friend"),parentdiv.fadeIn(200).html(e)}):"remove"===t&&jq(parentdiv).fadeOut(200,function(){parentdiv.removeClass("remove_friend"),parentdiv.removeClass("loading"),parentdiv.addClass("add"),parentdiv.fadeIn(200).html(e)})}),!1}),jq("#buddypress").on("click",".group-button .leave-group",function(){if(!1===confirm(BP_DTheme.leave_group_confirm))return!1}),jq("#groups-dir-list").on("click",".group-button a",function(){var e=jq(this).parent().attr("id"),t=jq(this).attr("href"),s=jq(this);return e=(e=e.split("-"))[1],t=(t=(t=t.split("?_wpnonce="))[1].split("&"))[0],s.hasClass("leave-group")&&!1===confirm(BP_DTheme.leave_group_confirm)||jq.post(ajaxurl,{action:"joinleave_group",cookie:bp_get_cookies(),gid:e,_wpnonce:t},function(i){var a=s.parent();jq("body.directory").length?jq(a).fadeOut(200,function(){a.fadeIn(200).html(i);var e=jq("#groups-personal span"),t=1;s.hasClass("leave-group")?(a.hasClass("hidden")&&a.closest("li").slideUp(200),t=0):s.hasClass("request-membership")&&(t=!1),e.length&&!1!==t&&(t?e.text(1+(e.text()>>0)):e.text((e.text()>>0)-1))}):window.location.reload()}),!1}),jq("#groups-list li.hidden").each(function(){"none"===jq(this).css("display")&&jq(this).css("cssText","display: list-item !important")}),jq("#buddypress").on("click",".pending",function(){return!1}),jq("body").hasClass("register")&&((e=jq("#signup_with_blog")).prop("checked")||jq("#blog-details").toggle(),e.on("change",function(){jq("#blog-details").toggle()})),jq(".message-search").on("click",function(e){if(!jq(this).hasClass("no-ajax")){var t=jq(e.target);if("submit"===t.attr("type")||"button"===t.attr("type")){var i,a=bp_get_directory_preference(i="messages","scope"),e=bp_get_directory_preference(i,"filter"),t=bp_get_directory_preference(i,"extras");return bp_filter_request(i,e,a,"div."+i,jq("#messages_search").val(),1,t),!1}}}),jq("#send_reply_button").on("click",function(){var t=jq("#messages_order").val()||"ASC",i=jq("#message-recipients").offset(),a=jq("#send_reply_button");return jq(a).addClass("loading").prop("disabled",!0),jq.post(ajaxurl,{action:"messages_send_reply",cookie:bp_get_cookies(),_wpnonce:jq("#send_message_nonce").val(),content:jq("#message_content").val(),send_to:jq("#send_to").val(),subject:jq("#subject").val(),thread_id:jq("#thread_id").val()},function(e){e[0]+e[1]==="-1"?jq("#send-reply").prepend(e.substr(2,e.length)):(jq("#send-reply #message").remove(),jq("#message_content").val(""),"ASC"===t?jq("#send-reply").before(e):(jq("#message-recipients").after(e),jq(window).scrollTop(i.top)),jq(".new-message").hide().slideDown(200,function(){jq(".new-message").removeClass("new-message")})),jq(a).removeClass("loading").prop("disabled",!1)}),!1}),jq("body.messages #item-body div.messages").on("change","#message-type-select",function(){var e=this.value,t=jq('td input[type="checkbox"]'),i="checked";switch(t.each(function(e){t[e].checked=""}),e){case"unread":t=jq('tr.unread td input[type="checkbox"]');break;case"read":t=jq('tr.read td input[type="checkbox"]');break;case"":i=""}t.each(function(e){t[e].checked=i})}),jq("#select-all-messages").on("click",function(){this.checked?jq(".message-check").each(function(){this.checked=!0}):jq(".message-check").each(function(){this.checked=!1})}),jq("#messages-bulk-manage").attr("disabled","disabled"),jq("#messages-select").on("change",function(){jq("#messages-bulk-manage").attr("disabled",jq(this).val().length<=0)}),starAction=function(){var t=jq(this);return jq.post(ajaxurl,{action:"messages_star",message_id:t.data("message-id"),star_status:t.data("star-status"),nonce:t.data("star-nonce"),bulk:t.data("star-bulk")},function(e){1===parseInt(e,10)&&("unstar"===t.data("star-status")?(t.data("star-status","star"),t.removeClass("message-action-unstar").addClass("message-action-star"),t.find(".bp-screen-reader-text").text(BP_PM_Star.strings.text_star),1===BP_PM_Star.is_single_thread?t.attr("data-bp-tooltip",BP_PM_Star.strings.title_star):t.attr("data-bp-tooltip",BP_PM_Star.strings.title_star_thread)):(t.data("star-status","unstar"),t.removeClass("message-action-star").addClass("message-action-unstar"),t.find(".bp-screen-reader-text").text(BP_PM_Star.strings.text_unstar),1===BP_PM_Star.is_single_thread?t.attr("data-bp-tooltip",BP_PM_Star.strings.title_unstar):t.attr("data-bp-tooltip",BP_PM_Star.strings.title_unstar_thread)))}),!1},jq("#message-threads").on("click","td.thread-star a",starAction),jq("#message-thread").on("click",".message-star-actions a",starAction),jq("#message-threads td.bulk-select-check :checkbox").on("change",function(){var e=jq(this),t=e.closest("tr").find(".thread-star a");e.prop("checked")?"unstar"===t.data("star-status")?BP_PM_Star.star_counter++:BP_PM_Star.unstar_counter++:"unstar"===t.data("star-status")?BP_PM_Star.star_counter--:BP_PM_Star.unstar_counter--,0<BP_PM_Star.star_counter&&0===parseInt(BP_PM_Star.unstar_counter,10)?jq('option[value="star"]').hide():jq('option[value="star"]').show(),0<BP_PM_Star.unstar_counter&&0===parseInt(BP_PM_Star.star_counter,10)?jq('option[value="unstar"]').hide():jq('option[value="unstar"]').show()}),jq("#select-all-notifications").on("click",function(){this.checked?jq(".notification-check").each(function(){this.checked=!0}):jq(".notification-check").each(function(){this.checked=!1})}),jq("#notification-bulk-manage").attr("disabled","disabled"),jq("#notification-select").on("change",function(){jq("#notification-bulk-manage").attr("disabled",jq(this).val().length<=0)}),jq("#select-all-invitations").on("click",function(){this.checked?jq(".invitation-check").each(function(){this.checked=!0}):jq(".invitation-check").each(function(){this.checked=!1})}),jq("#invitation-bulk-manage").attr("disabled","disabled"),jq("#invitation-select").on("change",function(){jq("#invitation-bulk-manage").attr("disabled",jq(this).val().length<=0)}),jq("#close-notice").on("click",function(){return jq(this).addClass("loading"),jq("#sidebar div.error").remove(),jq.post(ajaxurl,{action:"messages_close_notice",notice_id:jq(".notice").attr("rel").substr(2,jq(".notice").attr("rel").length),nonce:jq("#close-notice-nonce").val()},function(e){jq("#close-notice").removeClass("loading"),e[0]+e[1]==="-1"?(jq(".notice").prepend(e.substr(2,e.length)),jq("#sidebar div.error").hide().fadeIn(200)):jq(".notice").slideUp(100)}),!1}),jq("#wp-admin-bar ul.main-nav li, #nav li").on("mouseover",function(){jq(this).addClass("sfhover")}),jq("#wp-admin-bar ul.main-nav li, #nav li").on("mouseout",function(){jq(this).removeClass("sfhover")}),jq("#wp-admin-bar-logout, a.logout").on("click",function(){jq.removeCookie("bp-activity-scope",{path:"/",secure:"https:"===window.location.protocol}),jq.removeCookie("bp-activity-filter",{path:"/",secure:"https:"===window.location.protocol}),jq.removeCookie("bp-activity-oldestpage",{path:"/",secure:"https:"===window.location.protocol});var t=["members","groups","blogs","forums"];jq(t).each(function(e){jq.removeCookie("bp-"+t[e]+"-scope",{path:"/",secure:"https:"===window.location.protocol}),jq.removeCookie("bp-"+t[e]+"-filter",{path:"/",secure:"https:"===window.location.protocol}),jq.removeCookie("bp-"+t[e]+"-extras",{path:"/",secure:"https:"===window.location.protocol})})}),jq("body").hasClass("no-js")&&jq("body").attr("class",jq("body").attr("class").replace(/no-js/,"js")),"undefined"!=typeof wp&&void 0!==wp.heartbeat&&void 0!==BP_DTheme.pulse&&(wp.heartbeat.interval(Number(BP_DTheme.pulse)),jq.fn.extend({"heartbeat-send":function(){return this.bind("heartbeat-send.buddypress")}}));var a=0;jq(document).on("heartbeat-send.buddypress",function(e,t){a=0,jq("#buddypress ul.activity-list li").first().prop("id")&&(timestamp=jq("#buddypress ul.activity-list li").first().prop("class").match(/date-recorded-([0-9]+)/),timestamp&&(a=timestamp[1])),(0===activity_last_recorded||Number(a)>activity_last_recorded)&&(activity_last_recorded=Number(a)),t.bp_activity_last_recorded=activity_last_recorded,last_recorded_search=bp_get_querystring("s"),last_recorded_search&&(t.bp_activity_last_recorded_search_terms=last_recorded_search)}),jq(document).on("heartbeat-tick",function(e,t){t.bp_activity_newest_activities&&(newest_activities=t.bp_activity_newest_activities.activities+newest_activities,activity_last_recorded=Number(t.bp_activity_newest_activities.last_recorded),jq("#buddypress ul.activity-list li").first().hasClass("load-newest")||jq("#buddypress ul.activity-list").prepend('<li class="load-newest"><a href="#newest">'+BP_DTheme.newest+"</a></li>"))})});