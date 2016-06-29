'use strict';


window.addEventListener("load", init);


var wrld = {};

function init() {

    // module aliases
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


    var defaultCategory = 0x0001,
       redCategory = 0x0002,
       greenCategory = 0x0004,
       blueCategory = 0x0008;

    // create an engine

    //var engine = Engine.create(document.querySelector("body"));
    var engine = Engine.create(document.querySelector('body'));
    engine.positionIterations = 10;
    engine.velocityIterations = 10;
    // create a renderer
    var render = Render.create({
        engine: engine
    });
    //('100,47.8 76.4,0 52.8,47.8 0,55.5 76.4,91.8 152.7,55.5');
    var rthookverts = Vertices.fromPath('40,10 115,10 155,70 125,165 90,190 110,160 120,75 100,45 40,30');
    var lfhookverts = Vertices.fromPath('160,10 90,10 40,70 75,165 110,190 90,160 80,70 103,46 160,30');
    var hookbodyverts = Vertices.fromPath('64,3 140,3 150,15 150,30 140,40 60,40 50,30 50,15');
    //var hookBody = Bodies.fromVertices(100,100, 30, hook, { mass: 10 });
    var lfhook   = Bodies.fromVertices(100, 180, lfhookverts,   { mass : 3, isStatic : false, restitution: .5, frictionAir:.2, collisionFilter: { group: -2  } } );
    var rthook   = Bodies.fromVertices(250, 180, rthookverts,   { mass : 3, isStatic : false, restitution: .5, frictionAir:.2, collisionFilter: { group: -2 } } );
    //var hookbody = Bodies.fromVertices(175, 150, hookbodyverts, { mass : 10, isStatic : true,  collisionFilter: { group: -2 } } );
    wrld.clawRoot = Bodies.rectangle(175,110,100,20, { mass : 10, isStatic : true,  collisionFilter: { group: -2 } } );

    wrld.toy = Bodies.circle(175,180, 40, { mass: 2, isStatic: false });
    //hookBody.angle = 0.01;
    var	rthookConstraint = Constraint.create({
        bodyA : wrld.clawRoot,
		bodyB : rthook,
        pointA : { x: 15, y: 0 },
		pointB : { x: -60, y: -68 },
		length : 0,
		stiffness : 1,
		render : {
			visible: true
		}
	});
    var	lfhookConstraint = Constraint.create({
        bodyA : wrld.clawRoot,
        bodyB : lfhook,
        pointA : { x: -15, y: 0 },
        pointB : { x: 60, y: -68 },
        length : 0,
        stiffness : 1,
        render : {
            visible: true
        }
    });

    wrld.grabConst = Constraint.create({

        bodyA: lfhook,
        bodyB: rthook,
        pointA: { x: 10, y:90 },
        pointB: { x: -10, y:90 },
        length:160,
        stiffness:.5,
        render: {
            visible: false
        }
    })

    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    var wall1 = Bodies.rectangle(0, 300, 20, 600, { isStatic: true });
    var wall2 = Bodies.rectangle(800, 300, 20, 600, { isStatic: true });


    World.add(engine.world, [wrld.toy,ground,wall1,wall2,lfhook,rthook,wrld.clawRoot,rthookConstraint,lfhookConstraint, wrld.grabConst]);

    Engine.run(engine);


    grab();

    return wrld;
}

let grab = () => {


    TweenLite.to(wrld.grabConst, 1, { delay:3, length: 90, ease:Power3.easeInOut });
    TweenLite.to(wrld.clawRoot, 2.3, { delay:.5, onUpdate:drop });
    TweenLite.to(wrld.clawRoot, 2.3, { delay: 4.5, onUpdate:lift });
    TweenLite.to(wrld.clawRoot, 2, { delay: 8.5, onUpdate:right });
    TweenLite.to(wrld.grabConst, .5, { delay:11.5, length: 220 });
};

let drop = () => {

    Matter.Body.translate(wrld.clawRoot, {x:0,y:2 });
};

let lift = () => {

    Matter.Body.translate(wrld.clawRoot, {x:0,y:-2 });
};

let right = () => {

    Matter.Body.translate(wrld.clawRoot, { x:3, y:0 });
}
