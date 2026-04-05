import { Books } from "./dict/Book.js";
const mybook = Books;
function index() {
    const data = [
        {
            pesan: "menampilkan data",
            kode: 200,
            data: mybook
        },
    ];
    console.log(JSON.stringify(data, null, 2));
}
index();
function show(id) {
    const getSpesificData = mybook.find((book) => book.id === id);
    if (!getSpesificData) {
        console.log('data tidak ditemukan');
    }
    const data = [
        {
            pesan: "menampilkan data",
            kode: 200,
            data: getSpesificData
        },
    ];
    console.log(JSON.stringify(data));
}
show(1);
//# sourceMappingURL=app.js.map