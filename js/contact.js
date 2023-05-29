let name = "Johanes";

function submitData() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  let subject = document.getElementById("input-subject").value;
  let comment = document.getElementById("input-comment").value;

  if (name == "") {                                         //Alert jika form tidak diisi
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