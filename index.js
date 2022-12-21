const canvas = document.querySelector('canvas') // the element canvas
const c = canvas.getContext('2d') // the context for the canvas (2d because it's a 2d game)

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height) // creates a rectangle that can be used to "paint" the canvas

const gravity = .7

// POO
class Sprite {
    constructor({position, velocity}) {
        // a function that is fired every time you create a new object
        // adding the {} makes it all one object, and now it doesn't matter the order of parameters, since
        // they are now named parameters
        this.position = position;
        // because each sprite might have a different position, we receive its position as a parameter
        // and assign it to the this.position variable 
        this.velocity = velocity
        // so the characters can move
        this.height = 150
        this.lastKey
        // tracks which was the last key pressed so, even if both are being pressed, the character moves
        // accordingly to the last key pressed
    }

    // gives the sprite an appearance
    draw() {
        c.fillStyle = 'red'
        // x position, y position, width and height
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    
    update() {
        // updates the sprite whenever it moves
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        // its vertical position receives this.velocity.y plus itself each time update() is called
        // but zero plus zero is still zero
        if(this.position.y + this.height +this.velocity.y >= canvas.height) {
            // this.position.y marks the top of the character
            // so if we add this.height, it's the bottom
            // when the character hits the bottom, we want it to stop
            this.velocity.y = 0
        } else this.velocity.y += gravity
        // gravity to close the gap between the character and the ground to make sure that,
        // as long as there is space between the character and bottom of canvas, it 
        // continues falling
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
        // the sprite is not moving by default
    },
})

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
});

console.log(player)

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
}

// gives the sprites animations
// a loop
// go crazy go dumb
function animate() {
    window.requestAnimationFrame(animate)
    // 'black' to keep the background black
    c.fillStyle = 'black'
    // this "fill" sort of erases the previous draw() so the character looks like it's actually 
    // falling, not extending forever
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    // default values
    player.velocity.x = 0
    enemy.velocity.x = 0

    // player 1
    if(keys.a.pressed && player.lastKey === 'a') {
        // moves to the left
        player.velocity.x = -5
    } else if(keys.d.pressed && player.lastKey === 'd') {
        // moves to the right
        player.velocity.x = 5
    }

    // player 2
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        // moves to the left
        enemy.velocity.x = -5
    } else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        // moves to the right
        enemy.velocity.x = 5
    }
}

animate()

// keydown => when any key on the keyboard is pressed
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    // event.key => shows which key the player pressed
    switch(event.key) {
        // player 1
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
    }
    switch(event.key) {
        // player 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
    }
    console.log(event.key)
})

// keyup => when the player lets go of the key
window.addEventListener('keyup', (event) => {
    switch(event.key) {
        // player 1
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    switch(event.key) {
        // player 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
    console.log(event.key)
})