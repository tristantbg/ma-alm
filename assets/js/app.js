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
    collection,
    instacollection = [],
    instaInit = true,
    idx = 0,
    num_photos = 20,
    nextUrl = false,
    $root = '/';
$(function() {
    var app = {
        init: function() {
            $(window).resize(function(event) {
                app.sizeSet();
                if (!isMobile && typeof minBoxes !== typeof undefined && typeof maxBoxes !== typeof undefined) {
                    app.changeInside();
                    app.changeOutside();
                }
            });
            $(document).ready(function($) {
                $body = $('body');
                app.sizeSet();
                $body.on('click', '[data-target="index"]', function(event) {
                    event.preventDefault();
                    if ($body.attr('class') != 'home') {
                        var url = $(this).attr('href');
                        $body.addClass('loading');
                        setTimeout(function() {
                            window.location = url;
                        }, 300);
                    }
                });
                $body.on('click', '[data-target="page"]', function(event) {
                    event.preventDefault();
                    var el = $(this);
                    if (el.parent().is('.menu-item')) {
                      $('.menu-item.active').removeClass('active');
                      el.parent().addClass('active');
                    }
                    var url = el.attr('href');
                    $body.addClass('loading');
                    setTimeout(function() {
                        window.location = url;
                    }, 300);
                });
                ref = document.getElementById('reference');
                l_in1 = document.getElementById('l-in-1');
                l_in2 = document.getElementById('l-in-2');
                l_out1 = document.getElementById('l-out-1');
                l_out2 = document.getElementById('l-out-2');
                r_in1 = document.getElementById('r-in-1');
                r_in2 = document.getElementById('r-in-2');
                r_out1 = document.getElementById('r-out-1');
                r_out2 = document.getElementById('r-out-2');
                clone = document.getElementById('clone');
                // c_l_in1 = document.getElementById('c_l-in-1');
                // c_l_in2 = document.getElementById('c_l-in-2');
                // c_l_out1 = document.getElementById('c_l-out-1');
                // c_l_out2 = document.getElementById('c_l-out-2');
                // c_r_in1 = document.getElementById('c_r-in-1');
                // c_r_in2 = document.getElementById('c_r-in-2');
                // c_r_out1 = document.getElementById('c_r-out-1');
                // c_r_out2 = document.getElementById('c_r-out-2');
                if (instamode) {
                    app.getInstaImages();
                    app.startDrag();
                }
                if (isMobile && typeof minBoxes !== typeof undefined && typeof maxBoxes !== typeof undefined) {
                    minBoxes = minBoxes / 2;
                    maxBoxes = maxBoxes / 2;
                }
                if (collectionmode) {
                    collection.all = collection.landscape.concat(collection.portrait);
                    app.changeInside();
                    app.changeOutside();
                    app.startDrag();
                }
                $(window).load(function() {
                    $body.addClass('loaded');
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
                    isMobile = false;
                }
            }
        },
        getInstaImages: function() {
            if (instaInit) {
                //nextUrl = 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent';
                nextUrl = "https://app.dialogfeed.com/en/snippet/marques-almeida-8301.json?api_key=34f0ab0850234ba585cd68dc2cb6dedc";
                instaInit = false;
            }
            console.log(nextUrl);
            if (nextUrl) {
                console.log("loadNext");
                $.ajax({
                    url: nextUrl,
                    dataType: 'JSON',
                    type: 'GET',
                    data: {
                        //access_token: token,
                        //count: num_photos
                    },
                    success: function(data) {
                        console.log(data);
                        for (var x = 0; x < data.news_feed.posts.post.length; x++) {
                            var img = data.news_feed.posts.post[x].content.content_picture;
                            if (typeof img !== typeof undefined) {
                                instacollection.push(data.news_feed.posts.post[x].content.content_picture);
                            }
                        }
                        for (var i = instacollection.length - 1; i >= 0; i--) {
                            if (instacollection[i] === 'https://www.dialogfeed.com/wp-content/uploads/2015/03/FREE-TRIAL-POST-500HD1.png') {
                                instacollection.splice(i, 1);
                                //break;
                            }
                        }
                        //console.log(instacollection);
                        // if (typeof data.pagination.next_url !== typeof undefined) {
                        //     nextUrl = data.pagination.next_url;
                        // } else {
                        nextUrl = false;
                        //}
                        app.changeInside();
                        app.changeOutside();
                    },
                    error: function(data) {
                        console.log(data);
                        alert("Too much requests...");
                    }
                });
            }
        },
        changeInside: function(side) {
            if (instamode) {
                app.getInstaImages();
            }
            app.fillWithChilds(l_in1, rand(minBoxes, maxBoxes));
            app.fillWithChilds(l_in2, rand(minBoxes, maxBoxes));
            app.fillWithChilds(r_in1, rand(minBoxes, maxBoxes));
            app.fillWithChilds(r_in2, rand(minBoxes, maxBoxes));
            //Clone
            // c_l_in1.innerHTML = l_in1.innerHTML;
            // c_l_in2.innerHTML = l_in2.innerHTML;
            // c_r_in1.innerHTML = r_in1.innerHTML;
            // c_r_in2.innerHTML = r_in2.innerHTML;
            app.cloneColumns();
        },
        changeOutside: function(side) {
            if (instamode) {
                app.getInstaImages();
            }
            app.fillWithChilds(l_out1, rand(minBoxes, maxBoxes));
            l_out2.innerHTML = l_out1.innerHTML;
            app.fillWithChilds(r_out1, rand(minBoxes, maxBoxes));
            r_out2.innerHTML = r_out1.innerHTML;
            //Clone
            // c_l_out1.innerHTML = l_out1.innerHTML;
            // c_l_out2.innerHTML = l_out2.innerHTML;
            // c_r_out1.innerHTML = r_out1.innerHTML;
            // c_r_out2.innerHTML = r_out2.innerHTML;
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
                var way = newY / height;
                var positionY = Math.abs(way);
                //console.log(positionY);
                if (newY > 0) {
                    newY = newY - maxH;
                }
                if (positionY >= 0 && positionY < 2 || positionY >= 4 && positionY < 6) {
                    //console.log(positionY + ' OUT');
                    if (positionY < 0.1 && way < 0) {
                        if (!inChanged) {
                            console.log('change IN');
                            app.changeInside();
                            inChanged = true;
                        }
                    } else {
                        inChanged = false;
                    }
                } else {
                    //console.log(positionY + ' IN');
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
                zIndexBoost: false,
                dragResistance: 0.4,
                onDrag: update,
                onThrowUpdate: update,
                throwProps: true
            });
        },
        fillWithChilds: function(el, N) {
            el.innerHTML = '';

            function rand(n) {
                /* weight=100 means no random
                   weight=0 means totally random  */
                var weight = 50;
                return ((weight * n / 2 + n * (100 - weight) * Math.random()) | 0) / 100;
            }

            function main(N, x, y, hei, wid) {
                if (N === 1) {
                    var url;
                    var orient;
                    var child = document.createElement('div');
                    if (instamode) {
                        if (idx > instacollection.length - 1) {
                            idx = 0;
                        }
                        url = instacollection[idx];
                        child.className = 'grid-item insta';
                        child.setAttribute('style', 'background-image: url(' + url + '); position: absolute; top:' + y + 'px; left:' + x + 'px; height:' + hei + 'px; width:' + wid + 'px');
                        //child.setAttribute('data-bg', url);
                        //console.log(idx);
                        idx++;
                    }
                    if (collectionmode) {
                        //url = collection.all.random();
                        if (hei / wid > 1) {
                            orient = 'portrait';
                            if (!instamode) {
                                url = collection.portrait.random();
                            }
                        } else {
                            orient = 'landscape';
                            if (!instamode) {
                                url = collection.landscape.random();
                            }
                        }
                        child.setAttribute('style', 'background-image: url(' + url + '); position: absolute; top:' + y + 'px; left:' + x + 'px; height:' + hei + 'px; width:' + wid + 'px');
                        child.className = 'grid-item';
                        //child.setAttribute('data-bg', url);
                        //child.setAttribute('data-expand', 1000);
                        //child.setAttribute('data-sizes', 'auto');
                    }
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