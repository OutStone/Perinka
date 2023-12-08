const turning_speed = Math.PI/5;
const speed = 5;
const fight_distance = 1;
class player{
    constructor(start_x, start_y){
        this.x = start_x
        this.y = start_y
        this.angle = Math.PI/4 //in radeans

        this.radius = 1 //in meters
    }
}

class View{
    constructor(lenght, angle){ //in meters and radeans
        this.angle = angle
        this.lenght = lenght
    }
}
//#################################################################-------ENEMY class------############################################
class enemy{
    constructor(start_x, start_y){
        this.x = start_x
        this.y = start_y
        this.angle = 1.75 * Math.PI //in radeans

        this.radius = 1 //in meters
        this.view = new View(15, Math.PI/2) //in meters and radeans

        this.time = new Date();
        this.color = "red"


        this.playerSee = false
        this.playerAngle = 0
    }

    look() {
        const delta = [P1.x - this.x, P1.y - this.y]
        if (Math.sqrt(delta[0]**2 + delta[1]**2) < P1.radius + this.view.lenght) { //colision of two circles

            var limits = [this.angle - (this.view.angle/2), this.angle + (this.view.angle/2)]
            var angle = Math.abs(Math.atan((P1.y-this.y)/(P1.x-this.x)))
            
            
            if (isNaN(angle) && P1.y > this.y) {
                angle = Math.PI/2
            } else if (isNaN(angle)&& P1.y < this.y) {
                angle = 1.5 * Math.PI
            } else if (angle == 0 && P1.x < this.x) {
                angle = Math.PI
            } else if (angle == 0) {
                angle = 0
            } else if (P1.y < this.y) {
                angle = Math.abs(2 * Math.PI) - angle
            } /* else if (P1.x < this.x) {
                angle = Math.abs(2 * Math.PI) - angle
            } */
            console.log(angle)

            if (limits[0] <= angle && limits[1] >= angle) {
                this.color = "green"
                this.playerSee = true
                this.playerAngle = angle

            }
            else {
                this.playerSee = false
                this.playerAngle = 0
                this.color = "red"
            }
            
        }
        else {
            this.playerSee = false
            this.playerAngle = 0
            this.color = "red"
        }
    }
    move() {
        const d = new Date();
        const delta_time = d.getTime() - this.time.getTime();
        this.time = new Date()

        if (this.playerSee) {
            const delta_angle = this.playerAngle - this.angle
            if (delta_angle > 0.1) {

                this.angle += turning_speed * (delta_time / 1000)
                if (this.playerAngle - this.angle < 0) {
                    this.angle = this.playerAngle
                    
                }
            } else if (delta_angle < -0.1) {

                this.angle -= turning_speed * (delta_time / 1000)
                if (this.playerAngle - this.angle > 0) {
                    this.angle = this.playerAngle
                    
                }
            } else {//nearly facing player
                //it can move towards him
                const delta = [P1.x - this.x, P1.y - this.y]
                if (Math.sqrt(delta[0]**2 + delta[1]**2) > P1.radius + this.radius + fight_distance) {
                    const distance = speed * (delta_time / 1000)
                    const change_in_position = [Math.cos(this.angle) * distance, Math.sin(this.angle) * distance * Math.sign(delta[1])]
                    console.log(change_in_position)
                    this.x += change_in_position[0]
                    this.y += change_in_position[1]
                }
            }
        }

    }
}