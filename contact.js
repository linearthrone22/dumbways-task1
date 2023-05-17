// console.log("Hello");
// alert("good morning");
// document.write("Batch 47")

// Variable

// VAR
// LET
// CONST

// bisa di deklarasikan ulang dan bisa diubah value/data nya

// var gelas = "Air Putih";
// var gelas = "Kopi";
// console.log(gelas)

// tidak bisa dideklarasikan ulang, namun value/datanya bisa kita ubah
// let pemerintah = "PDIP";
// pemerintah = "Nasdem";
// console.log(pemerintah)

// tidak bisa dideklarasikan ulang dan tidak bisa diubah value/data nya
// const rog = "asus"
// rog = "lenovo"
// console.log(rog)

// data type
// let nama = "Johanes"  // string
// let umur = 19 // number
// let isMarried = false // boolean

// nama saya Abel Dustin umur saya 15 tahun
// console.log("Nama saya Johanes umur saya 19")
// console.log(`Nama saya ${nama} umur saya ${umur} tahun`);
// console.log ("Nama saya", nama, "Umur saya", umur, "tahun");
// console.log ("nama saya " + nama + " umur saya " + umur + " tahun");

// operator
// let x = 48;
// let y = "2";
// let result = x * y;

// console.log(result);

// condition
// jika nilai sama dengan atau lebih dari 75, maka lulus

// let nilai <= 75;

// if (nilai = "75") {
//     console.log("Kamu lulus!");
// }

//function
// function Hello() {
//     let x = 5;
//     let y = 10;

//     let result = x * y;
//     console.log(result);
// }

// Hello();

// function Hello2(x, y) {
//     console.log(x);
//     console.log(y);

//     let result = x * y;
//     console.log(result);
// }

// Hello2 (5, 10);

// cammelcase = namaSayaAdalah

// function namaSaya(name) {
//     console.log(name);
// }

// namaSaya("Abel");

let name = "Johanes";

function submitData() {
    let name = document.getElementById("input-name").value;
    let email = document.getElementById("input-email").value;
    let phone = document.getElementById("input-phone").value;
    let subject = document.getElementById("input-subject").value;
    let comment = document.getElementById("input-comment").value;
  
    if (name == "") {
      return alert("Nama harus diisi!");
    } else if (email == "") {
      return alert("Email harus diisi!");
    } else if (phone == "") {
      return alert("Phone harus diisi!");
    } else if (subject == "") {
      return alert("Subject harus dipilih!");
    } else if (comment == "") {
      return alert("Comment harus diisi!");
    }
  
    let emailReceiver = "johanessetia5@gmail.com";

  
    let a = document.createElement("a");
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello, my name is ${name}, ${subject}. My phone number is ${phone} or message me through ${email}, thank you.`;
    a.click();
  
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(subject);
    console.log(comment);
  
    let emailer = {
      name,
      email,
      phone,
      subject,
      comment,
    };
  }