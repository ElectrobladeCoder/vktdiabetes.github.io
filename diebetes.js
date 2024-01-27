function insulinCount() {
        swal({
            text: 'Input your weight.',
            content: "input",
            button: {
              text: "Check my levels",
              closeModal: false,
            },
          })
          
          
}

function submitData() {
    let customweight = document.getElementById("bodyweight").value;
    let customage = document.getElementById("age123").value;
    let dosedinsulin = Math.round(customweight*1.5)
    let dosedbasal = document.getElementById("dosedBasal").value;
    localStorage.setItem("weight", customweight)
    localStorage.setItem("age", customage)
    let totalinsulin = Math.round(customweight*1.5)
    localStorage.setItem("totalAllowedInsulin", totalinsulin);
    if (!dosedbasal === undefined || dosedbasal=== null || dosedbasal === '') {
        let allowedbolus = Math.round((dosedinsulin / 10) * 6);
        localStorage.setItem("totalAllowedBolus", allowedbolus);

        let allowedbasal = Math.round((dosedinsulin / 10) * 4);
        localStorage.setItem("totalAllowedBasal", allowedbasal);    
    }
    else {
        
        let allowedbolus = dosedinsulin - dosedbasal
        localStorage.setItem("totalAllowedBolus", allowedbolus)
        let allowedbasal = dosedbasal
        localStorage.setItem("totalAllowedBasal", allowedbasal)
    }

    document.getElementById("rebolus").innerHTML=localStorage.getItem("totalAllowedBolus")
    document.getElementById("rebasal").innerHTML=localStorage.getItem("totalAllowedBasal")

    swal({
        title: "Data Updated",
        text: "Your custom data has been logged! Amazing!",
        icon: "success",
        button: "Done",
        
      });

    }

    


function submitInsulin() {
    let insulinAmt = document.getElementById("insulinno").value;
    let currentInsulin = localStorage.getItem("totalAllowedBolus")
    let remainingBolus = currentInsulin - insulinAmt
    localStorage.setItem("totalAllowedBolus", remainingBolus)
    localStorage.setItem("insulinAmount", insulinAmt)
    document.getElementById("rebolus").innerHTML=localStorage.getItem("totalAllowedBolus")
    if(remainingBolus < 0) {
        swal({
            title: "Uh Oh...",
            text: "Um... It seems you have exceeded your insulin quota for the day! This can lead to insulin not working in your body if you are not too careful! :(",
            icon: "warning",
            button: "I'll be careful...",
            dangerMode: true,
                });

        document.getElementById("inuslinno").style.borderColor= "red";
        localStorage.setItem("totalAllowedBolus", "NO UNITS");

        
        
    }

else{
    
    swal({
        title: "Insulin Logged",
        text: "Your new insulin data has been logged! ",
        icon: "success",
        button: "Hooray!",
            });
        
        }
    
}

function startUp() {
    let basal = localStorage.getItem("totalAllowedBolus")
    if(!basal) {
        swal({
            title: "Welcome to the site!",
            text: "Your guide to manage that sugar monster in you! ",
            icon: "success",
            button: "Yaayyyy!!!",
                });
    }

    else{

        document.getElementById("rebolus").innerHTML=localStorage.getItem("totalAllowedBolus")
        document.getElementById("rebasal").innerHTML=localStorage.getItem("totalAllowedBasal")

        swal({
            title: "Welcome back to the site!",
            text: "Your left over data has been backed up!",
            icon: "success",
            button: "Cool!",
                });
    }
}