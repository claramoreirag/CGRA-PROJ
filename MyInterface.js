/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene,'currentTexture',this.scene.textureList).onChange(this.scene.updateTexture.bind(this.scene)).name('Texture');
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        this.initKeys();

        return true;
    }

    initKeys(){

        this.scene.gui = this;
        this.processKeyboard = function(){};
        this.activeKeys = {};

    }

    processKeyDown(event){
        this.activeKeys[event.code] = true; 
    };

    processKeyUp(event){
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode){
        return this.activeKeys[keyCode] || false;
    }

}