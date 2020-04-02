<?php
//if "email" variable is filled out, send email
try {
  $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$email = $request->email;
    @$name = $request->name;
    @$phone = $request->phone;
    @$comment = $request->comment;
  if (isset($email))  {
  //Email information
  $admin_email = "samirb4444@gmail.com";
  $email = $email;
  $subject ="Request from " . $name;
  $comment = "<b>Phone number:- " .  $phone . "</b><br><br> <b>Message:- ". $comment ."</b>";
  
  //headers
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: ". $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
  //send email
  mail($admin_email, "$subject", $comment, $headers);
  
  //Email response
    echo "Thank you for contacting us!";
  // header("Location:index.php?suc=done");
  }
  
  //if "email" variable is not filled out, display the form
  else  {
 //header("Location:index.php?suc=nodone");
 
   echo "Error :(!";
   
   }
}catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}

?>