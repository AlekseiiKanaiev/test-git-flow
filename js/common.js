document.addEventListener('DOMContentLoaded', function(){
    
    // var apiKey = "AIzaSyC5mcWMqSMxtaecdQx-wsq6cgoZSKqZd0I"
    document.getElementById('my-form').addEventListener('submit', function(event){
        event.preventDefault();
        var query = document.getElementById('book_search').value;
        var alertInfo = '<div class="alert alert-warning" role="alert">'+
                        'Please, enter name of the book!</div>';
        if (!query){
            document.getElementById('search-form').innerHTML += alertInfo;
            // alert(alertInfo);
            return -1;
        }
        var url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`;
        getJSONBooks(url).then(function(result){
            var items = result.items;
            var content = '<div class = "row">';
            content += '<div class="col-md-4"><h4>Name</h4></div>'+
                        '<div class="col-md-4"><h4>Author</h4></div>'+
                        '<div class="col-md-1"><h4>Price</h4></div>'+
                        '<div class="col-md-3"></div></div>';
            var i = 0;
            for (item of items){
                var title = item.volumeInfo.title;
                var authors = (item.volumeInfo.authors)? item.volumeInfo.authors.join():"None";
                var price = (item.saleInfo)? item.saleInfo.retailPrice.amount:"None";
                content +=  '<div class = "row">'+
                            `<div class="col-md-4">${title}</div>`+
                            `<div class="col-md-4">${authors}</div>`+
                            `<div class="col-md-1">${price}</div>`+
                            '<div class="col-md-3"><div class="book-info d-flex flex-column justify-content-center align-items-center">'+
                            `<button class="btn btn-info btn-sm" type="button" data-toggle="modal" data-target="#bookinfo" data-book = "${i}">View details</button></div></div></div>`;
                i++;
            }   
            document.getElementById('content').innerHTML = content;

            $('.modal').on('show.bs.modal', function (event) {
                let button = $(event.relatedTarget) // Button that triggered the modal
                let book = button.data('book') // Extract info from data-* attributes
                let ch_book = items[book];
                // console.log(ch_book);
                if (ch_book){
                    let img = (ch_book.volumeInfo.imageLinks)?
                        `<img src = '${ch_book.volumeInfo.imageLinks.smallThumbnail}' alt = '${ch_book.volumeInfo.title}' >`
                        :'There is no image';
                    let description = (ch_book.volumeInfo.description)?
                        ch_book.volumeInfo.description
                        :'There is no description';
                    document.querySelector('.modal-title').innerHTML = ch_book.volumeInfo.title;
                    document.querySelector('.modal-body').innerHTML = img+'<br/>'+description;
                }
            })
        })
        .catch(function(err){
            console.log("Err: "+err);
            alertInfo = `<div class="alert alert-danger" role="alert">${err}!</div>`;
            document.getElementById('search-form').innerHTML += alertInfo;
        })
    })
})

function getJSONBooks(url) {
    return getBooks(url).then(JSON.parse);
  }

function getBooks(url){
    return new Promise(function (resolve, reject){
        var request = new XMLHttpRequest();
        var fields = 'items(saleInfo(retailPrice),volumeInfo(description,title,authors,imageLinks/smallThumbnail))'
        
        request.open("GET", `${url}&fields=${fields}&maxResults=10`)
        request.onload = function(){
            if (request.status === 200){
                resolve(request.response)
            }
            else{
                reject(new Error(request.statusText))
            }
        }
        request.onerror = function(){
            reject(new Error('Network Error'))
        }
        request.send();
        console.log('submit');
    })
}