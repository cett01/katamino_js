// Create a Paper.js Path to draw a line into it:
paper.install(window);
let initPaper = (width = 1000, height = 500, backgroundColor = "green") => {

    console.log("init drawer!!!");
    let canvas = $(`<canvas class='overlay' hidpi='off' keepalive='true' id='overlayCanvas' width='${width}' height="${height}" style="border:1px solid #d3d3d3; background:${backgroundColor}">`);
    $("body").append(canvas);
    paper.setup(canvas[0]);

};

function addMouseHandlers(tool) {
    var  path;
    var movePath = false;
    //tool.fixedDistance = BLOCK_SIZE;


}

let createBlock = (blockType, leftTop) => {


    let path=new paper.Path();
    path.fillColor = blockType.color;
    blockType.shape.forEach((r, iR) => {
        r.forEach((c, iC) => {
            if (c == 1) {
                const topLeft = new Point(leftTop.x + iC * BLOCK_SIZE, leftTop.y + iR * BLOCK_SIZE);
                var rectSize = new Size(BLOCK_SIZE, BLOCK_SIZE);
                var p = new paper.Path.Rectangle(new Rectangle(topLeft, rectSize));
              path=path.unite(p);
              p.remove();
            }

        })
    });
    path.closed = true;
    path.selected = true;
};

function onMouseDown  (event)  {
    // The amount of times the mouse has been pressed:
    var hitResult = project.hitTest(event.point, hitOptions);
    if (!hitResult)
        return;
    else {
        path = hitResult.item;
        movePath=true;
        project.activeLayer.addChild(hitResult.item);
    }
};

function onMouseMove(event) {
    // The amount of drag events fired since the mouse
    // was pressed:
    project.activeLayer.selected = false;
    if (event.item)
        event.item.selected = true;

} function onMouseDrag  (event)  {
    // The amount of drag events fired since the mouse
    // was pressed:
    //path.position+=event.delta;
    if (path) {
        path.position += event.delta;
    }

};
