// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.
// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.
// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.
// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.
// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.
// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.
// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.
// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.
// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.
// None of this is production-quality. Do not use for production. Use as inspiration and guidance for yours.

const $ = window.jQuery = require('jquery');

$('body').on('click', '[data-behavior~="toggleProgressBars"]', function(event) {

  const $bars = $('.fsa-progress');

  if ($bars.is('[style]')) {
    $bars.removeAttr('style');
  } else {
    $bars.css('visibility', 'hidden');
  }

})

$('body').on('click', '[data-behavior~="fakeSystemTrackLoop"]', function(event) {

  const $self = $(this);
  const $target = $('#' + $self.attr('data-target'));
  const $targetValue = $target.closest('.fsa-progress').find('.fsa-progress__value');

  $self.css('visibility','hidden');
  $target.css('transform','scaleX(.03)');
  $targetValue.html('3%');

  for (percentageComplete = 10; percentageComplete <= 97; ++percentageComplete) {
    fakeProgressUpdate(percentageComplete);
  }

  function fakeProgressUpdate(percentageComplete) {

    setTimeout(function(){
      // console.log("'percentageComplete' is " + percentageComplete + ", and 'delay' is " + (66 * percentageComplete));
      $target.css('transform','scaleX(.' + percentageComplete +')');
      $target.html(percentageComplete + '%');
      $targetValue.html(percentageComplete + '%');
    }, 66 * percentageComplete);

  }

  setTimeout(function(){
    $target.html('100%');
    $targetValue.html('100%');
    $target.css('transform','scaleX(1)');
    $self.removeAttr('style');

    $('#UNIQUE-ID-ttfrancbra').attr('aria-hidden', 'false');

  }, 7000);

})

$('body').on('click', '[data-behavior~="fakeTableDone"]', function(event) {
  $('#tableProgress').hide();
})

$('body').on('click', '[data-behavior~="fakeTableShow"]', function(event) {
  $('#tableProgress').removeAttr('style');
})

console.log('ProgressComponent loaded, its JS is NOT to be used for Production, demo purposes only');1
