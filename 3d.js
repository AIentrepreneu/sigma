const blocks = [
  {
    opcode: 'add3DObject',
    blockType: Scratch.BlockType.COMMAND,
    text: 'add object [SHAPE] at x: [X] y: [Y] z: [Z]',
    arguments: {
      SHAPE: {
        type: Scratch.ArgumentType.STRING,
        menu: 'shapesMenu',
        defaultValue: 'sphere',
      },
      X: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: 0,
      },
      Y: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: 0,
      },
      Z: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: 0,
      },
    },
    func: (args) => {
      addObject(args.SHAPE, args.X, args.Y, args.Z);
    },
  },
  {
    opcode: 'playerControl',
    blockType: Scratch.BlockType.COMMAND,
    text: 'move player with arrow keys',
    func: () => {
      controlPlayer();
    },
  },
];

const menus = {
  shapesMenu: ['sphere', 'rectangle', 'cube', 'pyramid'],
};

function addObject(shape, x, y, z) {
  let object = null;

  // Create 3D object based on shape
  if (shape === 'sphere') {
    object = createSphere(x, y, z);
  } else if (shape === 'rectangle') {
    object = createRectangle(x, y, z);
  } else if (shape === 'cube') {
    object = createCube(x, y, z);
  } else if (shape === 'pyramid') {
    object = createPyramid(x, y, z);
  }

  if (object) {
    scene.add(object);
  }
}

function createSphere(x, y, z) {
  const geometry = new THREE.SphereGeometry(1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(x, y, z);
  return sphere;
}

function createRectangle(x, y, z) {
  const geometry = new THREE.BoxGeometry(2, 1, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const rectangle = new THREE.Mesh(geometry, material);
  rectangle.position.set(x, y, z);
  return rectangle;
}

function createCube(x, y, z) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  return cube;
}

function createPyramid(x, y, z) {
  const geometry = new THREE.ConeGeometry(1, 2, 4);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const pyramid = new THREE.Mesh(geometry, material);
  pyramid.position.set(x, y, z);
  return pyramid;
}

function controlPlayer() {
  const speed = 0.1;
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      player.position.z -= speed;
    }
    if (event.key === 'ArrowDown') {
      player.position.z += speed;
    }
    if (event.key === 'ArrowLeft') {
      player.position.x -= speed;
    }
    if (event.key === 'ArrowRight') {
      player.position.x += speed;
    }
  });
}

const extension = {
  blocks,
  menus,
  activate: (runtime) => {
    // This function is called when the extension is activated
    // Set up 3D scene and player
    setupScene();
  },
};

function setupScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Player setup (a simple cube as the player)
  player = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff00ff }));
  scene.add(player);
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

Scratch.extensions.register(extension);