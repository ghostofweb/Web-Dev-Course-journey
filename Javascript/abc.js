function bellboy(name, age, hasworkpermit,language){
    this.name = name;
    this.age = age;
    this.hasworkpermit = hasworkpermit;
    this.language = language;
}

var bellboy1 = bellboy("timmy" ,19 , true,["french","English"]);
console.log(bellboy1);
console.log("hello")