<?php
    echo "<h1 class='container' style='color: blue;'>Hello, World!</h1>";
    echo (" This is a simple PHP script.");
    print(" <h3>It demonstrates basic PHP syntax.</h3>");
    print "This is another print statement";
    var_dump(" This is a var_dump statement that will display information about a variable."); 
    print_r(" This is a print_r statement that will print human-readable information about a variable.");
    printf(" This is a printf statement that will format and output a string."); 
    # exit(" This is an exit statement that will terminate the script.");
    // die(" This is a die statement that will terminate the script.");
    /*
        This
        is
        a 
        multi-line
        comment
    */

    // VARIABLES AND DATA TYPES
    $username = "Cybergate"; // String
    $score = 100; // Integer
    $average = 85.5; // Float
    $cgpa = 3.5; // Float
    $isCompleted = true; // Boolean
    $usa; // Undefined
    $emptyValue = null; // Null
    // $complexNumber = array("real" => 2, "imaginary" => 3); // Complex Number
    // $complex = 2i + 3 // complex number
    ## Objects
    $students = array("John", "Jane", "Bob"); // Simple Array
    $student = array("name" => "John", "age" => 30, "city" => "New York"); // Associative Array
    
    $odd_numbers = [1, 3, 5, 7, 9]; // Indexed Array
    $companiesInUmuahia = [
        array("name" => "Cybergate", "location" => "Umuahia", "employees" => 10, "revenue" => 100000, "industry" => "Technology"),
        array("name" => "Slot", "location" => "Umuahia", "employees" => 20, "revenue" => 200000, "industry" => "Retail"),
        array("name" => "Company C", "location" => "Umuahia", "employees" => 30, "revenue" => 300000, "industry" => "Healthcare")   
    ]; // Compound Array | Array of Arrays
    

    // Constants
    define("PI", 3.142, true); // Case-insensitive constant

    // echo PI; // Output: 3.142
    // echo "<br>";
    // echo pi; // Output: 3.142

    // "CyBeRgAtE"; // Pascal Case

    // Concatenations
    $username = "Cybergate";
    $age = 12;
    $message = "Hello, my name is " . $username . " and I am " . $age . " years old.";
    echo "\n\r";
    echo $message; // Output: Hello, my name is Cybergate and I am
    echo "<br>";

    // Examples
    // print_r($students);
    // var_dump($students);

    // Functions
    const PI = 3.142; // Constant
    function sayHello(){ // without parameters | Arguments
        return "hello";
    }
    // $result = sayHello(); // Output: hello
    // echo $result;

    // echo sayHello();


    // ## Function with Parameters | Arguments
    function greet($name, $age){ // with parameters | Arguments
        return "Hello, my name is " . $name . " and I am " . $age . " years old.";
    }
    // echo greet("Fresh Presh", 20);
    // echo "<br> <hr>";
    // echo greet("Samuel", 23);

    // ## Callback Functions
    function greetUser($name="Guest", $callback){
        $greeting = "Hello, my name is " . $name . ".";
        return $callback($greeting);
    }

    function callback($msg){
        return $msg . " Nice to meet you!";
    }

    // mini-calculator

    function calc($num1, $symb, $num2){
        return eval("echo $num1 $symb $num2;");
    }

    // calc(2,'+', 2);

    // gen OTP for user login system
    function generateOTP($length = 6) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $otp = '';
        for ($i = 0; $i < $length; $i++) {
            $otp .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $otp;
    }
    // echo generateOTP(10);
    // rand(1, 100); // Generate a random number between 1 and 100
    // $characters[20]

    // echo greetUser("Fresh Presh", "callback");
    // echo greetUser(null,"callback");


    // Loops
    // for, foreach, while, do while
    // for($i = 0; $i < 10; $i++){
    //     echo $i."<br>";
    // }

    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // for($i = 0; $i < count_chars($characters); $i++){
    //     echo $characters[$i]."<br>";
    // }

    $otp = '';
    for($i = 0; $i < 4; $i++){
        // echo $characters[$i]."<br>";
        $otp .= $characters[rand(0, strlen($characters) - 1)];
    }
    // echo $otp."<br>";
    // echo strlen($characters)."<br>";
    // $picked = rand(1, strlen($characters));
    // echo "The number picked is ". $picked . " and the value in characters is ". $characters[$picked]."<br>";

    ## foreach
    // foreach ($companiesInUmuahia as $key => $value) {
    //     echo $companiesInUmuahia[$key];
    // }

    // while
    // $i = 0;
    // while ($i <= 10) {
    //     echo $i."<br>";
    //     $i++;
    // }

    $fruits = ["mango", "paw-paw", "pineApple"];

    // $j = 0;
    // while($j < count($fruits)){
    //     // echo $j . " " .$fruits[$j];
    //     // echo "<br>";
    //     printf("{$j} {$fruits[$j]} <br>");
    //     $j++;
    // }


    // foreach - Association or Compound Array (Array of Arrays)
    $stores = ["marketSquare" => "main street", "Jovis" => "Aba branch"];
    // $stores = array("marketSquare" => "main street");
    // $stores = Array("marketSquare" => "main street");
    $stateInNigeria = [
        array(
            "Name" => "Abia State",
            "Capital" => "Umuahia",
            "Governor" => "Dr. Chief Engr. Alex Otti",
            "Year" => 1971,
            "Internal Revenue" => 4200000000,
            "Budget" => 300000000000,
            "IsIndependant" => true
        ),
        array(
            "Name" => "Imo State",
            "Capital" => "Owerri",
            "Governor" => "Dr. Hope Uzodimma",
            "Year" => 1968,
            "Internal Revenue" => 670000000,
            "Budget" => 380000000000,
            "IsIndependant" => false
        )
    ];

    // foreach($stores as $key => $value){
    //     echo $stores[$key]."<br>";
    //     // echo $key."<br>";
    //     // echo $value."<br>";
    // }

    // foreach($stateInNigeria as $index => $value){
    //     // echo $stateInNigeria[$key];
    //     foreach($stateInNigeria[$index] as $kk => $vv){
    //         echo $key[$kk];
    //     }
    // }

    // for($i = 0; $i < count($stateInNigeria); $i++){
    //     for($j = 0; $j < count($stateInNigeria[$i]); $j++){
    //         print_r($stateInNigeria[$j]);
    //     }
    // }
    

    // do while
    $i = 0;
    do{
        echo $i."<br>";
        $i++;    
    }
    while ($i == 10);


    // Conditional Statements


    # Presh will teach me Loop and Conditional Statements

    // OOP - OBJECT ORIENTED PROGRAMMING
    // class - is blue blueprint or a prototype to an object 


    class Human {
        // properties of a class

        public $name;
        private $identity;

        function set_identity($name, $identity){
            $this->name = $name;
            $this->identity = $identity;
        }

        function get_identity(){
            printf("The username is %s and ID is %s", $this->name, $this->identity);
            echo "<br>";
            echo ("The username is ".$this->name . " and ID is ". $this->identity."<br>");
        }

    }

    // features of a OOP
    // ### instantiation
    // # create new instance of Human
    $presh = new Human();

    $presh->set_identity("Precious", 1122);

    $presh->get_identity();
    

    // inheritance
    class Man extends Human{
        private $gender;

        function add_gender($gender){
            $this->gender = $gender;
        }

        function myGender(){
            var_dump($this->gender);
        }

    }

    $david = new Man();

    $david->set_identity("David", 3322); // coming Human

    $david->add_gender("Male");

    $david->get_identity(); // Human

    $david->myGender();


    // polymorphism
    // Emcapsulation
    // Abstraction
    
    


    // Superglobals
    // $GLOBALS

    // $_COOKIE

    // $_SESSION

    // $_SERVER

    // $_ENV

    // $_FILES

    // $_GET

    // $_POST

    // $_REQUEST

    


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Script</title>
    <style>
        .container {
            text-align: center;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    
</body>
</html>
