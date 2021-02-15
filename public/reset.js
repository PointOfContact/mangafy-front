$(document).ready(() => {
  let isValid = false;
  $('#passwordForm').submit(function (event) {
    event.preventDefault(); // prevent default action
    if (!isValid) {
      return;
    }
    const post_url = `${'https://mangafy.club' + '/'}${$(this).attr('action')}`; // get form action url
    const password = $(this).find("input[name='password1']").val();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    $.post(
      post_url,
      {
        action: 'resetPwdLong',
        value: {
          token,
          password,
        },
        notifierOptions: {},
      },
      (response) => {
        window.location.href = `${window.location.origin}/success`;
      }
    );
  });
  $('input[type=password]').keyup(() => {
    if ($('#password1').val().length >= 8) {
      $('#8char').removeClass('glyphicon-remove');
      $('#8char').addClass('glyphicon-ok');
      $('#8char').css('color', '#00A41E');
    } else {
      $('#8char').removeClass('glyphicon-ok');
      $('#8char').addClass('glyphicon-remove');
      $('#8char').css('color', '#FF0004');
    }

    if ($('#password1').val() == $('#password2').val()) {
      $('#pwmatch').removeClass('glyphicon-remove');
      $('#pwmatch').addClass('glyphicon-ok');
      $('#pwmatch').css('color', '#00A41E');
    } else {
      $('#pwmatch').removeClass('glyphicon-ok');
      $('#pwmatch').addClass('glyphicon-remove');
      $('#pwmatch').css('color', '#FF0004');
    }
    isValid = $('#password1').val().length >= 8 && $('#password1').val() == $('#password2').val();
  });
});
