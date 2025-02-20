//Name: Zoe Hightower
let sales = [
	{
		"salesperson": "James D. Halpert",
		"client": "Shake Shack",
		"reams": 100
	},
	{
		"salesperson": "Stanley Hudson",
		"client": "Toast",
		"reams": 400
	},
	{
		"salesperson": "Michael G. Scott",
		"client": "Computer Science Department",
		"reams": 1000
	},
]

let clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
];
const sales_person= "Zoe Hightower";

function make_entry(salesperson, current_client, current_ream){
    //add new client for autocomplete to update
    if (!clients.includes(current_client)) {
        clients.push(current_client);
    }

    //add new sales entry 
    sales.unshift({
        "salesperson": salesperson,
        "client": current_client,
        "reams": current_ream
    });

    update_list(sales);
}

function update_list(sales){
    $("#list").empty()
    $.each(sales, function(index, sale) {
        let saleRow = `
            <div id="sale" class="ui-widget-content row entry draggable">
                <span class="salesperson col-md-3">${sale.salesperson}</span>
                <span class="client col-md-4">${sale.client}</span>
                <span class="reams col-md-3">${sale.reams}</span>
                <button id="delete_button" class="btn btn-primary col-md-1 delete">X</button>
            </div>
        `;
        $("#list").append(saleRow);
    });
    $(".draggable").draggable({
        revert: "invalid",
        helper: "clone"
    });
}

function check_blanks(current_client, current_ream){
    let valid= true;
    $(".error_message").remove();

   
    if (current_client.trim().length == 0) {
        $("#userInputID_Client").focus();
        $("#userInputID_Client").after("<span class='error_message'>Required</span>");
        valid = false;
    }

    if (current_ream.trim().length == 0) {
        if(valid) {
            $("#userInputID_Reams").focus()
        }
        $("#userInputID_Reams").after("<span class='error_message'>Required</span>");
        valid = false;
    }
    else if (isNaN(Number(current_ream))) {
        $("#userInputID_Reams").focus();
        $("#userInputID_Reams").after("<span class='error_message'>Must be a number</span>");
        valid = false;
    }

    return valid;
}


$(function() {
    $("#draggable").draggable({
      revert: "invalid" 
    });
  
    $("#droppable").droppable({
      drop: function(event, ui) {
        $(this)
          .addClass("ui-state-highlight")
          let index = ui.draggable.data("index");
          sales.splice(index, 1);  
          update_list(sales);
      }
    });
  });

  //reading doc
$(document).ready(function(){
    update_list(sales);
    $("#userInputID_Client").autocomplete({
        source: clients
    });
    $("#userInputID_Reams").keypress(function(event) {
        if (event.which === 13){
            let current_client= $("#userInputID_Client").val();
            let current_ream= $("#userInputID_Reams").val();
            if (!check_blanks(current_client, current_ream)) return;
            make_entry(sales_person, current_client, current_ream)
            $("#userInputID_Client").val("");
            $("#userInputID_Reams").val("");
            $("#userInputID_Client").focus();
        }
    });
    $("#submit_button").click(function(){ 
        let current_client= $("#userInputID_Client").val();
        let current_ream= $("#userInputID_Reams").val();
        if (!check_blanks(current_client, current_ream)) return;
        make_entry(sales_person, current_client, current_ream)
        $("#userInputID_Client").val("");
        $("#userInputID_Reams").val("");
        $("#userInputID_Client").focus();
    })
    $("#list").on("click", ".delete", function(){
        let index = $(this).closest(".entry").data("index"); 
        sales.splice(index, 1);
        update_list(sales);
    });
})
    
