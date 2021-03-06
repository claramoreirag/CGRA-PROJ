/**
 * MyObject
 * @constructor
 * @param scene - Reference to MyScene object
 */


class MyUnitCubeQuad extends CGFobject {

    constructor(scene){
        super(scene);
        this.down=new MyQuad(scene);
        this.up=new MyQuad(scene);
        this.front=new MyQuad(scene);
        this.back=new MyQuad(scene);
        this.left=new MyQuad(scene);
        this.right=new MyQuad(scene);
    }

    display(){

        //down
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.down.display();
        this.scene.popMatrix();

        //up
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.up.display();
        this.scene.popMatrix();

        //left
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.left.display();
        this.scene.popMatrix();

        //right
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.right.display();
        this.scene.popMatrix();

        //back
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.back.display();
        this.scene.popMatrix();
        
        //front
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.front.display();
        this.scene.popMatrix();

    }

}
