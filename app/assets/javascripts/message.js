$(function(){

  function buildHTML(message){
    if(message.image){
      let html = `<div class="message-items" data-message-id=${message.id}>
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
      let html = `<div class="message-items" data-message-id=${message.id}>
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


  let reloadMessages = function(){
    let last_message_id = $('.message-items:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i,message){
          insertHTML = insertHTML + buildHTML(message)
        });
        $('.main-chat__messages').append(insertHTML);
        $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});