//变量声明
!function(){
  let name = 'addison';
  const myname = 'addison';
}()

//解构
!function(){
  let input = [1,2];
  let [first,second] = input;
  console.log(`first : ${first}`); //1
  console.log(`second : ${second}`);//2

  let [f,...rest] = [1,2,3,4,5];
  console.log(`f : ${f}`);//1
  console.log(`rest : ${rest},length: ${rest.length}`);//[2,3,4,5]
}()

//接口
!function(){
  //属性描述接口
  !function(){
    interface Person{
      //默认属性
      name : string;
      //可选属性
      jobs ?: string;
      //只读属性
      readonly age : number;
      //其他自定义属性,如果没有这个属性,给实例赋值其他属性,则失败.
      [propName: string]: any;
    }

    let person: Person = {
      name:'addison',
      age:12,
      jobs:'coder',
      gender:'female'
    };

    console.log(person);
  }()


  //函数类型接口
  !function(){
    
    interface HelpFunc{
      (source: string, result: string): boolean;
    }

    //使用接口
    let myHelpFunc: HelpFunc;
    myHelpFunc = function (source: string,result: string) {
      return false;
    }
  }()

  //可索引类型
  !function(){
    interface ArrayDemo{
      [index: number]:string;
    }

    let myArray: ArrayDemo;
    myArray = ['addison','joe'];
    let result: String = myArray[0];
    console.log(`result: ${result}`);


    class Animal {
      name: string;
    }
    class Dog extends Animal {
        breed: string;


    }
    console.log(new Dog().name);
  }()

  //类类型接口
  !function(){
    //定义接口
    interface Animal{
      age :number;
      eat():void;
    }

    //实现接口
    class cat implements Animal{
      age:number;
      eat(){
        console.log(`age: ${this.age},eating;`)
      }
      constructor(age:number){
        this.age = age;
      }
    }

    new cat(123).eat();


    //拓展接口
    interface Shape{
      color: string;
    }

    interface Square extends Shape{
      sideLength: number;
    }

    interface rect{
      width: number;
    }
    interface Circle extends Square,rect{
      r: number;
    }

    let square = <Square>{};
    square.color = 'red';
    square.sideLength = 10;
    console.log(square);


    let circle = <Circle>{};
    circle.r = 10;
    circle.color='green';
    circle.sideLength = 100;
    circle.width = 123;
    console.log(circle);
  }()

  //混合类型接口
  !function(){
    interface Counter{
      (start: number): string;
      interval:number;
      reset():void;
    }

    function getCounter():Counter{
      let counter = <Counter>function(start: number){};
      counter.interval = 1;
      counter.reset = function(){};
      return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 2;
    console.log(c.interval);
  }()
}()


//类
!function(){

  //基础类
  !function(){
    class Greeter {
      greeting: string;
      constructor(message: string) {
          this.greeting = message;
      }
      greet() {
          return "Hello, " + this.greeting;
      }
    }

    let greeter = new Greeter("world");
    console.log(greeter);
  }()

  //类继承
  !function(){
    class Animal {
      name:string;
      constructor(theName: string) { this.name = theName; }
      move(distanceInMeters: number = 0) {
          console.log(`${this.name} moved ${distanceInMeters}m.`);
      }
    }

    class Snake extends Animal {
        constructor(name: string) { super(name); }
        move(distanceInMeters = 5) {
            console.log("Slithering...");
            super.move(distanceInMeters);
        }
    }

    new Snake('addison').move(30);
  }()

  //访问控制修饰符
  !function(){
    class Person {
      //保护成员. 子类只可以访问,不可修改
      protected name: string;
      //私有成员
      private   age: number;
      //默认公有成员
      gender : number;
      constructor(name: string) { this.name = name; };
    }

    class boy extends Person{
      private _fullName: string;
      constructor(name: string){
        super(name);
      }
      show(){
        console.log(this.name);
      }
    }
    let addison = new boy('addison');
    addison.show();
  }()  

  //存取器 & 静态属性
  !function(){
    class boy{
      private _fullName: string;
      static full: string = 'addison';

      //get set 存取器
      get fullName():string{
        return this._fullName;
      }

      set fullName(name: string){
        this._fullName = name;
      }
    }
    let addison = new boy();

    addison.fullName = 'addison joe';
    console.log(addison.fullName);
    //静态属性,直接用类调用
    console.log(boy.full);
  }()

  //抽象类
  !function(){
    //定义抽象类
    abstract class Animal{
      //抽象类中的抽象方法不包含具体实现并且必须在派生类中实现,抽象类不可实例化.
      abstract eat():void;
      move(){
        console.log('animal move');
      }
    }

    class Dog extends Animal{
      eat(){
        console.log('dog eat;');
      }
    }

    let dog = new Dog();
    dog.eat();
    dog.move();
  }()
}()

//函数
!function(){
  //函数 demo
  function add(x: number,y?: number,z: number = 4,...rest: string[]): string{
    return x + (y||0) + z + rest.join('')
  }

  console.log(add(1,2,3,'1','2','3')); //6123
}()

//泛型
!function(){
  //基础 demo
  function identity<T>(arg: T): T{
    return arg;
  }
  let output = identity<string>('addison');
  console.log(output);

  //泛型函数
  function id<T>(arg: T): T {
    return arg;
  }

  let myIdentity: <T>(arg: T) => T = id;

  console.log(myIdentity<string>('asad'));

  //对象字面量方式定义泛型函数
  function ide<T>(arg: T): T {
    return arg;
  }

  let ideIns: {<T>(arg: T): T} = ide;
  console.log(ideIns<string>('addison'));


  //泛型接口
  interface GenericId<T>{
    (arg: T):  T;
  }

  function ID<T>(arg: T): T{
    return arg;
  }

  let gid: GenericId<number> = ID;
  console.log(gid(123));

  //泛型类
  class Person<T>{
    private _name: T;
    constructor(name: T){
      this._name = name;
    }
  }

  new Person<string>('addison');
  new Person<number>(123);
}()

//枚举
!function(){
  enum Direction {
    Up = 1,
    Down,
    Left,
    Right
  }
}()

//高级类型
!function(){
  
  // 交叉类型
  function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (result)[id] = (first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (result)[id] = (second)[id];
        }
    }
    return result;
  }

  class Person {
    constructor(public name: string) { this.name= name;}
  }
  interface Loggable {
      log(): void;
  }
  class ConsoleLogger implements Loggable {
      log() {}
  }

  var jim = extend(new Person("Jim"), new ConsoleLogger());
  var n = jim.name;
  jim.log();
  console.log(n);
}()

//Symbols
!function(){
  //唯一性
  let sym2 = Symbol("key");
  let sym3 = Symbol("key");

  sym2 === sym3;  //false

  //作为对象属性
  let sym = Symbol();
  let obj = {
      [sym]: "value"
  };
  console.log(obj[sym]); // "value"
}()

//装饰器
!function(){
  class Demo{
    private _name: string;
    private _age : number;

    @rewrite
    show(){
      console.log(1);
    }
    eat(@required things: string){
      console.log(`eat: ${things}`);
    }
  }


  /**
   * 方法装饰器
   * @param {any}                               target       [description]
   * @param {string}                            propertyName [description]
   * @param {TypedPropertyDescriptor<Function>} descriptor   [description]
   */
  function rewrite(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>){
    let method = descriptor.value;
    descriptor.value = (...arg)=>{
      console.log(2);
      return method.apply(this,arg);
    }
  }

  //参数装饰器
  function required(target: Object, propertyKey: string, parameterIndex: number) {
    console.log(arguments);
  }


  let demo = new Demo();
  demo.show();//2 1
  demo.eat('milk');
}()












































