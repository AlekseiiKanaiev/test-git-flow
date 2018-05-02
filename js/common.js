// const book_1 = {
//     "name":"Harry Potter",
//     "author":"Joanne K. Rowling",
//     "price":"1$",
//     "info":"Harry Potter is a series of fantasy novels written by British author J. K. Rowling. "+
//         "The novels chronicle the life of a young wizard, Harry Potter, and his friends "+
//         "Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of "+
//         "Witchcraft and Wizardry. The main story arc concerns Harry's struggle against "+
//         "Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard "+
//         "governing body known as the Ministry of Magic, and subjugate all wizards and muggles, "+
//         "a reference term that means non-magical people.",
//     "img":"./img/harry_potter.png"
// }
// const book_2 = {
//     "name":"Lord of the Rings",
//     "author":"J. R. R. Tolkien",
//     "price":"2$",
//     "info":"The Lord of the Rings is an epic high fantasy novel written by English author "+
//         "and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy "+
//         "novel The Hobbit, but eventually developed into a much larger work. Written in stages "+
//         "between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, "+
//         "with over 150 million copies sold.The title of the novel refers to the story's main antagonist, "+
//         "the Dark Lord Sauron, who had in an earlier age created the One Ring to rule the other "+
//         "Rings of Power as the ultimate weapon in his campaign to conquer and rule all of Middle-earth. "+
//         "From quiet beginnings in the Shire, a hobbit land not unlike the English countryside, "+
//         "the story ranges across Middle-earth, following the course of the War of the Ring through "+
//         "the eyes of its characters, not only the hobbits Frodo Baggins, Samwise 'Sam' Gamgee, "+
//         "Meriadoc 'Merry' Brandybuck and Peregrin 'Pippin' Took, but also the hobbits' chief allies "+
//         "and travelling companions: the Men, Aragorn son of Arathorn, a Ranger of the North, "+
//         "and Boromir, a Captain of Gondor; Gimli son of Glóin, a Dwarf warrior; Legolas Greenleaf, "+
//         "an Elven prince; and Gandalf, a wizard.",
//     "img":"./img/LOTR14.png"
// }
// const book_3 = {
//     "name":"Alice in wonderland",
//     "author":"Lewis Carroll",
//     "price":"3$",
//     "info":"Alice's Adventures in Wonderland (commonly shortened to Alice in Wonderland) is "+
//         "an 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym "+
//         "Lewis Carroll. It tells of a girl named Alice falling through a rabbit hole into a fantasy "+
//         "world populated by peculiar, anthropomorphic creatures. The tale plays with logic, giving "+
//         "the story lasting popularity with adults as well as with children. It is considered to be "+
//         "one of the best examples of the literary nonsense genre. Its narrative course and structure, "+
//         "characters and imagery have been enormously influential in both popular culture and literature, "+
//         "especially in the fantasy genre.",
//     "img":"./img/alice_in_wonderland.jpg"
// }
// const libr = [book_1, book_2, book_3]

// libr.forEach((book)=>console.log(book))

// for (book of libr){
//     console.log(
// `Book: ${book.name}
// Author: ${book.author}
// Price: ${book.price}`)
// }

document.addEventListener("DOMContentLoaded", function(){
    var url = "https://www.googleapis.com/books/v1/volumes"
    // var apiKey = "AIzaSyC5mcWMqSMxtaecdQx-wsq6cgoZSKqZd0I"
    document.getElementById('my-form').addEventListener("submit", function(event){
        event.preventDefault();
        var param = "Harry+Potter";
        var request = new XMLHttpRequest();
        var fields = "items(saleInfo(retailPrice),volumeInfo(description,title,authors,imageLinks/smallThumbnail))"
        var alertInfo = "Incorrect"
        request.open("GET", `${url}?q=${param}&fields=${fields}&maxResults=10`)
        request.onload = function(){
            if (request.status === 200){
                console.log(JSON.parse(request.response));
            }
            else{
                console.log("Err: "+request.statusText);
                alert(alertInfo)
            }
        }
        request.send();
        console.log("submit");


        var content = "";


        $('.modal').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget) // Button that triggered the modal
            let book = button.data('book') // Extract info from data-* attributes
            let ch_book = libr.find((elem) => elem.name.toLowerCase().search(book.toLowerCase())!==-1)
            if (ch_book){
                let img = `<img src = '${ch_book.img}' alt = '${ch_book.name}' >`
                $(this).find('.modal-title').text(ch_book.name)
                document.querySelector(".modal-body").innerHTML = img+ch_book.info
            }
        })
    })
})