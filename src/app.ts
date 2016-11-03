import { Observable } from 'rxjs/Observable';


class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @aa
    greet() {
        alert("Hello, " + this.greeting); 
    }
}

function aa(target:any,propertyName:String,descriptor:TypedPropertyDescriptor<Function>){
    let value =  descriptor.value;
   descriptor.value = function(){

       return alert('@aa Decorator'),value.apply(this,arguments);
   };
}



new Greeter("addison").greet();


//RX demo
var foo = Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(() => {
    observer.next(300); // happens asynchronously
  }, 1000);
});

console.log('before');
foo.subscribe(function (x) {
  console.log(x);
});
console.log('after');