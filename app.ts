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
    }
    const data: apiResponses<typeof getSpesificData> = [
        {
            pesan: "menampilkan data",
            kode: 200,
            data: getSpesificData
        },

    ]
    console.log(JSON.stringify(data))
}
show(1)