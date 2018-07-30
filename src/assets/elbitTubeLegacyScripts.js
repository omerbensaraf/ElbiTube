(function($) {

    "use strict";

    var themeix = {

        themeix_slider: function() {
            var slider_container = $(".slider-wrapper ul.slider");
            $.get(ghost.url.api("posts", {
                limit: slider_post_limit,
                filter: "featured:true"
            })).done(function(data) {
                var postsInfo = data.posts;
                if (postsInfo.length > 0) {
                    for (var i = 0; i < postsInfo.length; i++) {
                        var post_title = postsInfo[i].title;
                        var post_url = postsInfo[i].url;
                        var post_image = postsInfo[i].feature_image;
                        var post_content = postsInfo[i].html;
                        slider_container.append('<li><img src="' + post_image + '" alt="' + post_title + '"><span> <a href="' + post_url + '">' + post_title + '</a></span></li>');
                    }
                    slider_container.pgwSlider({
                        autoSlide: false
                    });
                }

            });
        },

        single_carousel: function() {

            var single_carousel_container = $(".video-carousel");
            $(".section-heading-one h3").append(carousel_slider_title);
            $.get(ghost.url.api("posts", {
                filter: "tag:" + carousel_slider_tag + "",
                limit: carousel_slider_limit
            })).done(function(data) {
                var postsInfo = data.posts;

                $(postsInfo).each(function(i, value) {
                    var post_title = value.title;
                    var post_url = value.url;
                    var post_image = value.feature_image;
                    var post_content = value.html;
                    var randomNumber = Math.floor(Math.random() * 2489);
                    var video_url = $(post_content).find("iframe").first().attr("src");

                    if( ( post_image === null ) || (post_image == "")){
                            var post_image = "/assets/images/default-img.png?" + randomNumber + "";
                       }

                    if (typeof video_url !== "undefined") {
                        var video_id = video_url.slice(-11);
                        var youtube_thumb = "http://i3.ytimg.com/vi/" + video_id + "/mqdefault.jpg?" + randomNumber + "";
                        single_carousel_container.append('<div class="single-video"><div class="video-img"><a href="' + post_url + '"><img src="' + youtube_thumb + '" alt="' + post_url + '" /></a><span class="video-duration">Video</span></div><div class="video-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4></div></div></div></div></div>');
                    } else {
       
                        single_carousel_container.prepend('<div class="single-video"><div class="video-img image-icon"><a href="' + post_url + '"><img src="' + post_image + '" alt="' + post_url + '" /></a><span class="video-duration">Image</span></div><div class="video-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4></div></div>');
                    }

                });


                owl_active();

                function owl_active() {
                    single_carousel_container.owlCarousel({
                        loop: true,
                        margin: 30,
                        nav: true,
                        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                        responsive: {

                            0: {

                                items: 1
                            },

                            480: {

                                items: 2
                            },

                            768: {

                                items: 3
                            },
                            992: {

                                items: 4
                            }
                        }

                    });
                }

            });

        },

        related_posts: function() {
            var related_posts_container = $(".related-posts-wrapper");
            $(".section-heading-two h3").append(cateogry_one_title);
            $.get(ghost.url.api("posts", {
                filter: "tag:" + cateogry_one_tag_name + "",
                limit: cateogry_one_post_limit,
                include: "author,tags"
            })).done(function(data) {
                var postsInfo = data.posts;

                postsInfo.forEach(function(e) { 
                    var post_title = e.title;
                    var post_url = e.url;
                    var post_image = e.feature_image;
                    var post_content = e.html;
                    // added coded ended here
                    var author_name = e.author.name;
                    var tag_name = e.tags[0].name;
                    var publish_date = themeix.timeAndDate(e.published_at);
                    var video_viewers = "0";
                    var video_like = "0";
                    var video_dislike = "0";
                    var video_url = $(post_content).find("iframe").first().attr("src");
                    var randomNumber = Math.floor(Math.random() * 879);
                    // Post Tittle Letter Limited
                    post_title = post_title.substring(0, 55);

                    if( ( post_image === null ) || (post_image == "")){
                           var post_image = "/assets/images/default-img.png?" + randomNumber + "";
                        }

                    if (typeof video_url !== "undefined") {
                        var video_id = video_url.slice(-11);
                        var youtube_thumb = "http://i3.ytimg.com/vi/" + video_id + "/mqdefault.jpg?" + randomNumber + "";

                        // using youtube API

                        var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=" + video_id + "&key=" + api_key + "";

                        $.get(url, function(value) {

                            var video_viewers = value.items[0].statistics.viewCount;
                            var video_like = value.items[0].statistics.likeCount;
                            var video_dislike = value.items[0].statistics.dislikeCount;
                            var video_duration = value.items[0].contentDetails.duration;
                            var timeD = video_duration;
                            var formattedTime = timeD.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");


                        related_posts_container.prepend('<div class="col-sm-6 col-md-3 themeix-half"><div class="single-video"><div class="video-img"> <a href="' + post_url + '"><img src="' + youtube_thumb + '" alt="' + post_title + '"></a> <span class="video-duration">' + formattedTime + '</span></div><div class="video-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4><div class="video-counter"><div class="video-viewers"><span class="fa fa-eye view-icon"></span> <span>' + video_viewers + ' </span></div><div class="video-feedback"><div class="video-like-counter"> <span class="fa fa-thumbs-o-up like-icon"></span> <span>' + video_like + '</span></div><div class="video-like-counter"> <span class="fa fa-thumbs-o-down dislike-icon"></span> <span>' + video_dislike + '</span></div></div></div></div></div></div>');
                        });

                    } else {

                       related_posts_container.append('<div class="col-sm-6 col-md-3 themeix-half"><div class="single-video"><div class="video-img image-icon"> <a href="' + post_url + '"><img src="' + post_image + '" alt="' + post_title + '"></a> <span class="video-duration">' + tag_name + '</span></div><div class="video-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4><div class="video-counter"><div class="video-viewers"><span class="fa fa-user view-icon"></span> <span>' + author_name + '</span></div><div class="video-feedback"> <div class="video-like-counter"> <span class="fa fa-calendar like-icon"></span> <span>' + publish_date + '</span></div></div></div></div></div></div>');
                    }

                });

            });

        },

        featured_posts: function() {

            var featured_posts_container = $(".featured-area");
            $(".section-heading-three h3").append(cateogry_two_title);
            $.get(ghost.url.api("posts", {
                filter: "tag:" + cateogry_two_tag_name + "",
                limit: cateogry_two_post_limit,
                include: "author,tags",
                formats: ["html,plaintext"]
            })).done(function(data) {
                var postsInfo = data.posts;

                postsInfo.forEach(function(e) {
                    var post_title = e.title;
                    var post_url = e.url;
                    var post_image = e.feature_image;
                    var post_content = e.html;
                    var post_text = e.plaintext;
                    var author_name = e.author.name;
                    var tag_name = e.tags[0].name;
                    var publish_date = themeix.timeAndDate(e.published_at);
                    var video_viewers = "0";
                    var video_like = "0";
                    var video_dislike = "0";
                    var video_url = $(post_content).find("iframe").first().attr("src");
                    var randomNumber = Math.floor(Math.random() * 754);
                    // Post Tittle Letter Limited
                    post_title = post_title.substring(0, 55);
                    post_content = post_content.substring(0, 120);
                    var post_paragraph = post_text.substring(0,120);

                    if( ( post_image === null ) || (post_image == "")){
                               var post_image = "/assets/images/default-img.png?" + randomNumber + "";
                       }

                    if (typeof video_url !== "undefined") {
                        var video_id = video_url.slice(-11);
                        var youtube_thumb = "http://i3.ytimg.com/vi/" + video_id + "/mqdefault.jpg?" + randomNumber + "";
                        var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=" + video_id + "&key=" + api_key + "";

                        $.get(url, function(value) {
                            if (typeof value.items[0] != 'undefined') {
                                var video_viewers = value.items[0].statistics.viewCount;
                                var video_like = value.items[0].statistics.likeCount;
                                var video_dislike = value.items[0].statistics.dislikeCount;
                                var video_duration = value.items[0].contentDetails.duration;
                            }
                            var timeD = video_duration;
                            var formattedTime = timeD.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");

                            featured_posts_container.prepend('<div class="single-review"><div class="review-img"> <a href="' + post_url + '"><img src="' + youtube_thumb + '" alt="' + post_title + '"></a> <span class="video-duration">' + formattedTime + '</span></div><div class="review-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4><div class="video-counter-plan"><div class="video-viewers"> <span class="fa fa-eye view-icon"></span> <span>' + video_viewers + '</span></div><div class="video-feedback"><div class="video-like-counter"> <span class="fa fa-thumbs-o-up like-icon"></span> <span>' + video_like + '</span></div><div class="video-like-counter"> <span class="fa fa-thumbs-o-down dislike-icon"></span> <span>' + video_dislike + '</span></div></div></div><div class="reviwe-text">' + post_paragraph + '</div><div class="review-btn"> <a href="' + post_url + '" class="view-btn">View Details</a></div></div></div>');
                        });

                    } else {

                        featured_posts_container.append('<div class="single-review"><div class="review-img image-icon"> <a href="' + post_url + '"><img src="' + post_image + '" alt="' + post_title + '"></a> <span class="video-duration">' + tag_name + '</span></div><div class="review-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4><div class="video-counter-plan"><div class="video-viewers"> <span class="fa fa-calendar view-icon"></span> <span>' + publish_date + '</span></div><div class="video-feedback"><div class="video-like-counter"> <span class="fa fa-user like-icon"></span> <span>' + author_name + '</span></div><div class="video-like-counter"></div></div></div><div class="reviwe-text">' + post_paragraph + '</div><div class="review-btn"> <a href="' + post_url + '" class="view-btn">View Details</a></div></div></div>');
                    }

                });

            });

        },

        news_posts: function() {

            var news_posts_container = $(".news-posts-wrapper");
            $(".section-heading-four h3").append(cateogry_three_title);
            $.get(ghost.url.api("posts", {
                filter: "tag:" + cateogry_three_tag_name + "",
                limit: cateogry_three_post_limit,
                include: "author,tags"
            })).done(function(data) {
                var postsInfo = data.posts;

                postsInfo.forEach(function(e) {
                    var post_title = e.title;
                    var post_url = e.url;
                    var post_image = e.feature_image;
                    var post_content = e.html;
                    var author_name = e.author.name;
                    var tag_name = e.tags[0].name;
                    var publish_date = themeix.timeAndDate(e.published_at);
                    var video_viewers = "0";
                    var video_like = "0";
                    var video_dislike = "0";
                    var video_url = $(post_content).find("iframe").first().attr("src");
                    var randomNumber = Math.floor(Math.random() * 568);
                    // Post Tittle Letter Limited
                    post_title = post_title.substring(0, 55);

                    if( ( post_image === null ) || (post_image == "")){
                            var post_image = "/assets/images/default-img.png?" + randomNumber + "";
                       }

                    if (typeof video_url !== "undefined") {

                        var video_id = video_url.slice(-11);
                        var youtube_thumb = "http://i3.ytimg.com/vi/" + video_id + "/mqdefault.jpg?" + randomNumber + "";
                        var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=" + video_id + "&key=" + api_key + "";

                        $.get(url, function(value) {

                            if (typeof value.items[0] != 'undefined') {
                                var video_viewers = value.items[0].statistics.viewCount;
                                var video_like = value.items[0].statistics.likeCount;
                                var video_dislike = value.items[0].statistics.dislikeCount;
                                var video_duration = value.items[0].contentDetails.duration;
                            }
                            var timeD = video_duration;
                            var formattedTime = timeD.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");
                            news_posts_container.prepend('<div class="col-sm-6 col-md-3 themeix-half"><div class="single-video"><div class="video-img"> <a href="' + post_url + '"><img src="' + youtube_thumb + '" alt="' + post_title + '"></a> <span class="video-duration">' + formattedTime + '</span></div><div class="video-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4><div class="video-counter"><div class="video-viewers"><span class="fa fa-eye view-icon"></span> <span>' + video_viewers + ' </span></div><div class="video-feedback"><div class="video-like-counter"> <span class="fa fa-thumbs-o-up like-icon"></span> <span>' + video_like + '</span></div><div class="video-like-counter"> <span class="fa fa-thumbs-o-down dislike-icon"></span> <span>' + video_dislike + '</span></div></div></div></div></div></div>');
                        });

                    } else {

                        news_posts_container.append('<div class="col-sm-6 col-md-3 themeix-half"><div class="single-video"><div class="video-img image-icon"> <a href="' + post_url + '"><img src="' + post_image + '" alt="' + post_title + '"></a> <span class="video-duration">' + tag_name + '</span></div><div class="video-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4><div class="video-counter"><div class="video-viewers"><span class="fa fa-user view-icon"></span> <span>' + author_name + '</span></div><div class="video-feedback"> <div class="video-like-counter"> <span class="fa fa-calendar like-icon"></span> <span>' + publish_date + '</span></div></div></div></div></div></div>');
                    }

                });

            });
        },

         recent_posts: function() {
            var recent_posts_container = $(".recent-posts-wrapper");
            $(".recent-posts-heading h3").append(recent_posts_title);
            $.get(ghost.url.api("posts", {
                limit: recent_posts_limit,
                include: "author,tags"
            })).done(function(data) {
                var postsInfo = data.posts;
                postsInfo.forEach(function(e) {
                    var post_title = e.title;
                    var post_url = e.url;
                    var post_image = e.feature_image;
                    var post_content = e.html;
                    var author_name = e.author.name;
                    var tag_name = e.tags[0];

                    if (typeof tag_name !== 'undefined') {
                        tag_name = e.tags[0].name;

                    } else {

                        tag_name = "Other"
                    }
                    var publish_date = themeix.timeAndDate(e.published_at);
                    var video_viewers = "0";
                    var video_like = "0";
                    var video_dislike = "0";
                    var video_url = $(post_content).find("iframe").first().attr("src");
                    var randomNumber = Math.floor(Math.random() * 248);
                    // Post Tittle Letter Limited
                    post_title = post_title.substring(0, 55);

                    if( ( post_image === null ) || (post_image == "")){
                            var post_image = "/assets/images/default-img.png?" + randomNumber + "";
                         }

                    if (typeof video_url !== "undefined") {
                        var video_id = video_url.slice(-11);
                        var youtube_thumb = "http://i3.ytimg.com/vi/" + video_id + "/mqdefault.jpg?" + randomNumber + "";
                        // using youtube API
                        var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=" + video_id + "&key=" + api_key + "";

                        $.get(url, function(value) {
                            var video_viewers = value.items[0].statistics.viewCount;
                            var video_like = value.items[0].statistics.likeCount;
                            var video_dislike = value.items[0].statistics.dislikeCount;
                            var video_duration = value.items[0].contentDetails.duration;
                            var timeD = video_duration;
                            var formattedTime = timeD.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");
                            recent_posts_container.prepend('<div class="single-video"><div class="video-img"> <a href="' + post_url + '"> <img src="' + youtube_thumb + '" alt="Video" /> </a> <span class="video-duration">' + formattedTime + '</span></div><div class="video-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4><div class="video-counter"><div class="video-viewers"> <span class="fa fa-eye view-icon"></span> <span>' + video_viewers + '</span></div><div class="video-feedback"><div class="video-like-counter"> <span class="fa fa-thumbs-o-up like-icon"></span> <span>' + video_like + '</span></div><div class="video-like-counter"> <span class="fa fa-thumbs-o-down dislike-icon"></span> <span>' + video_dislike + '</span></div></div></div></div></div>');
                        });

                    } else {

                        recent_posts_container.append('<div class="single-video"><div class="video-img image-icon"> <a href="' + post_url + '"><img src="' + post_image + '" alt="' + post_title + '"></a> <span class="video-duration">' + tag_name + '</span></div><div class="video-content"><h4><a href="' + post_url + '" class="video-title">' + post_title + '</a></h4><div class="video-counter"><div class="video-viewers"><span class="fa fa-user view-icon"></span> <span>' + author_name + '</span></div><div class="video-feedback"> <div class="video-like-counter"> <span class="fa fa-calendar like-icon"></span> <span>' + publish_date + '</span></div></div></div></div></div>');
                    }

                });

            });

        },

        tag_page_video: function() {

            $(".category-posts .single-video").each(function() {
                var video_src = $(this).find("iframe").attr("src");
                if (typeof video_src !== "undefined") {
                    var video_id = video_src.slice(-11);
                    var youtube_thumb = "http://i3.ytimg.com/vi/" + video_id + "/mqdefault.jpg";
                    $(this).find(".video-img").css({
                        "background-image": "url(" + youtube_thumb + ")"
                    });
                }
            });
        },

        timeAndDate: function(e) {

            var a = new Date(e),
                t = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                s = t[a.getMonth()],
                i = a.getDate(),
                o = a.getFullYear(),
                n = i + " " + s + ", " + o;
            return n;
        },

        all_authors_info: function() {

            var author_container = $(".authors-info");
            $.get(ghost.url.api("users", {
                limit: "all",
                include: "count.posts"
            })).done(function(data) {
                var users_info = data.users;
                $(users_info).each(function(index, value) {
                    var author_name = value.name;
                    var author_image = value.feature_image;
                    var author_web = value.website;
                    var updated_time = themeix.timeAndDate(value.updated_at);
                    var author_bio = value.bio;
                    var total_posts = value.count.posts;
                    if (author_web == null || author_web == "" ) {
                        author_web = "http://themeix.com";
                    }

                    if (author_image == null || author_image == "") {
                        author_image = "/assets/images/author-image.jpg";
                    }

                    if (total_posts == 0) {

                        updated_time = "";
                    }

                    author_container.append('<div class="single-contributor"><div class="contributor-img"> <a href="' + author_web + '"><img src="' + author_image + '" alt="' + author_name + '"></a></div><div class="contributor-content"><h4><a href="' + author_web + '" class="heading-link">' + author_name + '</a></h4><p>posts: ' + total_posts);
                });
            });
        },

        single_page_video_info: function() {

            if ($(".video-post-wrapper").length > 0) {
                var single_video_url = $(".video-post-text").find("iframe").attr("src");
                if (typeof single_video_url !== "undefined") {
                    var single_video_id = single_video_url.slice(-11);

                    // using youtube API
                    var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=" + single_video_id + "&key=" + api_key + "";

                    $.get(url, function(value) {
                        var video_viewers = value.items[0].statistics.viewCount;
                        var video_like = value.items[0].statistics.likeCount;
                        var video_dislike = value.items[0].statistics.dislikeCount;
                        var video_duration = value.items[0].contentDetails.duration;
                        var timeD = video_duration;
                        var formattedTime = timeD.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");
                        $(".video-post-viewers").append("<h3>" + video_viewers + "  views</h3>");
                        $(".video-like").append("<span><i class='fa fa-thumbs-o-up'></i></span><p>&nbsp;&nbsp; " + video_like + "</p>");
                        $(".video-dislike").append("<span><i class='fa fa-thumbs-o-down'></i></span><p>&nbsp;&nbsp; " + video_dislike + "</p>");

                    });

                }

            }
        },

        all_adds_data: function() {

            // for big banner add
            var big_banner_ads = '<a href="' + big_banner_ads_link + '"><img src="' + big_banner_ads_img + '" alt="banner"></a>';
            $(".big-banner").append(big_banner_ads);

        },



        scrollTotop: function() {

            var wind = $(window);

            wind.on("scroll", function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop >= 500) {
                    $(".scroll-top").fadeIn("slow");
                } else {
                    $(".scroll-top").fadeOut("slow");
                }

            });

            $(".scroll-top").on("click", function() {
                var bodyTop = $("html, body");
                bodyTop.animate({
                    scrollTop: 0
                }, 800, "easeOutCubic");

            });

        },

   sticky: function() {
     var windows = $(window);
     windows.on('scroll',function(){
     var scroll = windows.scrollTop();
     if(scroll < 110){   
        $("#stickey-menu").removeClass("stickey");
       
   }else{

       $("#stickey-menu").addClass("stickey");
   }
   
   
      });
   },

        responsive_video: function() {

            if ($(".video-post-text").length > 0) {
                $(".video-post-text, .kg-card-markdown").fitVids();

            }
        },

        imageTovideo: function() {

            var video_src = $(".video-post-text").find("iframe").attr("src");

            if (typeof video_src !== "undefined" && video_src !== null && video_src !== "") {

                $(".embed-video").show();
                $(".video-post-wrapper .posts-image").hide();
                $(".embed-video").append('<iframe width="560" height="315" src="' + video_src + '" frameborder="0" allowfullscreen></iframe>');
                $(".embed-video").fitVids();
                $(".video-post-text").find(".fluid-width-video-wrapper").first().hide();

            } else {

                $(".embed-video").hide();
            }

        },

        ghostHunterSearch: function() {

            $(".search-btn").on("click", function() {
                var search_query = $(".search_text").val();
                $("#search-query").val(search_query);

            });

            $("#search-query").ghostHunter({

                results: "#results",
                onKeyUp: true,
                result_template: "<div class ='single-result'> <a href='{{link}}'><p><h3>{{title}}</h3><h5>{{pubDate}}</h5></p></a></div>",
                onPageLoad: true,
                includepages: true

            });

        },

        init: function() {
            // this.themeix_slider();
            // this.single_carousel();
            // this.related_posts();
            // this.featured_posts();
            // this.news_posts();
            // this.all_authors_info();
            // this.all_adds_data();
            // this.timeAndDate();
            // this.recent_posts();
            // this.single_page_video_info();
            // this.tag_page_video();
            // this.scrollTotop();
            // this.responsive_video();
            // this.imageTovideo();
            // this.ghostHunterSearch();
            this.sticky();
        }
    }

    $(document).ready(function() {
        themeix.init();
    });

})(jQuery);