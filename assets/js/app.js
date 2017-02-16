/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    l_in1, l_in2, l_out1, l_out2,
    r_in1, r_in2, r_out1, r_out2,
    canvas_l_in_1,
    canvas_l_in_2,
    canvas_l_out_1,
    canvas_r_out_2,
    canvas_r_in_1,
    canvas_r_in_2,
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
    token = '234790120.55f62e1.674b375f110240c1ac7daedb74be5b69',
    num_photos = 20,
    nextUrl = false,
    $root = '/';
$(function() {
    var app = {
        init: function() {
            $(window).resize(function(event) {
                app.sizeSet();
                app.changeInside();
                app.changeOutside();
            });
            $(document).ready(function($) {
                $body = $('body');
                app.sizeSet();
                $('body.home #container .inner').click(function(event) {
                    $body.addClass('menu-visible');
                });
                $body.on('click', '[data-target="index"]', function(event) {
                    event.preventDefault();
                    if ($body.attr('class') != 'home') {
                        $body.toggleClass('menu-visible');
                    }
                });
                $body.on('click', '[data-target="page"]', function(event) {
                    event.preventDefault();
                    var url = $(this).attr('href');
                    $body.addClass('loading');
                    setTimeout(function() {
                        window.location = url;
                    }, 1100);
                });
                ref = document.getElementById('reference');
                l_in_1 = document.getElementById('l_in_1');
                l_in_2 = document.getElementById('l_in_2');
                l_out_1 = document.getElementById('l_out_1');
                l_out_2 = document.getElementById('l_out_2');
                r_in_1 = document.getElementById('r_in_1');
                r_in_2 = document.getElementById('r_in_2');
                r_out_1 = document.getElementById('r_out_1');
                r_out_2 = document.getElementById('r_out_2');
                canvas_l_in_1 = document.getElementById('canvas_l_in_1').getContext('2d');
                canvas_l_in_2 = document.getElementById('canvas_l_in_2').getContext('2d');
                canvas_l_out_1 = document.getElementById('canvas_l_out_1').getContext('2d');
                canvas_r_out_1 = document.getElementById('canvas_r_out_1').getContext('2d');
                canvas_r_in_1 = document.getElementById('canvas_r_in_1').getContext('2d');
                canvas_r_in_2 = document.getElementById('canvas_r_in_2').getContext('2d');
                clone = document.getElementById('clone');
                if (instamode) {
                    app.getInstaImages();
                    app.startDrag();
                }
                if (collectionmode) {
                    collection.all = collection.landscape.concat(collection.portrait);
                    app.changeInside();
                    app.changeOutside();
                    app.startDrag();
                }
                $(window).load(function() {
                    $("#loader").fadeOut("fast");
                });
            });
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            var cvs = document.querySelectorAll('canvas');
            Array.prototype.forEach.call(cvs, function(el, i) {
                el.setAttribute('width', el.parentNode.clientWidth);
                el.setAttribute('height', el.parentNode.clientHeight);
            });
            if (width <= 770 || Modernizr.touch) isMobile = true;
            if (isMobile) {
                if (width >= 770) {
                    //location.reload();
                    isMobile = false;
                }
            }
        },
        getInstaImages: function() {
            if (instamode) {
                if (instaInit) {
                    nextUrl = 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent';
                    instaInit = false;
                }
                console.log(nextUrl);
                if (nextUrl) {
                    console.log("loadNext");
                    $.ajax({
                        url: nextUrl,
                        dataType: 'jsonp',
                        type: 'GET',
                        data: {
                            access_token: token,
                            count: num_photos
                        },
                        success: function(data) {
                            console.log(data);
                            for (var x = 0; x < data.data.length; x++) {
                                instacollection.push(data.data[x].images.standard_resolution.url);
                            }
                            console.log(instacollection);
                            if (typeof data.pagination.next_url !== typeof undefined) {
                                nextUrl = data.pagination.next_url;
                            } else {
                                nextUrl = false;
                            }
                            app.changeInside();
                            app.changeOutside();
                        },
                        error: function(data) {
                            console.log(data);
                            alert("Too much requests...");
                        }
                    });
                }
            }
        },
        changeInside: function() {
            if (instamode) {
                app.getInstaImages();
                app.fillWithChilds(l_in_1, rand(minBoxes, maxBoxes));
                app.fillWithChilds(l_in_2, rand(minBoxes, maxBoxes));
                app.fillWithChilds(r_in_1, rand(minBoxes, maxBoxes));
                app.fillWithChilds(r_in_2, rand(minBoxes, maxBoxes));
            } else {
                app.fillCanvasWithChilds(canvas_l_in_1, rand(minBoxes, maxBoxes));
                app.fillCanvasWithChilds(canvas_l_in_2, rand(minBoxes, maxBoxes));
                app.fillCanvasWithChilds(canvas_r_in_1, rand(minBoxes, maxBoxes));
                app.fillCanvasWithChilds(canvas_r_in_2, rand(minBoxes, maxBoxes));
            }
            app.cloneColumns();
        },
        changeOutside: function() {
            if (instamode) {
                app.getInstaImages();
                app.fillWithChilds(l_out_1, rand(minBoxes, maxBoxes));
                l_out_2.innerHTML = l_out_1.innerHTML;
                app.fillWithChilds(r_out_1, rand(minBoxes, maxBoxes));
                r_out_2.innerHTML = r_out_1.innerHTML;
            } else {
                app.fillCanvasWithChilds(canvas_l_out_1, rand(minBoxes, maxBoxes));
                l_out_2.innerHTML = l_out_1.innerHTML;
                app.fillCanvasWithChilds(canvas_r_out_1, rand(minBoxes, maxBoxes));
                r_out_2.innerHTML = r_out_1.innerHTML;
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
                dragResistance: 0.6,
                onDrag: update,
                onThrowUpdate: update,
                throwProps: true
            });
        },
        fillCanvasWithChilds: function(el, N) {
            function rand(n) {
                /* weight=100 means no random
                   weight=0 means totally random  */
                var weight = 50;
                return ((weight * n / 2 + n * (100 - weight) * Math.random()) | 0) / 100;
            }

            function drawImageProp(ctx, imgUrl, x, y, w, h, offsetX, offsetY) {
                if (arguments.length === 2) {
                    x = y = 0;
                    w = ctx.width;
                    h = ctx.height;
                }
                //console.log(ctx);
                var img = new Image();
                img.src = imgUrl;
                img.onload = function() {
                    /// default offset is center
                    offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
                    offsetY = typeof offsetY === 'number' ? offsetY : 0.5;
                    /// keep bounds [0.0, 1.0]
                    if (offsetX < 0) offsetX = 0;
                    if (offsetY < 0) offsetY = 0;
                    if (offsetX > 1) offsetX = 1;
                    if (offsetY > 1) offsetY = 1;
                    var iw = img.width,
                        ih = img.height,
                        r = Math.min(w / iw, h / ih),
                        nw = iw * r, /// new prop. width
                        nh = ih * r, /// new prop. height
                        cx, cy, cw, ch, ar = 1;
                    /// decide which gap to fill    
                    if (nw < w) ar = w / nw;
                    if (nh < h) ar = h / nh;
                    nw *= ar;
                    nh *= ar;
                    /// calc source rectangle
                    cw = iw / (nw / w);
                    ch = ih / (nh / h);
                    cx = (iw - cw) * offsetX;
                    cy = (ih - ch) * offsetY;
                    /// make sure source rectangle is valid
                    if (cx < 0) cx = 0;
                    if (cy < 0) cy = 0;
                    if (cw > iw) cw = iw;
                    if (ch > ih) ch = ih;
                    /// fill image in dest. rectangle
                    
                    ctx.drawImage(this, cx, cy, cw, ch, x, y, w, h);
                };
            }

            function main(N, x, y, hei, wid) {
                if (N === 1) {
                    var url;
                    var orient;
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
                    drawImageProp(el, url, x, y, wid, hei);
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
            main(N, 0, 0, el.height, el.width);
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