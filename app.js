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
        return;
    }
    const data = {
        pesan: "menampilkan data",
        kode: 200,
        data: getSpesificData
    };
    console.log(data);
}
show(1);
function store() {
    const data = {
        id: 4,
        name: "sejarah filsafat barat",
        author: "bertrant russel"
    };
    const saveData = mybook.push(data);
    const response = {
        pesan: "input data berhasil",
        kode: 200,
        data: saveData
    };
    console.log(JSON.stringify(response));
}
store();
function edit(id, newName, newAuthor) {
    const getSpesificData = mybook.find((book) => book.id === id);
    if (!getSpesificData) {
        console.log('data tidak ditemukan');
        return;
    }
    getSpesificData.name = newName;
    getSpesificData.author = newAuthor;
    const response = {
        pesan: "berhasil mengubah data",
        kode: 200,
        data: getSpesificData
    };
    console.log(response);
}
edit(1, "funiculi funicula", 'toshikazu');
function destroy(id) {
    let getSpesificData = mybook.find((book) => book.id === id);
    if (!getSpesificData) {
        console.log("data tidak ditemukan");
        return;
    }
    const currentBooks = mybook.filter((book) => book.id !== id);
    const response = {
        pesan: "berhasil menghapus",
        kode: 200,
        data: currentBooks
    };
    console.log(response);
}
destroy(2);
//# sourceMappingURL=app.js.map