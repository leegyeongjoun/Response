$(function(){
    let winH=$(window).innerHeight(); // innerHeight = 패딩값 높이값 다 포함 화면에 보이는 창 높이
    let winW=$(window).innerWidth(); //innerWidth = 윈도우 창의 넓이
    let vidH=$('#mainVideo').innerHeight(); // 비디오가 가지는 높이값
    let vidW=$('#mainVideo').innerWidth(); // 비디오가 가지는 넓이값
    console.log(winH);//959
    console.log(winW);//1895
    console.log(vidH);//948
    console.log(vidW);//1895
    let videoPlay='on'; //기본 켜진상태(화면재생)
    let soundMuted='off';// 기본 꺼진상태(음소거)
    let setIn;// clearIntaval을 쓰기위해서 변수만 선언


    // 가져오려면 get이 필요함
    $('#mainVideo').get(0).autoplay=true;//움직이게 하는 것 호환성때문에 코딩
    // muted하면 autoplay가 안됨
    $('#mainVideo').get(0).muted=true;//소리를 끄기 
    //$('#mainVideo').get(0).muted=false;//소리를 켜기 
    $('#mainVideo').get(0).loop=0;// loop=0 비디오를 한 번만 재생하기 
    //$('#mainVideo').get(0).loop=1; loop=1 비디오를 연속 재생하기 
    

    //다시보기 버튼을 눌를 때
    $('.watchagainBt').on({
        click:function(){
            videoPlay='on';
            $('#mainVideo').get(0).play();
            $('.playPauseIconBt').find('img').attr('src','./img/icon-player-pause.png');
            $('.section1-watch-again').hide();
        }
    });
    // 검은색 화면 없애기


    //윈도우창에서 사이즈가 움직일 때 마다
    $(window).resize(function(){
        vidieoResizeFn();

    });
    setInterval(vidieoResizeFn, 100); //줄이는 순간순간 사이즈를 맞춰주려고
    //사이즈를 줄이기위해
    function vidieoResizeFn(){
        winH=$(window).innerHeight();
        winW=$(window).innerWidth();
        vidH=$('#mainVideo').innerHeight();
        vidW=$('#mainVideo').innerWidth();

        // 높이를 %로 받으려고
        $('.section1-video').css({window:100+'%', height:winH});
        if(winH > vidH){
            $('#mainVideo').css({width:'auto', height: winH});
        }
        if(winW>vidW){
            $('#mainVideo').css({width:winW, height: 'auto'});
        }
        // 화면이 줄어들 때 딱 맞게 보이게하려고
        $('#mainVideo').css({marginTop:(winH-vidH)/2, marginLeft:(winW-vidW)/2});
    }

    ////////////////////// 가운데 버튼을 누르면 내용 보이게하기
   $('.nextIconBt').on({click:function(){
        // offset은 top과 left값을 가져온다
        let section2=$('#section2').offset().top;
        console.log(section2);
        // 양수는 밑으로 음수는 위로 올라간다.
        // 자바스크립트는 scrollby
        $('html, body').animate({scrollTop:section2},1000);
   }})

    // 동영상 제어
    $('.playPauseIconBt').on({
        click:function(){
            if(videoPlay=='on'){
                $('#mainVideo').get(0).pause();
                //참 거짓을 바꿔줘야 눌를 때 멈추고 다시 눌르면 재생
                videoPlay='off'
                // 내가 선택한 친구의 하위의 img 속성(attr) 인덱스 기준으로 경로설정
                $(this).find('img').attr('src','./img/icon-player-play.png');    
            }else{
                $('#mainVideo').get(0).play();
                videoPlay='on'
                $(this).find('img').attr('src','./img/icon-player-pause.png');
                $('.section1-watch-again').hide();
            }
        }
    });
    // 음소거 
    $('.mutedIconBt').on({
        click:function(){
        if(soundMuted=='off'){
            $('#mainVideo').get(0).muted=false;
            soundMuted='on'
            $(this).find('i').attr('class','fas fa-volume-mute');
        }else{
            $('#mainVideo').get(0).muted=true;
            soundMuted='off'
            $(this).find('i').attr('class', 'fas fa-volume-off');
        }
    }});



    // 비디오가 언제 끝나는지 알아야 다시 재생하는 버튼을 띄우기 때문에
    videoTimeCountFn()
    setin = setInterval(videoTimeCountFn,100)
    function videoTimeCountFn(){
       //console.log('현재진행 비디오시간:' + $('#mainVideo').get(0).currentTime);//현재 계속 바뀌는 시간초
        //console.log('전체 비디오시간:' + $('#mainVideo').get(0).duration);//37초      
        //console.log('비디오 정지 여부' + $('#mainVideo').get(0).ended);//37초   true false값
        
    
        if($('#mainVideo').get(0).ended==true){
        //if($('#mainVideo').get(0).currentTime)==$('#mainVideo').get(0).duration) 같은방법
            $('.section1-watch-again').show();
            // section1-watch-again 나오면 재생버튼으로 바꾸어줘야함
            $('.playPauseIconBt').find('img').attr('src','./img/icon-player-play.png');
            videoPlay='off';
            clearInterval(setIn);
        }
    };
});