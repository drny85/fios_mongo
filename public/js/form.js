
  $(document).ready(function(){
      //populate the selct options
    $('select').formSelect();

    //populate zipcode
    $('#zipcode').keyup(function(){
      let value = this.value;
      let city = $('#city').val();
      if (value.length >= 3) {
         if (value == '104') {
            $('#city').val('Bronx');
         } else if (value == '107') {
            $('#city').val('Yonkers');
         }  else if (value == '100') {
            $('#city').val('Manhattan');
         } else {
            $('#city').val('');
         }
      }

    })


    $('#comment').val('');
    M.textareaAutoResize($('#comment'));

    

    

  });

  function formatPhone(obj) {
    var numbers = obj.value;
    numbers.replace(/\D/g, '');
        char = {0:'(',3:') ',6:'-'};
    obj.value = '';
    for (var i = 0; i < numbers.length; i++) {
        obj.value += (char[i]||'') + numbers[i];
    }
}
