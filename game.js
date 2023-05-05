
const background_width = 768

// delta time
export default class Game {

    constructor(ctx) {

        this._draw_scaling = 1;
        this._setup_canvas(ctx);

        this._gravity = 0.5 * this._draw_scaling;
        this._speed = 5.5 * this._draw_scaling;
        this._increased_speed = this._speed;

        this.ground_collision = this.SCREEN_SIZE[1] - 150 * (this._draw_scaling / 1.5);

        this.scoreboard = {
            currentScore : 0,
            bestScore : 0,
            attempts : 0
        }
    }

    _setup_canvas(ctx) {

        this.SCREEN_SIZE = [window.innerWidth, background_width];

        if (window.innerHeight > this.SCREEN_SIZE[1]) {
            this.SCREEN_SIZE[1] = window.innerHeight;
            this._draw_scaling = this.SCREEN_SIZE[1] / background_width;
        }
        
        console.log(`res: ${this.SCREEN_SIZE[0]}x${this.SCREEN_SIZE[1]}`);

        ctx.canvas.width = this.SCREEN_SIZE[0];
        ctx.canvas.height = this.SCREEN_SIZE[1];
    }

    draw_scoreboard(ctx) {

        let Y_position = 125 * this._draw_scaling;
		let txt = this.scoreboard.currentScore;
		ctx.font = `${80 * this._draw_scaling}px 'Press Start 2P'`;
		ctx.strokeStyle = "#553847";
		ctx.lineWidth = 6 * this._draw_scaling;
		ctx.strokeText(txt, this.SCREEN_SIZE[0] / 2 - (ctx.measureText(txt).width / 2), Y_position);
		ctx.fillStyle = "#fefefe";
		ctx.fillText(txt, this.SCREEN_SIZE[0] / 2 - (ctx.measureText(txt).width / 2), Y_position);

    }

    get draw_scaling() {
        return this._draw_scaling;
    }

    get gravity() {
        return this._gravity;
    }

    get speed() {
        return this._speed;
    }

    get increased_speed() {
        return this._increased_speed;
    }

    set increase_speed(speed) {
        this._increased_speed = speed;
    }

    increase_score() {
        this.scoreboard.currentScore++;
        this.scoreboard.bestScore = Math.max(this.scoreboard.bestScore, this.scoreboard.currentScore)
    }

    reset_game() {
        this.scoreboard.currentScore = 0;
        this.scoreboard.attempts++;
        
        this._increased_speed = this._speed;
    }
}