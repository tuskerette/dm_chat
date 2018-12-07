$('#app').hide();
$('#auth-form').on('submit', function(e) {
    e.preventDefault();
    if($('#password').val() == window.password) {
        $('#auth-form').hide();
        $('#app').show();
    }
})

new Vue({
    el: '#app',

    data: {
        ws: null, // websocket
        newMsg: '',
        chatContent: '',
        username: null,
        joined: false
    },

    created: function() {
        var self = this;
        this.ws = new WebSocket('ws://' + window.location.host + '/ws');
        this.ws.addEventListener('message', function(e) {
            var msg = JSON.parse(e.data);
            self.chatContent += '<div class="chip">'
                    + msg.username
                + '</div>'
                + emojione.toImage(msg.message) + '<br/>'; // Parse emojis

            var element = document.getElementById('chat-messages');
            element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
        });
    },

    methods: {
        send: function () {
            if (this.newMsg != '') {
                this.ws.send(
                    JSON.stringify({
                        username: this.username,
                        message: $('<p>').html(this.newMsg).text() // Strip out html
                    }
                ));
                this.newMsg = ''; // Reset newMsg
            }
        },

        join: function () {
            if (!this.username) {
                Materialize.toast('You must choose a username', 2000);
                return
            }
            $('.brand-logo').append(' ::: Logged in as: '+this.username);
            this.joined = true;
        },

        exit: function () {
            this.joined = false;
        },

        enter_password: function () {
            this.password
        }

    }
});
