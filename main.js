import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'



const scene = new THREE.Scene();

 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight , 0.1 , 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha:true
});

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(2);
camera.position.setX(-1);

const cursor = {x:0,y:0}

window.addEventListener('mousemove',(e)=>{
  cursor.x = e.clientX / window.innerWidth - 0.5
  cursor.y = e.clientY / window.innerHeight - 0.5
})

const textureLoader = new THREE.TextureLoader()

const matcap = textureLoader.load("/matcap.png")
const matcap2 = textureLoader.load("/matcap2.png")
const matcap3 = textureLoader.load("/matcap3.png")
const matcap4 = textureLoader.load("/matcap4.png")



const geo = new THREE.TorusKnotGeometry(0.5,0.2,100,22)

const mat = new THREE.MeshMatcapMaterial({matcap:matcap})
const mat2 = new THREE.MeshMatcapMaterial({matcap:matcap2})
const mat3 = new THREE.MeshMatcapMaterial({matcap:matcap3})
const mat4 = new THREE.MeshMatcapMaterial({matcap:matcap4})

const box = new THREE.Mesh(geo,mat)

box.rotation.y = 0.5

scene.add(box)



const box2 = new THREE.Mesh(geo,mat2)

box2.rotation.y = 0.5
box2.position.z = 3
box2.position.x = -2

scene.add(box2)


const box3 = new THREE.Mesh(geo,mat4)

box3.rotation.y = 0.5
box3.position.z = 5

scene.add(box3)

const box4 = new THREE.Mesh(geo,mat)

box4.rotation.y = 0.5
box4.position.z = 8
box4.position.x = -2

scene.add(box4)

const pointLight = new THREE.PointLight("0xffffff",1) 
pointLight.position.z = 3
scene.add(pointLight)

const tick = () =>{

  window.requestAnimationFrame(tick)

  box.rotation.y += 0.01
  box.rotation.x += 0.002
  

  box2.rotation.y += 0.001
  box2.rotation.x += 0.02

  box3.rotation.y += 0.01
  box3.rotation.x += 0.002

  box4.rotation.y += 0.02
  box4.rotation.x += 0.004

  const camX = cursor.x -1
  const camY = -cursor.y


  camera.position.x += (camX - camera.position.x) / 30
  camera.position.y = (camY - camera.position.y) / 30

  renderer.render(scene,camera)
}
tick()

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.004 + 2;


}

document.body.onscroll = moveCamera