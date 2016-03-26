import Ember from 'ember';

export default Ember.Component.extend({
    isPlaying: false,
    isBuffering: false,
    audio: null,
    radio_url: null,
    create() {
        if (!this.audio) {
            var url = this.radio_url;
            var audio = new Audio(url);
            Ember.set(this, 'audio', audio);
        } else {
            this.audio.src = this.radio_url;
            this.audio.load();
            this.stop_playing();
        }
        this.audio.onplaying = function() {
            console.log("Now playing...");
        };

        this.audio.onerror = function(e) {
            console.log("An error occurred " + e.target.error.code);
        };
    },
    start_playing() {
        Ember.set(this, 'isPlaying', true);
    },
    stop_playing() {
        Ember.set(this, 'isPlaying', false);
    },
    play() {
        if (this.audio) {
            this.audio.load();
            this.audio.play();
            this.start_playing();
            console.log("Started playing..");
        }
    },
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.stop_playing();
        }
    },
    actions: {
        initRadio() {
            this.create();
            this.play();
        },
        clear() {
            this.stop();
            Ember.set(this, 'radio_url', '');
            Ember.set(this, 'audio', null);
        },
        play() {
            this.play();
        },
        stop() {
            this.stop();
        }
    }
});
