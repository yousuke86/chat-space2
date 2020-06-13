$(function(){

  function buildHTML(message){
    if(message.image){
      let html = `<div class="message-items">
                    <div class="message-items__info">
                      <div class="message-items__info--name">
                        ${message.user_name}
                      </div>
                      <div class="message-items__info--date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-items__text">
                      ${message.body}
                      <img src=${message.image}>
                    </div>
                  </div>`
    return html;
    } else {
      let html = `<div class="message-items">
                    <div class="message-items__info">
                      <div class="message-items__info--name">
                        ${message.user_name}
                      </div>
                      <div class="message-items__info--date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-items__text">
                      ${message.body}
                    </div>
                  </div>`
    return html;
    };
  }


  $('#new_message').on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message);
      $('.main-chat__messages').append(html);
      $('form')[0].reset();
      $('.send-btn').prop('disabled',false);
      $('.main-chat__messages').animate({scrollTop: $('.main-chat__messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });
});