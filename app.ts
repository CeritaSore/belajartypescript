import type { apiResponses } from "./config/api.js";
import { Books } from "./dict/Book.js";

const mybook = Books;

function index(): void {
    const data: apiResponses<typeof Books>[] = [
        {
            pesan: "menampilkan data",
            kode: 200,
            data: mybook
        },

    ]
    console.log(JSON.stringify(data, null, 2));
}

index()

function show(id: number): void {
    const getSpesificData = mybook.find((book) => book.id === id)
    if (!getSpesificData) {
        console.log('data tidak ditemukan')
        return;
    }
    const data: apiResponses<typeof getSpesificData> =
    {
        pesan: "menampilkan data",
        kode: 200,
        data: getSpesificData
    };


    console.log(data)
}
show(1)
function store() {
    const data = {
        id: 4,
        name: "sejarah filsafat barat",
        author: "bertrant russel"
    }
    const saveData = mybook.push(data);
    const response: apiResponses<typeof saveData> = {
        pesan: "input data berhasil",
        kode: 200,
        data: saveData
    }
    console.log(JSON.stringify(response))
}
store()
function edit(id: number, newName: string, newAuthor: string) {
    const getSpesificData = mybook.find((book) => book.id === id)
    if (!getSpesificData) {
        console.log('data tidak ditemukan')
        return;
    }
    getSpesificData.name = newName;
    getSpesificData.author = newAuthor;
    const response: apiResponses<typeof getSpesificData> = {
        pesan: "berhasil mengubah data",
        kode: 200,
        data: getSpesificData
    }
    console.log(response);
}

edit(1, "funiculi funicula", 'toshikazu');