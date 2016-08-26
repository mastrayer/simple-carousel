$(function() {
    // TODO: 하드웨어 가속때문에 left에서 transform을 이용했는데 코드 깔끔하게 정리하기
    // TODO: 슬라이드 이동을 50%가 아니라 좀 더 널널하게 주기
    // TODO: 양 끝단에 이미지 1개씩 더 붙여서 무한스크롤링 구현 
    // TODO: 페이지 보여주기
    // TODO: dom select 최적화하기 (height구하는부분?)
    var $slider = $("section.slider");
    var $viewport = $slider.children(".viewport");
    var $images = $viewport.children(".img");

    var screenWidth = $slider.width();

    var index = 0;
    var currentIndex = 0;

    var startTouchPosition = 0;
    var startSlidePosition = 0;
    var direction;

    $slider.on({
        touchstart: function(e) {
            $slider.removeClass('end');
            currentIndex = index;
            startTouchPosition = e.originalEvent.touches[0].clientX;
            startSlidePosition = Number.parseInt($viewport.css('transform').split(',')[4]) || 0;
        },

        touchmove: function(e) {
            var moved = e.originalEvent.touches[0].clientX - startTouchPosition;
            direction = (moved < 0) ? 1 : -1;

            $viewport.css('transform', 'translateX('+(startSlidePosition + moved)+'px)');

            var newIndex = -Number.parseInt($viewport.css('transform').split(',')[4]) / screenWidth;
            if(direction == 1) index = Math.floor(newIndex);
            else               index = Math.ceil(newIndex);

            var currentHeight = $images.eq(index).height();
            var nextHeight = $images.eq(index + direction).height();
            var factor = Math.abs((moved % screenWidth) / screenWidth);

            $slider.height( ((1-factor)*currentHeight + factor*nextHeight) + "px");
        },

        touchend: function(e) {
            index = Math.round((direction * 0.35) - Number.parseInt($viewport.css('transform').split(',')[4]) / screenWidth);
            $slider.addClass('end')
                .height( $images.eq(index).height() );
            $viewport.css('transform', 'translateX(' + -index*screenWidth+"px)");
        }
    });
});
