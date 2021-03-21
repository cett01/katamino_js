// Create a Paper.js Path to draw a line into it:
paper.install(window);
let blocks = [];
let mainPanel;
let tool;
let currentPath;

let initPaper = (width = 1000, height = 500, backgroundColor = "green") => {
blocks=[];
   mainPanel;
  let tool;
  let currentPath;
  console.log("init drawer!!!");
  $("#overlayCanvas").remove();
  let canvas = $(`<canvas class='overlay' hidpi='off' keepalive='true' id='overlayCanvas' width='${width}' height="${height}" style="border:1px solid #d3d3d3; background:${backgroundColor}">`);
  $("body").append(canvas);
  paper.setup(canvas[0]);
  tool = new paper.Tool();


  //paper.addEventListener("onMouseDown",onMouseDown);
  handlingEvents()
};

let createBlock = (blockType, leftTop) => {
  let path = new paper.Path();
  path.fillColor = blockType.color;
  let maxR = 0;
  let maxC = 0;
  blockType.shape.forEach((r, iR) => {
    r.forEach((c, iC) => {
      if (c === 1) {
        maxR = Math.max(iR + 1, maxR);
        maxC = Math.max(iC + 1, maxC);
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
  path.isRegularX = maxC % 2 === 0;
  path.isRegularY = maxR % 2 === 0;
  path.onDoubleClick = function (event) {
    this.rotate(path.rotation + 90);
    let temp = path.isRegularX;
    path.isRegularX = path.isRegularY;
    path.isRegularY = temp;
  };
  path.onClick = (event) => {


  };

  blocks.push(path);
};
let createMainPanel = (blockCount, leftTop) => {
  mainPanel = new paper.Path();
  mainPanel.fillColor = "white";
  for (let i = 0; i < blockCount; i++) {
    for (let j = 0; j < 5; j++) {
      const topLeft = new Point(leftTop.x + i * BLOCK_SIZE, leftTop.y + j * BLOCK_SIZE);
      const rectSize = new Size(BLOCK_SIZE, BLOCK_SIZE);
      const p = new paper.Path.Rectangle(new Rectangle(topLeft, rectSize));
      const res = mainPanel.unite(p);
      mainPanel.remove();
      p.remove();
      mainPanel = res;
    }
  }
  mainPanel.closed = true;
  mainPanel.selected = false;
};

function checkFinish() {
  const res = blocks.every(b => {
    let n1 = (Math.abs(mainPanel.intersect(b, {insert: false}).getArea()));
    let n2 = (Math.abs(b.getArea()));
    return Math.abs(n1 - n2) < 5;
  });
  console.log("res:" + res)
  if (res && paper.view.update()) {
    setTimeout(() => {
      alert("Hello! I am an alert box!!");
    }, 300)

  }

}

function handlingEvents() {
  tool.onMouseDown = (event) => {
    // The amount of times the mouse has been pressed:
    currentPath = undefined;
    const hitResult = project.hitTest(event.point, hitOptions);
    if (hitResult && hitResult.item !== mainPanel) {
      currentPath = hitResult.item;
      currentPath.firstPosition = currentPath.position;
      paper.project.activeLayer.addChild(hitResult.item);
    }
  };

  tool.onMouseMove = (event) => {
    // The amount of drag events fired since the mouse
    // was pressed:
    project.activeLayer.selected = false;
    if (event.item && event.item !== mainPanel)
      event.item.selected = true;
  };

  tool.onMouseDrag = (event) => {
    // The amount of drag events fired since the mouse
    // was pressed:
    //currentPath.position+=event.delta;
    if (currentPath) {
      currentPath.position.x += event.delta.x;
      currentPath.position.y += event.delta.y;
    }
  };

  tool.onMouseUp = (event) => {
    // The amount of drag events fired since the mouse
    // was pressed:
    function adjustFixedPosition() {
      let deltaX = (currentPath.position.x - (currentPath.isRegularX ? 0 : BLOCK_SIZE / 2)) % BLOCK_SIZE;
      deltaX = deltaX > (BLOCK_SIZE / 2) ? (deltaX - BLOCK_SIZE) : deltaX;
      currentPath.position.x = currentPath.position.x - deltaX;
      let deltaY = (currentPath.position.y - (currentPath.isRegularY ? 0 : BLOCK_SIZE / 2)) % BLOCK_SIZE;
      deltaY = deltaY > (BLOCK_SIZE / 2) ? (deltaY - BLOCK_SIZE) : deltaY;
      currentPath.position.y = currentPath.position.y - deltaY;
      console.log(currentPath.position.x, currentPath.position.y);
    }

    //currentPath.position+=event.delta;
    if (currentPath) {
      adjustFixedPosition();
    }
    if (anyHitted(false) && currentPath) {
      currentPath.position = currentPath.firstPosition;
      currentPath.firstPosition = undefined;
    }
    checkFinish()
  };
  tool.onKeyDown = (event) => {
    // When a key is pressed, set the content of the text item:
    let acttiveItem = paper.project.activeLayer.getChildren().find(e => e.selected);
    if (event.key === "space" && acttiveItem) {
      acttiveItem.scale(1, -1);
    } else if ((event.key === "w" || event.key === "up" || event.key === "s" || event.key === "down") && acttiveItem) {
      acttiveItem.scale(1, -1);
    } else if ((event.key === "a" || event.key === "left" || event.key === "d" || event.key === "right") && acttiveItem) {
      acttiveItem.scale(-1, 1);

    } else if (event.key === "space" && acttiveItem) {

    }
  }
}


let anyHitted = (withIntersects = false) => {
  let intersected = false;
  let interSet = new Set();
  blocks.forEach(b1 => {
    blocks.forEach(b2 => {
      if (b1 !== b2 && !(b1 in interSet && b2 in interSet)) {
        let intersections = b1.intersect(b2, {insert: false});
        if (intersections.getArea() > 0) {
          intersected = true;
          if (withIntersects) {
            interSet.add(b1);
            interSet.add(b2);
          }
        }
      }
    })
  });
  if (withIntersects)
    return {
      first: intersected,
      second: interSet,
    };
  else return intersected;
}
