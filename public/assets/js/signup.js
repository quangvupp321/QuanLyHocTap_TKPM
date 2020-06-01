// Function to check Whether both passwords 
            // is same or not. 
function checkPassword(form) { 
    password1 = form.password.value; 
    password2 = form.valid_password.value; 

    // If Not same return False.     
    if (password1 != password2) { 
        alert ("\nPassword did not match: Please try again...") 
        return false; 
    } 
    // If same return True. 
    return true; 

} 

function changePassword(form){
    password1 = form.new_password.value;
    password2 = form.re_new_password.value;
    is_change = form.is_change_pass.checked;
    console.log(is_change)
    
    if (is_change)
    {
        if (password1 === "")
        {
            alert ("\n Password Emty!!") 
            return false; 
        }
        else if (password1 === "")
        {
            alert ("\n Password Emty!!") 
            return false; 
        }

        else if (password1 != password2) { 
            alert ("\nPassword did not match: Please try again...") 
            return false; 
        } 
    }

    return true; 
}