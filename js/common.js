var book_1 = {
    "name":"Harry Potter",
    "author":"Joanne K. Rowling",
    "price":"1$"
}
var book_2 = {
    "name":"Lord of the Rings",
    "author":"J. R. R. Tolkien",
    "price":"2$"
}
var book_3 = {
    "name":"Alice is wonderland",
    "author":"Lewis Carroll",
    "price":"3$"
}
const libr = [book_1, book_2, book_3]

// libr.forEach((book)=>console.log(book))

for (book of libr){
    console.log(book)
}