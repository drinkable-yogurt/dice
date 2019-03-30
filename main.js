'use strict';

function dice(side) {
    return Math.floor(Math.random() * side) + 1;
}

function show(array) {
    let high = 'blue';
    let low = 'red';
    if($('#color').prop("checked")) {
        high = 'red';
        low = 'blue';
    }

    const count = array.length;
    const side = $('#side').val();

    let sum = 0;
    $('#dice').empty();
    array.forEach((value, index, array) => {
        let style = '';
        
        if(value == 1) {
            style = 'class="' + low + '"';
        } else if(value == side) {
            style = 'class="' + high + '"';
        }
        sum += value;
        $('#dice').append('<li ' + style + '>' + value +'</li>');
    });

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
    
    sum += parseInt($('#correction').val());

    $('#sum').text(sum);
}

function main() {
    const sound = $('#sound');

    sound[0].currentTime = 0;
    sound[0].volume = $('#volume').val();
    sound[0].play();

    const count = $('#count').val();
    const side = $('#side').val();

    result = new Array(count);

    for(let i = 0; i < count; i++) {
        result[i] = dice(side);
    }

    console.log(result);
    show(result);
}

let result;

$(function() {
    
    $('#template li').on('click', function() {
        $('#count').val(parseInt($(this).children('.count').text()));
        $('#side').val(parseInt($(this).children('.side').text()));
        $('#correction').val(0);
        main();
    });

    $('#invert').on('click', function() {
        if($('#side').val() != 6) {
            alert('反転機能は六面ダイスでのみ利用可能です');
            return;
        }

        result = result.map((value, index, array) => {
            return 7 - value;
        });

        console.log(result);
        show(result);
    });

    $('#enter').on('click', function() {
        main();
    });
});