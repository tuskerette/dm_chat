new Vue({
    el: '#app',

    data: {
      ws: null, // websocket
      newMsg: '',
      chatContent: '',
      username: null,
      joined: false
      // onlineUsers: ''
    },

    created: function() {
      var self = this;
      this.ws = new WebSocket('wss://' + window.location.host + '/ws'); //remember to put back 'wss://' when deploying!!! use 'ws://' in development
      this.ws.addEventListener('message', function(e) {
        var msg = JSON.parse(e.data);
        self.chatContent += '<div class="chip">'+ msg.username +'</div>'+ msg.message +'<br/>';
        var element = document.getElementById('chat-messages');
        element.scrollTop = element.scrollHeight;
      });
    },

    methods: {
      send: function () {
        if (this.newMsg != '') {
          this.ws.send(
            JSON.stringify({
              username: this.username,
              message: $('<p>').html(this.newMsg).text()
            }
          ));
          this.newMsg = '';
        }
      },
      join: function () {
        if (!this.username) {
          Materialize.toast('You must choose a username', 2000);
          return
        }
        document.getElementById('logged-in-as').innerHTML = 'Logged in as: '+this.username;
        this.joined = true;
      },
      exit: function () {
        this.joined = false;
      }
    }
});
