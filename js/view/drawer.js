// Create a Paper.js Path to draw a line into it:
paper.install(window);
blocks = []
let tool;
let initPaper = (width = 1000, height = 500, backgroundColor = "green") => {

  console.log("init drawer!!!");
  let canvas = $(`<canvas class='overlay' hidpi='off' keepalive='true' id='overlayCanvas' width='${width}' height="${height}" style="border:1px solid #d3d3d3; background:${backgroundColor}">`);
  $("body").append(canvas);
  paper.setup(canvas[0]);
  tool = new paper.Tool();


  //paper.addEventListener("onMouseDown",onMouseDown);
  tool.onMouseDown = (event) => paperMouseDown(event);
  tool.onMouseMove = (event) => paperMouseMove(event);
  tool.onMouseDrag = (event) => paperMouseDrag(event);
  tool.onMouseUp = (event) => paperMouseUp(event);
};

let createBlock = (blockType, leftTop) => {
  let path = new paper.Path();
  path.fillColor = blockType.color;
  blockType.shape.forEach((r, iR) => {
    r.forEach((c, iC) => {
      if (c === 1) {
        const topLeft = new Point(leftTop.x + iC * BLOCK_SIZE, leftTop.y + iR * BLOCK_SIZE);
        const rectSize = new Size(BLOCK_SIZE, BLOCK_SIZE);
        const p = new paper.Path.Rectangle(new Rectangle(topLeft, rectSize));
        const res = path.unite(p);
        path.remove();
        p.remove();
        path = res;
      }

    })
  });
  path.closed = true;
  path.selected = true;
  path.blendMode = 'multiply';
  path.onDoubleClick = function (event) {
    this.rotate(path.rotation + 90);
  };
  blocks.push(path);
};
let currentPath, movePath;

function paperMouseDown(event) {
  // The amount of times the mouse has been pressed:
  currentPath = undefined;
  movePath = false;
  const hitResult = project.hitTest(event.point, hitOptions);
  if (hitResult) {
    currentPath = hitResult.item;
    currentPath.firstPosition = currentPath.position;
    movePath = true;
    paper.project.activeLayer.addChild(hitResult.item);
  }
}

function paperMouseMove(event) {
  // The amount of drag events fired since the mouse
  // was pressed:
  project.activeLayer.selected = false;
  if (event.item)
    event.item.selected = true;
}

function paperMouseDrag(event) {
  // The amount of drag events fired since the mouse
  // was pressed:
  //currentPath.position+=event.delta;
  if (currentPath && movePath) {
    currentPath.position.x += event.delta.x;
    currentPath.position.y += event.delta.y;
  }

}

function anyHitted() {
  let intersected = false;
  blocks.forEach(b1 => {
    blocks.forEach(b2 => {
      if (b1 !== b2) {
        let intersections = b1.intersect(b2, {insert: false});
        if (intersections.getArea() > 0)
          intersected = true;
      }
    })
  });
  return intersected;
}

function paperMouseUp(event) {
  // The amount of drag events fired since the mouse
  // was pressed:
  function adjustFixedPosition() {
    let deltaX = currentPath.position.x % BLOCK_SIZE;
    deltaX = deltaX > (BLOCK_SIZE / 2) ? (deltaX - BLOCK_SIZE) : deltaX;
    currentPath.position.x = currentPath.position.x - deltaX;
    let deltaY = currentPath.position.y % BLOCK_SIZE;
    deltaY = deltaY > (BLOCK_SIZE / 2) ? (deltaY - BLOCK_SIZE) : deltaY;
    currentPath.position.y = currentPath.position.y - deltaY;
  }

//currentPath.position+=event.delta;
  if (currentPath && movePath) {
    adjustFixedPosition();
  }
  if (anyHitted()) {
    currentPath.position = currentPath.firstPosition;
    currentPath.firstPosition = undefined;
  }
}
