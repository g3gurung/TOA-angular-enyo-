$(document).ready(function() {
    setTimeout(showDeliverOffer, 5000);
});

var showDeliverOffer = function() {
    // Select the target element and the top offset from it
    var targetValue = $('body').offset().top;

    // Animate the scrollTop property of html element from its current position to targetValue
    $('html,body').animate({scrollTop: targetValue}, 'slow');
    
    $('.free-delivery').css('height', $(document).height()+"px");
    $('.free-delivery').show("fast", function(){
        $('.offer-info').animate({
            top: "150px"
        });
    });
};

 $('.offer-close-btn').click(function(){
    // Select the target element and the top offset from it
    var targetValue = $('body').offset().top;

    // Animate the scrollTop property of html element from its current position to targetValue
    $('html,body').animate({scrollTop: targetValue}, 'slow');
    
    $('.offer-info').animate({
            top: "-1000px"
        }, function(){
            $('.free-delivery').hide("fast");
        });
   
    // stop the default behaviour of anchor
    event.preventDefault();
 });

var next = function(event) {
    event.preventDefault();
    $('.carousel').carousel('next');
    return false;
};

var prev = function(event) {
    event.preventDefault();
    $('.carousel').carousel('prev');
    return false;
};

$(document).on("click", "ul.navbar-nav li.menu-item", function() {
    $("ul.navbar-nav li.menu-item.active").removeClass('active');
    $(this).addClass('active');
});

$(document).on("click", ".menu-item-contact", function() {

    // Select the target element and the top offset from it
    var targetValue = $('.contact').offset().top;

    // Animate the scrollTop property of html element from its current position to targetValue
    $('html,body').animate({scrollTop: targetValue}, 'slow');

    // stop the default behaviour of anchor
    event.preventDefault();

    return false;
});


$(document).on("click", "#BigImage", function() {
    this.parentNode.removeChild(this);
    return false;
});

var closeBigImage = function(ele) {
    ele.parentNode.parentNode.removeChild(document.getElementById("#BigImage"));
    return false;
};

var myEventHandler = function(e) {
    if (!e)
        e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    //IE8 and Lower
    else {
        e.cancelBubble = true;
    }
};

$(document).on("click", ".accordion-heading", function() {
    $(this.children[0].children[0]).toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
});

$(document).on("click", "ul.nav li", function() {
    if ($(window).width() <= 768) {
        $('.navbar-collapse').collapse('hide');
    }
});


var winHeight = $(window).height();
$(window).scroll(function() {
    var pos = $(this).scrollTop();
    if (pos > (winHeight / 2)) {
        if ($('#toTop').css('display') === "none")
            $('#toTop').show("slow");
    } else {
        $('#toTop').hide();
    }
});

$(document).on("click", "#toTop", function() {
    // Select the target element and the top offset from it
    var targetValue = $('body').offset().top;

    // Animate the scrollTop property of html element from its current position to targetValue
    $('html,body').animate({scrollTop: targetValue}, 'slow');

    // stop the default behaviour of anchor
    event.preventDefault();
});

$(document).on("click", ".closeSuccess", function() {
    $('.reservation-response').fadeOut(function() {
        location.reload();
    });
});

$(document).on("click", ".closeError", function() {
    $('.reservation-response').fadeOut(function() {
        $('.reservation-response').remove();
    });
});