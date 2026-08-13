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

    // echo greetUser("Fresh Presh", "callback");
    // echo greetUser(null,"callback");


    // Loops
    // for, foreach, while, do while
    // for($i = 0; $i < 10; $i++){
    //     echo $i."<br>";
    // }

    ## foreach
    // foreach ($companiesInUmuahia as $key => $value) {
    //     echo $companiesInUmuahia[$key];
    // }

    // Conditional Statements

    # Presh will teach me Loop and Conditional Statements

    // OOP

    // Superglobals



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
