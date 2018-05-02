document.addEventListener("DOMContentLoaded", function(){
    var url = "https://www.googleapis.com/books/v1/volumes"
    // var apiKey = "AIzaSyC5mcWMqSMxtaecdQx-wsq6cgoZSKqZd0I"
    document.getElementById('my-form').addEventListener("submit", function(event){
        event.preventDefault();
        var param = "Php";
        var request = new XMLHttpRequest();
        var fields = "items(saleInfo(retailPrice),volumeInfo(description,title,authors,imageLinks/smallThumbnail))"
        var alertInfo = "Incorrect"
        request.open("GET", `${url}?q=${param}&fields=${fields}&maxResults=10`)
        request.onload = function(){
            if (request.status === 200){
                var result = JSON.parse(request.response);
                // console.log("M: "+result);
                // console.log(result.items);
                var content = '<div class = "row">';
                content += '<div class="col-md-4"><h4>Name</h4></div>'+
                            '<div class="col-md-4"><h4>Author</h4></div>'+
                            '<div class="col-md-1"><h4>Price</h4></div>'+
                            '<div class="col-md-3"></div></div>'
                for (item of result.items){
                    var title = item.volumeInfo.title
                    var authors = (item.volumeInfo.authors)? item.volumeInfo.authors:["None"]
                    var price = (item.saleInfo)? item.saleInfo.retailPrice.amount:"None"
                    content +=  '<div class = "row">'+
                                `<div class="col-md-4">${title}</div>`+
                                `<div class="col-md-4">${authors.join()}</div>`+
                                `<div class="col-md-1">${price}</div>`+
                                '<div class="col-md-3"><div class="book-info d-flex flex-column justify-content-center align-items-center">'+
                                `<button class="btn btn-info btn-sm" type="button" data-toggle="modal" data-target="#bookinfo" data-book = "${title}">View details</button></div></div></div>`
                }   
                document.getElementById('content').innerHTML = content

                $('.modal').on('show.bs.modal', function (event) {
                    let button = $(event.relatedTarget) // Button that triggered the modal
                    let book = button.data('book') // Extract info from data-* attributes
                    console.log(book.toLowerCase());
                    var items = result.items;
                    console.log(items);
                    // console.log(result.items[0].volumeInfo.title);
                    // let ch_book = items.find((item) => {
                    //     console.log(item.volumeInfo.title.toLowerCase());
                    //     item.volumeInfo.title.toLowerCase()===+book.toLowerCase()
                    // })
                    for (item of items){
                        if (item.volumeInfo.title.toLowerCase() === book.toLowerCase()){
                            var ch_book = item;
                        }
                    }
                    console.log(ch_book);
                    if (ch_book){
                        img_src = ch_book.volumeInfo.imageLinks.smallThumbnail
                        console.log(img_src);
                        let img = `<img src = '${img_src}' alt = '${ch_book.volumeInfo.title}' >`
                        document.querySelector('.modal-title').innerHTML = ch_book.volumeInfo.title;
                        document.querySelector(".modal-body").innerHTML = img+ch_book.volumeInfo.description;
                    }
                })

            }
            else{
                console.log("Err: "+request.statusText);
                alert(alertInfo);
            }
        }
        request.send();
        console.log("submit");

        
    })
    
})