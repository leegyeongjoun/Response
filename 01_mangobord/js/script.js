$('.app-btn').on({click:function(){
    $('.bar').toggleClass('add');
    // 있으면 없고 없으면 있게하는것 toggle
    $('.mobile-nav').stop().slideToggle(500);
    // 높이가 있어야 자연스럽게 내려온다
    // stop()은 중간에 내가 멈추려면 멈추게 하는것
}});
//$('.app-btn').click(function(){}); 둘이 같은것인데 하나만 쓸 때 작성법
 


//news 움직이기 따라오게 만들기 top 100으로 떨어져있기 때문에 
const newsBanner=$('.news-box-wrap .news-item');
// 하나씩 증가해야 하기떄문에 let
let current = 0;
//전역변수 함수를 한 번만 쓸것이 아니기 떄문에 여러번 호출하려면 
let newsInterval=undefined;

// 즉시실행 함수 ()()
// 실행하라고 호출 호이스팅덕에 됨
newsSlide();
function newsSlide(){
    //2초마다 한번씩 움직이기 setinterval은 함수를 일정 시간동안 반복시키기 위해
    newsInterval=setInterval(function(){
        // current가 현재 0이기떄문에 prev라는 친구에 0이 들어감
        let prev=newsBanner.eq(current);
        newsMove(prev, 0, '-100%');
        current++;
        //만약에 current가 newBanner의 size와 같다면 current를 0으로 돌린다
        if(current==newsBanner.size()) 
        {current=0};
        // next는 current가 1씩 증가하기 때문에 지금의 값은 1이다.
        let next=newsBanner.eq(current);
        newsMove(next, '100%', 0);
    },2000);
}

//매개변수 3개
function newsMove(tg, start, end){
    //값을 넣어주게 되면 들어와서 변수들이 바뀌어지게끔 만들어준다.
    tg.css("top",start).stop().animate({top:end},500);
}



$('.news-box-wrap').hover(function(){
    //마우스를 올리면 멈추기로한것
    clearInterval(newsInterval);
},function(){
    //마우스를 빠져나오면 움직여라
    newsSlide();
})

////////////////////////////btn////////////////////////////////////
// 클릭할 버튼을 넣어둠
const bottomRadius=$('.btn li');
// 클릭하면 내용이 나올 부분
const line=$('.template-line .title li');


bottomRadius.click(function(){
    // on이라는 class 가진 친구들을 다 지움
    bottomRadius.removeClass('on');
    //선택하는 친구에on이라는 친구를 활성화 시킴
    $(this).addClass('on');
    // 클릭한게 몇번째 순번인지?
    let lines=$(this).index();
    // console.log(lines);
    //안에 내용들도 일단 다 지움
    line.removeClass();
    //line의 eq(내가클릭한 순번의)친구에게 class on을 추가시켜준다.
    line.eq(lines).addClass('on');
});


/////////////////////////bannerslide//////////////////////////////////
// 움직일 친구
const slideBanner=$('.bannerArea > .area');

const leftBtn = $('.bLeftBtn');
const rightBtn = $('.bRighttBtn');
const slideList = $('.bannerArea > .area > li');
//li의 width값 알아보기
const slideWidth = slideList.width(); //= 220px
let setIntervalId;

bannerSlide();
function bannerSlide(){
    // 많이 사용해야 함 setIntervalId = setInterval(() => {},2000);
    //한번만 움직임
    setIntervalId = setInterval(function(){
        slideBanner.stop().animate({left:-(slideWidth+15)},500, function(){
            $('.bannerArea > .area > li:first').insertAfter('.bannerArea > .area > li:last');
            slideBanner.css({left:0});
        })
    },2000);
};

//마우스 올리면 슬라이드 멈춤
//마우스 빠져나오면 슬라이드 움직임
slideBanner.hover(function(){
    clearInterval(setIntervalId);
},function(){
    bannerSlide();
});
leftBtn.hover(function(){
    clearInterval(setIntervalId);
},function(){
    bannerSlide();
});     
rightBtn.hover(function(){
    clearInterval(setIntervalId);
},function(){
    bannerSlide();
});         

//오른쪽버튼을 누르면 한칸 씩이동
rightBtn.click(function(){
    slideBanner.stop().animate({left:-(slideWidth+15)},500, function(){
    $('.bannerArea > .area > li:first').insertAfter('.bannerArea > .area > li:last');
    slideBanner.css({left:0});
    })
});

//왼쪽버튼을 누르면 한칸 씩이동
leftBtn.click(function(){
    //먼저 뒤에있는 친구들을 앞으로 와주게해야함
    $('.bannerArea > .area > li:last').insertBefore('.bannerArea > .area > li:first');
    //다시 움직이게 함
    slideBanner.css({left:-(slideWidth+15)});
    slideBanner.stop().animate({left:0},500);
});

//swiper demos 사용한 곳
var swiper = new Swiper(".mySwiper", {
    // slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        // when window width is >= 720px
        480: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        // when window width is >= 640px
        720: {
          slidesPerView: 4,
          spaceBetween: 40
        }
    }
  });
// bx slider 사용한 곳
  $('.bxslider').bxSlider(
    {mode: 'fade',
     parger: true,
    }
  );
// $('.bxslider').bxSlider({
//     auto: true,
//     autoControls: true,
//     stopAutoOnClick: true,
//     pager: true,
//     slideWidth: 600
//   });