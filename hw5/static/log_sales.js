/* ZOE HIGHTOWER*/
const sales_person= "Zoe Hightower";

function save_sale(sale){
    $.ajax({
        type: "POST",
        url: "save_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(sale),
        success: function(result){
            let all_data = result["sales"]
            sales = all_data
            display_sales_list(sales);
            $("#userInputID_Client").val("");
            $("#userInputID_Reams").val("");
            $("#userInputID_Client").focus();
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });

    //add new sales entry 
    sales.unshift({
        "salesperson": salesperson,
        "client": current_client,
        "reams": current_ream
    });

}

function delete_sale(id) {

    var data_to_save = {
        "id": id
    }
    $.ajax({
        type: "POST",
        url: "delete_sale",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data_to_save),
        success: function (response) {
            var sales = response["sales"]
             display_sales_list(sales)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function create_row(current) {
    let current_row = $("<div></div>");
    current_row.addClass("ui-widget-content row entry draggable sale");
    current_row.attr("data-id", current.id);

    let new_person = $("<span></span>");
    new_person.addClass("salesperson col-md-3");
    new_person.html(current.salesperson);
    current_row.append(new_person);
        
    let new_client = $("<span></span>");
    new_client.addClass("client col-md-4");
    new_client.html(current.client);
    current_row.append(new_client);
        
    let new_ream = $("<span></span>");
    new_ream.addClass("reams col-md-3"); 
    new_ream.html(current.reams);
    current_row.append(new_ream);
        
    let button_to_delete = $("<button id= 'delete_button'></button>");
    button_to_delete.addClass("btn btn-primary col-md-1 delete");
    button_to_delete.html("X");
    current_row.append(button_to_delete);
        
    return current_row;
}
        

function  display_sales_list(sales){
    $("#list").empty();
    $.each(sales, function(index, value) {
        var saleRow = create_row(value);
        
        $("#list").append(saleRow);
    });
    $(".draggable").draggable({
        revert: "invalid",
        helper: "clone"
    });
}

function check_blanks(current_client, current_ream) {
    let valid = true;
    let firstErrorField = null;
    $(".error_message").remove();

    if (current_client.trim().length == 0) {
        $("#userInputID_Client").after("<span class='error_message'>Required</span>");
        if (!firstErrorField) firstErrorField = "#userInputID_Client";
        valid = false;
    }

    if (current_ream.trim().length == 0) {
        $("#userInputID_Reams").after("<span class='error_message'>Required</span>");
        if (!firstErrorField) firstErrorField = "#userInputID_Reams";
        valid = false;
    } 
    else if (isNaN(Number(current_ream))) {
        $("#userInputID_Reams").after("<span class='error_message'>Must be a number</span>");
        if (!firstErrorField) firstErrorField = "#userInputID_Reams";
        valid = false;
    }

    if (firstErrorField) {
        $(firstErrorField).focus(); 
    }

    return valid;
}



$(function() {
    $("#draggable").draggable({
      revert: "invalid" 
    });
  
    $("#droppable").droppable({
        over: function(event, ui) {
            $(this).addClass("ui-state-highlight");
        },
        out: function(event, ui) {
            $(this).removeClass("ui-state-highlight");
        },
        drop: function(event, ui) {
            $(this)
            .addClass("ui-state-highlight")
            let id = ui.draggable.data("id");
            delete_sale(id);
        }
    });
  });

  //reading doc
$(document).ready(function(){
     display_sales_list(sales);
    $("#userInputID_Client").autocomplete({
        source: clients
    });
    $("#userInputID_Reams").keypress(function(event) {
        if (event.which === 13){
            let current_client= $("#userInputID_Client").val();
            let current_ream= $("#userInputID_Reams").val();
            if (!check_blanks(current_client, current_ream)) return;
    
            if (!clients.includes(current_client)) {
                clients.push(current_client);
            }
            let sale = {
                "salesperson":sales_person,
                "client": current_client,
                "reams": current_ream
            };
            save_sale(sale);

        }
    });
    $("#submit_button").click(function(){ 
        let current_client= $("#userInputID_Client").val();
        let current_ream= $("#userInputID_Reams").val();
        if (!check_blanks(current_client, current_ream)) return;
    
        if (!clients.includes(current_client)) {
            clients.push(current_client);
        }
        let sale = {
            "salesperson":sales_person,
            "client": current_client,
            "reams": current_ream
        };
        save_sale(sale);
    })
    $("#list").on("click", ".delete", function(){
        let index = $(this).closest(".entry").data("index"); 
        let id = $(this).closest(".entry").data("id");  
        delete_sale(id);
    });
})
