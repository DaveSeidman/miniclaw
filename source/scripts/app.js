'use strict';

var mtr;

var translate;

var rope = {
    length:200,
    jointSize:5,
    segments:20
};
var ropeTop = { x: 0, y: 50 };

var ropeLength = 200;

window.addEventListener("load", function() {

    mtr = init();
});


function init() {

    var mtr = {

        pad:50,
        width: window.innerWidth,
        height: window.innerHeight
    };

    ropeTop.x = mtr.width/2;
    ropeTop.y = 0;

    translate = Matter.Body.translate;

    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Vertices = Matter.Vertices,
    Sleeping = Matter.Sleeping,
    Svg = Matter.Svg;

    mtr.engine = Engine.create();
    mtr.world = World;

    mtr.engine.positionIterations = 10;
    mtr.engine.velocityIterations = 10;

    mtr.render = Render.create({
        element: document.getElementById('canvas-container'),
        options: {
            width:window.innerWidth,
            height:window.innerHeight
        },
        engine: mtr.engine
    });

    mtr.leftWall = Bodies.rectangle(-mtr.pad/2, mtr.height/2, mtr.pad, mtr.height, { isStatic: true });
    mtr.rightWall = Bodies.rectangle(mtr.width+mtr.pad/2, mtr.height/2, mtr.pad, mtr.height, { isStatic:true });
    mtr.ground = Bodies.rectangle(mtr.width/2, mtr.height+mtr.pad/2, mtr.width, mtr.pad, { isStatic: true });


    mtr.clawRoot = Bodies.rectangle(175,110,100,20, { mass : 10, isStatic : true,  collisionFilter: { group: -2 } } );

    mtr.rthookverts = Vertices.fromPath('40,10 115,10 155,70 125,165 90,190 110,160 120,75 100,45 40,30 33,20');
    mtr.lfhookverts = Vertices.fromPath('160,10 90,10 40,70 75,165 110,190 90,160 80,70 103,46 160,30 168,20');
    mtr.hookbodyverts = Vertices.fromPath('64,3 140,3 150,15 150,30 140,40 60,40 50,30 50,15');
    mtr.lfhook = Bodies.fromVertices(80, 180, mtr.lfhookverts,   { mass : 10, isStatic : false, frictionAir : 1, collisionFilter : { group : -2  } } );
    mtr.rthook = Bodies.fromVertices(270, 180, mtr.rthookverts,   { mass : 10, isStatic : false, frictionAir : 1, collisionFilter : { group : -2 } } );

    //mtr.chainRoot = Bodies.circle(mtr.width/2, 0, )
    mtr.toy = Bodies.circle(250,180, 40, { mass: 2, isStatic: false });

    mtr.rthookConst = Constraint.create({
        bodyA : mtr.clawRoot,
        bodyB : mtr.rthook,
        pointA : { x: 35, y: 0 },
        pointB : { x: -60, y: -68 },
        length : 0,
        stiffness : 1,
        render : {
            visible: true
        }
    });

    mtr.lfhookConst = Constraint.create({
        bodyA : mtr.clawRoot,
        bodyB : mtr.lfhook,
        pointA : { x: -35, y: 0 },
        pointB : { x: 60, y: -68 },
        length : 0,
        stiffness : 1,
        render : {
            visible: true
        }
    });

    mtr.rtPull1 = Constraint.create({

        bodyB: mtr.lfhook,
        bodyA: mtr.rthook,
        pointB: { x: 10, y:90 },
        pointA: { x: -10, y:90 },
        length:170,
        stiffness:.1,
        render: {
            visible: true
        }
    });
    /*mtr.rtPull1 = Constraint.create({

        bodyA: mtr.rthook,
        pointB: { x: 180, y:270 },
        pointA: { x: -10, y:90 },
        length:80,
        stiffness:.1,
        render: {
            visible: true
        }
    });
    mtr.rtPull2 = Constraint.create({

        bodyA: mtr.rthook,
        pointB: { x: 340, y:270 },
        pointA: { x: -10, y:90 },
        length:80,
        stiffness:.1,
        render: {
            visible: true
        }
    });*/
    // add all of the bodies to the world
    World.add(mtr.engine.world, [mtr.toy, mtr.lfhook, mtr.rthook, mtr.lfhookConst, mtr.clawRoot, mtr.rtPull1, mtr.rthookConst, mtr.leftWall, mtr.rightWall, mtr.ground]);

    var ropeB = Composites.stack(ropeTop.x, ropeTop.y + 100, 1, rope.segments, 0, rope.jointSize*2, function(x, y) {
        return Bodies.circle(x, y, rope.jointSize, { collisionFilter : { group: -3 }, isStatic: true });
    });

    Composites.chain(ropeB, 0, 0, 0, 0, { stiffness: 1, length: rope.jointSize * 3 });
    Composite.add(ropeB, Constraint.create({
        pointB: { x: ropeTop.x + 10, y: ropeTop.y + 100 },
        pointA: { x: 0, y: 0 },
        bodyA: ropeB.bodies[0],
        stiffness: 1
    }));

    World.add(mtr.engine.world, ropeB);





    // run the engine
    Engine.run(mtr.engine);

    // run the renderer
    Render.run(mtr.render);

    return mtr;
}


var grab = function() {

    TweenLite.to(mtr.rtPull1, 1, { delay:3, length: 90, ease:Power3.easeInOut });
    TweenLite.to(mtr.clawRoot, 2.3, { delay:.5, onUpdate:drop });
    TweenLite.to(mtr.clawRoot, 2.3, { delay: 4.5, onUpdate:lift });
    TweenLite.to(mtr.clawRoot, 2, { delay: 8.5, onUpdate:right });
    TweenLite.to(mtr.rtPull1, .5, { delay:11.5, length: 220 });
};

var drop = function() {

    Matter.Body.translate(mtr.clawRoot, {x:0,y:2 });
};

var lift = function() {

    Matter.Body.translate(mtr.clawRoot, {x:0,y:-2 });
};

var right = function() {

    Matter.Body.translate(mtr.clawRoot, { x:3, y:0 });
}

window.addEventListener('resize', resize);


function resize() {

    mtr.width = window.innerWidth;
    mtr.height = window.innerHeight;
    mtr.render.canvas.width = mtr.width;
    mtr.render.canvas.height = mtr.height;
    mtr.render.options.width = mtr.width;
    mtr.render.options.height = mtr.height;
    // Matter.Body.setPosition(mtr.ground, { x: mtr.width/2, y: mtr.height + mtr.pad/2 });
    // Matter.Body.setPosition(mtr.leftWall, { x: mtr.leftWall.position.x, y: mtr.height/2 });
    // Matter.Body.setPosition(mtr.rightWall, { x: mtr.width + mtr.pad/2, y: mtr.height/2 });
    mtr.leftWall = Matter.Bodies.rectangle(-mtr.pad/2, mtr.height/2, mtr.pad, mtr.height, { isStatic: true });

    //mtr.world.remove(mtr.engine, [mtr.leftWall]);
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

var claw = {

    position: window.innerWidth/2,
    velocity: 0
}

var keys = {
    37 : {
        func : 'left'
    },
    39 : {
        func : 'right'
    },
    32 : {
        func : 'grab'
    }
}
function keyPressed(event) {

    //grab();
    //if(keys[event.keyCode]) claw.velocity = keys[event.keyCode].vel;
    //console.log(event.keyCode);
    if(keys[event.keyCode]) {

        if(keys[event.keyCode].func == 'left') {
            moveClaw(-4);
        }
        if(keys[event.keyCode].func == 'right') {
            moveClaw(4);
        }
        if(keys[event.keyCode].func == 'grab') {

            TweenLite.to(mtr.rtPull1, .2, { delay:0, length: 10 });
            TweenLite.to(mtr.rtPull1, 1, { delay:1.5, length: 80 });

        }
    }

}



function moveClaw(dir) {

    translate(mtr.clawRoot, { x : dir, y : 0 });
}

function keyReleased(event) {

    if(keys[event.keyCode]) claw.velocity = 0;
}


loop();

function loop() {


    //if(claw.velocity) {

        //claw.position += claw.velocity;
        //Matter.Body.translate(mtr.clawRoot, { x: claw.velocity, y:0 });
    //}
    requestAnimationFrame(loop);
}
