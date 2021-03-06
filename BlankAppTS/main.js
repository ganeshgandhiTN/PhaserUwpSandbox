var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PhaserSandboxUwp;
(function (PhaserSandboxUwp) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image("progressbar", "images/vu.png");
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            this.game.state.start('splash', true, false);
        };
        return Boot;
    }(Phaser.State));
    PhaserSandboxUwp.Boot = Boot;
})(PhaserSandboxUwp || (PhaserSandboxUwp = {}));
var PhaserSandboxUwp;
(function (PhaserSandboxUwp) {
    var TheGame = (function (_super) {
        __extends(TheGame, _super);
        function TheGame(config) {
            _super.call(this, config);
            this.state.add('boot', PhaserSandboxUwp.Boot);
            this.state.add('splash', PhaserSandboxUwp.Splash);
            this.state.add('title', PhaserSandboxUwp.Title);
            this.state.start('boot');
        }
        return TheGame;
    }(Phaser.Game));
    PhaserSandboxUwp.TheGame = TheGame;
})(PhaserSandboxUwp || (PhaserSandboxUwp = {}));
function startApp() {
    var gameWidth = 800;
    var gameHeight = 600;
    // There are a few more options you can set if needed, just take a look at Phaser.IGameCongig
    var gameConfig = {
        width: gameWidth,
        height: gameHeight,
        renderer: Phaser.AUTO,
        parent: '',
        resolution: 1,
        forceSetTimeOut: false
    };
    var game = new PhaserSandboxUwp.TheGame(gameConfig);
}
window.onload = function () {
    startApp();
};
var PhaserSandboxUwp;
(function (PhaserSandboxUwp) {
    var Splash = (function (_super) {
        __extends(Splash, _super);
        function Splash() {
            _super.apply(this, arguments);
        }
        Splash.prototype.preload = function () {
            this.progressbar = this.add.sprite(200, 250, "progressbar");
            this.load.setPreloadSprite(this.progressbar);
            this.load.image("splash", "images/atari_fujilogo.png");
            this.load.image("title", "images/catastrophi.png");
            this.load.spritesheet("button", "images/flixel-button.png", 80, 20);
            this.load.bitmapFont("nokia", "fonts/nokia16black.png", "fonts/nokia16black.xml");
            this.load.audio("sfx", ["sounds/fx_mixdown.mp3"]);
        };
        Splash.prototype.create = function () {
            var tween = this.add.tween(this.progressbar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startTitle, this);
        };
        Splash.prototype.startTitle = function () {
            this.game.state.start('title');
        };
        return Splash;
    }(Phaser.State));
    PhaserSandboxUwp.Splash = Splash;
})(PhaserSandboxUwp || (PhaserSandboxUwp = {}));
var PhaserSandboxUwp;
(function (PhaserSandboxUwp) {
    var Title = (function (_super) {
        __extends(Title, _super);
        function Title() {
            _super.apply(this, arguments);
        }
        Title.prototype.preload = function () {
        };
        Title.prototype.create = function () {
            this.game.add.image(0, 0, "title");
            //	Here we set-up our audio sprite
            this.fx = this.game.add.audio("sfx");
            this.fx.allowMultiple = true;
            //	And this defines the markers.
            //	They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.
            //	You can also set the volume and loop state, although we don't use them in this example (see the docs)
            this.fx.addMarker("alien death", 1, 1.0);
            this.fx.addMarker("boss hit", 3, 0.5);
            this.fx.addMarker("escape", 4, 3.2);
            this.fx.addMarker("meow", 8, 0.5);
            this.fx.addMarker("numkey", 9, 0.1);
            this.fx.addMarker("ping", 10, 1.0);
            this.fx.addMarker("death", 12, 4.2);
            this.fx.addMarker("shot", 17, 1.0);
            this.fx.addMarker("squit", 19, 0.3);
            //	Make some buttons to trigger the sounds
            this.makeButton("alien death", 600, 100);
            this.makeButton("boss hit", 600, 140);
            this.makeButton("escape", 600, 180);
            this.makeButton("meow", 600, 220);
            this.makeButton("numkey", 600, 260);
            this.makeButton("ping", 600, 300);
            this.makeButton("death", 600, 340);
            this.makeButton("shot", 600, 380);
            this.makeButton("squit", 600, 420);
        };
        Title.prototype.makeButton = function (name, x, y) {
            var button = this.game.add.button(x, y, "button", this.click, this, 0, 1, 2);
            button.name = name;
            button.scale.set(2, 1.5);
            button.smoothed = false;
            var text = this.game.add.bitmapText(x, y + 7, "nokia", name, 16);
            text.x += (button.width / 2) - (text.textWidth / 2);
        };
        Title.prototype.click = function (button) {
            this.fx.play(button.name);
        };
        return Title;
    }(Phaser.State));
    PhaserSandboxUwp.Title = Title;
})(PhaserSandboxUwp || (PhaserSandboxUwp = {}));
