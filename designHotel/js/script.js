// 1090에 햄버거를 눌르면 모바일 메뉴가 나오게 하는것
$('.appbarBt').click(function(){
    $('.mobile-menu').stop().animate({left:0+'%'},500);
    // 상단메뉴를 밀어내면서 나옴
    $('.header-mobile-menu-bar> div').stop().animate({left:100+'%'},500);
});
$('.appbarCloseBt').click(function(){
    $('.mobile-menu').stop().animate({left:-100+'%'},500);
    // 상단메뉴를 밀어내면서 나옴
    $('.header-mobile-menu-bar> div').stop().animate({left:0+'%'},500);
});


/////////////////////////////// section3 tab///////////////////////////////////////////
// 누르는 버튼들
let tabs=$('.section3-tabMenu > ul > li');
//바뀔 내용들
let tabContents=$('.section3-gallery-wrap > div');

// 내가 클릭하는 친구들
tabs.on('click', function(){
    // 내가 선택한 친구들을 tg에 넣음
    let tg=$(this);
    // 내가 선택한 친구에 인덱스를 i에 넣음
    let i=tg.index();
    //console.log(i);

    // 모든친구들이 갖고있는 addTab을 지워라
    tabs.find('>a').removeClass('addTab');
    // 내가 선택한 친구의 a의 addTab을 추가시켜라
    tg.find(">a").addClass('addTab');

    // 클릭하는 친구의 비디오들을 다 지우고
    tabContents.css({display:'none'});
    // 내가 선택한 친구(i번째) 있는 비디오들을 바꿔라
    tabContents.eq(i).css('display','block');
});