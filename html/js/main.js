'use strict';


//document.addEventListener("DOMContentLoaded", init);
window.addEventListener("load", init);

var theClaw;
var theRope;
var clawGroup = { x:400, y:0 };
var ropeSegs = 18;
var clawTop;
var leftSide;
var rightSide;

var Body = Matter.Body;


var arm1, arm2;


var wrld;
var engn;
var rndr;

var clawPath;
var pieces;

function init() {

    // module aliases
    var Engine = Matter.Engine,
    Render = Matter.RenderPixi,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Vertices = Matter.Vertices,
    Sleeping = Matter.Sleeping,
    Svg = Matter.Svg;
    // create an engine


    //var engine = Engine.create(document.querySelector("body"));
    var engine = Engine.create(document.querySelector('body'));

    // create a renderer
    var render = Render.create({
        engine: engine
    });

    wrld = World;
    engn = engine;
    rndr = Render;



    var arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50'),
    chevron = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0'),
    star = Vertices.fromPath('50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38'),
    horseShoe = Vertices.fromPath('35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7'),
    claw = Vertices.fromPath('45 1 46 33 9 48 7 85 12 93 21 96 16 88 18 54 52 44 75 55 80 86 68 94 83 92 91 84 85 45 58 34 57 2');

    var defaultCategory = 0x0001,
        dontCollide = 0x0002;

/*

    var clawPieces = [
        { "file" : "./images/claw_body_main.svg", "position": { "x": -8, "y" : 10 } },
        { "file" : "./images/claw_body_spring.svg", "position": { "x": 0, "y" : 60 } },
        { "file" : "./images/claw_arm_left.svg", "position": { "x": -64, "y" : 90 } },
        { "file" : "./images/claw_arm_right.svg", "position": { "x": 54, "y" : 90 } },
        { "file" : "./images/claw_brace_left.svg", "position": { "x": -25, "y" : 35 } },
        { "file" : "./images/claw_brace_right.svg", "position": { "x": 25, "y" : 35 } }
    ]

    pieces = clawPieces;

    for(var i = 0; i < clawPieces.length; i++) {

        (function(i) {
            $.get(clawPieces[i].file).done(function(data) {

                var vertexSets = [];
                $(data).find('path').each(function(i, path) {
                    var points = Svg.pathToVertices(path, 9);
                    vertexSets.push(Vertices.scale(points,2,2));
                });

                clawPieces[i].body = Bodies.fromVertices(100 + clawPieces[i].position.x, 100 + clawPieces[i].position.y, vertexSets, { isStatic:(i>=0), collisionFilter: { category:defaultCategory, group:(i>1) ? -2 : -2 }});


                    clawPieces[i].body.restitution = .1;
                    clawPieces[i].body.mass = 1;

                World.add(engine.world,clawPieces[i].body);

                if(i == clawPieces.length-1) {

                    console.log("done loading svgs");
                    setupJoints();
                }
            });
        })(i);
    }




    function setupJoints() {


        var clawJoints = [
            {
                "bodyB":clawPieces[0].body,
                "pointA":{x:100,y:50},
                "pointB":{x:8, y:-20},
                "length":40
            },
            {
                "bodyA":clawPieces[0].body,
                "bodyB":clawPieces[1].body,
                "pointA":{ x:8, y:-5 },
                "pointB":{ x:0, y:-25 },
                "length":20,
                "stiffness":0.1
            },{
                "bodyA":clawPieces[0].body,
                "bodyB":clawPieces[4].body,
                "pointA": { x:0, y:-15 },
                "pointB": { x:15, y:-40 },
                "stiffness":0.1
            },{
                "bodyA":clawPieces[0].body,
                "bodyB":clawPieces[5].body,
                "pointA": { x:20, y:-15 },
                "pointB": { x:-15, y:-40 },
                "stiffness":0.1
            },{
                "bodyA":clawPieces[1].body,
                "bodyB":clawPieces[2].body,
                "pointA": { x:0, y:25 },
                "pointB": { x:60, y:-5 },
                "stiffness":0.1
            },{
                "bodyA":clawPieces[2].body,
                "bodyB":clawPieces[4].body,
                "pointA": { x:20, y:-15 },
                "pointB": { x:-12, y:38 },
                "stiffness":0.1
            },{
                "bodyA":clawPieces[1].body,
                "bodyB":clawPieces[3].body,
                "pointA": { x:0, y:25 },
                "pointB": { x:-50, y:-5 },
                "stiffness":0.1
            },{
                "bodyA":clawPieces[3].body,
                "bodyB":clawPieces[5].body,
                "pointA": { x:-10, y:-15 },
                "pointB": { x:12, y:38 },
                "stiffness":0.1
            }
        ];


        for(var i = 0; i < clawJoints.length; i++) {

            var joint = clawJoints[i];

            var constraint = Constraint.create({
                bodyA:joint.bodyA ? joint.bodyA : undefined,
                bodyB:joint.bodyB ? joint.bodyB : undefined,
                pointA:joint.pointA ? joint.pointA : undefined,
                pointB:joint.pointB ? joint.pointB : undefined,
                stiffness:joint.stiffness ? joint.stiffness : undefined,
                angularStiffness:.9
            });

            console.log(constraint);
            World.add(engine.world, constraint);
        }
    }
*/

    /*var arm2Constraint = Constraint.create({
        bodyA: claw,
        bodyB: clawArm2,
        pointA: { x: 20, y: 0 },
        pointB: { x: 0, y: -25},
        length: 0
    });*/


    //var clawArm = Vertices.fromPath('50 53.75   60 52.5   70 50.75   75 48   80 48   83.75 50   88.75 55   92.5 62.5   95 71.5   96 80   96 87.5   95 95   93.75 97.5   92.5 95   91.25 90   91 85   91 80   92.5 76.25   93.5 70   90 63.75   86.25 57.5   82.5 55   77.5 53.75   62.5 26.25  57.5 57.5  50 58.75');

    //var clawBody = Vertices.fromPath('')



/*    for(var i = 0; i < 40; i++) {

        var body = Bodies.fromVertices(Math.random()*700 + 50, Math.random()*100 + 400, Common.choose([arrow,chevron,star,horseShoe]), { category: defaultCategory });
        Body.scale(body,.75,.75);
        World.add(engine.world, body);
    }*/




    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true, collisionFilter: { category : defaultCategory, mask: defaultCategory | dontCollide }});
    var wall1 = Bodies.rectangle(0, 300, 20, 600, { isStatic: true });
    var wall2 = Bodies.rectangle(800, 300, 20, 600, { isStatic: true });

    var side1 = Bodies.rectangle(360,-140,40,320, { isStatic:true });
    var side2 = Bodies.rectangle(440,-140,40,320, { isStatic:true });

    leftSide = side1;
    rightSide = side2;


    var chainTop = Bodies.rectangle(clawGroup.x,clawGroup.y,40,40, { isStatic:true });
    clawTop = chainTop;
    // add all of the bodies to the world

    var group = Body.nextGroup(true);

    var theRope = Composites.stack(400, clawGroup.y + 20, 1, ropeSegs, 0, 10, function(x, y) {
        return Bodies.circle(x, y, 5, { collisionFilter: { category: dontCollide }, isStatic:false });
    });

    theRope = theRope;


    Composite.add(theRope, Constraint.create({
        bodyA: chainTop,
        bodyB: theRope.bodies[0],
        stiffness: 0.9
    }));


    var claw = Bodies.fromVertices(400, clawGroup.y + (ropeSegs * 20) +20 , claw, { isStatic: false, collisionFilter: { category: defaultCategory, mask: dontCollide } });
    Body.setMass(claw,1);
    theClaw = claw;

    Composite.add(theRope, Constraint.create({
        bodyA: theRope.bodies[theRope.bodies.length-1],
        bodyB: claw,
        pointB: { x: 0, y:-40 },
        stiffness: 0.1
    }));

    Composites.chain(theRope, 0, 0, 0, 0, { stiffness: 0.8, length: 20 });


    var clawArm1 = Bodies.rectangle(claw.position.x-20, claw.position.y+25, 10, 60, { collisionFilter: { category: defaultCategory, mask: defaultCategory }});
    var clawArm2 = Bodies.rectangle(claw.position.x+20, claw.position.y+25, 10, 60, { collisionFilter: { category: defaultCategory, mask: defaultCategory }});


    arm1 = clawArm1;
    arm2 = clawArm2;

    var arm1ConConstraint = Constraint.create({
        bodyA: claw,
        bodyB: clawArm1,
        pointA: { x: -20, y: 0 },
        pointB: { x: 0, y: -25 },
        length:0
    });

    var arm2Constraint = Constraint.create({
        bodyA: claw,
        bodyB: clawArm2,
        pointA: { x: 20, y: 0 },
        pointB: { x: 0, y: -25},
        length: 0
    });

    World.add(engine.world, [ground,wall1,wall2,chainTop,theRope,claw,side1,side2]);

    TweenLite.to(clawGroup, 2, { y: ropeSegs * -20 - 40, ease:Linear.easeNone, onUpdate:updateClaw });

    //Sleeping.set(theRope.bodies[0], true);

    Engine.run(engine);

}









var directions = {

    37 : "left",
    39 : "right"
}

document.addEventListener("keydown", onKeyPress);
document.addEventListener("keyup", onKeyRelease);

function onKeyPress(e) {

    var dir = directions[e.keyCode];
    if(dir) moveClaw(dir);
}

function onKeyRelease(e) {

    var dir = directions[e.keyCode];
    if(dir) moveClaw(dir);
    if(e.keyCode == 32) dropClaw();
}


function moveClaw(dir) {

    //theClaw.force.x += (dir == "right") ? 10 : -10;
    TweenLite.to(clawGroup, .25, { x: clawTop.position.x + (dir == "right" ? 20 : -20), onUpdate:updateClaw });
    //Body.setVelocity(theClaw, { x: (dir == "right") ? 100 : -100, y: 0 });
    //theClaw.update();
}

function dropClaw() {

    TweenLite.to(clawGroup, 2, { y: 0, ease:Linear.easeNone, onUpdate:updateClaw, onComplete:closeClaw });
    TweenLite.to(clawGroup, 2, { y: ropeSegs * -20 - 40, ease:Linear.easeNone, delay:4, onUpdate:updateClaw });

}

function updateClaw() {

    Body.setPosition(clawTop, { x: clawGroup.x, y: clawGroup.y });
    Body.setPosition(leftSide, { x: clawGroup.x -40, y: -140 });
    Body.setPosition(rightSide, { x: clawGroup.x +40, y: -140 });
}

function closeClaw() {

    arm1.torque = -.5;
    arm2.torque = .5;
}
