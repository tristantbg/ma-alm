/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    imagesWidth = [1, 2, 3, 4],
    isMobile = false,
    $root = '/';
$(function() {
    var app = {
        init: function() {
            $(window).resize(function(event) {
                app.sizeSet();
            });
            $(document).ready(function($) {
                $body = $('body');
                app.sizeSet();
                History.Adapter.bind(window, 'statechange', function() {
                    var State = History.getState();
                    console.log(State);
                    var content = State.data;
                    if (content.type == 'project') {
                        $body.addClass('project loading');
                        app.loadContent(State.url + '/ajax', slidecontainer);
                    }
                });
                // var feed = new Instafeed({
                //     get: 'user',
                //     userId: '234790120',
                //     clientId: '55f62e19473748fcb71302147c09334a',
                //     accessToken: '234790120.55f62e1.674b375f110240c1ac7daedb74be5b69'
                // });
                // feed.run();
                $('.view.out').html(app.generateImages(4));
                $('.view:not(".out")').each(function(index, el) {
                    $(this).html(app.generateImages(10));
                });
                // $('.view').packery({
                //     // options
                //     itemSelector: '.grid-item',
                //     gutter: 0
                // });
                app.startDrag();
                $(window).load(function() {
                    $(".loader").fadeOut("fast");
                });
            });
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            if (width <= 770 || Modernizr.touch) isMobile = true;
            if (isMobile) {
                if (width >= 770) {
                    //location.reload();
                }
            }
        },
        generateImages: function(num) {
            var data = '';
            for (var i = 0; i < num; i++) {
                data += '<div class="grid-item w' + imagesWidth.random() + ' h' + imagesWidth.random() + '"><img src="' + collection.random() + '" width="100%" height="auto" /></div>'
            }
            return data;
        },
        startDrag: function() {
            var target = $("#target"),
                proxy = $("#proxy"),
                container = $("#container");

            function update() {
                //make sure the y value is always between 0 and -400
                var maxH = height * 3;
                var newY = this.y % maxH;
                var position = Math.abs(newY / height);
                if (newY > 0) {
                    newY = newY - maxH;
                }
                if (position >= 0 && position < 1 || position >= 2 && position < 3) {
                    console.log('white');
                    if (position < 0.005) {
                        console.log('change IN');
                        $('.view:not(".out")').each(function(index, el) {
                            $(this).html(app.generateImages(10));
                        });
                    }
                } else {
                    console.log('black!');
                    if (position > 1.5 && position < 1.55) {
                        console.log('change OUT');
                        $('.view.out').html(app.generateImages(4));
                    }
                }
                TweenLite.set(target, {
                    y: newY,
                    overwrite: false
                });
                this.y = newY;
            }
            Draggable.create(proxy, {
                type: 'y',
                trigger: container,
                dragResistance: 0.5,
                onDrag: update,
                onThrowUpdate: update,
                throwProps: true
            });
        },
        goIndex: function() {
            History.pushState({
                type: 'index'
            }, $sitetitle, window.location.origin + $root);
        },
        loadContent: function(url, target) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(target).html(data);
                }
            });
        },
        deferImages: function() {
            var imgDefer = document.getElementsByTagName('img');
            for (var i = 0; i < imgDefer.length; i++) {
                if (imgDefer[i].getAttribute('data-src')) {
                    imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
                }
            }
        }
    };
    app.init();
});
Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}