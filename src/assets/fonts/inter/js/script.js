(function($) {
    "use strict";

    //* Form js
    function verificationForm() {
        var current_fs, next_fs, previous_fs; // fieldsets
        var left, opacity, scale; // fieldset properties which we will animate
        var animating = false; // flag to prevent quick multi-click glitches

        $(".next").click(function() {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            // Activate next step on progressbar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            // Show the next fieldset
            next_fs.show();
            // Hide the current fieldset with animation
            current_fs.animate({
                opacity: 0
            }, {
                step: function(now, mx) {
                    // As the opacity of current_fs reduces to 0 - stored in "now"
                    // 1. Scale current_fs down to 80%
                    scale = 1 - (1 - now) * 0.2;
                    // 2. Bring next_fs from the right (50%)
                    left = (now * 50) + "%";
                    // 3. Increase opacity of next_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'position': 'absolute'
                    });
                    next_fs.css({
                        'left': left,
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function() {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack' // Custom easing function
            });
        });

        $(".previous").click(function() {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            // De-activate current step on progressbar
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            // Show the previous fieldset
            previous_fs.show();
            // Hide the current fieldset with animation
            current_fs.animate({
                opacity: 0
            }, {
                step: function(now, mx) {
                    // As the opacity of current_fs reduces to 0 - stored in "now"
                    // 1. Scale previous_fs from 80% to 100%
                    scale = 0.8 + (1 - now) * 0.2;
                    // 2. Take current_fs to the right (50%) - from 0%
                    left = ((1 - now) * 50) + "%";
                    // 3. Increase opacity of previous_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({
                        'left': left
                    });
                    previous_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function() {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack' // Custom easing function
            });
        });

        $(".submit").click(function() {
            return false;
        });
    };

    //* Add Phone no select
    function phoneNoselect() {
        if ($('#msform').length) {
            $("#phone").intlTelInput();
            $("#phone").intlTelInput("setNumber", "+880");
        }
    };

    //* Select js
    function nice_Select() {
        if ($('.product_select').length) {
            $('select').niceSelect();
        }
    };

    /* Function Calls */
    $(document).ready(function() {
        verificationForm();
        phoneNoselect();
        nice_Select();
    });

})(jQuery);
