/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    l_in1, l_in2, l_out1, l_out2,
    r_in1, r_in2, r_out1, r_out2,
    ref, clone,
    inChanged, outChanged,
    backgroundPosition = ['top left', 'bottom left', 'center', 'top right', 'bottom right'],
    lastX,
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
                l_in1 = document.getElementById('l-in-1');
                l_in2 = document.getElementById('l-in-2');
                l_out1 = document.getElementById('l-out-1');
                l_out2 = document.getElementById('l-out-2');
                r_in1 = document.getElementById('r-in-1');
                r_in2 = document.getElementById('r-in-2');
                r_out1 = document.getElementById('r-out-1');
                r_out2 = document.getElementById('r-out-2');
                ref = document.getElementById('reference');
                clone = document.getElementById('clone');
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
        changeInside: function(side) {
            if (side == 'left') {
                fillWithChilds(l_in1, rand(5, 10));
                fillWithChilds(l_in2, rand(5, 10));
            } else if (side == 'right') {
                fillWithChilds(r_in1, rand(5, 10));
                fillWithChilds(r_in2, rand(5, 10));
            } else {
                fillWithChilds(l_in1, rand(5, 10));
                fillWithChilds(l_in2, rand(5, 10));
                fillWithChilds(r_in1, rand(5, 10));
                fillWithChilds(r_in2, rand(5, 10));
            }
            app.cloneColumns();
        },
        changeOutside: function(side) {
            if (side == 'left') {
                fillWithChilds(l_out1, rand(5, 10));
                l_out2.innerHTML = l_out1.innerHTML;
            } else if (side == 'right') {
                fillWithChilds(r_out1, rand(5, 10));
                r_out2.innerHTML = r_out1.innerHTML;
            } else {
                fillWithChilds(l_out1, rand(5, 10));
                l_out2.innerHTML = l_out1.innerHTML;
                fillWithChilds(r_out1, rand(5, 10));
                r_out2.innerHTML = r_out1.innerHTML;
            }
            app.cloneColumns();
        },
        cloneColumns: function() {
          clone.innerHTML = ref.innerHTML;
        },
        startDrag: function() {
            var target = $("#target"),
                proxy = $("#proxy"),
                container = $("#container");

            function update() {
                //Calcute Y
                var maxH = height * 6;
                var newY = this.y % maxH;
                var positionY = Math.abs(newY / height);
                if (newY > 0) {
                    newY = newY - maxH;
                }
                if (positionY >= 0 && positionY < 2 || positionY >= 4 && positionY < 6) {
                    console.log(positionY + ' OUT');
                    if (positionY < 0.05) {
                        if (!inChanged) {
                            console.log('change IN');
                            app.changeInside();
                            inChanged = true;
                        }
                    } else {
                        inChanged = false;
                    }
                } else {
                    console.log(positionY + ' IN');
                    if (positionY > 3 && positionY < 3.05) {
                        if (!outChanged) {
                            console.log('change OUT');
                            app.changeOutside();
                            outChanged = true;
                        }
                    } else {
                        outChanged = false;
                    }
                }
                //Calcute X
                var maxW = width * 2;
                var delta = lastX - this.x;
                var newX = this.x % maxW;
                var positionX = Math.abs(newX / width);
                
                if (newX > 0) {
                    newX = newX - maxW;
                }
                //place target
                TweenLite.set(target, {
                    x: newX,
                    y: newY,
                    overwrite: false
                });
                lastX = this.x;
                this.x = newX;
                this.y = newY;
                
            }
            Draggable.create(proxy, {
                type: 'xy',
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
            child.className = 'grid-item';
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