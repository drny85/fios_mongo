
  $(document).ready(function(){
      //populate the selct options
    $('select').formSelect();

    $('.modal').modal();

    $('#delete_referral_btn').on('click', () => {
       console.log('Clicked');
       $('#form_modal').submit();
    })

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
         } 
      }

    })

    $('#status').on('change', function (e) {
      let optionSelected = $("option:selected", this);
      let valueSelected = this.value;
     
      if (valueSelected.toLowerCase() == 'closed') {
         //code if order is closed
          $('#order_closed').removeClass('hidden');
          $('#mon').attr('required', true);
          $('#due_date').attr('required', true);
          $('#order_date').attr('required', true);
          $('#package').attr('required', true);

      } else {
         //code if order is not closed
         $('#order_closed').addClass('hidden');
         $('#mon').attr('required', false);
         $('#due_date').attr('required', false);
         $('#order_date').attr('required', false);
         $('#package').attr('required', false);
      }
     
     
  });



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
