new Vue({
    el: '#app',

    data: {
        ws: null,
        newMsg: '',
        chatContent: '',
        username: null,
        joined: false,
        password: null,
        auth: false
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
        this.auth = false;
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
            this.auth = false;
        },

        join: function () {
            if (!this.username) {
                Materialize.toast('You must choose a username', 2000);
                return
            }
            this.username = $('<p>').html(this.username).text();
            this.joined = true;
            this.auth = false;
        },

        exit: function () {
            this.joined = false;
            this.auth = false;
        }

        auth: function() {
            if (!this.auth) {
                Materialize.toast('You must center the password', 2000);
                return
            }
            this.password = $('<p>').html(this.password).text();
        }

    }
});
