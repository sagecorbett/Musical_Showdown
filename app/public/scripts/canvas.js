// I want this script to run as a plug an play for any page that links it.
// Therefor the styles and creation of the canvas element will all be handled in
// this file
(function(){
// APP COLOR THEME
  const backgroundPrimaryColor = '#f8ca58'
  const colorBlue = '#75d0d5'
  const textPrimary = '#66c6cb'
  const textSecondary = '#fff'
  const colorPink = '#fa6aad'
  const contentSecondaryColor = '#36659a'

  // Get the body, create a canvas element and append the canvas to the body
  const body = document.querySelector('body')
  const canvas = document.createElement('canvas')
  body.appendChild(canvas)
  
  // Add necessary canvas styles
  Object.assign(canvas.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    background: 'linear-gradient(#f8ca58 40%, #75d0d5)'
  })

  // Create a context and a diamonds array. The array is needed to call the 
  // update method on each diamond
  const ctx = canvas.getContext('2d')
  const diamonds = []

  // Initialize by drawing the canvas and calling the animation func
  initialize()
  function initialize(){
    window.addEventListener('resize', draw)
    draw()
    animate()
  }

  // Draw creates the diamonds horizontally and vertically across the page dynamically 
  function draw(){
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    ctx.fillStyle = backgroundPrimaryColor
    ctx.fill()

    // Start i at 25 to account for the width of an idividual diamond. This gives space
    // on both left and right sides
    for(let i = 25; i < ctx.canvas.width; i += 40){
      for(let j = 0; j < ctx.canvas.height; j+= 40){
        // Create a new diamond. Add it to the diamonds array of other created
        // diamonds and draw it onto the canvas.
        let diamond = new Diamond(i, j, i % 2 === 0 ? colorPink : colorBlue )
        diamonds.push(diamond)
        diamond.draw()
      }
    }
  }


  function animate(){
    // clear current diamonds on the page
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    // Redraw the diamonds with their updated width
    for(let i = 0; i < diamonds.length; i++){
      diamonds[i].update()
    }
    requestAnimationFrame(animate)
  }

  function Diamond(x, y, color, dx, dy){
      this.x = x
      this.y = y
      this.width = 25
      this.height = 35
      this.dx = dx
      this.dy = dy

      this.draw = function(){
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, y);
          
          // top left edge
          ctx.lineTo(x - this.width / 2, y + this.height / 2);
          
          // bottom left edge
          ctx.lineTo(x, y + this.height);
          
          // bottom right edge
          ctx.lineTo(x + this.width / 2, y + this.height / 2);
          
          // closing the path automatically creates
          // the top right edge
          ctx.closePath();
          
          // fill diamonds color
          ctx.fillStyle = color;
          ctx.fill();
          ctx.restore();

          // add black border to the diamonds
          ctx.lineWidth = 1;
          ctx.strokeStyle = "black";
          ctx.stroke();
      }

      // Create growing and shrinking effect
      this.update = function(){ 
          // Max width is 35px. If the diamond is smaller than 35 then it will keep growing.
          // otherwise it is not growing and it will shrink to 25px     
          if(this.width <= 35 && this.growing){
            this.width += 0.2
          } 
          else {
            this.growing = false
          }
          
          if(this.width >= 25 && !this.growing){
            this.width -= 0.2
          } else {
            this.growing = true
          }

          this.draw()
      }
  }
})()