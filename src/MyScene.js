/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this,16,8,3);
        this.cube=new MyCubeMap(this);
        this.vehicle=new MyVehicle(this,16,8);
        this.terrain=new MyTerrain(this);
        this.billBoard=new MyBillboard(this);


        this.supplies_used = 0;
        this.supplies_vec = [];
        for(var i = 0; i < 5; i++)
        {
            this.supplies_vec.push(new MySupply(this));
        }
        //Objects connected to MyInterface
        this.displayAxis = true;


        this.currentTexture=0;
        this.textureList={'Cubemap':0,'Mountains':1};

        this.speedFactor = 0.5;
        this.scaleFactor = 1;

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30,30, 30), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update(t);
        for(var idx = 0; idx < 5; idx++)
        {
            this.supplies_vec[idx].update(t);
        }
    }



    checkKeys(){
        var text = "keys pressed: ";
        var keysPressed =false;

        if(this.gui.isKeyPressed("KeyW") && !this.vehicle.autopilot){
            text+=" W ";
            keysPressed = true;
            this.vehicle.accelerate(this.speedFactor*0.3);
        }

        if(this.gui.isKeyPressed("KeyS")&& !this.vehicle.autopilot){
            text+=" S ";
            keysPressed=true;
            this.vehicle.accelerate(-this.speedFactor*0.3);
        }

        if(this.gui.isKeyPressed("KeyA")&& !this.vehicle.autopilot){
            text+=" A ";
            keysPressed=true;
            this.vehicle.turn(5);
        }

        if(this.gui.isKeyPressed("KeyD")&& !this.vehicle.autopilot){
            text+=" D ";
            keysPressed=true;
            this.vehicle.turn(-5);
        }

        if(this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            keysPressed=true;
            this.vehicle.reset();
            this.supplies_used = 0;
            for (var idx = 0; idx < 5; idx++)
            {
                this.supplies_vec[idx].state = SupplyStates.INACTIVE;
                this.supplies_vec[idx].y = 10;
                this.supplies_vec[idx].lastUpdate = 0;
            }
            this.billBoard.reset();
        }

        if (this.gui.isKeyPressed("KeyP") && !this.vehicle.autopilot){
            this.vehicle.activateAutopilot();
        }
      
        if (this.gui.isKeyPressed("KeyL") && this.supplies_used < 5)
        {
            this.supplies_vec[this.supplies_used].drop(this.vehicle.x, this.vehicle.z);
            this.supplies_used++;
            this.billBoard.update(this.supplies_used);

        }

        if(keysPressed)
            this.vehicle.update();

        if(keysPressed)
            console.log(text);
    }
    updateTexture(){
        
        this.cube.updateTexture();
        
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();


        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0];

        this.multMatrix(sca);



        // ---- BEGIN Primitive drawing section
       
        this.cube.display();
        this.vehicle.display();
        this.billBoard.display();
        this.terrain.display();

        
        for(var idx = 0; idx < 5; idx++)
        {
            this.supplies_vec[idx].display();
        }

        // ---- END Primitive drawing section
    }
}