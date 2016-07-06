'use strict';

var mtr;

window.addEventListener("load", function() {

    mtr = init();
});


function init() {

    var mtr = {

        pad:50
    };

    mtr.width = window.innerWidth;
    mtr.height = window.innerHeight;

    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Common = Matter.Common,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        Vertices = Matter.Vertices,
        Sleeping = Matter.Sleeping,
        Svg = Matter.Svg;

    var engine = Engine.create();

    engine.positionIterations = 10;
    engine.velocityIterations = 10;

    mtr.render = Render.create({
        element: document.getElementById('canvas-container'),
        options: {
            width:window.innerWidth,
            height:window.innerHeight
        },
        engine: engine
    });

    mtr.leftWall = Bodies.rectangle(-mtr.pad/2, mtr.height/2, mtr.pad, mtr.height, { isStatic: true });
    mtr.rightWall = Bodies.rectangle(mtr.width+mtr.pad/2, mtr.height/2, mtr.pad, mtr.height, { isStatic:true });
    mtr.ground = Bodies.rectangle(mtr.width/2, mtr.height+mtr.pad/2, mtr.width, mtr.pad, { isStatic: true });

    mtr.rthookverts = Vertices.fromPath('40,10 115,10 155,70 125,165 90,190 110,160 120,75 100,45 40,30');
    mtr.lfhookverts = Vertices.fromPath('160,10 90,10 40,70 75,165 110,190 90,160 80,70 103,46 160,30');
    mtr.hookbodyverts = Vertices.fromPath('64,3 140,3 150,15 150,30 140,40 60,40 50,30 50,15');
    mtr.lfhook = Bodies.fromVertices(100, 180, mtr.lfhookverts,   { mass : 5, isStatic : false, restitution: .5, frictionAir:.1, collisionFilter: { group: -2  } } );
    mtr.rthook = Bodies.fromVertices(250, 180, mtr.rthookverts,   { mass : 3, isStatic : false, restitution: .5, frictionAir:.1, collisionFilter: { group: -2 } } );
    mtr.clawRoot = Bodies.rectangle(175,110,60,20, { mass : 10, isStatic : true,  collisionFilter: { group: -2 } } );

    mtr.toy = Bodies.circle(175,180, 40, { mass: 2, isStatic: false });

    mtr.rthookConst = Constraint.create({
        bodyA : mtr.clawRoot,
		bodyB : mtr.rthook,
        pointA : { x: 15, y: 0 },
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
        pointA : { x: -15, y: 0 },
        pointB : { x: 60, y: -68 },
        length : 0,
        stiffness : 1,
        render : {
            visible: true
        }
    });

    mtr.grabConst = Constraint.create({

        bodyA: mtr.lfhook,
        bodyB: mtr.rthook,
        pointA: { x: 10, y:90 },
        pointB: { x: -10, y:90 },
        length:140,
        stiffness:.5,
        render: {
            visible: false
        }
    });

    // add all of the bodies to the world
    World.add(engine.world, [mtr.toy, mtr.lfhook, mtr.rthook, mtr.lfhookConst, mtr.clawRoot, mtr.grabConst, mtr.rthookConst, mtr.leftWall, mtr.rightWall, mtr.ground]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(mtr.render);

    return mtr;
}


var grab = function() {

    TweenLite.to(mtr.grabConst, 1, { delay:3, length: 90, ease:Power3.easeInOut });
    TweenLite.to(mtr.clawRoot, 2.3, { delay:.5, onUpdate:drop });
    TweenLite.to(mtr.clawRoot, 2.3, { delay: 4.5, onUpdate:lift });
    TweenLite.to(mtr.clawRoot, 2, { delay: 8.5, onUpdate:right });
    TweenLite.to(mtr.grabConst, .5, { delay:11.5, length: 220 });
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
    Matter.Body.setPosition(mtr.ground, { x: mtr.width/2, y: mtr.height + mtr.pad/2 });

}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

var claw = {

    position: window.innerWidth/2,
    velocity: 0
}

var dirs = {
    37 : {
        dir : 'left',
        vel : -1
    },
    39 : {
        dir : 'right',
        vel : 1
    }
}
function keyPressed(event) {

    //grab();
    if(dirs[event.keyCode]) claw.velocity = dirs[event.keyCode].vel;
}

function keyReleased(event) {

    if(dirs[event.keyCode]) claw.velocity = 0;
}


function loop() {


    if(claw.velocity) {

        //claw.position += claw.velocity;
        Matter.Body.translate(mtr.clawRoot, { x: claw.velocity, y:0 });
    }
    requestAnimationFrame(loop);
}
