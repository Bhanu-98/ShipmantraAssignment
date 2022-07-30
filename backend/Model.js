class Model {
     constructor(originAddress, destinationAddress, matter){
        this.matter = matter;
        var points = [];
        var originPoint = new Point(originAddress);
        var destinatiionPoint = new Point(destinationAddress);
        points.push(originPoint);
        points.push(destinatiionPoint);
        this.points = points;
     }
}

class Point {
    constructor(address){
        this.address = address;
    }
}

module.exports = {Model}