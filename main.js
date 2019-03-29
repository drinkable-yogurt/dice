'use strict';

$(function() {
    const sound = $('#sound');

    $('#template li').on('click', function() {
        $('#count').val(parseInt($(this).children('.count').text()));
        $('#side').val(parseInt($(this).children('.side').text()));
    });

    $('#enter').on('click', function() {
        const count = $('#count').val();
        const side = $('#side').val();

        sound[0].currentTime = 0;
        sound[0].volume = $('#volume').val();
        sound[0].play();
        
        $('#dice').empty();

        let high = 'blue';
        let low = 'red';
        if($('#color').prop("checked")) {
            high = 'red';
            low = 'blue';
        }

        let sum = 0;
        for(let i = 0; i < count; i++) {
            const temp = Math.floor(Math.random() * side) + 1;
            sum += temp;

            let style = '';
            
            if(temp == 1) {
                style = 'class="' + low + '"';
            } else if(temp == side) {
                style = 'class="' + high + '"';
            }

            $('#dice').append('<li ' + style + '>' + temp +'</li>');
            console.log(temp);
        }

        switch(sum) {
            case 1 * count:
                $('#sum').removeClass(high).addClass(low);
                break;
            case side * count:
                $('#sum').removeClass(low).addClass(high);
                break;
            default:
                $('#sum').removeClass(high).removeClass(low);
        }

        console.log(sum);
        $('#sum').text(sum);
    });
});