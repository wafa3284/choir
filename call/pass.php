<?php session_start() ?>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<?php
$pass = "ta34ip*!";
if (filter_has_var(INPUT_POST, "inputpass") || $_SESSION['pass']) {
    $inputpass = filter_input(INPUT_POST, "inputpass");
    if ($inputpass == $pass || $_SESSION['pass']) {
        $_SESSION['pass'] = $pass;
    } else {
        check_pass();
    }
} else {
    check_pass();
}

function check_pass()
{
    echo <<<HERE
  <body onload="document.form1.inputpass.focus()">
  <form name="form1" method="post" action="">
  <fieldset>
   <legend>비밀번호입력</legend>
   <input type="password" name="inputpass" />
   <button type="submit">Enter</button>
  </fieldset>
  </form>
  </body>
HERE;
    exit;
}
?>