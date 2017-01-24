/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    in1, in2, out1, out2,
    inChanged, outChanged,
    backgroundPosition = ['top left', 'bottom left', 'center', 'top right', 'bottom right'],
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
                out1 = document.getElementById('out-1');
                out2 = document.getElementById('out-2');
                in1 = document.getElementById('in-1');
                in2 = document.getElementById('in-2');
                app.changeInside();
                app.changeOutside();
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
                data += '<div class="grid-item ' + ['contain', 'cover'].random() + ' w' + imagesWidth.random() + ' h' + imagesWidth.random() + '" style="background-image: url(' + collection.random() + ')" /></div>';
            }
            return data;
        },
        changeInside: function() {
            fillWithChilds(in1, rand(5, 10));
            fillWithChilds(in2, rand(5, 10));
        },
        changeOutside: function() {
            fillWithChilds(out1, rand(5, 10));
            out2.innerHTML = out1.innerHTML;
        },
        startDrag: function() {
            var target = $("#target"),
                proxy = $("#proxy"),
                container = $("#container");

            function update() {
                //make sure the y value is always between 0 and -400
                var maxH = height * 6;
                var newY = this.y % maxH;
                var position = Math.abs(newY / height);
                if (newY > 0) {
                    newY = newY - maxH;
                }
                if (position >= 0 && position < 2 || position >= 4 && position < 6) {
                    console.log(position + ' OUT');
                    if (position < 0.05) {
                        if (!inChanged) {
                            console.log('change IN');
                            app.changeInside();
                            inChanged = true;
                        }
                    } else {
                        inChanged = false;
                    }
                } else {
                    console.log(position + ' IN');
                    if (position > 3 && position < 3.05) {
                        if (!outChanged) {
                            console.log('change OUT');
                            app.changeOutside();
                            outChanged = true;
                        }
                    } else {
                        outChanged = false;
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
                //dragResistance: 0.5,
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
};

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function fillWithChilds(el, N) {
    el.innerHTML = '';

    function rand(n) {
        /* weight=100 means no random
           weight=0 means totally random  */
        var weight = 50;
        return ((weight * n / 2 + n * (100 - weight) * Math.random()) | 0) / 100;
    }

    function main(N, x, y, hei, wid) {
        if (N === 1) {
            var child = document.createElement('div');
            child.className = 'grid-item cover';
            child.setAttribute('style', 'position: absolute; background-image: url(' + collection.random() + '); background-position: ' + backgroundPosition.random() + '; top:' + y + 'px; left:' + x + 'px; height:' + hei + 'px; width:' + wid + 'px');
            el.appendChild(child);
            return;
        }
        var halfN = N / 2 | 0;
        if (wid > hei) {
            var newWid = rand(wid);
            if (2 * newWid > wid) halfN = N - halfN;
            main(halfN, x, y, hei, newWid);
            main(N - halfN, x + newWid, y, hei, wid - newWid);
        } else {
            var newHei = rand(hei);
            if (2 * newHei > hei) halfN = N - halfN;
            main(halfN, x, y, newHei, wid);
            main(N - halfN, x, y + newHei, hei - newHei, wid);
        }
    }
    main(N, 0, 0, el.clientHeight, el.clientWidth);
}