'use strict';

function Device(name, mark){
    this._mark = mark;
    this._name = name;
    this._state = false;
}
Device.prototype.turnOn = function(){
    this._state = true;
}
Device.prototype.turnOff = function(){
    this._state = false;
}
Device.prototype.toString = function(){
    var state = this._state? 'turn on':'turn off'
    return "Device " + this._name + ',mark ' + this._mark + ' ' + state;
};

/*
* TV constructor
*/

function Tv(name, mark, volumeModule, soundModule){
    Device.call(this, name, mark);
    this._volumeModule = volumeModule;
    this._soundModule = soundModule;
    this._wifiStatus = false;
}

Tv.prototype = Object.create(Device.prototype);
Tv.prototype.constructor = Tv;
Tv.prototype.getVolume = function(){
    return this._volumeModule.getRange();
};

    // getVolume() {
    //    return this._volumeModule.getRange(); 
    // }

Tv.prototype.volumePrev = function(){
    return this._volumeModule.rangePrev();
}

Tv.prototype.volumeNext = function(){
    return this._volumeModule.rangeNext();
};

Tv.prototype.getSound = function(){
    return this._soundModule.getRange();
};
Tv.prototype.soundPrev = function(){
    return this._soundModule.rangePrev();
}

Tv.prototype.soundNext = function(){
    return this._soundModule.rangeNext();
};

Tv.prototype.wifiOn = function(){
    this._wifiStatus = true;
    return this._wifiStatus;
}
Tv.prototype.wifiOff = function(){
    this._wifiStatus = false;
    return this._wifiStatus;
}

/*
* Radio constructor
*/
function Radio(name, mark, volumeModule){
    Device.call(this, name, mark);
    this._volumeModule = volumeModule;
}
Radio.prototype = Object.create(Device.prototype);
Radio.prototype.constructor = Radio;


Radio.prototype.getVolume = function(){
    return this._volumeModule.getRange();
};
Radio.prototype.volumePrev = function(){
    return this._volumeModule.rangePrev();
}

Radio.prototype.volumeNext = function(){
    return this._volumeModule.rangeNext();
};

/*
* Fridge constructor
*/
function Fridge(name, mark, tempModule, validationModule){
    Device.call(this, name, mark);
    this._tempModule = tempModule;
}

Fridge.prototype = Object.create(Device.prototype);
Fridge.prototype.constructor = Fridge;

Fridge.prototype.getTemp = function(){
    return this._tempModule.getTemp(); 
};

/*
* Washing Mashine
*/
function WashingMashine(name, mark, program, tempModule, validationModule,){
    Device.call(this, name, mark);
    this._tempModule= tempModule;
    this._program = program;

}
WashingMashine.prototype = Object.create(Device.prototype);
WashingMashine.prototype.constructor = WashingMashine;
WashingMashine.prototype.getTemp = function(){
    return this._tempModule.getTemp();
}
WashingMashine.prototype.getProgram = function() {
    return this._program;
}


/*
* Temperature Module
*/
function TempModule(temp, validationModule){
    this._temp = temp;
    this._validationModule = validationModule;
}

TempModule.prototype.getCurrentValue = function(){
    return this._temp;
}

TempModule.prototype.getTemp = function(){
    var currentValue = this.getCurrentValue();
    return this._validationModule.validatedValue(currentValue);
};

/*
* Range Module
*/
function RangeModule(range = '', ValidationModule){
    var DEFAULTRANGE = 1;
    this._range = (!range) ? DEFAULTRANGE:range;
    this._validationModule = ValidationModule;
}

RangeModule.prototype.getRange = function(){
    return this._range;
};

RangeModule.prototype.rangeNext = function(){
    this._range = this._validationModule.changeValue(++this._range);
     return this._range;
};

RangeModule.prototype.rangePrev = function(){
    return this._range = --this._range;
}

/*
* Validation Module
*/
function ValidationModule(minValue, maxValue){
    this._minValue = minValue;
    this._maxValue = maxValue;
}

ValidationModule.prototype.getMinValue = function(){
    return this._minValue;
}

ValidationModule.prototype.getMaxValue = function(){
    return this._maxValue;
}

ValidationModule.prototype.validatedValue = function(currentValue){
    var minValue = this.getMinValue();
    var maxValue = this.getMaxValue();
    var validatedValue = currentValue;
    if (currentValue < minValue){
        validatedValue = minValue;
    } else if (currentValue > maxValue){
        validatedValue = maxValue;
    } 

    return validatedValue;
}

ValidationModule.prototype.changeValue = function(currentValue){
    var minValue = this.getMinValue();
    var maxValue = this.getMaxValue();
    var validatedValue = currentValue;
    if(currentValue < minValue){
        validatedValue = maxValue;
    } else if(currentValue > maxValue){
        validatedValue = minValue;
    } 
    
    return validatedValue;
}


var washM = new WashingMashine('washing mashine', 'zanussi051', 'H', new TempModule(40, new ValidationModule(30,80)) );

washM.turnOn();
console.log(washM.toString());
console.log(washM._program);
console.log(washM);
// console.log(washM.getTemp());
console.log(washM.getProgram());


// var volumeTV1 = new RangeModule(5, new ValidationModule(1,10));
// var soundTV1 = new RangeModule(20, new ValidationModule(1,50));
// var tv = new Tv('tv','Samsung', volumeTV1, soundTV1);
// tv.turnOn();

// console.log(tv.toString());
// console.log('current range' + tv.getVolume());
// console.log('next' + tv.volumeNext());
// console.log('next' + tv.volumeNext());
// console.log('next' + tv.volumeNext());
// console.log(tv.getVolume());
// console.log('prev ' + tv.volumePrev());
// console.log(tv.getVolume());
// console.log(tv.wifiOn());
// console.log(' ');

// console.log('current sound' + tv.getSound());
// console.log('next' + tv.soundNext());
// console.log('next' + tv.soundNext());
// console.log('next' + tv.soundNext());
// console.log(tv.getSound());
// console.log('prev ' + tv.soundPrev());
// console.log(tv.getSound());


// tv.turnOff();
// console.log(tv.toString());

// var volumeRadio1 = new RangeModule(9, new ValidationModule(1,10));
// var radio = new Radio('radio','hhhs', volumeRadio1);

// console.log(radio);
// radio.turnOn();
// console.log(radio.toString());
// console.log(radio.getVolume());
// console.log(radio.volumeNext());
// console.log(radio.volumeNext());
// console.log(radio.getVolume());
// radio.turnOff();
// console.log(radio.toString());

// var fr = new Fridge('fridge', 'LG', new TempModule(8, new ValidationModule(1,10) ));
// fr.turnOn();
// console.log(fr.toString());
// console.log(fr);
// console.log(fr.getTemp());

