 
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
c.font = "30px Arial";
canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', (event) => {
  
  //pause button
  if(mouse.x > x_pause && mouse.y > y_pause && mouse.x < x_pause+dx_pause && mouse.y < y_pause + dy_pause){
    paused = (paused +1 ) % 2
  }

  //restart button
  if(mouse.x > x_restart && mouse.y > y_restart && mouse.x < x_restart+dx_restart && mouse.y < y_restart + dy_restart){
    paused = 1
    for(let k=0; k<N;k++){
      for(let l=0;l<N;l++){
        grid[k][l] = grid_save[k][l]
      }
    }
  }

  //restart all button
  if(mouse.x > x_restart && mouse.y > y_restart + 1.5*dy_restart && mouse.x < x_restart+dx_restart && mouse.y < y_restart + 1.5*dy_restart + dy_restart){
    paused = 1
    grid = Array(N).fill(0).map(()=>Array(N).fill(0))
  }

  //save button
  if(mouse.x > x_save && mouse.y > y_save && mouse.x < x_save+dx_save && mouse.y < y_save  + dy_save){
    //record when save button is pressed so a timed color change of the button can occur
    save_point = count_anim
    for(let k=0; k<N;k++){
      for(let l=0;l<N;l++){
        grid_save[k][l] = grid[k][l]
      }
    }
  }

})

addEventListener('mousedown', (event) => {
  console.log(event.which)

  if (event.which === 1){
    leftPressed = 1
  }
})

addEventListener('mouseup', (event) => {
  if (event.which === 1){
    leftPressed = 0
  }
})


addEventListener('keydown', (event) => {

  const keyName = event.key
  if (keyName === "Shift"){
    shiftPressed = 1
  }
})

addEventListener('keyup', (event) => {

  const keyName = event.key
  if (keyName === "Shift"){
    shiftPressed = 0
  }
})


function drawMatrix(matrix){

  for(let i=0; i < N; i++){
    for(let j = 0; j < N; j++){
      x = canvas.width/N*i
      y = canvas.height/N*j
      
      c.beginPath()
      c.rect(x, y, x_size-1, y_size-1, false)
      
      c.fillStyle = colors[matrix[i][j]]
      c.fill()
      c.closePath()
    }
  }
}

function drawStartButton(){

  c.beginPath()
  c.rect(x_start,y_start,dx_start,dy_start , false)   
  c.fillStyle = "green"
  c.fill()
  c.closePath()

  c.beginPath()
  c.moveTo(x_start+1/3*dx_start,y_start+1/5*dy_start)
  c.lineTo(x_start+1/3*dx_start,y_start+4/5*dy_start)
  c.lineTo(x_start+4/5*dx_start,y_start+1/2*dy_start)
  c.lineTo(x_start+1/3*dx_start,y_start+1/5*dy_start)

  c.strokeStyle = "black"
  c.lineWidth = 2
  c.stroke()
}

function drawPauseButton(){
  c.beginPath()
  c.rect(x_pause,y_pause,dx_pause,dy_pause , false)   
  c.fillStyle = "red"
  c.fill()
  c.closePath()

  c.beginPath()
  c.moveTo(x_start+1/3*dx_start,y_start+1/5*dy_start)
  c.lineTo(x_start+1/3*dx_start,y_start+4/5*dy_start)
  
  c.moveTo(x_start+2/3*dx_start,y_start+1/5*dy_start)
  c.lineTo(x_start+2/3*dx_start,y_start+4/5*dy_start)
  

  c.strokeStyle = "black"
  c.lineWidth = 2
  c.stroke()

}

function drawRestartButton(){

  c.beginPath()
  c.rect(x_restart,y_restart,dx_restart,dy_restart , false)   
  c.fillStyle = "blue"
  c.fill()
  c.closePath()

  c.beginPath()
  c.arc(x_restart+1/2*dx_restart,y_restart+1/2*dy_restart,0.4*dy_restart,0,2*Math.PI)
  c.strokeStyle = "white"

  c.stroke()
}

function drawRestartAllButton(){

  c.beginPath()
  c.rect(x_restart,y_restart+1.5*dy_restart,dx_restart,dy_restart , false)   
  c.fillStyle = "purple"
  c.fill()
  c.closePath()

  c.beginPath()
  c.arc(x_restart+1/2*dx_restart,y_restart+1.5*dy_restart+1/2*dy_restart,0.4*dy_restart,0,2*Math.PI)
  c.strokeStyle = "white"

  c.stroke()
}

function drawSaveButton(){

  c.beginPath()
  c.rect(x_save,y_save,dx_save,dy_save , false)   
  c.fillStyle = "yellow"
  c.fill()
  c.closePath()

  if((count_anim - save_point) < 5){
    c.beginPath()
    c.rect(x_save,y_save,dx_save,dy_save , false)
    c.fillStyle = "red"
    c.fill()
    c.closePath()
  }
}

function clearBoundary(){
  for(let k=0; k<N; k++){
    grid[k][0] = 0
    grid[k][1] = 0
    grid[k][N-1] = 0
    grid[k][N-2] = 0
    grid[0][k] = 0
    grid[1][k] = 0
    grid[N-1][k] = 0
    grid[N-2][k] = 0
  }

}




function init() {

  let i_0 = 10
  let j_0 = 10

  grid[i_0+1][j_0] = 1
  grid[i_0+2][j_0] = 1
  grid[i_0+3][j_0] = 1
  grid[i_0+4][j_0] = 1
  grid[i_0+4][j_0+1] = 1
  grid[i_0+4][j_0+2] = 1
  grid[i_0+3][j_0+3] = 1
  grid[i_0][j_0+1] = 1
  grid[i_0][j_0+3] = 1
  
  drawMatrix(grid)

}




// Implementation
const colors = ['white','black']

const anim = 1
const pbc = 1
const N = 80
const x_size = canvas.width/N
const y_size = canvas.height/N
const n_draw = 1

let leftPressed = 0
let shiftPressed = 0
let paused = 1
let count = 1
let save_point
let count_anim = 0
let grid = Array(N).fill(0).map(()=>Array(N).fill(0))
let grid_temp = Array(N).fill(0).map(()=>Array(N).fill(0))
let grid_start = Array(N).fill(0).map(()=>Array(N).fill(0))
let grid_save = Array(N).fill(0).map(()=>Array(N).fill(0))


let x_start=0.92*canvas.width
let dx_start=0.03*canvas.width
let y_start= 0.92*canvas.height
let dy_start=0.03*canvas.height
const x_pause=0.92*canvas.width
const dx_pause=0.03*canvas.width
const y_pause= 0.92*canvas.height
const dy_pause=0.03*canvas.height
let x_restart=0.92*canvas.width
let dx_restart=0.03*canvas.width
let y_restart= 0.04*canvas.height
let dy_restart=0.03*canvas.height
let x_save=0.03*canvas.width
let dx_save=0.03*canvas.width
let y_save= 0.04*canvas.height
let dy_save=0.03*canvas.height



// Animation Loop
function animate() {
  
  requestAnimationFrame(animate)
  c.clearRect(0,0,canvas.width,canvas.height);

  if (paused === 1){


    if(leftPressed === 1){
      let i_start = Math.floor(mouse.x/(canvas.width/N))
      let j_start = Math.floor(mouse.y/(canvas.height/N))

      if (shiftPressed === 1){
        grid[i_start][j_start] = 0
      }
      else{
        grid[i_start][j_start] = 1
      }

      if(mouse.x > x_save && mouse.y > y_save && mouse.x < x_save+dx_save && mouse.y < y_save  + dy_save){
        grid[i_start][j_start] = 0
      }
    }

    drawMatrix(grid)

    //draw red pause button during initialization
    drawStartButton()

  }

  else{
    

    //build a copy of grid so every site is updated with the old configuration
    for(let k=0;k<N;k++){
      for(let l=0;l<N;l++){
        grid_temp[k][l] = grid[k][l]
      }
    }

    //grid_temp = grid
    if (count % n_draw === 0){

      for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){

          let i_left = (i-1+N) % N
          let i_right = (i+1) % N 
          let j_up = (j-1+N) % N
          let j_down = (j+1) % N

          let g_ij = grid_temp[i][j]
          let neighbors = grid_temp[i_left][j_up] + grid_temp[i_left][j] + grid_temp[i_left][j_down] + grid_temp[i][j_up] + grid_temp[i][j_down] + grid_temp[i_right][j_down] + grid_temp[i_right][j] + grid_temp[i_right][j_up]  

          if ((g_ij === 0) && (neighbors===3)){
            grid[i][j] = 1

          }
          else if (g_ij === 1 && (neighbors===2 || neighbors===3)){
            grid[i][j] = 1
          }
          else{
            grid[i][j] = 0
          }
        }
      }
    }
  
  if(pbc === 0 && count % 2 === 0){
    clearBoundary()
  }

  drawMatrix(grid)
  //Draw green pause button while animation is running
  drawPauseButton()
  count += 1
  }

 //Draw blue restart button to clear simulation and pause
 drawRestartButton()
 drawRestartAllButton()
 drawSaveButton()

  count_anim += 1
}


init()
if (anim === 1){
  animate()
}








