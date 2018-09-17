class Bike{
    price: number;
    max_speed: string;
    miles: number;
    constructor(price: number, max_speed: string) {
            this.price = price;
            this.max_speed = max_speed;
            this.miles = 0;
        }
    displayInfo = () => {
        return console.log("Price is $" + this.price + ", max speed is " + this.max_speed + ", miles is " + this.miles);
    }
    ride = () => {
        this.miles = this.miles + 10;
        console.log("Riding");
        return this;
    }
    reverse = () => {
        if (this.miles >= 5) {
            this.miles = this.miles - 5;
        }
        console.log("Reversing");
        return this;
    }
}

    let Giant = new Bike(250, "25mph");
    Giant.ride().ride().ride().reverse().displayInfo();

    let bmx = new Bike(300, "20mph");
    bmx.ride().ride().reverse().reverse().displayInfo();

    let velo = new Bike(350, "50mph");
    velo.reverse().displayInfo();
    